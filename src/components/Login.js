import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  return (
    <Container>
      <h1>Login</h1>
      <form>
        <TextField label="Username" variant="outlined" fullWidth />
        <TextField label="Password" variant="outlined" fullWidth />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </form>
      <Link to="/signup">Don't have an account? Sign Up</Link>
    </Container>
  );
};

export default Login;
