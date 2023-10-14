import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';

/**
 * Signup Component - Provides an interface for the user to create an account.
 * @param {Function} setIsAuthenticated - Function to update the authentication status.
 */
const Signup = ({ setIsAuthenticated }) => {
  // Navigation helper from React Router
  const navigate = useNavigate();

  // Component state variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Handles user signup by sending a request to the server.
   */
  const handleSignup = async () => {
    const userData = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:5000/register', userData);

      if (response.data.success) {
        localStorage.setItem('userId', response.data.userId);
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        setErrorMessage('Signup failed. Please check your input.');
      }
    } catch (error) {
      setErrorMessage('There was an error during signup. Please try again.');
    }
  };

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Card style={{ backgroundColor: '#f0f2f0', padding: '40px', width: '600px', boxShadow: '0px 4px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h1>
        <form style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField 
            label="Username" 
            variant="outlined" 
            fullWidth 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: '20px', backgroundColor: 'white' }} 
          />
          <TextField 
            label="Password" 
            variant="outlined" 
            fullWidth 
            type="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: '20px', backgroundColor: 'white' }} 
          />
          
          {/* Displaying any error messages */}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          
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
