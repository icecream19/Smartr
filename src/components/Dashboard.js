import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Dashboard.module.css'; // Import the modularized CSS

const Dashboard = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [previousAudits, setPreviousAudits] = useState([]);

  const handleSignout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  const samplePreviousAudits = [
    { id: 1, name: 'Audit 1', date: '2023-09-01' },
    { id: 2, name: 'Audit 2', date: '2023-09-02' },
    { id: 3, name: 'Audit 3', date: '2023-09-03' },
    { id: 4, name: 'Audit 4', date: '2023-09-04' },
  ];

  const fetchPreviousAudits = () => {
    setPreviousAudits(samplePreviousAudits);
  };

  useEffect(() => {
    fetchPreviousAudits();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <h1>Hello, User!</h1>
        <Button variant="contained" color="primary" onClick={handleSignout} className={styles.dashboardButton}>
          Sign Out
        </Button>
      </div>
      <div className={styles.searchInput}>
        <input type="text" placeholder="Search Audits" className={styles.dashboardInput} />
        <Button variant="contained" color="secondary" component={Link} to="/new-audit" className={styles.dashboardButton}>
          New Audit
        </Button>
      </div>
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
            {previousAudits.map((audit) => (
              <TableRow key={audit.id}>
                <TableCell className={styles.dashboardCell}>{audit.name}</TableCell>
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
