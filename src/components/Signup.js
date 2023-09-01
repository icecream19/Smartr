import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleSignup = () => {
    // Add your signup logic here. For now, it will always succeed.
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  return (
    <Container>
      <h1>Sign Up</h1>
      <form>
        <TextField label="Username" variant="outlined" fullWidth />
        <TextField label="Password" variant="outlined" fullWidth />
        <Button variant="contained" color="primary" onClick={handleSignup}>
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default Signup;
