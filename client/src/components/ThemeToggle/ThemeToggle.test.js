import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';
import { ThemeContext } from '../../Context/ThemeContext';

// Mock theme context
const mockToggleTheme = jest.fn();

const renderWithThemeContext = (isDarkMode = false) => {
  const mockContextValue = {
    isDarkMode,
    toggleTheme: mockToggleTheme,
  };

  return render(
    <ThemeContext.Provider value={mockContextValue}>
      <ThemeToggle />
    </ThemeContext.Provider>
  );
};

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    mockToggleTheme.mockClear();
  });

  test('renders light mode icon when in dark mode', () => {
    renderWithThemeContext(true);
    expect(screen.getByTestId('LightModeIcon')).toBeInTheDocument();
  });

  test('renders dark mode icon when in light mode', () => {
    renderWithThemeContext(false);
    expect(screen.getByTestId('DarkModeIcon')).toBeInTheDocument();
  });

  test('shows correct tooltip text for dark mode', () => {
    renderWithThemeContext(true);
    const button = screen.getByRole('button');
    fireEvent.mouseOver(button);
    expect(screen.getByText('Switch to light mode')).toBeInTheDocument();
  });

  test('shows correct tooltip text for light mode', () => {
    renderWithThemeContext(false);
    const button = screen.getByRole('button');
    fireEvent.mouseOver(button);
    expect(screen.getByText('Switch to dark mode')).toBeInTheDocument();
  });

  test('calls toggleTheme when clicked', () => {
    renderWithThemeContext(false);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  test('has proper styling classes and attributes', () => {
    renderWithThemeContext(false);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    
    // Check if the button has the enhanced Material-UI styling
    expect(button).toHaveAttribute('type', 'button');
  });

  test('theme toggle functionality works correctly', () => {
    // Test initial state
    const { rerender } = renderWithThemeContext(false);
    expect(screen.getByTestId('DarkModeIcon')).toBeInTheDocument();
    
    // Simulate theme change
    const mockContextValue = {
      isDarkMode: true,
      toggleTheme: mockToggleTheme,
    };
    
    rerender(
      <ThemeContext.Provider value={mockContextValue}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );
    
    expect(screen.getByTestId('LightModeIcon')).toBeInTheDocument();
  });
});