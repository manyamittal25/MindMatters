import React from "react";
import styled from "styled-components";
import SuggestionBox from "../components/SuggestionBox";
import { useParams } from "react-router-dom";

const SuggestionsContainer = styled.div`
  min-height: 89.8svh;
  width: 97vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SuggestionsBackground = styled.div`
  padding: 5rem;
  background: url("/images/suggestions_border.jpg") no-repeat center center/cover;
  width: 80%;
  height: 80vh;
`;

const Suggestions = styled.div`
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
`;

const GoBackButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  margin-top: 1.2rem;
  color: #ffffff;
  border: none;
  font-size: 1.1rem;
  background-color: #208080;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #106060;
  }
`;




function SuggestionsPage() {
  const { topic } = useParams();

  return (
    <SuggestionsContainer>
      <SuggestionsBackground>
        <Suggestions>
          <h2>Suggestions</h2>
          <SuggestionBox topic={topic} />
          <GoBackButton onClick={() => window.history.back()}>Go Back</GoBackButton>
        </Suggestions>
      </SuggestionsBackground>
    </SuggestionsContainer>
  );
}

export default SuggestionsPage;
