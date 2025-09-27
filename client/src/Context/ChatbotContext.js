import { createContext, useContext, useState, useReducer } from 'react';

const ChatbotContext = createContext();

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

// Message types
export const MESSAGE_TYPES = {
  USER: 'user',
  BOT: 'bot',
  SYSTEM: 'system'
};

// Chat actions
const CHAT_ACTIONS = {
  ADD_MESSAGE: 'ADD_MESSAGE',
  CLEAR_MESSAGES: 'CLEAR_MESSAGES',
  SET_TYPING: 'SET_TYPING',
  SET_SUGGESTIONS: 'SET_SUGGESTIONS'
};

// Initial state
const initialState = {
  messages: [
    {
      id: 1,
      type: MESSAGE_TYPES.BOT,
      content: "👋 Hello! I'm Trendhora's assistant. How can I help you today?",
      timestamp: new Date(),
      suggestions: [
        "Track my order",
        "Browse products",
        "Account help",
        "Return policy"
      ]
    }
  ],
  isTyping: false,
  suggestions: [
    "Track my order",
    "Browse products", 
    "Account help",
    "Return policy"
  ],
  isOpen: false
};

// Chat reducer
const chatReducer = (state, action) => {
  switch (action.type) {
    case CHAT_ACTIONS.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        suggestions: action.payload.suggestions || state.suggestions
      };
    
    case CHAT_ACTIONS.CLEAR_MESSAGES:
      return {
        ...state,
        messages: initialState.messages
      };
    
    case CHAT_ACTIONS.SET_TYPING:
      return {
        ...state,
        isTyping: action.payload
      };
    
    case CHAT_ACTIONS.SET_SUGGESTIONS:
      return {
        ...state,
        suggestions: action.payload
      };
    
    default:
      return state;
  }
};

export const ChatbotProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const [isOpen, setIsOpen] = useState(false);

  // Add a new message
  const addMessage = (content, type = MESSAGE_TYPES.USER, suggestions = null) => {
    const message = {
      id: Date.now() + Math.random(),
      type,
      content,
      timestamp: new Date(),
      suggestions
    };
    
    dispatch({ type: CHAT_ACTIONS.ADD_MESSAGE, payload: message });
    return message;
  };

  // Set typing indicator
  const setTyping = (isTyping) => {
    dispatch({ type: CHAT_ACTIONS.SET_TYPING, payload: isTyping });
  };

  // Clear all messages
  const clearMessages = () => {
    dispatch({ type: CHAT_ACTIONS.CLEAR_MESSAGES });
  };

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Close chatbot
  const closeChatbot = () => {
    setIsOpen(false);
  };

  // Open chatbot
  const openChatbot = () => {
    setIsOpen(true);
  };

  const value = {
    messages: state.messages,
    isTyping: state.isTyping,
    suggestions: state.suggestions,
    isOpen,
    addMessage,
    setTyping,
    clearMessages,
    toggleChatbot,
    closeChatbot,
    openChatbot
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
};