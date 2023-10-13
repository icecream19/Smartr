const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql2');
const { exec } = require('child_process');
const bcrypt = require('bcrypt');
const fs = require('fs');
const app = express();
const saltRounds = 10;
const { Writable } = require('stream');


const {pipeline} = require('stream');
const {parser} = require('stream-json');
const {pick} = require('stream-json/filters/Pick');
const {streamArray} = require('stream-json/streamers/StreamArray');


app.use(bodyParser.json());
app.use(cors());

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

app.get('/api/audits/:userId', (req, res) => {
    const userId = req.params.userId;
    connection.query('SELECT * FROM audits WHERE user_id = ?', [userId], (error, results) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Failed to retrieve audits.' });
        }
        if (results.length > 0) {
            res.status(200).json({ success: true, data: results });
        } else {
            res.status(404).json({ success: false, message: 'No audits found for this user.' });
        }
    });
})

app.post('/upload', (req, res) => {
    const { userId, contractName, filePath } = req.body;
    connection.query('INSERT INTO contracts (user_id, contract_name, upload_date, file_path) VALUES (?, ?, NOW(), ?)', [userId, contractName, filePath], (error) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Failed to upload contract.' });
        }
        res.status(200).json({ success: true, message: 'Contract uploaded successfully.' });
    });
});

app.get('/auditResults/:contractId', (req, res) => {
    const contractId = req.params.contractId;
    connection.query('SELECT * FROM audit_results WHERE contract_id = ?', [contractId], (error, results) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Failed to retrieve audit results.' });
        }
        res.status(200).json({ success: true, data: results });
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
    const jsonOutputPath = './slitherOutput.json';

    try {
        const vulnerabilities = await runSlither(filePath, jsonOutputPath);
    
        vulnerabilities.forEach((vuln) => {
            // Extract relevant data from each vulnerability
            const { vulnerability_category, line_number, severity, suggestions } = vuln; // Adjust these names accordingly
    
            connection.query(
                'INSERT INTO audits (user_id, vulnerability_category, line_number, severity, suggestions) VALUES (?, ?, ?, ?, ?)', 
                [userId, vulnerability_category, line_number, severity, suggestions], 
                (error) => {
                    if (error) {
                        console.error('Database Error:', error);
                    }
                }
            );
        });
    
        res.status(200).json({ success: true, message: 'Audit saved and processed successfully.' });
    } catch (error) {
        console.error('Error during Slither execution or processing:', error);
        return res.status(500).json({ success: false, message: 'Error during Slither execution or processing.' });
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

            // Read the JSON from the specified file
            const jsonOutput = fs.readFileSync(jsonOutputPath, 'utf-8');
            const slitherData = JSON.parse(jsonOutput);
            
            // Extract relevant information from slitherData
            const vulnerabilities = slitherData.results; // Adjust according to actual structure

            resolve(vulnerabilities);
        });
    });
}


const vulnerabilities = await runSlither(filePath);
    
vulnerabilities.forEach((vuln) => {
    // Extract relevant data from each vulnerability
    const { vulnerability_category, line_number, severity, suggestions } = vuln; 

    connection.query(
        'INSERT INTO audits (user_id, vulnerability_category, line_number, severity, suggestions) VALUES (?, ?, ?, ?, ?)', 
        [userId, vulnerability_category, line_number, severity, suggestions], 
        (error) => {
            if (error) {
                console.error('Database Error:', error);
            }
        }
    );
});







// function runSlither(filePath) {
//     const jsonOutputPath = './slitherOutput.json';  // specify an appropriate path for your environment

//     return new Promise((resolve, reject) => {
//         exec(`python3 -m slither ${filePath} --json ${jsonOutputPath}`, (error, stdout, stderr) => {
//             if (error && error.code !== 4294967295) {
//                 console.error(`exec error: ${error}`);
//                 console.error("Slither Error:", stderr);
//                 return reject(error);
//             }

//             // Read the JSON from the specified file
//             const jsonOutput = fs.readFileSync(jsonOutputPath, 'utf-8');
            
//             console.log("Slither JSON Output:", jsonOutput); // Log the output here

//             resolve(jsonOutput);
//         });
//     });
// }



app.get('/api/auditResults/:userId', (req, res) => {
    const userId = req.params.userId;
    connection.query('SELECT * FROM audits WHERE user_id = ?', [userId], (error, results) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Failed to retrieve audit results.' });
        }
        res.status(200).json({ success: true, data: results });
    });
});

app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err.stack);
    res.status(500).json({ success: false, message: 'Internal server error.' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});