import React from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import './Dashboard.css';
import { FaRegCheckCircle, FaRegSmile, FaRegComments, FaRegHeart, FaRunning, FaBrain, FaUserMd, FaSignOutAlt } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const username = "John Doe"; // Replace with dynamic user data

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('authToken'); // Adjust based on your auth mechanism

    // Redirect to the home page
    navigate('/');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Welcome, {username}</h2>
      </header>

      <div className="hero-section">
        <div className="hero medical-history">
          <h2><FaUserMd /> Medical History</h2>
          <p>Details about the user's medical history...</p>
        </div>
        <div className="hero mental-health-issues">
          <h2><FaBrain /> Mental Health Issues Reported</h2>
          <p>Details about the user's mental health issues...</p>
        </div>
      </div>

      <div className="section">
        <h3><FaRegCheckCircle /> Tests Taken</h3>
        <div className="cards">
          <div className="card">Test 1</div>
          <div className="card">Test 2</div>
          <div className="card">Test 3</div>
        </div>
      </div>

      <div className="section">
        <h3><FaRegSmile /> Meditation Used</h3>
        <div className="cards">
          <div className="card">Meditation 1</div>
          <div className="card">Meditation 2</div>
        </div>
      </div>

      <div className="section chat-section">
        <h3><FaRegComments /> Chat with Us</h3>
        <button className="chat-button">Start Chat</button>
      </div>

      <div className="section welcome-section">
        <h4><FaRegHeart /> There is hope, even when your brain tells you there isn’t!</h4>
        <p>We are here to support you every step of the way. Take a moment to explore the resources available to you, and never hesitate to reach out if you need help.</p>
      </div>

      <footer className="footer">
        <p>&copy; 2024 Mind Matters. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
