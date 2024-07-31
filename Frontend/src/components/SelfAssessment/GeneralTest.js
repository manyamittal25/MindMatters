import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios'
import { useEffect } from "react";
import { BACKEND_URL } from "../../urls";
import { useNavigate, useParams } from "react-router-dom";
const token = localStorage.getItem('jwtToken');
const getQuestions = async (topic) => {

    const response = await axios.get(`${BACKEND_URL}test/?topic=${topic}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};


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
            { answer: "I don't have a role, I'm an outsider", points: 3 },
            { answer: "The quiet one", points: 4 }
        ]
    },
    {
        question: "Are you in control of your Emotions?",
        options: [
            { answer: "Yes, pretty much all of the time", points: 1 },
            { answer: "Not really, no", points: 2 },
            { answer: "I don't really have emotions", points: 3 },
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
function GeneralTest() {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [quesData, setQuesData] = useState([])
    // const [topic, setTopic] = useState('')
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [completionFlag, setCompletionFlag] = useState(false)
    const [currentOptScore, setCurrentOptScore] = useState(0)
    const [responses, setResponses] = useState([])
    const [current_opt_content, setCurrentOptContent] = useState('')
    const [current_question_content, setCurrentQuesContent] = useState('')
    const [currOptIndex, setCurrOptIndex] = useState(0)
    const [resultString, setResultString] = useState('default result')
    const [data, setData] = useState(null);
    const [position1, setPosition1] = useState({
        latitude: null,
        longitude: null,
    });
    const { topic } = useParams()
    useEffect(() => {

        const fetchQuestions = async (topic) => {
            try {
                const quest = await getQuestions(topic);
                setQuesData(quest);
            } catch (error) {
                if (error.response && error.response.data) {
                    setError(error.response.data.error);
                } else {
                    setError(error.message || 'An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions(topic);
    }, []);

    useEffect(() => {
        if (quesData.length > 0) {
            setCurrentQuesContent(quesData[currentQuestion].question);
            setCurrentOptContent(transformedData[currentQuestion].options[currOptIndex].answer);
        }
    }, [currentQuestion, quesData]);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setPosition1({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        } else {
            console.log("Geolocation is not available in your browser.");
        }
    }, []);

    console.log("Location is :", position1);
    const navigate = useNavigate()

    useEffect(() => {
        if (data) {
            fetch(`${BACKEND_URL}test/addResult`, {
                method: 'POST', // Specify the method
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data) // Convert the data object to a JSON string
            })
                .then(response => {
                    if (!response.ok) {
                        // Handle HTTP errors
                        throw new Error('Network response was not ok');
                    }
                    return response.json(); // Parse the JSON response
                })
                .then(responseData => {
                    // Handle the response data
                    console.log('Success:', responseData);
                })
                .catch(error => {
                    // Handle errors
                    console.error('Error:', error);
                });
        }
    }, [data]);

    const handleOptionClick = (curr_index, points, question_content, option_chosen) => {
        setCurrentOptScore(points)
        setCurrentOptContent(option_chosen)
        setCurrentQuesContent(question_content)
        setCurrOptIndex(curr_index)

    };

    const handleNextClick = () => {
        const newResponse = [...responses, {
            question: current_question_content,
            answer: current_opt_content
        }];

        setResponses(newResponse);

        if (currentQuestion === transformedData.length - 1) {
            setCompletionFlag(true);

            const totalScore = score + currentOptScore;
            console.log(totalScore);
            console.log(newResponse);

            let lim = transformedData.length * 4;
            const lim1 = lim / 5;
            const lim2 = lim1 * 2;
            const lim3 = lim1 * 3;
            const lim4 = lim1 * 4;
            let result = 'default'
            if (totalScore >= transformedData.length && totalScore <= lim2) {
                result = "DISORDER FREE: No indication of mental health issues";
            } else if (totalScore >= lim2 && totalScore <= lim3) {
                result = " Mild indication of mental health issues";
            } else if (totalScore >= lim3 && totalScore <= lim4) {
                result = "Moderate indication of mental health issues";
            } else {
                result = " Severe indication of mental health issues";
            }

            const updated_data = {
                'severity': result,
                'topic': topic,
                'responses': responses
            }
            setResultString(result)
            setData(updated_data)

            // fetch(`${BACKEND_URL}test/addResult`, {
            //     method: 'POST', // Specify the method
            //     headers: {
            //         'Content-Type': 'application/json', // Set the content type to JSON
            //         'Authorization': `Bearer ${token}`
            //     },
            //     body: JSON.stringify(data) // Convert the data object to a JSON string
            // })
            //     .then(response => {
            //         if (!response.ok) {
            //             // Handle HTTP errors
            //             throw new Error('Network response was not ok');
            //         }
            //         return response.json(); // Parse the JSON response
            //     })
            //     .then(responseData => {
            //         // Handle the response data
            //         console.log('Success:', responseData);
            //     })
            //     .catch(error => {
            //         // Handle errors
            //         console.error('Error:', error);
            //     });


        } else {
            const newScore = score + currentOptScore;
            console.log(`current score is: ${newScore}`);
            setScore(newScore);

            const newAnswers = [...answers, currentOptScore];
            setAnswers(newAnswers);

            setCurrentQuestion(currentQuestion + 1);
        }
    };


    if (loading) {
        return (
            <QuizContainer>
                <p>Loading...</p>
            </QuizContainer>
        );
    }

    if (error) {
        return (
            <QuizContainer>
                <p>Error: {error}</p>
            </QuizContainer>
        );
    }



    const transformedData = quesData.map(ques => ({
        question: ques.question,
        options: [{ answer: ques.opt_1, points: ques.pnt_1 },
        { answer: ques.opt_2, points: ques.pnt_2 },
        { answer: ques.opt_3, points: ques.pnt_3 },
        { answer: ques.opt_4, points: ques.pnt_4 }
        ]
    }));

    return (
        <QuizContainer>
            <QuizBackground>
                <Quiz>

                    <Question>{transformedData[currentQuestion].question}</Question>
                    {transformedData[currentQuestion].options.map((option, index) => (
                        <Row key={index}>
                            <input
                                type="radio"
                                id={`option${index}`}
                                name="answer"
                                value={option.points}
                                onChange={() => handleOptionClick(index, option.points, transformedData[currentQuestion].question, option.answer)}
                            />
                            <Option htmlFor={`option${index}`}>{option.answer}</Option>
                        </Row>
                    ))}
                    {completionFlag ? (
                        <div className="result">
                            <ResultHeading>Your result:</ResultHeading>
                            <ResultParagraph>{resultString}</ResultParagraph>
                        </div>
                    ) : (
                        <Button onClick={handleNextClick}>Next</Button>
                    )}
                </Quiz>
            </QuizBackground>
        </QuizContainer>
    );
};

export default GeneralTest;