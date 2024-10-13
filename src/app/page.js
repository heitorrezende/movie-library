import dynamic from 'next/dynamic';
import Navigation from './components/navigation';

const Carousel = dynamic(() => import('./components/carousel'), { ssr: false });

async function getData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

export default async function Home() {
  const moviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
  const tvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
  const musicMoviesUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=revenue.asc.desc&with_genres=10402&api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
  const sciFiMoviesUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=revenue.desc&with_genres=878&api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

  let moviesData, tvData, musicMoviesData, sciFiMoviesData;

  try {
    [moviesData, tvData, musicMoviesData, sciFiMoviesData] = await Promise.all([
      getData(moviesUrl),
      getData(tvUrl),
      getData(musicMoviesUrl),
      getData(sciFiMoviesUrl),
    ]);
  } catch (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 pb-20 sm:pb-20 font-[family-name:var(--font-geist-sans)] text-white bg-black select-none">
      <Navigation />
      <Carousel data={moviesData} title="Movies" isMovie={true} />
      <Carousel data={tvData} title="TV Shows" isMovie={false} />
      <Carousel data={musicMoviesData} title="Music Movies" isMovie={true} />
      <Carousel data={sciFiMoviesData} title="Sci-Fi Movies" isMovie={true} />
    </div>
  );
}