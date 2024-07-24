import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ResourcesPage from './pages/ResourcesPage';
import MeditationHelper from './components/MeditationHelper';
import MeditationTimer from './components/MeditationTimer';
import Dashboard from './pages/Dashboard';

const AppContent = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/meditation' && location.pathname !== '/meditation-timer';
  const [username, setUsername] = useState("John Doe"); // Replace with dynamic user data

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Adjust based on your auth mechanism
    setUsername(null); // Clear the username on logout
  };

  return (
    <>
      <GlobalStyle />
      {showNavbar && <Navbar username={username} onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/meditation" element={<MeditationHelper />} />
        <Route path="/meditation-timer" element={<MeditationTimer />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
