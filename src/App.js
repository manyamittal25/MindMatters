import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ResourcesPage from './pages/ResourcesPage';


const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<ResourcesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
