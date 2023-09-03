// Import necessary modules
import React from 'react';
import { useNavigate } from 'react-router-dom'; // For programmatic navigation
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom'; // For hyperlink-based navigation

// Login component that receives setIsAuthenticated function as props
const Login = ({ setIsAuthenticated }) => {
  // Initialize the useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = () => {
    // Set the user as authenticated
    setIsAuthenticated(true);
    // Navigate to the dashboard page
    navigate('/dashboard');
  };

  return (
    // Container to center the Card
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {/* Card to hold the login form */}
      <Card style={{ backgroundColor: '#f0f2f0', padding: '40px', width: '600px', boxShadow: '0px 4px 8px rgba(0,0,0,0.1)' }}>
        {/* Title */}
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h1>
        {/* Login form */}
        <form style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Username TextField */}
          <TextField label="Username" variant="outlined" fullWidth style={{ marginBottom: '20px', backgroundColor: 'white' }} />
          {/* Password TextField */}
          <TextField label="Password" variant="outlined" fullWidth style={{ marginBottom: '20px', backgroundColor: 'white' }} />
          {/* Login button */}
          <Button variant="contained" color="primary" onClick={handleLogin} style={{ marginBottom: '20px' }}>
            Login
          </Button>
        </form>
        {/* Link to Signup page */}
        <Link to="/signup" style={{ textAlign: 'center' }}>Don't have an account? Sign Up</Link>
      </Card>
    </Container>
  );
};

// Export the Login component
export default Login;
