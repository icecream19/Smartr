import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import NewAudit from './components/NewAudit';
import AuditResults from './components/AuditResults';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard" element={<Dashboard setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/new-audit" element={<NewAudit />} />
        <Route path="/audit-results" element={<AuditResults />} />
      </Routes>
    </Router>
  );
};

export default App;
