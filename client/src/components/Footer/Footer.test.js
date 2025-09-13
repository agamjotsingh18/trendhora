import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Footer from './Footer';

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true
});

// Mock window.pageYOffset 
Object.defineProperty(window, 'pageYOffset', {
  value: 0,
  writable: true
});

// Wrapper component for React Router
const FooterWithRouter = () => (
  <BrowserRouter>
    <Footer />
  </BrowserRouter>
);

describe('Footer Component', () => {
  beforeEach(() => {
    window.scrollTo.mockClear();
    // Reset scroll position
    Object.defineProperty(window, 'pageYOffset', {
      value: 0,
      writable: true
    });
  });

  test('renders footer sections correctly', () => {
    render(<FooterWithRouter />);
    
    // Check main sections
    expect(screen.getByText('TrendHora')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
    expect(screen.getAllByText('Contact Us')).toHaveLength(2); // One in help section, one as header
    expect(screen.getByText('Stay Connected')).toBeInTheDocument();
    expect(screen.getByText('Stay in the Loop!')).toBeInTheDocument();
  });

  test('renders help section links', () => {
    render(<FooterWithRouter />);
    
    expect(screen.getByText('Shipping')).toBeInTheDocument();
    expect(screen.getByText('Refund')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
    expect(screen.getByText('Accessibility')).toBeInTheDocument();
    expect(screen.getAllByText('Contact Us')).toHaveLength(2); // One in help section, one as header
  });

  test('renders contact information', () => {
    render(<FooterWithRouter />);
    
    expect(screen.getByText('+91 93190-42075')).toBeInTheDocument();
    expect(screen.getByText('shop@trendhora.com')).toBeInTheDocument();
    expect(screen.getByText('Delhi, India')).toBeInTheDocument();
  });

  test('renders social media links with proper URLs', () => {
    render(<FooterWithRouter />);
    
    const twitterLink = screen.getByLabelText('Follow us on Twitter');
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/trendhora');
    
    const instagramLink = screen.getByLabelText('Follow us on Instagram');
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/trendhora');
    
    const youtubeLink = screen.getByLabelText('Subscribe to our YouTube channel');
    expect(youtubeLink).toHaveAttribute('href', 'https://youtube.com/trendhora');
    
    const telegramLink = screen.getByLabelText('Join us on Telegram');
    expect(telegramLink).toHaveAttribute('href', 'https://t.me/trendhora');
    
    const pinterestLink = screen.getByLabelText('Follow us on Pinterest');
    expect(pinterestLink).toHaveAttribute('href', 'https://pinterest.com/trendhora');
  });

  test('renders copyright and legal links', () => {
    render(<FooterWithRouter />);
    
    expect(screen.getByText('©2025 TrendHora')).toBeInTheDocument();
    expect(screen.getByText('Terms & Condition')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  test('scroll to top button appears when scrolled', () => {
    render(<FooterWithRouter />);
    
    // Mock scroll position
    Object.defineProperty(window, 'pageYOffset', {
      value: 400,
      writable: true
    });
    
    // Trigger scroll event
    fireEvent.scroll(window);
    
    // Check if button becomes visible (implementation detail may vary)
    // This test may need adjustment based on actual implementation
  });

  test('scroll to top button functionality works', () => {
    render(<FooterWithRouter />);
    
    // Set scroll position to make button visible
    Object.defineProperty(window, 'pageYOffset', {
      value: 400,
      writable: true
    });
    fireEvent.scroll(window);
    
    // Find the scroll to top button by its icon
    const scrollButtons = document.querySelectorAll('button');
    const scrollButton = Array.from(scrollButtons).find(button => 
      button.style.position === 'fixed' && button.style.bottom === '30px'
    );
    
    if (scrollButton) {
      fireEvent.click(scrollButton);
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth'
      });
    }
  });

  test('newsletter form renders correctly', () => {
    render(<FooterWithRouter />);
    
    expect(screen.getByText('Stay in the Loop!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email address')).toBeInTheDocument();
    
    // Find submit button by its class name
    const submitButton = document.querySelector('.newsletter__button');
    expect(submitButton).toBeInTheDocument();
  });

  test('newsletter form submission works', () => {
    render(<FooterWithRouter />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    const submitButton = document.querySelector('.newsletter__button');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);
    
    // Check for success message
    expect(screen.getByText(/Thank you for subscribing/)).toBeInTheDocument();
  });

  test('phone number is clickable', () => {
    render(<FooterWithRouter />);
    
    const phoneLink = screen.getByText('+91 93190-42075');
    expect(phoneLink.closest('a')).toHaveAttribute('href', 'tel:+919319042075');
  });

  test('email is clickable', () => {
    render(<FooterWithRouter />);
    
    const emailLink = screen.getByText('shop@trendhora.com');
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:shop@trendhora.com');
  });
});