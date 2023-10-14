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

/**
 * App Component - The root component for the application.
 * Handles routing and renders different components based on the current path.
 */
const App = () => {
  // State to manage user authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {/* Display the Navbar, using the isAuthenticated state to determine what to show */}
      <Navbar isAuthenticated={isAuthenticated} />

      {/* Routes definition: Map each route to its respective component */}
      <Routes>
        {/* Route for the audit results page, expects a contractId parameter */}
        <Route path="/audit-results/:contractId" element={<AuditResults />} />

        {/* Route for the home page */}
        <Route path="/" element={<Home />} />

        {/* Route for the login page */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        {/* Route for the signup page */}
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />

        {/* Route for the user dashboard page */}
        <Route path="/dashboard" element={<Dashboard setIsAuthenticated={setIsAuthenticated} />} />

        {/* Route for creating a new audit */}
        <Route path="/new-audit" element={<NewAudit />} />
      </Routes>
    </Router>
  );
};

// Export the App component so it can be used in the main entry point (index.js)
export default App;
