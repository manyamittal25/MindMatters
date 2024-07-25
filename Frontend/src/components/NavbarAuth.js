import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
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

// Special styling for the "Login" button
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



// Styling for the "MindMatters" text
const Logo = styled.div`
  font-family: 'Pacifico', cursive; /* Artistic font */
  font-size: 24px;
  color: #3a6ea5;
  z-index: 1;
  animation: ${zoom} 3s infinite;
`;

// Navbar component structure
const AuthNavbar = () => {
    const [authStatus, setAuthStatus] = useState('Login | SignUp')
    const backend_url = 'http://127.0.0.1:5000/'
    const checkStatus = () => {
        let token = localStorage.getItem('jwtToken');
        console.log("The token:")
        console.log(token)
        if (token) {
            setAuthStatus('Logout')
        }
        else {
            setAuthStatus('Login | SignUp')
        }

    }

    useEffect(() => {
        checkStatus(); // Run checkStatus when Navbar is loaded
    }, []);

    const handleLogin = () => {
        let token = localStorage.getItem('jwtToken');
        if (token) {
            localStorage.removeItem('jwtToken')
            setAuthStatus('Login | SignUp')
        }
        else {
            window.location.href = `${backend_url}auth/login/google`;
        }


    }

    const LoginButton = ({ to, onClick, children }) => (
        <StyledLink to={to} onClick={onClick}>
            {children}
        </StyledLink>
    );
    return (
        <Nav>
            <NavSvgBackground>
                <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                    <circle cx="50" cy="50" r="40" fill="#3a6ea5" />
                </svg>
            </NavSvgBackground>
            <Logo>MindMatters</Logo>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About Us</NavLink>
                <NavLink to="/services">Services</NavLink>
                <NavLink to="/resources">Resources</NavLink>
                <NavLink to="/self-assessment">Self Assessment</NavLink>
                <LoginButton to="/" onClick={handleLogin}> {authStatus}</LoginButton>
            </div>
        </Nav>
    );
};

export default AuthNavbar;
