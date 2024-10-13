"use client"
import useSWR from 'swr';
import Carousel from './components/carousel';

export default function Home() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data: moviesData, error: moviesError } = useSWR('https://api.themoviedb.org/3/discover/movie?api_key=' + process.env.NEXT_PUBLIC_API_KEY, fetcher);
  const { data: tvData, error: tvError } = useSWR('https://api.themoviedb.org/3/discover/tv?api_key=' + process.env.NEXT_PUBLIC_API_KEY, fetcher);

  if (!moviesData && !moviesError) {
    return <div>Loading...</div>;
  }

  if (moviesError) {
    return <div>Error loading movies data</div>;
  }

  if (!tvData && !tvError) {
    return <div>Loading...</div>;
  }

  if (tvError) {
    return <div>Error loading TV shows data</div>;
  }

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Carousel data={moviesData} title="Movie Previews" isMovie={true} />
      <Carousel data={tvData} title="TV Show Previews" isMovie={false} />
    </div>
  );
}