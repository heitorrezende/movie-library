import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page';

jest.mock('./components/navigation', () => () => <nav>Mocked Navigation</nav>);
jest.mock('./components/searchBar', () => () => <div>Mocked SearchBar</div>);
jest.mock('./components/loading', () => () => <div>Loading...</div>);
jest.mock('./components/carousel', () => ({ data, title, isMovie }) => (
  <div>
    <h2>{title}</h2>
    {data.results.map((item) => (
      <div key={item.id}>{item.title || item.name}</div>
    ))}
  </div>
));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        results: [
          { id: 1, title: 'Movie 1', name: 'TV Show 1' },
          { id: 2, title: 'Movie 2', name: 'TV Show 2' },
        ],
      }),
  })
);

describe('Home', () => {
  test('renders the navigation bar', async () => {
    render(await Home());
    expect(screen.getByText('Mocked Navigation')).toBeInTheDocument();
  });

  test('renders the search bar', async () => {
    render(await Home());
    expect(screen.getByText('Mocked SearchBar')).toBeInTheDocument();
  });

  test('renders the carousels with correct titles', async () => {
    render(await Home());
    await waitFor(() => {
      expect(screen.getByText('Movies')).toBeInTheDocument();
      expect(screen.getByText('TV Shows')).toBeInTheDocument();
      expect(screen.getByText('Musical Movies')).toBeInTheDocument();
      expect(screen.getByText('Sci-Fi Movies')).toBeInTheDocument();
    });
  });

  test('renders the movie data', async () => {
    render(await Home());
    await waitFor(() => {
      const movie1Elements = screen.queryAllByText('Movie 1');
      const movie2Elements = screen.queryAllByText('Movie 2');
      expect(movie1Elements.length).toBeGreaterThan(0);
      expect(movie2Elements.length).toBeGreaterThan(0);
      movie1Elements.forEach(element => expect(element).toBeInTheDocument());
      movie2Elements.forEach(element => expect(element).toBeInTheDocument());
    });
  });

  test('handles fetch errors gracefully', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );

    render(await Home());
    await waitFor(() => {
      expect(screen.getByText('Error loading data: Failed to fetch data')).toBeInTheDocument();
    });
  });
});