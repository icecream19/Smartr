import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';

/**
 * Login Component - Provides an interface for the user to log in.
 * @param {Function} setIsAuthenticated - Function to update the authentication status.
 */
const Login = ({ setIsAuthenticated }) => {
  // Navigation helper from React Router
  const navigate = useNavigate();

  // Component state variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Handles user login by sending a request to the server.
   */
  const handleLogin = async () => {
    const userData = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/login', userData);
      
      if (response.data.success) {
        localStorage.setItem('userId', response.data.userId);  // Persist user ID in local storage for later use
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setErrorMessage('There was an error logging in. Please try again.');
    }
  };

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Card style={{ backgroundColor: '#f0f2f0', padding: '40px', width: '600px', boxShadow: '0px 4px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h1>
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
          
          <Button variant="contained" color="primary" onClick={handleLogin} style={{ marginBottom: '20px' }}>
            Login
          </Button>
        </form>
        <Link to="/signup" style={{ textAlign: 'center' }}>Don't have an account? Sign Up</Link>
      </Card>
    </Container>
  );
};

export default Login;
