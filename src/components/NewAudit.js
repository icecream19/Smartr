import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import styles from './NewAudit.module.css'; // Import your CSS module
import { useNavigate } from 'react-router-dom';

const NewAudit = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.sol')) {
      setFile(selectedFile);
    } else {
      alert('Please upload a .sol file');
    }
  };

  const handleSubmit = () => {
    // Add your audit creation logic here. For now, it will navigate to the audit results page.
    navigate('/audit-results');
  };

  return (
    <div className={styles.newAuditContainer}>
      <div className={styles.centerContent}>
        <h1 className={styles.pageTitle}>New Audit</h1>
        <TextField id="standard-basic-input" label="Audit Name" variant="standard" type="audit" className={styles.textField} />
        <input type="file" accept=".sol" onChange={handleFileChange} className={styles.fileInput} />
        <Button variant="contained" className={styles.submitButton} onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default NewAudit;
