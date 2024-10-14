import React from 'react';
import Navigation from '../components/navigation';
import MovieCard from '../components/movieCard';
import SearchBar from '../components/searchBar';


async function fetchTrendingTVShows() {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch trending TV shows');
  }
  return response.json();
}

const TrendingTVShowsServer = async () => {
  const data = await fetchTrendingTVShows();

  return (
    <div className="min-h-screen p-4 sm:p-8 pb-20 sm:pb-20 font-[family-name:var(--font-geist-sans)] text-white bg-black select-none">
      <Navigation />
      <SearchBar/>
      <h1 className="text-3xl font-bold mb-8">Trending TV Shows</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.results.map((result) => (
          <MovieCard key={result.id} item={result} type="tv" />
        ))}
      </div>
    </div>
  );
};

export default TrendingTVShowsServer;