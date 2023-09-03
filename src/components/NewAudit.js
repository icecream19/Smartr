// Importing required modules and components
import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import styles from './NewAudit.module.css'; // Importing a custom CSS module
import { useNavigate } from 'react-router-dom'; // Hook for navigation

// NewAudit component definition
const NewAudit = () => {
  // State to keep track of the uploaded file
  const [file, setFile] = useState(null);

  // Initialize navigation hook
  const navigate = useNavigate();

  // Function to handle file change event
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // Check for .sol file extension
    if (selectedFile && selectedFile.name.endsWith('.sol')) {
      setFile(selectedFile); // Save the file in state
    } else {
      alert('Please upload a .sol file'); // Alert if incorrect file type
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Add your audit creation logic here.
    // For now, it navigates to the audit results page.
    navigate('/audit-results');
  };

  // Render the New Audit form
  return (
    <div className={styles.newAuditContainer}>
      <div className={styles.centerContent}>
        <h1 className={styles.pageTitle}>New Audit</h1>  {/* Title */}
        {/* Textfield for audit name */}
        <TextField id="standard-basic-input" label="Audit Name" variant="standard" type="audit" className={styles.textField} />
        {/* File input for uploading .sol files */}
        <input type="file" accept=".sol" onChange={handleFileChange} className={styles.fileInput} />
        {/* Submit button */}
        <Button variant="contained" className={styles.submitButton} onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

// Exporting the component for use in other files
export default NewAudit;
