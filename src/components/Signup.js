import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleSignup = () => {
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Card style={{ backgroundColor: '#f0f2f0', padding: '40px', width: '600px', boxShadow: '0px 4px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h1>
        <form style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField label="Username" variant="outlined" fullWidth style={{ marginBottom: '20px', backgroundColor: 'white' }} />
          <TextField label="Password" variant="outlined" fullWidth style={{ marginBottom: '20px', backgroundColor: 'white' }} />
          <Button variant="contained" color="primary" onClick={handleSignup} style={{ marginBottom: '20px' }}>
            Sign Up
          </Button>
        </form>
        <Link to="/login" style={{ textAlign: 'center' }}>Already have an account? Login</Link>
      </Card>
    </Container>
  );
};

export default Signup;
