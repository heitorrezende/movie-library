"use client";
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '../components/navigation';
import Image from 'next/image';

async function fetchSearchResults(query) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch search results');
  }
  return response.json();
}

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        try {
          const data = await fetchSearchResults(query);
          setResults(data.results);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchResults();
    }
  }, [query]);

  const handleResultClick = (result) => {
    if (result.media_type === 'movie') {
      router.push(`/movie/${result.id}`);
    } else if (result.media_type === 'tv') {
      router.push(`/tv/${result.id}`);
    }
  };

  if (error) {
    return <div>Error loading search results: {error}</div>;
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 pb-20 sm:pb-20 font-[family-name:var(--font-geist-sans)] text-white bg-black select-none">
      <Navigation />
      <h1 className="text-3xl font-bold mb-8">Search Results for &quot;{query}&quot;</h1>
      <Suspense fallback={<div>Loading search results...</div>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {results.map((result) => (
            <div
              key={result.id}
              className="bg-black rounded-lg shadow-md overflow-hidden h-full flex flex-col cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={() => handleResultClick(result)}
            >
              <div className="relative w-full h-48">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${result.poster_path || result.backdrop_path}`}
                  alt={result.title || result.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-2 flex flex-col flex-grow">
                <h2 className="text-lg font-bold text-white">{result.title || result.name}</h2>
                <p className="text-gray-400">{result.release_date || result.first_air_date}</p>
                <p className="text-gray-400">{result.media_type}</p>
              </div>
            </div>
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default SearchResults;