import React from 'react';
import MovieCard from '../components/movieCard';
import Navigation from '../components/navigation';
import SearchBar from '../components/searchBar';


async function fetchTrendingMovies() {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch trending movies');
  }
  return response.json();
}

const TrendingMoviesServer = async () => {
  const data = await fetchTrendingMovies();

  return (
    <div className="min-h-screen p-4 sm:p-8 pb-20 sm:pb-20 font-[family-name:var(--font-geist-sans)] text-white bg-black select-none">
      <Navigation />
      <SearchBar/>
      <h1 className="text-3xl font-bold mb-8">Trending Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.results.map((result) => (
          <MovieCard key={result.id} item={result} type="movie" />
        ))}
      </div>
    </div>
  );
};

export default TrendingMoviesServer;