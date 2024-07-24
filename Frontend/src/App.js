import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ResourcesPage from './pages/ResourcesPage';
import MeditationHelper from './components/MeditationHelper';
import MeditationTimer from './components/MeditationTimer';
import SelfAssess from './components/SelfAssessment/SelfAssess';
import DepressionTest from './components/SelfAssessment/DepressionTest'; 

const AppContent = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/meditation' && location.pathname !== '/meditation-timer';

  return (
    <>
      <GlobalStyle />
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/self-assessment" element={<SelfAssess />} />
        <Route path="/meditation" element={<MeditationHelper />} />
        <Route path="/meditation-timer" element={<MeditationTimer />} />
        <Route path="/depressiontest" element={<DepressionTest />} /> 
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
