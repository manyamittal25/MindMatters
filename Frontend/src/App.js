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
import AuthNavbar from './components/NavbarAuth';
import AuthCallback from './components/AuthCallback';
import Dashboard from './components/Dashboard';
import BlogList from './components/Blogs/BlogList';
import BlogDetails from './components/Blogs/BlogDetails';
import CreateBlog from './components/Blogs/CreateBlog';
import GeneralTest from './components/SelfAssessment/GeneralTest';

const AppContent = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/meditation' && location.pathname !== '/meditation-timer';

  return (
    <>
      <GlobalStyle />
      {showNavbar && <AuthNavbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/self-assessment" element={<SelfAssess />} />
        <Route path="/meditation" element={<MeditationHelper />} />
        <Route path="/meditation-timer" element={<MeditationTimer />} />
        <Route path="/depressiontest" element={<GeneralTest />} />
        <Route path='/authCallback' element={<AuthCallback />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/create-blog" element={<CreateBlog />} />
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
