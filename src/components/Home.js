import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Home.module.css'; 

const Home = () => {
    return (
        <div className={styles['home-container']}>
            <div className={styles['background-image']}></div>
            <div className={styles.content}>
                {/* Used the specific class name for h1 */}
                <h1 className={styles.homeTitle}>SMARTR AUDIT</h1>

                {/* Used the specific class name for the Button */}
                <Button 
                    className={styles.homeButton} 
                    variant="contained" 
                    component={Link} 
                    to="/login">
                    Login
                </Button>
            </div>
        </div>
    );
};

export default Home;
