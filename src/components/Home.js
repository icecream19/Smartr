import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ backgroundImage: 'url(your-image-url)', backgroundSize: 'cover' }}>
      <h1>Home Page</h1>
      <Button variant="contained" component={Link} to="/login">Login</Button>
    </div>
  );
};

export default Home;
