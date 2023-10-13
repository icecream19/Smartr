const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql2');
const { exec } = require('child_process');
const fs = require('fs');
const app = express();

const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'audit_system'
});

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    connection.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, password, email], (error) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Failed to register user.' });
        }
        res.status(200).json({ success: true, message: 'User registered successfully.' });
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Internal server error.' });
        }
        
        if (results.length > 0) {
            return res.status(200).json({ success: true, message: 'Logged in successfully.', userId: results[0].id });
        } else {
            return res.status(401).json({ success: false, message: 'Incorrect username or password.' });
        }
    });
});

app.get('/api/user-audits/:userId', (req, res) => {
    console.log("Accessed /api/user-audits/:userId endpoint");

    const userId = req.params.userId;
    console.log("User ID:", userId);

    connection.query('SELECT DISTINCT contract_id, contract_name, upload_date FROM audits JOIN contracts ON audits.contract_id = contracts.id WHERE audits.user_id = ?', [userId], (error, results) => {
        if (error) {
            console.error("Database Error:", error);
            return res.status(500).json({ success: false, message: 'Failed to retrieve unique audits.' });
        }

        console.log("Query Results:", results);
        res.status(200).json({ success: true, data: results });
    });
});



app.post('/upload', (req, res) => {
    const { userId, contractName, filePath } = req.body;
    connection.query('INSERT INTO contracts (user_id, contract_name, upload_date, file_path) VALUES (?, ?, NOW(), ?)', [userId, contractName, filePath], (error) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Failed to upload contract.' });
        }
        res.status(200).json({ success: true, message: 'Contract uploaded successfully.' });
    });
});

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    const filePath = req.file.path;
    const userId = req.body.userId;
    const contractName = req.body.contractName;

    try {
        // Insert the contract details and get the inserted contract's ID
        const [insertion] = await connection.promise().query(
            'INSERT INTO contracts (user_id, contract_name, upload_date, file_path) VALUES (?, ?, NOW(), ?)',
            [userId, contractName, filePath]
        );

        const contractId = insertion.insertId;

        const vulnerabilities = await runSlither(filePath);

        // Insert vulnerabilities into the audits table
        const insertionPromises = vulnerabilities.map((vuln) => {
            const { description, check: vulnerability_category, impact: severity, confidence: suggestions } = vuln;
            const line_number = parseInt(description.split('#')[1]?.split('-')[0]) || null;

            if (vulnerability_category && severity && suggestions && line_number) {
                return connection.promise().query(
                    'INSERT INTO audits (user_id, contract_id, vulnerability_category, line_number, severity, suggestions) VALUES (?, ?, ?, ?, ?, ?)', 
                    [userId, contractId, vulnerability_category, line_number, severity, suggestions]
                ).catch(error => {
                    console.error(`Error inserting into audits for line ${line_number}:`, error);
                });
            }
            return Promise.resolve(); // for vulnerabilities that don't meet the criteria
        });

        await Promise.all(insertionPromises);

        res.status(200).json({ success: true, message: 'Audit saved and processed successfully.' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error during Slither execution or processing.' });
    }
});

function runSlither(filePath) {
    const jsonOutputPath = './slitherOutput.json';

    return new Promise((resolve, reject) => {
        exec(`python3 -m slither ${filePath} --json ${jsonOutputPath}`, (error) => {
            if (error && error.code !== 4294967295) {
                console.error(`exec error: ${error}`);
                return reject(error);
            }

            const jsonOutput = fs.readFileSync(jsonOutputPath, 'utf-8');
            const slitherData = JSON.parse(jsonOutput);
            
            console.log('Parsed slitherData:', slitherData);

            const vulnerabilities = slitherData.results?.detectors || [];

            if (Array.isArray(vulnerabilities)) {
                resolve(vulnerabilities);
            } else {
                console.error('Unexpected vulnerabilities type:', typeof vulnerabilities);
                reject(new TypeError('Expected vulnerabilities to be an array'));
            }
        });
    });
}


app.get('/api/audits/:userId', (req, res) => {
    const userId = req.params.userId;

    // Join with contracts table to get the contract_name
    const sql = `
      SELECT a.*, c.contract_name 
      FROM audits AS a 
      JOIN contracts AS c ON a.contract_id = c.id 
      WHERE a.user_id = ?
    `;

    connection.query(sql, [userId], (error, results) => {
        if (error) {
            console.error('Database error:', error); // log the error for debugging
            return res.status(500).json({ success: false, message: 'Failed to retrieve audits.' });
        }
        if (results.length > 0) {
            res.status(200).json({ success: true, data: results });
        } else {
            res.status(404).json({ success: false, message: 'No audits found for this user.' });
        }
    });
});

app.get('/api/auditResults/:userId/:contractId', (req, res) => {
    const { userId, contractId } = req.params;
    // Query that selects audit results based on both user ID and contract ID
    const sql = `
        SELECT a.*, c.contract_name 
        FROM audits AS a 
        JOIN contracts AS c ON a.contract_id = c.id 
        WHERE a.user_id = ? AND a.contract_id = ?
    `;
    connection.query(sql, [userId, contractId], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ success: false, message: 'Failed to retrieve specific audit results.' });
        }
        if (results.length > 0) {
            res.status(200).json({ success: true, data: results });
        } else {
            res.status(404).json({ success: false, message: 'No audit results found for this user and contract.' });
        }
    });
});



app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err.stack);
    res.status(500).json({ success: false, message: 'Internal server error.' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

