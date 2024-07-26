// src/components/WelcomeSectionAndFooter.js

import React from 'react';
import styled from 'styled-components';
import { FaRegHeart } from 'react-icons/fa';

// Styled Components
const WelcomeContainer = styled.div`
  text-align: center;
  margin-top: 30px;
  padding: 25px;
  background-color: #FAD7A0;

`;

const FooterContainer = styled.footer`
  padding: 15px 0;
  text-align: center;
  background-color: #5D6D7E;
  color: #fff;
`;

const Footer = () => {
  return (
    <>
      <WelcomeContainer>
        <h4><FaRegHeart /> There is hope, even when your brain tells you there isn’t!</h4>
        <p>We are here to support you every step of the way. Take a moment to explore the resources available to you, and never hesitate to reach out if you need help.</p>
      </WelcomeContainer>
      <FooterContainer>
        <p>&copy; 2024 Mind Matters. All rights reserved.</p>
      </FooterContainer>
    </>
  );
};

export default Footer;
