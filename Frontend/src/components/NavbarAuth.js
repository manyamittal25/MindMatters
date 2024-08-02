import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Keyframes for zoom animation
const zoom = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
`;

// Keyframes for zoom in and zoom out animation for the background
const zoomInOut = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

// Navigation bar container with background color and padding
const Nav = styled.nav`
  background: #fff8dc; /* Light background color */
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
`;

// Styling for the SVG background
const NavSvgBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.1; /* Make the SVG subtle */
  animation: ${zoomInOut} 10s infinite;
  pointer-events: none; /* Allow clicks to pass through */
`;

// Styling for the navigation links
const NavLink = styled(Link)`
  color: #4a4a4a; /* Dark text color */
  text-decoration: none;
  margin: 0 15px;
  font-size: 18px;
  font-family: 'Roboto', sans-serif; /* Modern font style */
  z-index: 1; /* Ensure links are above the SVG */
  &:hover {
    color: #3a6ea5; /* Hover color */
  }
`;

// Special styling for the "Login" button and profile initials
const StyledLink = styled(Link)`
  background: #fff;
  color: #4a4a4a;
  border: 1px solid #4a4a4a;
  border-radius: 20px;
  padding: 8px 20px;
  text-decoration: none;
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  z-index: 1; /* Ensure button is above the SVG */
  &:hover {
    background: #f0f0f0; /* Hover background color */
    color: #3a6ea5; /* Hover text color */
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #f0f0f0;
  border-radius: 50%;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0 15px;
  text-align: center;
`;

// Styling for the "MindMatters" text
const Logo = styled.div`
  font-family: 'Pacifico', cursive; /* Artistic font */
  font-size: 24px;
  color: #3a6ea5;
  animation: ${zoom} 3s infinite;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
`;

// Function to get initials from the user's name
const getInitials = (name) => {
  if (!name) return '';
  const names = name.split(' ');
  const initials = names.map(n => n[0]).join('');
  return initials.toUpperCase();
};

// Navbar component
const AuthNavbar = () => {
  const [authStatus, setAuthStatus] = useState('Login | SignUp');
  const [userName, setUserName] = useState('');
  const backend_url = 'http://127.0.0.1:5000/';

  // Function to check authentication status
  const checkStatus = () => {
    const token = localStorage.getItem('jwtToken');
    const name = localStorage.getItem('userName');

    // Debugging output
    console.log('Token:', token);
    console.log('Name from localStorage:', name);

    if (token) {
      setAuthStatus('Logout');
      setUserName(name || '');
    } else {
      setAuthStatus('Login | SignUp');
      setUserName('');
    }
  };

  useEffect(() => {
    checkStatus(); // Run checkStatus when Navbar is loaded
  }, []);

  const handleLogin = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userName');
      console.log('Removed token and userName from local storage');
      setAuthStatus('Login | SignUp');
      setUserName('');
    } else {
      // This line will redirect to the backend login page
      window.location.href = `${backend_url}auth/login/google`;
    }
  };

  // Assuming you set userName somewhere in the authentication flow
  const someFunctionThatSetsUserName = (name) => {
    setUserName(name);
  };

  return (
    <Nav>
      <LogoLink to="/">
        <Logo>MindMatters</Logo>
      </LogoLink>
      <NavLink to="/chatbot">Chat</NavLink>
      <NavLink to="/community">Community</NavLink>
      <NavLink to="/blogs">Blogs</NavLink>
      <NavLink to="/meditation">Meditation</NavLink>
      <NavLink to="/self-assessment">Self-Assessment</NavLink>
      <NavSvgBackground>
        {/* SVG Background can be placed here */}
      </NavSvgBackground>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {authStatus === 'Login | SignUp' ? (
          <StyledLink to="#" onClick={handleLogin}>{authStatus}</StyledLink>
        ) : (
          <>
            <Profile>{getInitials(userName)}</Profile>
            <StyledLink to="#" onClick={handleLogin}>Logout</StyledLink>
          </>
        )}
      </div>
    </Nav>
  );
};

export default AuthNavbar;
