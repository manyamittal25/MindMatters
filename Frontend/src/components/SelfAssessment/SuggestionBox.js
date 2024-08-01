import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { BACKEND_URL } from '../../urls';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SuggestionContainer = styled.div`
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SuggestionHeading = styled.h4`
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

const SuggestionText = styled.div`
  background-color: #ffffff;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  line-height: 1.5; /* Adjust line height for better readability */
`;

const ContactButton = styled.button`
  width: auto;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  color: #ffffff;
  border: none;
  font-size: 0.9rem;
  background-color: #208080;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #106060;
  }
`;

const SuggestionBox = ({ topic }) => {
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [position1, setPosition1] = useState({
    latitude: null,
    longitude: null,
  });

  const navigate = useNavigate(); // Initialize useNavigate

  
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

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}test/getSuggestion?topic=${topic}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          }
        });
        setSuggestions(response.data);
      } catch (error) {
        setError('Failed to load suggestions');
      } finally {
        setLoading(false);
      }
    };

    if (topic) {
      fetchSuggestions();
    }
  }, [topic]);

  const handleContactDoctorsClick = () => {
    navigate('/contact-doctors'); // Navigate to the contact doctors page
  };

  if (loading) {
    return <p>Loading suggestions...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Convert markdown to HTML
  const htmlContent = marked(suggestions);
  // Sanitize the HTML
  const sanitizedHtmlContent = DOMPurify.sanitize(htmlContent);

  return (
    <SuggestionContainer>
      <SuggestionHeading>Suggestions for {topic}</SuggestionHeading>
      <SuggestionText
        dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}
      />
      <ContactButton onClick={handleContactDoctorsClick}>Contact Doctors</ContactButton>
    </SuggestionContainer>
  );
};

export default SuggestionBox;
