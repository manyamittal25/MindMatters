import React, { useState } from "react";
import styled from "styled-components";

const questions = [
    {
      question: "Describe your current mood.",
      options: [
        { answer: "Pretty happy", points: 1 },
        { answer: "I am worried about some things", points: 2 },
        { answer: "Antisocial", points: 3 },
        { answer: "Terrible, I'm fed up", points: 4 }
      ]
    },
    {
      question: "Do you often feel restless or unable to sit still?",
      options: [
        { answer: "Never", points: 1 },
        { answer: "Sometimes", points: 2 },
        { answer: "Often", points: 3 },
        { answer: "Always", points: 4 }
      ]
    },
    {
      question: "Do you have trouble sleeping or staying asleep?",
      options: [
        { answer: "Never", points: 1 },
        { answer: "Sometimes", points: 2 },
        { answer: "Often", points: 3 },
        { answer: "Always", points: 4 }
      ]
    },
    {
      question: "Do you experience racing thoughts or have difficulty concentrating?",
      options: [
        { answer: "Never", points: 1 },
        { answer: "Sometimes", points: 2 },
        { answer: "Often", points: 3 },
        { answer: "Always", points: 4 }
      ]
    },
    {
      question: "Do you feel tired or lack energy on a regular basis?",
      options: [
        { answer: "Never", points: 1 },
        { answer: "Sometimes", points: 2 },
        { answer: "Often", points: 3 },
        { answer: "Always", points: 4 }
      ]
    },
    {
      question: "Do you feel a sense of hopelessness or despair?",
      options: [
        { answer: "Never", points: 1 },
        { answer: "Sometimes", points: 2 },
        { answer: "Often", points: 3 },
        { answer: "Always", points: 4 }
      ]
    },
    {
      question: "Choose a Quote",
      options: [
        { answer: "Always look on the bright side of life", points: 1 },
        { answer: "Worrying is as productive chewing gum", points: 2 },
        { answer: "Life's a bitch, then you die", points: 3 },
        { answer: "Hard times reveal true friends", points: 4 }
      ]
    },
    {
      question: "What's your role in your family?",
      options: [
        { answer: "The fun, sociable one", points: 1 },
        { answer: "The sensible one", points: 2 },
        { answer: "I don't have a role, I'm an outsider", points: 3 } ,
        { answer: "The quiet one", points: 4 }
      ]  
    },
    {
      question: "Are you in control of your Emotions?",
      options: [
        { answer: "Yes, pretty much all of the time", points: 1 },
        { answer: "Not really, no", points: 2 },
        { answer: "I don't really have emotions", points: 3 } ,
        { answer: "Yes, I'd say so", points: 4 }
      ]  
    },
    {
      question: "Do you find yourself engaging in compulsive or addictive behaviors like substance use, gambling, or excessive spending?",
      options: [
        { answer: "Never", points: 1 },
        { answer: "Sometimes", points: 2 },
        { answer: "Often", points: 3 },
        { answer: "Always", points: 4 }
      ]
    }
  ];

const QuizContainer = styled.div`
  min-height: 89.8svh;
  width: 97vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const QuizBackground = styled.div`
  padding: 5rem;
  background: url("/images/quiz_border.jpg") no-repeat center center/cover;
  width: 80%;
  height: 80vh; /* Increased height to 90% of the viewport height */
`;



const Quiz = styled.div`
  background-color: #ffffff; /* White color */
  padding: 2rem;
  border-radius: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  margin-top: 1.2rem;
  color: #ffffff; /* White text */
  border: none;
  font-size: 1.1rem;
  background-color: #208080; /* Teal color */
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #106060; /* Darker teal color */
  }
`;

const Question = styled.h3`
  margin-bottom: 1.2rem;
  font-size: 1.3rem;
  font-weight: 500;
`;

const Option = styled.label`
  display: block;
  font-size: 1rem;
  padding: 0.5rem;
  cursor: pointer;
`;

const Row = styled.div`
  width: 100%;
  margin: 0.64rem 0;
  padding: 10px;
  color: #000000; /* Black color */
  background-color: #e0ffff; /* Light cyan color */
  border-radius: 20px;
  cursor: pointer;

  input {
    accent-color: #208080; /* Teal color */
    margin-right: 0.5rem;
  }

  label {
    font-size: 1rem;
  }
`;

const ResultHeading = styled.h3`
  font-size: 1.4rem;
  text-transform: capitalize;
`;

const ResultParagraph = styled.p`
  font-size: 1.14rem;
  color: #008000; /* Green color */
`;

const DepressionTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState("");

  const handleOptionClick = (points) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = points;
    setAnswers(newAnswers);
  };

  const handleNextClick = () => {
    if (currentQuestion === questions.length - 1) {
      let totalScore = answers.reduce((acc, cur) => acc + cur, 0);

      if (totalScore >= 10 && totalScore <= 16) {
        setScore("DISORDER FREE: No indication of mental health issues");
      } else if (totalScore >= 17 && totalScore <= 24) {
        setScore("ANXIETY: Mild indication of mental health issues");
      } else if (totalScore >= 25 && totalScore <= 32) {
        setScore("Moderate indication of mental health issues");
      } else {
        setScore("DEPRESSION: Severe indication of mental health issues");
      }
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <QuizContainer>
      <QuizBackground>
        <Quiz>
          <Question>{questions[currentQuestion].question}</Question>
          {questions[currentQuestion].options.map((option, index) => (
            <Row key={index}>
              <input
                type="radio"
                id={`option${index}`}
                name="answer"
                value={option.points}
                onChange={() => handleOptionClick(option.points)}
              />
              <Option htmlFor={`option${index}`}>{option.answer}</Option>
            </Row>
          ))}
          {score ? (
            <div className="result">
              <ResultHeading>Your result:</ResultHeading>
              <ResultParagraph>{score}</ResultParagraph>
            </div>
          ) : (
            <Button onClick={handleNextClick}>Next</Button>
          )}
        </Quiz>
      </QuizBackground>
    </QuizContainer>
  );
};

export default DepressionTest;
