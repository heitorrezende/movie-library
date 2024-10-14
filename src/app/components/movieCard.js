"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const MovieCard = ({ item, type }) => {
  const router = useRouter();

  const handleResultClick = () => {
    router.push(`/${type}/${item.id}`);
  };

  return (
    <div
      className="bg-black rounded-lg shadow-md overflow-hidden h-full flex flex-col cursor-pointer transform transition-transform duration-300 hover:scale-105"
      onClick={handleResultClick}
    >
      <div className="relative w-full h-48">
        <Image
          src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`}
          alt={item.title || item.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-2 flex flex-col flex-grow">
        <h2 className="text-lg font-bold text-white">{item.title || item.name}</h2>
        <p className="text-gray-400">{item.release_date || item.first_air_date}</p>
        <p className="text-gray-400">{type === 'movie' ? 'Movie' : 'TV Show'}</p>
      </div>
    </div>
  );
};

export default MovieCard;