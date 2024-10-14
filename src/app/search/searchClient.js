"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SearchResultsClient = ({ results }) => {
  const router = useRouter();

  const handleResultClick = (result) => {
    if (result.media_type === 'movie') {
      router.push(`/movie/${result.id}`);
    } else if (result.media_type === 'tv') {
      router.push(`/tv/${result.id}`);
    }
  };

  return (
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
            <p className="text-gray-400">{result.media_type === 'movie' ? 'Movie' : 'TV Show'}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsClient;