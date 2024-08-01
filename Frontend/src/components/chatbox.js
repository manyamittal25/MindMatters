import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../urls';
//import './ChatBox.css';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(null)

  const sendMessage2 = async () => {
    if (message) {
      fetch(`http://127.0.0.1:5000/chat/chat`, {
        method: 'POST', // Specify the method
        headers: {
          'Content-Type': 'application/json'
        } // Convert the data object to a JSON string
        , body: JSON.stringify({
          'message': message
        })
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
          const userMessage = { role: 'User', content: message };
          const assistantMessage = { role: 'Assistant', content: responseData.message };
          setHistory([...history, userMessage, assistantMessage]);
          setMessage('')
        })
        .catch(error => {
          // Handle errors
          console.error('Error:', error);
        });
    }
  }

  const sendMessage = async () => {
    if (message.trim() === '') return;

    const userMessage = { role: 'User', content: message };
    setHistory([...history, userMessage]);

    try {
      const response = await axios.post('/chat', { message });
      const assistantMessage = { role: 'Assistant', content: response.data.message };
      setHistory([...history, userMessage, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setMessage('');
  };

  const clearSession = async () => {
    try {
      await axios.post(`${BACKEND_URL}chat/clear`);
      setHistory([]);
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  };

  return (
    <div className="chatbox">
      <div className="chat-history">
        {history.map((msg, index) => (
          <div key={index} className={`message ${msg.role.toLowerCase()} - message`}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage2}>Send</button>
        <button onClick={clearSession}>Clear</button>
      </div>
    </div>
  );
};

export default ChatBox;
