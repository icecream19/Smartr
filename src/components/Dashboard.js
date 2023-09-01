import React from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleSignout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div>
      <h1>Hello, Bolod!</h1>
      <input type="text" placeholder="Search Audits" />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Audit Name</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Add your audit rows here */}
        </TableBody>
      </Table>
      <Button variant="contained" color="primary" onClick={handleSignout}>
        Sign Out
      </Button>
      <Button variant="contained" color="secondary" style={{ marginLeft: '10px' }} component={Link} to="/new-audit">
        New Audit
      </Button>
    </div>
  );
};

export default Dashboard;
