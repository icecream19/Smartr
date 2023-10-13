import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import styles from './NewAudit.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




const NewAudit = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [auditName, setAuditName] = useState('');

  const handleAuditNameChange = (e) => {
    setAuditName(e.target.value);
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.sol')) {
      setFile(selectedFile);
    } else {
      alert('Please upload a .sol file');
    }
  };

  const userId = localStorage.getItem('userId');

  const handleSubmit = async () => {
    const formData = new FormData();
    const contractName = document.getElementById("standard-basic-input").value;

    formData.append('file', file);
    formData.append('userId', userId);
    formData.append('contractName', contractName);  // Include contractName in the formData

    try {
        const response = await axios.post('http://localhost:5000/api/upload', formData);
        console.log(response.data);
        
        if (response.data.success) {
            navigate('/audit-results');
        } else {
            alert('There was an issue with the audit submission.');
        }
    } catch (error) {
        console.error('There was an error submitting the audit:', error);
    }
};

  return (
    <div className={styles.newAuditContainer}>
      <div className={styles.centerContent}>
        <h1 className={styles.pageTitle}>New Audit</h1>
        <TextField 
          id="standard-basic-input" 
          label="Audit Name" 
          variant="standard" 
          value={auditName}
          onChange={handleAuditNameChange}
          className={styles.textField} 
        />
        <input type="file" accept=".sol" onChange={handleFileChange} className={styles.fileInput} />
        <Button variant="contained" className={styles.submitButton} onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default NewAudit;
