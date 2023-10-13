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
            <Typography>Severity: {result.severity}</Typography>
            <Typography>Suggestions: {result.suggestions}</Typography>
            <Divider style={{ margin: '10px 0' }} />
        </div>
    );
};

const AuditResults = () => {
    const [auditResults, setAuditResults] = useState([]);
    
    // Use the useParams hook to get both userId and contractId
    const { userId, contractId } = useParams();

    useEffect(() => {
        const fetchAuditResults = async () => {
            try {
                // Update the API endpoint to use both userId and contractId
                const response = await axios.get(`http://localhost:5000/api/auditResults/${userId}/${contractId}`);
                if (response.data.success) {
                    // Filter results to ensure they have essential data
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
    }, [userId, contractId]);  // Add contractId to the dependency list

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
