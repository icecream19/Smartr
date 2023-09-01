import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const NewAudit = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.sol')) {
      setFile(selectedFile);
    } else {
      alert('Please upload a .sol file');
    }
  };

  return (
    <div>
      <h1>New Audit</h1>
      <TextField label="Audit Name" variant="outlined" />
      <input type="file" accept=".sol" onChange={handleFileChange} />
      <Button variant="contained">Submit</Button>
    </div>
  );
};

export default NewAudit;
