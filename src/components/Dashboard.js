import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Dashboard.module.css';
import axios from 'axios';

const Dashboard = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [previousAudits, setPreviousAudits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const userId = localStorage.getItem('userId');

  const handleSignout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('userId');
    navigate('/');
  };

  useEffect(() => {
    const fetchPreviousAudits = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user-audits/${userId}`);
        if (response.data.success) {
          setPreviousAudits(response.data.data);
        } else {
          console.error('Failed to fetch audits:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching audits:', error);
      }
    };

    fetchPreviousAudits();
  }, [userId]);

  const filteredAudits = previousAudits.filter(audit => 
    audit.contract_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <h1>Welcome to Smartr!</h1>
        <Button variant="contained" color="primary" onClick={handleSignout} className={styles.dashboardButton}>
          Sign Out
        </Button>
      </div>

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
                    <Link to={`/audit-results/${audit.contract_id}`}>{audit.contract_name}</Link>
                  </TableCell>
                  <TableCell className={styles.dashboardCell}>{audit.upload_date}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
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
