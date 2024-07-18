import React from 'react';
import styled from 'styled-components';
import Hero from '../components/Hero';
import TakeTest from '../components/TakeTest';

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Home = () => {
  return (
    <>
      <Hero />
      <ContentContainer>
        <h2>Check Your Mental Health Score</h2>
        <TakeTest />
      </ContentContainer>
    </>
  );
};

export default Home;
