// Importing React hooks and components
import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Dashboard.module.css'; // Import modular CSS

const Dashboard = ({ setIsAuthenticated }) => {
  // Hook for navigation
  const navigate = useNavigate();
  // State for holding previous audits
  const [previousAudits, setPreviousAudits] = useState([]);

  // Sign out function
  const handleSignout = () => {
    setIsAuthenticated(false); // Change authentication state
    navigate('/'); // Redirect to home page
  };

  // Sample previous audits (should come from an API in a real app)
  const samplePreviousAudits = [
    { id: 1, name: 'Audit 1', date: '2023-09-01' },
    { id: 2, name: 'Audit 2', date: '2023-09-02' },
    // ...
  ];

  // Fetch audits (could be an API call)
  const fetchPreviousAudits = () => {
    setPreviousAudits(samplePreviousAudits); // Update state with fetched audits
  };

  // Fetch audits on component mount
  useEffect(() => {
    fetchPreviousAudits();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className={styles.dashboardContainer}>
      {/* Header section */}
      <div className={styles.header}>
        <h1>Hello, User!</h1>
        <Button variant="contained" color="primary" onClick={handleSignout} className={styles.dashboardButton}>
          Sign Out
        </Button>
      </div>
      {/* Search and New Audit button */}
      <div className={styles.searchInput}>
        <input type="text" placeholder="Search Audits" className={styles.dashboardInput} />
        <Button variant="contained" color="secondary" component={Link} to="/new-audit" className={styles.dashboardButton}>
          New Audit
        </Button>
      </div>
      {/* Table for showing previous audits */}
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
            {/* Mapping through audits to display them */}
            {previousAudits.map((audit) => (
              <TableRow key={audit.id}>
                <TableCell className={styles.dashboardCell}>
                  <Link to={`/audit-results/`}>{audit.name}</Link>
                  {/* <Link to={`/audit-results/${audit.id}`}>{audit.name}</Link> */}
                </TableCell>
                <TableCell className={styles.dashboardCell}>{audit.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
