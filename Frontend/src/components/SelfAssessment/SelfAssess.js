import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 100px); /* Adjust height to account for navbar and footer */
  background-color: #D4FECC; /* Light green background */
  font-family: sans-serif;
  padding: 20px; /* Add padding to avoid content colliding with edges */

  @media (max-width: 768px) {
    padding: 10px; /* Reduce padding for smaller screens */
  }
`;

const Header = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #e0ffff; /* Lighter blue background */
  border-radius: 10px;
  margin-bottom: 20px; /* Reduce margin-bottom to avoid overlap */
  width: 90%;
  max-width: 800px; /* Optional: Set a max-width for larger screens */

  @media (max-width: 768px) {
    padding: 15px; /* Adjust padding for smaller screens */
    margin-bottom: 15px; /* Adjust margin for smaller screens */
  }
`;

const HeaderTitle = styled.h1`
  color: #208080; /* Teal color */
  font-size: 2.5em; /* Reduced font size */
  margin-bottom: 10px; /* Adjust margin as needed */

  @media (max-width: 768px) {
    font-size: 1.8em; /* Further reduce font size for smaller screens */
  }
`;

const HeaderText = styled.p`
  color: #208080; /* Teal color */
  font-size: 1.2em; /* Reduced font size */
  line-height: 1.5;
  margin-bottom: 10px; /* Add margin between paragraphs */

  @media (max-width: 768px) {
    font-size: 1em; /* Further reduce font size for smaller screens */
  }
`;

const TestButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 600px; /* Optional: Set a max-width for larger screens */

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TestButton = styled.button`
  background-color: #208080; /* Teal color */
  color: white;
  border: none;
  padding: 10px 20px; /* Reduced padding */
  font-size: 1em; /* Reduced font size */
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%; /* Make buttons full width for smaller screens */

  &:hover {
    background-color: #106060; /* Darker teal color */
  }
`;

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
        <TestButton onClick={() => handleButtonClick('/test/depression')}>DEPRESSION TEST</TestButton>
        <TestButton onClick={() => handleButtonClick('/test/postpartum')}>POSTPARTUM DEPRESSION TEST (NEW & EXPECTING PARENTS)</TestButton>
        <TestButton onClick={() => handleButtonClick('/test/anxiety')}>ANXIETY TEST</TestButton>
        <TestButton onClick={() => handleButtonClick('/test/adhd')}>ADHD TEST</TestButton>
        <TestButton onClick={() => handleButtonClick('/test/bipolar')}>BIPOLAR TEST</TestButton>
        <TestButton onClick={() => handleButtonClick('/test/psychosis')}>PSYCHOSIS & SCHIZOPHRENIA TEST</TestButton>
      </TestButtons>
    </Container>
  );
}

export default SelfAssess;
