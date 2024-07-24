import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for continuous sliding
const SlideAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

// Stats section styling
const StatsSection = styled.section`
  position: relative; /* Ensure it can overlay other content */
  z-index: 1; /* Ensure it's above the hero section */
  background: #f7f9fc;
  padding: 40px 0;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

// Container for stats cards with sliding animation
const StatsContainer = styled.div`
  display: flex;
  white-space: nowrap;
  animation: ${SlideAnimation} 80s linear infinite; /* Adjust speed */
  animation-delay: 0s; /* Starts animation instantly */
  animation-play-state: running; /* Ensures the animation starts immediately */
`;

// Array of vibrant colors for stats cards
const vibrantColors = ['#87CEFA', '#696969', '#ADD8E6', '#66CDAA', '#C0C0C0', '#6495ED', '#708090'];

// Styling for individual stats cards
const StatCard = styled.div`
  background: ${props => vibrantColors[props.index % vibrantColors.length]};
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 0 10px;
  min-width: 250px;
  text-align: center;
  font-size: 20px;
  font-family: 'Roboto', sans-serif; /* Different font style */
  color: #fff;
`;

// Hero section styling
const HeroSection = styled.section`
  width: 100vw;
  height: 120vh;
  background: url('/images/hero-image.jpg') center top/cover no-repeat; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden; /* Ensure the background image doesn't overflow */
`;

// Text container inside hero section with semi-transparent background
const HeroText = styled.div`
  max-width: 600px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 50px; /* Adjust position as needed */
`;

// Keyframes for pulse animation
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

// Keyframes for bounce animation
const BounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

// Container for question spheres with centered alignment
const SphereContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px; /* Adjust margin to position below hero section */
`;

// Styling for individual spheres with unique colors
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
  margin: 0 20px; /* Adjust margin for spacing between spheres */
  color: #000000; /* White font color for better contrast */
  font-family: 'Georgia', serif; /* Different font style */
  font-size: 18px; /* Adjust font size as needed */
`;

// Individual spheres with different animations
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

// Main component rendering hero section, stats slider, and question spheres
const HeroComponent = () => {
  const feelGoodQuestions = [
    'What are you grateful for today?',
    'What achievement are you proud of?',
    'What brings you joy right now?',
    'What are you looking forward to?',
  ];

  const mentalHealthStats = [
    '1 in 5 adults experience mental illness each year.',
    'Depression is the leading cause of disability worldwide.',
    'Early intervention programs for youth can reduce the risk of serious mental health issues by 70%',
    'Mental health services can reduce healthcare costs.',
    'Regular meditation can reduce the symptoms of anxiety by up to 60%.',
    'Over 60% of youth with major depression do not receive any mental health treatment.',
    'Half of all mental health conditions begin by age 14, and 75% by age 24, underscoring the importance of support for young people.',
  ];

  return (
    <>
      <StatsSection>
        <StatsContainer>
          {mentalHealthStats.map((stat, index) => (
            <StatCard key={index} index={index}>{stat}</StatCard>
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
