import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Chatbot from '../Chatbot/Chatbot';
import { ChatbotProvider } from '../../Context/ChatbotContext';
import { ThemeProvider } from '../../Context/ThemeContext';

// Mock ChatbotService
jest.mock('../Chatbot/ChatbotService', () => ({
  processMessage: jest.fn().mockResolvedValue({
    content: 'Test response',
    suggestions: ['Test suggestion']
  })
}));

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        <ChatbotProvider>
          {component}
        </ChatbotProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Chatbot Component', () => {
  test('should render floating action button when closed', () => {
    renderWithProviders(<Chatbot />);
    
    const fab = screen.getByRole('button');
    expect(fab).toBeInTheDocument();
    expect(fab).toHaveClass('chatbot-fab');
  });

  test('should open chatbot when FAB is clicked', () => {
    renderWithProviders(<Chatbot />);
    
    const fab = screen.getByRole('button');
    fireEvent.click(fab);
    
    expect(screen.getByText('Trendhora Assistant')).toBeInTheDocument();
  });

  test('should display initial welcome message', () => {
    renderWithProviders(<Chatbot />);
    
    // Open chatbot
    const fab = screen.getByRole('button');
    fireEvent.click(fab);
    
    expect(screen.getByText(/Hello! I'm Trendhora's assistant/)).toBeInTheDocument();
  });

  test('should send message when send button is clicked', async () => {
    renderWithProviders(<Chatbot />);
    
    // Open chatbot
    const fab = screen.getByRole('button');
    fireEvent.click(fab);
    
    // Type message
    const textarea = screen.getByPlaceholderText('Type your message...');
    fireEvent.change(textarea, { target: { value: 'Hello' } });
    
    // Click send
    const sendButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(sendButton);
    
    // Check if message appears
    await waitFor(() => {
      expect(screen.getByText('Hello')).toBeInTheDocument();
    });
  });

  test('should be responsive on mobile devices', () => {
    // Mock mobile viewport
    global.innerWidth = 375;
    global.dispatchEvent(new Event('resize'));
    
    renderWithProviders(<Chatbot />);
    
    const fab = screen.getByRole('button');
    fireEvent.click(fab);
    
    const chatbotContainer = document.querySelector('.chatbot-container');
    expect(chatbotContainer).toBeInTheDocument();
  });

  test('should handle theme changes correctly', () => {
    renderWithProviders(<Chatbot />);
    
    const fab = screen.getByRole('button');
    fireEvent.click(fab);
    
    const chatbotContainer = document.querySelector('.chatbot-container');
    expect(chatbotContainer).toHaveClass('light');
  });

  test('should display suggestions and handle clicks', async () => {
    renderWithProviders(<Chatbot />);
    
    const fab = screen.getByRole('button');
    fireEvent.click(fab);
    
    // Check for initial suggestions
    const trackOrderBtn = screen.getByText('Track my order');
    expect(trackOrderBtn).toBeInTheDocument();
    
    // Click suggestion
    fireEvent.click(trackOrderBtn);
    
    await waitFor(() => {
      expect(screen.getByText('Track my order')).toBeInTheDocument();
    });
  });
});

// Integration test with FAQ functionality
describe('Chatbot FAQ Integration', () => {
  test('should handle order tracking query', async () => {
    const mockProcessMessage = require('../Chatbot/ChatbotService').processMessage;
    mockProcessMessage.mockResolvedValueOnce({
      content: 'To track your order: Go to your account page',
      suggestions: ['Find my order number', 'Contact support']
    });

    renderWithProviders(<Chatbot />);
    
    const fab = screen.getByRole('button');
    fireEvent.click(fab);
    
    const textarea = screen.getByPlaceholderText('Type your message...');
    fireEvent.change(textarea, { target: { value: 'track my order' } });
    
    const sendButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(mockProcessMessage).toHaveBeenCalledWith('track my order');
    });
  });

  test('should handle return policy query', async () => {
    const mockProcessMessage = require('../Chatbot/ChatbotService').processMessage;
    mockProcessMessage.mockResolvedValueOnce({
      content: '30-day return window from delivery',
      suggestions: ['Start a return', 'Refund status']
    });

    renderWithProviders(<Chatbot />);
    
    const fab = screen.getByRole('button');
    fireEvent.click(fab);
    
    const textarea = screen.getByPlaceholderText('Type your message...');
    fireEvent.change(textarea, { target: { value: 'return policy' } });
    
    const sendButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(mockProcessMessage).toHaveBeenCalledWith('return policy');
    });
  });
});

// Accessibility tests
describe('Chatbot Accessibility', () => {
  test('should have proper ARIA labels and roles', () => {
    renderWithProviders(<Chatbot />);
    
    const fab = screen.getByRole('button');
    fireEvent.click(fab);
    
    // Check for proper roles and labels
    const textarea = screen.getByPlaceholderText('Type your message...');
    expect(textarea).toHaveAttribute('placeholder', 'Type your message...');
    
    const sendButton = screen.getByRole('button', { name: /send/i });
    expect(sendButton).toBeInTheDocument();
  });

  test('should be keyboard navigable', () => {
    renderWithProviders(<Chatbot />);
    
    const fab = screen.getByRole('button');
    fireEvent.click(fab);
    
    const textarea = screen.getByPlaceholderText('Type your message...');
    
    // Test keyboard navigation
    fireEvent.keyDown(textarea, { key: 'Tab' });
    fireEvent.keyDown(textarea, { key: 'Enter' });
    
    expect(textarea).toBeInTheDocument();
  });
});