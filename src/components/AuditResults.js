import React, { useEffect, useState } from 'react';
import { Container, Card, Typography, Divider } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AuditResultItem = ({ result }) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <Typography variant="h6">Contract Name: {result.contract_name}</Typography>
            <Typography>Vulnerability Category: {result.vulnerability_category}</Typography>
            <Typography>Line Number: {result.line_number}</Typography>
            <Typography>Severity: {result.suggestions}</Typography>
            <Typography>Suggestions: {result.severity}</Typography>
            <Divider style={{ margin: '10px 0' }} />
        </div>
    );
};

const AuditResults = () => {
    const [auditResults, setAuditResults] = useState([]);
    const { contractId } = useParams();

    useEffect(() => {
        const fetchAuditResults = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/auditResults/${contractId}`);
                console.log('Fetched Audit Results:', response.data);
                if (response.data.success) {
                    const validResults = response.data.data.filter(result => 
                        result.vulnerability_category && 
                        result.line_number && 
                        result.severity
                    );
                    setAuditResults(validResults);
                }
            } catch (error) {
                console.error('Error fetching audit results:', error);
            }
        };
        
        fetchAuditResults();
    }, [contractId]);  // Good to have the contractId as a dependency

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
                boxShadow: '0px 4px 8px rgba(0,0,0,0.1)', 
                overflow: 'auto' 
            }}>
                <Typography variant="h4" style={{ 
                    textAlign: 'center', 
                    marginBottom: '20px' 
                }}>
                    Audit Results
                </Typography>
                {auditResults.length === 0 ? (
                    <Typography>No valid audit results found.</Typography>
                ) : (
                    auditResults.map(result => <AuditResultItem key={result.id} result={result} />)
                )}
            </Card>
        </Container>
    );
};

export default AuditResults;
