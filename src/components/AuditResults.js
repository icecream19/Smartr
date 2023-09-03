// Import React and Material-UI components
import React from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card } from '@mui/material';

const AuditResults = () => {
  return (
    <Container style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh' 
    }}>
      <Card style={{ 
        backgroundColor: '#f0f2f0', 
        padding: '40px', 
        width: '800px', 
        boxShadow: '0px 4px 8px rgba(0,0,0,0.1)' 
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '20px' 
        }}>
          Audit Results
        </h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vulnerability Category</TableCell>
                <TableCell align="right">Line Number</TableCell>
                <TableCell align="right">Severity</TableCell>
                <TableCell align="right">Suggestions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Reentrancy</TableCell>
                <TableCell align="right">23-27</TableCell>
                <TableCell align="right">High</TableCell>
                <TableCell align="right">Use mutex to prevent reentrant calls.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Integer Overflow</TableCell>
                <TableCell align="right">34-37</TableCell>
                <TableCell align="right">Medium</TableCell>
                <TableCell align="right">Use SafeMath library for arithmetic operations.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Unchecked External Calls</TableCell>
                <TableCell align="right">45-49</TableCell>
                <TableCell align="right">Medium</TableCell>
                <TableCell align="right">Use .call() only when necessary and handle failure case.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Timestamp Dependence</TableCell>
                <TableCell align="right">55-59</TableCell>
                <TableCell align="right">Low</TableCell>
                <TableCell align="right">Avoid using block.timestamp for critical logic.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
};

export default AuditResults;
