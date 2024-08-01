import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../urls';
import './Chatbox.css';
import ReactMarkdown from "react-markdown"
const ChatBox2 = () => {
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [history]);

    const sendMessage = async () => {
        if (message.trim() === '') return;

        const userMessage = { role: 'User', content: message };
        setHistory([...history, userMessage]);
        setMessage('');
        setLoading(true);

        try {
            const response = await axios.post(`${BACKEND_URL}/chat/chat`, { message });
            const assistantMessage = { role: 'Assistant', content: response.data.message };
            setHistory(prevHistory => [...prevHistory, assistantMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setLoading(false);
        }
    };

    const clearSession = async () => {
        try {
            await axios.post(`${BACKEND_URL}/chat/clear`);
            setHistory([]);
        } catch (error) {
            console.error('Error clearing session:', error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="chatbox">
            <div className="chat-header">
                <h2>AI Assistant</h2>
                <button onClick={clearSession} className="clear-button">Clear Chat</button>
            </div>
            <div className="chat-history">
                {history.map((msg, index) => (
                    <div key={index} className={`message ${msg.role.toLowerCase()}-message`}>
                        <div className="message-content">
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="message assistant-message">
                        <div className="message-content">Thinking...</div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    rows="1"
                />
                <button onClick={sendMessage} disabled={loading || message.trim() === ''}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBox2;