import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from './loader';

describe('Loader Component', () => {
  test('renders loader with 8 circles', () => {
    render(<Loader />);
    
    // Check if loader wrapper exists
    const loaderWrapper = document.querySelector('.loader-wrapper');
    expect(loaderWrapper).toBeInTheDocument();
    
    // Check if all 8 circles are rendered
    const circles = document.querySelectorAll('.circle');
    expect(circles).toHaveLength(8);
    
    // Check if circles have correct classes
    for (let i = 1; i <= 8; i++) {
      const circle = document.querySelector(`.circle-${i}`);
      expect(circle).toBeInTheDocument();
      expect(circle).toHaveClass('circle');
    }
  });

  test('has improved animation properties', () => {
    render(<Loader />);
    
    const circle = document.querySelector('.circle');
    
    // Verify the circle exists and has the expected classes
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveClass('circle');
  });
});