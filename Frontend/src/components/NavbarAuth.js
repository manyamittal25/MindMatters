import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const zoom = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
`;

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

const NavLink = styled(Link)`
  color: #4a4a4a; /* Dark text color */
  text-decoration: none;
  font-size: 19px; /* Reduced font size */
  font-family: 'Roboto', sans-serif; /* Modern font style */
  z-index: 1; /* Ensure links are above the SVG */
  margin: 0 20px; /* Reduced margin */
  &:hover {
    color: #3a6ea5; /* Hover color */
  }

  @media (max-width: 768px) {
    font-size: 12px; /* Further reduce font size for smaller screens */
    margin: 0 5px; /* Further reduce margin for smaller screens */
  }
`;

const NavLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const StyledLink = styled(Link)`
  background: #fff;
  color: #4a4a4a;
  border: 1px solid #4a4a4a;
  border-radius: 20px;
  padding: 5px 10px; /* Adjusted padding */
  text-decoration: none;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  z-index: 1; /* Ensure button is above the SVG */
  &:hover {
    background: #f0f0f0; /* Hover background color */
    color: #3a6ea5; /* Hover text color */
  }

  @media (max-width: 768px) {
    padding: 5px 8px; /* Adjust padding for smaller screens */
    font-size: 14px; /* Adjust font size for smaller screens */
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px; /* Adjusted size */
  height: 35px; /* Adjusted size */
  background-color: #f0f0f0;
  border-radius: 50%;
  font-size: 14px; /* Adjusted font size */
  font-weight: bold;
  color: #333;
  margin: 0 8px; /* Adjusted margin */
  text-align: center;

  @media (max-width: 768px) {
    width: 30px; /* Further adjust size for smaller screens */
    height: 30px; /* Further adjust size for smaller screens */
    font-size: 12px; /* Further adjust font size for smaller screens */
    margin: 0 5px; /* Further adjust margin for smaller screens */
  }
`;

const Logo = styled.div`
  font-family: 'Pacifico', cursive; /* Artistic font */
  font-size: 22px;
  color: #3a6ea5;
  animation: ${zoom} 3s infinite;

  @media (max-width: 768px) {
    font-size: 18px; /* Adjust font size for smaller screens */
  }
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

const NavbarContainer = styled.div`
  background: #FFFFE0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px; /* Increased padding for height */
  height: 80px; /* Set height for the navbar */
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: row; /* Keep elements in one line */
    padding: 0 20px; /* Adjust padding for smaller screens */
    height: auto; /* Adjust height for smaller screens */
  }
`;

// Navbar component
const AuthNavbar = () => {
  const [authStatus, setAuthStatus] = useState('Login | SignUp');
  const [userName, setUserName] = useState('');
  const backend_url = 'http://127.0.0.1:5000/';

  // Function to check authentication status
  const checkStatus = () => {
    const token = localStorage.getItem('jwtToken');
    const name = localStorage.getItem('userName');

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

  return (
    <NavbarContainer>
      <LogoLink to="/">
        <Logo>MindMatters</Logo>
      </LogoLink>
      <NavLinksContainer>
        <NavLink to="/chatbot">Chat</NavLink>
        <NavLink to="/community">Community</NavLink>
        <NavLink to="/blogs">Blogs</NavLink>
        <NavLink to="/meditation">Meditation</NavLink>
        <NavLink to="/self-assessment">Self-Assessment</NavLink>
      </NavLinksContainer>
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
    </NavbarContainer>
  );
};
export default AuthNavbar;
