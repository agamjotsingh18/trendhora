import React, { useState, useRef, useEffect } from 'react';
import { useChatbot, MESSAGE_TYPES } from '../../Context/ChatbotContext';
import { useTheme } from '../../Context/ThemeContext';
import ChatbotService from './ChatbotService';
import './Chatbot.css';

const Chatbot = () => {
  const { 
    messages, 
    isTyping, 
    suggestions, 
    isOpen, 
    addMessage, 
    setTyping, 
    toggleChatbot, 
    closeChatbot 
  } = useChatbot();
  const { isDarkMode } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async (messageText = inputValue.trim()) => {
    if (!messageText) return;

    // Add user message
    addMessage(messageText, MESSAGE_TYPES.USER);
    setInputValue('');
    setTyping(true);

    try {
      // Get bot response
      const response = await ChatbotService.processMessage(messageText);
      
      setTimeout(() => {
        setTyping(false);
        addMessage(response.content, MESSAGE_TYPES.BOT, response.suggestions);
      }, 800); // Simulate typing delay
    } catch (error) {
      setTimeout(() => {
        setTyping(false);
        addMessage(
          "Sorry, I'm having trouble right now. Please try again later or contact our support team.",
          MESSAGE_TYPES.BOT
        );
      }, 800);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const formatMessageContent = (content) => {
    // Simple formatting for links and bold text
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isOpen) {
    return (
      <div className="chatbot-fab" onClick={toggleChatbot}>
        <div className="chatbot-fab-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.418 16.97 20 12 20C10.89 20 9.84 19.79 8.87 19.42L3 21L4.58 15.13C4.21 14.16 4 13.11 4 12C4 7.582 8.03 4 12 4C16.97 4 21 7.582 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="chatbot-notification">
          💬
        </div>
      </div>
    );
  }

  return (
    <div className={`chatbot-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className={`chatbot-window ${isMinimized ? 'minimized' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">
              <span>🛍️</span>
            </div>
            <div className="chatbot-header-text">
              <h4>Trendhora Assistant</h4>
              <span className="chatbot-status">Online</span>
            </div>
          </div>
          <div className="chatbot-header-actions">
            <button 
              className="chatbot-action-btn minimize-btn"
              onClick={() => setIsMinimized(!isMinimized)}
              title={isMinimized ? "Expand" : "Minimize"}
            >
              {isMinimized ? '▲' : '▼'}
            </button>
            <button 
              className="chatbot-action-btn close-btn"
              onClick={closeChatbot}
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
              <div className="message-content">
                <div 
                  className="message-text"
                  dangerouslySetInnerHTML={{ 
                    __html: formatMessageContent(message.content) 
                  }}
                />
                <span className="message-time">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {suggestions && suggestions.length > 0 && !isTyping && (
          <div className="chatbot-suggestions">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="suggestion-btn"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="chatbot-input">
          <div className="input-container">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              rows={1}
              disabled={isTyping}
            />
            <button
              className="send-btn"
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;