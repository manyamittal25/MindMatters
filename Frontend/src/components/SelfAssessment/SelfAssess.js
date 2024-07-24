import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f8ff; /* Light blue background */
  font-family: sans-serif;
`;

const Header = styled.div`
  text-align: center;
  padding: 40px; /* Increased padding */
  background-color: #e0ffff; /* Lighter blue background */
  border-radius: 10px;
  margin-bottom: 40px; /* Increased margin-bottom to shift the header box upwards */
  width: 90%; /* Optional: Set a specific width for larger header */
`;

const HeaderTitle = styled.h1`
  color: #208080; /* Teal color */
  font-size: 4em; /* Increased font size */
  margin-bottom: 15px; /* Adjust margin as needed */
`;

const HeaderText = styled.p`
  color: #208080; /* Teal color */
  font-size: 1.5em; /* Increased font size */
  line-height: 1.6; /* Adjust line height for better readability */
`;

const TestButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TestButton = styled.button`
  background-color: #208080; /* Teal color */
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.2em;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #106060; /* Darker teal color */
  }
`;

// Component
function SelfAssess() {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>Take a Mental Health Test</HeaderTitle>
        <HeaderText>Online screening is one of the quickest and easiest ways to determine whether you are experiencing symptoms of a mental health condition.</HeaderText>
        <HeaderText>Mental health conditions, such as depression or anxiety, are real, common and treatable. And recovery is possible.</HeaderText>
      </Header>
      <TestButtons>
        <TestButton onClick={() => handleButtonClick('/depressiontest')}>DEPRESSION TEST</TestButton>
        <TestButton onClick={() => handleButtonClick('/postpartumtest')}>POSTPARTUM DEPRESSION TEST (NEW & EXPECTING PARENTS)</TestButton>
        <TestButton onClick={() => handleButtonClick('/anxietytest')}>ANXIETY TEST</TestButton>
        <TestButton onClick={() => handleButtonClick('/adhdtest')}>ADHD TEST</TestButton>
        <TestButton onClick={() => handleButtonClick('/bipolartest')}>BIPOLAR TEST</TestButton>
        <TestButton onClick={() => handleButtonClick('/psychosisstest')}>PSYCHOSIS & SCHIZOPHRENIA TEST</TestButton>
      </TestButtons>
    </Container>
  );
}

export default SelfAssess;
