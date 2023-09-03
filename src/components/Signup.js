// Import necessary modules and components
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Hook for navigation
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';

// Signup Component
const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate(); // Initialize navigation hook
  
  // Handle Signup logic
  const handleSignup = () => {
    // would generally authenticate the user and then set the state.
    setIsAuthenticated(true);
    navigate('/dashboard'); // Navigate to dashboard upon successful signup
  };

  // Render Signup Form
  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Card style={{ backgroundColor: '#f0f2f0', padding: '40px', width: '600px', boxShadow: '0px 4px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h1>
        <form style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Text Field for Username */}
          <TextField label="Username" variant="outlined" fullWidth style={{ marginBottom: '20px', backgroundColor: 'white' }} />
          {/* Text Field for Password */}
          <TextField label="Password" variant="outlined" fullWidth style={{ marginBottom: '20px', backgroundColor: 'white' }} />
          {/* Signup Button */}
          <Button variant="contained" color="primary" onClick={handleSignup} style={{ marginBottom: '20px' }}>
            Sign Up
          </Button>
        </form>
        {/* Link to navigate to Login page */}
        <Link to="/login" style={{ textAlign: 'center' }}>Already have an account? Login</Link>
      </Card>
    </Container>
  );
};

// Export the Signup component to be used in App.js
export default Signup;
