import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Dashboard.module.css';
import axios from 'axios';

const Dashboard = ({ setIsAuthenticated }) => {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // State variables to manage previous audits and search term
  const [previousAudits, setPreviousAudits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Retrieve the logged-in user's ID from local storage
  const userId = localStorage.getItem('userId');

  // Handler to log the user out
  const handleSignout = () => {
    // Update parent authentication state and clear local storage
    setIsAuthenticated(false);
    localStorage.removeItem('userId');

    // Redirect to home/root
    navigate('/');
  };

  // Effect hook to fetch previous audits for the logged-in user
  useEffect(() => {
    const fetchPreviousAudits = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user-audits/${userId}`);
        
        // On successful response, update the previousAudits state
        if (response.data.success) {
          setPreviousAudits(response.data.data);
        } 
      } catch (error) {
        console.error('Error fetching audits:', error);
      }
    };

    fetchPreviousAudits();
  }, [userId]);  // Dependency on userId ensures this runs once and when userId changes

  // Filter audits based on user search term
  const filteredAudits = previousAudits.filter(audit => 
    audit.contract_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render the Dashboard
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <h1>Welcome to Smartr!</h1>
        {/* Sign Out button */}
        <Button variant="contained" color="primary" onClick={handleSignout} className={styles.dashboardButton}>
          Sign Out
        </Button>
      </div>

      {/* Search bar and New Audit button */}
      <div className={styles.searchInput}>
        <input 
          type="text" 
          placeholder="Search Audits" 
          className={styles.dashboardInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="secondary" component={Link} to="/new-audit" className={styles.dashboardButton}>
          New Audit
        </Button>
      </div>

      {/* Section for displaying previous audits */}
      <div className={styles.previousAudits}>
        <h2>Previous Audits</h2>
        <Table className={styles.dashboardTable}>
          <TableHead>
            <TableRow>
              <TableCell className={styles.dashboardHeader}>Audit Name</TableCell>
              <TableCell className={styles.dashboardHeader}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAudits.length > 0 ? (
              filteredAudits.map((audit) => (
                <TableRow key={audit.contract_id}>
                  <TableCell className={styles.dashboardCell}>
                    {/* Link to individual audit result */}
                    <Link to={`/audit-results/${audit.contract_id}`}>{audit.contract_name}</Link>
                  </TableCell>
                  <TableCell className={styles.dashboardCell}>{audit.upload_date}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                {/* Message when no audits match the search */}
                <TableCell colSpan={2} style={{ textAlign: 'center' }}>No audits match your search.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
