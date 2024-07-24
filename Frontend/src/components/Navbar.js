import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaUser, FaHome, FaInfoCircle, FaServicestack, FaBook, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'; // Added more icons

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

const Nav = styled.nav`
  background: #fff8dc;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: visible; /* Ensure the dropdown is not cut off */
`;

const NavSvgBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.1;
  animation: ${zoomInOut} 10s infinite;
  pointer-events: none;
`;

const NavLink = styled(Link)`
  color: #4a4a4a;
  text-decoration: none;
  margin: 0 15px;
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  z-index: 1;
  &:hover {
    color: #3a6ea5;
  }
`;

const LoginButton = styled(Link)`
  background: #fff;
  color: #4a4a4a;
  border: 1px solid #4a4a4a;
  border-radius: 20px;
  padding: 8px 20px;
  text-decoration: none;
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  z-index: 1;
  display: flex;
  align-items: center;
  &:hover {
    background: #f0f0f0;
    color: #3a6ea5;
  }
`;

const Logo = styled.div`
  font-family: 'Pacifico', cursive;
  font-size: 24px;
  color: #3a6ea5;
  z-index: 1;
  animation: ${zoom} 3s infinite;
`;

const UserMenu = styled.div`
  position: relative;
  z-index: 1;
`;

const Username = styled.div`
  color: #4a4a4a;
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    color: #3a6ea5;
  }
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 0;
`;

const DropdownItem = styled(Link)`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const Navbar = ({ username, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Nav>
      <NavSvgBackground>
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <circle cx="50" cy="50" r="40" fill="#3a6ea5" />
        </svg>
      </NavSvgBackground>
      <Logo>MindMatters</Logo>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <NavLink to="/"><FaHome /> Home</NavLink>
        <NavLink to="/about"><FaInfoCircle /> About Us</NavLink>
        <NavLink to="/services"><FaServicestack /> Services</NavLink>
        <NavLink to="/resources"><FaBook /> Resources</NavLink>
        <NavLink to="/get-started"><FaSignInAlt /> Get Started</NavLink>
        {username ? (
          <UserMenu>
            <Username onClick={() => setDropdownOpen(!dropdownOpen)}>
              <FaUser /> {username} ▼
            </Username>
            <DropdownContent show={dropdownOpen}>
              <DropdownItem to="/dashboard">Dashboard</DropdownItem>
              <DropdownItem to="#" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </DropdownItem>
            </DropdownContent>
          </UserMenu>
        ) : (
          <LoginButton to="/login">
            <FaSignInAlt /> Login
          </LoginButton>
        )}
      </div>
    </Nav>
  );
};

export default Navbar;
