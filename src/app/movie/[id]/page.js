import Navigation from '@/app/components/navigation';
import Image from 'next/image';


async function getMovieData(id) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie data');
  }
  return response.json();
}

const MoviePage = async ({ params }) => {
  const { id } = params;
  let movieData;

  try {
    movieData = await getMovieData(id);
  } catch (error) {
    return <div>Error loading movie data: {error.message}</div>;
  }

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] text-white bg-black">
      <Navigation />
      <div className="relative w-full h-96">
        <Image
          src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
          alt={movieData.title}
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-8 left-8">
          <h1 className="text-4xl font-bold">{movieData.title}</h1>
          <p className="text-lg mt-2">{movieData.tagline}</p>
          <div className="flex items-center mt-4">
            <span className="mr-4">{movieData.release_date}</span>
            <span className="mr-4">{movieData.runtime} min</span>
            <span className="mr-4">{movieData.vote_average} / 10</span>
          </div>
          <div className="mt-4">
            {movieData.genres.map((genre) => (
              <span
                key={genre.id}
                className="mr-2 px-3 py-1 bg-gray-800 rounded-full"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Overview</h2>
        <p className="mt-4">{movieData.overview}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Production Companies</h2>
        <div className="mt-4 flex flex-wrap">
          {movieData.production_companies.map((company) => (
            <div key={company.id} className="mr-4 mb-4 flex items-center">
              {company.logo_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                  alt={company.name}
                  width={100}
                  height={50}
                  objectFit="contain"
                />
              )}
              <p className="mt-2 ml-2">{company.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;