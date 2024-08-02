import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const StatsSection = styled.section`
  position: relative;
  z-index: 1;
  background: #f7f9fc;
  padding: 40px 0;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const slideLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  white-space: nowrap;
  animation: ${slideLeft} 30s linear infinite;
  transition: animation 0.5s;

  &.paused {
    animation-play-state: paused;
  }
`;

const vibrantColors = ['#87CEFA', '#40B5AD', '#696969', '#66CDAA', '#C0C0C0', '#6495ED', '#708090'];

const StatCard = styled.div`
  background: ${props => vibrantColors[props.index % vibrantColors.length]};
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 0 30px;
  flex-grow: 1;
  text-align: center;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  color: #fff;
  @media (max-width: 768px) {
    flex-basis: 100%; /* Make the card full width on smaller screens */
  }
  position: relative; // Ensure proper positioning for hover effects
  z-index: 1; // Adjust z-index if necessary

  &:hover {
    transform: scale(1.1);
    /* Add other hover styles if needed */
  }
`;

const HeroSection = styled.section`
  width: 100vw;
  height: 120vh; /* Adjust height as needed */
  background: url('/images/hero-image.jpg') center top/cover no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden; /* Ensure no extra scrollbars */
  margin: 0; /* Ensure no unintended margin */
  padding: 0; /* Ensure no unintended padding */
`;


const HeroText = styled.div`
  max-width: 600px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 50px;
`;

const PulseAnimation = keyframes`
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

const BounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const SphereContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-top: 135px;
  }
`;

const Sphere = styled.div`
  width: 200px;
  height: 200px;
  background-color: #FFF8DC;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  margin: 0 20px;
  color: #000000;
  font-family: 'Georgia', serif;
  font-size: 18px;
  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    margin: 20px;
  }
`;

const Sphere1 = styled(Sphere)`
  animation: ${PulseAnimation} 5s ease-in-out infinite;
`;

const Sphere2 = styled(Sphere)`
  animation: ${BounceAnimation} 3s ease-in-out infinite;
`;

const Sphere3 = styled(Sphere)`
  animation: ${PulseAnimation} 5s ease-in-out infinite;
`;

const Sphere4 = styled(Sphere)`
  animation: ${BounceAnimation} 3s ease-in-out infinite;
`;

const HeroComponent = () => {
  const feelGoodQuestions = [
    'What are you grateful for today?',
    'What achievement are you proud of?',
    'What brings you joy right now?',
    'What are you looking forward to?',
  ];
  const statsContainerRef = useRef(null);
  const mentalHealthStats = [
    '1 in 5 adults experience mental illness each year.',
    'Depression is the leading cause of disability worldwide.',
    'Early intervention programs for youth can reduce the risk of serious mental health issues by 70%.',
    'Mental health services can reduce healthcare costs.',
    'Regular meditation can reduce the symptoms of anxiety by up to 60%.',
    'Over 60% of youth with major depression do not receive any mental health treatment.',
    'Half of all mental health conditions begin by age 14, and 75% by age 24, underscoring the importance of support for young people.',
  ];

  const handleMouseEnter = () => {
    if (statsContainerRef.current) {
      statsContainerRef.current.classList.add('paused');
    }
  };

  const handleMouseLeave = () => {
    if (statsContainerRef.current) {
      statsContainerRef.current.classList.remove('paused');
    }
  };

  return (
    <>
      <StatsSection>
        <StatsContainer ref={statsContainerRef}>
          {[...mentalHealthStats, ...mentalHealthStats].map((stat, index) => (
            <StatCard
              key={index}
              index={index}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {stat}
            </StatCard>
          ))}
        </StatsContainer>
      </StatsSection>
      <HeroSection>
        <HeroText>
          <h1>Your Path To Mental Well-being Starts Here</h1>
          <p>Empowering you to take charge of your happiness!</p>
        </HeroText>
        <SphereContainer>
          {feelGoodQuestions.map((question, index) => {
            const SphereComponent = [Sphere1, Sphere2, Sphere3, Sphere4][index % 4];
            return (
              <SphereComponent key={index} index={index}>
                <p>{question}</p>
              </SphereComponent>
            );
          })}
        </SphereContainer>
      </HeroSection>
    </>
  );
};
export default HeroComponent;