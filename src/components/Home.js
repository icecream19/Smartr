// Import necessary modules
import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'; // For hyperlink-based navigation
import styles from './Home.module.css'; // Import your CSS module

// Home component
const Home = () => {
    return (
        // Home container
        <div className={styles['home-container']}>
            {/* Background Image Container */}
            <div className={styles['background-image']}></div>

            {/* Main Content Container */}
            <div className={styles.content}>
                {/* Title text */}
                <h1 className={styles.homeTitle}>SMARTR AUDIT</h1>

                {/* Login Button */}
                <Button 
                    className={styles.homeButton}  // Applying specific styling for the button
                    variant="contained"  // Style variant for the Material UI Button
                    component={Link}  // Use react-router's Link as the base component
                    to="/login">  
                    Login  
                </Button>
            </div>
        </div>
    );
};

// Export the Home component
export default Home;
