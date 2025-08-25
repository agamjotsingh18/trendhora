import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// Mock the Context providers that App depends on
jest.mock('../Context/ThemeContext', () => ({
  ThemeProvider: ({ children }) => <div data-testid="theme-provider">{children}</div>,
  useTheme: () => ({ isDarkMode: false, toggleTheme: jest.fn() })
}));

jest.mock('../Context/ShopContext', () => ({
  ShopProvider: ({ children }) => <div data-testid="shop-provider">{children}</div>
}));

jest.mock('../Context/WishlistContext', () => ({
  WishlistProvider: ({ children }) => <div data-testid="wishlist-provider">{children}</div>
}));

jest.mock('../Context/CartContext', () => ({
  CartProvider: ({ children }) => <div data-testid="cart-provider">{children}</div>
}));

jest.mock('../Context/AuthContext', () => ({
  AuthProvider: ({ children }) => <div data-testid="auth-provider">{children}</div>
}));

// Mock Router components
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => <div data-testid="browser-router">{children}</div>,
  Routes: ({ children }) => <div data-testid="routes">{children}</div>,
  Route: ({ children }) => <div data-testid="route">{children}</div>
}));

describe('App Component', () => {
  test('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  test('renders with all context providers', () => {
    const { getByTestId } = render(<App />);
    
    expect(getByTestId('theme-provider')).toBeInTheDocument();
    expect(getByTestId('shop-provider')).toBeInTheDocument();
    expect(getByTestId('wishlist-provider')).toBeInTheDocument();
    expect(getByTestId('cart-provider')).toBeInTheDocument();
    expect(getByTestId('auth-provider')).toBeInTheDocument();
    expect(getByTestId('browser-router')).toBeInTheDocument();
  });

  test('has enhanced app styling', () => {
    render(<App />);
    
    // Check if the App component has the enhanced CSS class
    const appElement = document.querySelector('.App');
    expect(appElement).toBeInTheDocument();
  });
});