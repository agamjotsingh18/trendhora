import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Landing from './Landing';

// Wrapper component to provide Router context
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Landing Component', () => {
  test('renders main heading with gradient text effect', () => {
    renderWithRouter(<Landing />);
    const heading = screen.getByText('Checkout The Best Fashion Style');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('landing__header__main');
  });

  test('renders discount text', () => {
    renderWithRouter(<Landing />);
    const discountText = screen.getByText('UP TO 15% DISCOUNT');
    expect(discountText).toBeInTheDocument();
    expect(discountText).toHaveClass('landing__header__discount');
  });

  test('renders Shop Now button with enhanced styling', () => {
    renderWithRouter(<Landing />);
    const shopButton = screen.getByRole('button', { name: 'SHOP NOW' });
    expect(shopButton).toBeInTheDocument();
  });

  test('Shop Now button links to shop page', () => {
    renderWithRouter(<Landing />);
    const shopLink = screen.getByRole('link');
    expect(shopLink).toHaveAttribute('href', '/shop');
  });

  test('renders landing image', () => {
    renderWithRouter(<Landing />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass('landing__image');
  });

  test('has proper container structure for animations', () => {
    renderWithRouter(<Landing />);
    const container = document.querySelector('.landing__container');
    expect(container).toBeInTheDocument();
    
    const headerContainer = document.querySelector('.landing__header__container');
    expect(headerContainer).toBeInTheDocument();
    
    const imageContainer = document.querySelector('.landing__image__container');
    expect(imageContainer).toBeInTheDocument();
  });
});