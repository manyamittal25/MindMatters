// src/components/SuggestionBoxWithTopic.js
import React from 'react';
import { useParams } from 'react-router-dom';
import SuggestionBox from './SuggestionBox';

function SuggestionBoxWithTopic() {
  const { topic } = useParams(); // Get the topic from the URL
  return <SuggestionBox topic={topic} />;
}

export default SuggestionBoxWithTopic;
