import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navigation from './navigation';

jest.mock('next/link', () => ({
  __esModule: true,
  default: jest.fn(({ href, children, className }) => (
    <a href={href} className={className}>
      {children}
    </a>
  )),
}));

describe('Navigation', () => {
  test('renders the navigation bar', async () => {
    await act(async () => {
      render(<Navigation />);
    });
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('renders the Home link', async () => {
    await act(async () => {
      render(<Navigation />);
    });
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  test('renders the Movies link', async () => {
    await act(async () => {
      render(<Navigation />);
    });
    const moviesLink = screen.getByText('Movies');
    expect(moviesLink).toBeInTheDocument();
    expect(moviesLink).toHaveAttribute('href', '/movies');
  });

  test('renders the TV Shows link', async () => {
    await act(async () => {
      render(<Navigation />);
    });
    const tvShowsLink = screen.getByText('TV Shows');
    expect(tvShowsLink).toBeInTheDocument();
    expect(tvShowsLink).toHaveAttribute('href', '/tvshows');
  });

  test('applies the correct class to links', async () => {
    await act(async () => {
      render(<Navigation />);
    });
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveClass('hover:underline');
    });
  });
});