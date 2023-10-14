import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import styles from './NewAudit.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/**
 * NewAudit Component - Provides an interface for users to submit a new audit.
 */
const NewAudit = () => {
  // Component state variables
  const [file, setFile] = useState(null);
  const [auditName, setAuditName] = useState('');
  const navigate = useNavigate();

  // Handle changes to the audit name text field
  const handleAuditNameChange = (e) => {
    setAuditName(e.target.value);
  };

  // Handle changes to the file input and ensure only .sol files are selected
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.sol')) {
      setFile(selectedFile);
    } else {
      alert('Please upload a .sol file');
    }
  };

  const userId = localStorage.getItem('userId');

  // Submit the selected file and audit details to the server
  const handleSubmit = async () => {
    const formData = new FormData();
    const contractName = document.getElementById("standard-basic-input").value;

    formData.append('file', file);
    formData.append('userId', userId);
    formData.append('contractName', contractName);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData);
      
      if (response.data.success) {
        navigate(`/audit-results/${response.data.contractId}`);
      } else {
        alert('There was an issue with the audit submission.');
      }
    } catch (error) {
      alert('There was an error submitting the audit. Please try again.');
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
