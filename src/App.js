// Import necessary modules and components
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import NewAudit from './components/NewAudit';
import AuditResults from './components/AuditResults';

// Main App Component
const App = () => {
  // State to manage user authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // State to manage username (not used yet)
  const [username, setUsername] = useState('');

  // Render the App
  return (
    <Router>
      {/* Navbar displayed at the top, takes isAuthenticated as a prop */}
      <Navbar isAuthenticated={isAuthenticated} />
      
      {/* Define the application routes */}
      <Routes>
      <Route path="/audit-results/:userId/:contractId" element={<AuditResults />} />

        {/* Home page */}
        <Route path="/" element={<Home />} />
        
        {/* Login page, pass setIsAuthenticated function as a prop */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        
        {/* Signup page, pass setIsAuthenticated function as a prop */}
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        
        {/* Dashboard page, pass setIsAuthenticated function as a prop */}
        <Route path="/dashboard" element={<Dashboard setIsAuthenticated={setIsAuthenticated} />} />
        
        {/* New Audit page */}
        <Route path="/new-audit" element={<NewAudit />} />
        
        {/* Audit Results page */}
        <Route path="/audit-results" element={<AuditResults />} />
      </Routes>
    </Router>
  );
};

// Export the App component to be used in index.js
export default App;
