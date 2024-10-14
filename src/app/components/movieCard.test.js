import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import MovieCard from './movieCard';


jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: jest.fn(({ src, alt, layout, objectFit, className }) => (
    <img src={src} alt={alt} className={className} />
  )),
}));

describe('MovieCard', () => {
  const item = {
    id: 1,
    poster_path: '/path1.jpg',
    backdrop_path: '/backdrop1.jpg',
    title: 'Movie 1',
    name: 'TV Show 1',
    release_date: '2021-01-01',
    first_air_date: '2021-01-01',
  };

  const push = jest.fn();
  useRouter.mockReturnValue({ push });

  test('renders the movie card with the correct title', () => {
    render(<MovieCard item={item} type="movie" />);
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
  });

  test('renders the movie card with the correct release date', () => {
    render(<MovieCard item={item} type="movie" />);
    expect(screen.getByText('2021-01-01')).toBeInTheDocument();
  });

  test('renders the movie card with the correct image', () => {
    render(<MovieCard item={item} type="movie" />);
    const image = screen.getByAltText('Movie 1');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/path1.jpg');
  });

  test('renders the movie card with the correct type', () => {
    render(<MovieCard item={item} type="movie" />);
    expect(screen.getByText('Movie')).toBeInTheDocument();
  });

  test('navigates to the correct URL on click', () => {
    render(<MovieCard item={item} type="movie" />);
    const card = screen.getByTestId('movie-card');
    fireEvent.click(card);
    expect(push).toHaveBeenCalledWith('/movie/1');
  });
});