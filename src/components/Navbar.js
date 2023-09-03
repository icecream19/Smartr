// Importing required modules
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// Navbar component definition
const Navbar = () => {
  return (
    // AppBar is a Material-UI component that serves as the app's top app bar
    <AppBar style={{ backgroundColor: '#186699' }} position="static">
      {/* Toolbar is another Material-UI component used to hold the AppBar content */}
      <Toolbar>
        {/* Typography is used for displaying text in Material-UI */}
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
          {/* The name of the app */}
          Smartr
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

// Export the Navbar component for use in other files
export default Navbar;
