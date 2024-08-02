import React from 'react';
import styled from 'styled-components';

const FullWidthContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackgroundContainer = styled.div`
  background-image: url('/images/bg.jpg');
  background-size: cover;
  background-position: center;
  width: 100%;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
`;

const Description = styled.p`
  font-size: 1.5em;
  font-family: 'Georgia', serif;
  color: #ffffff;
  margin-bottom: 40px;
  max-width: 600px;
  line-height: 1.5;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
`;

const Button = styled.button`
  background: #0066cc;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.2em;
  cursor: pointer;
  border-radius: 5px;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);

  &:hover {
    background: #005bb5;
  }
`;

const TakeTest = () => {
  return (
    <FullWidthContainer>
      <BackgroundContainer>
        <Description>
          This questionnaire will help you take the first step towards understanding your mental health.
        </Description>
        <Button>TAKE TEST</Button>
      </BackgroundContainer>
    </FullWidthContainer>
  );
};

export default TakeTest;