"use client";
import Navigation from "@/app/components/navigation";
import Image from "next/image";
import useSWR from "swr";
import { useState } from "react";
import VideoPlayer from "@/app/components/videoPlayer";
import PlayButton from "@/app/components/playButton";
import Loading from "@/app/components/loading";

const fetcher = (url) => fetch(url).then((res) => res.json());

const TVShowPage = ({ params }) => {
  const { data: showData, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/tv/${params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    fetcher
  );

  const [isVideoVisible, setIsVideoVisible] = useState(false);

  if (isLoading) {
    return <Loading/>
  }

  if (error) return <div>Failed to load</div>;

  return (
    <div className="min-h-screen p-4 sm:p-8 pb-20 font-[family-name:var(--font-geist-sans)] text-white bg-black">
      <Navigation />
      {!isVideoVisible && (
        <>
          <div className="relative w-full h-64 sm:h-96">
            <Image
              src={`https://image.tmdb.org/t/p/original${showData.backdrop_path}`}
              alt={showData.name}
              layout="fill"
              objectFit="cover"
              className="opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8">
              <h1 className="text-2xl sm:text-4xl font-bold">{showData.name}</h1>
              <p className="text-sm sm:text-lg mt-1 sm:mt-2">{showData.tagline}</p>
              <div className="flex flex-wrap items-center mt-2 sm:mt-4">
                <span className="mr-2 sm:mr-4 text-xs sm:text-base">
                  {showData.first_air_date}
                </span>
                <span className="mr-2 sm:mr-4 text-xs sm:text-base">
                  {showData.episode_run_time?.[0]} min
                </span>
                <span className="mr-2 sm:mr-4 text-xs sm:text-base">
                  {showData.vote_average} / 10
                </span>
              </div>
              <div className="mt-2 sm:mt-4 flex flex-wrap">
                {showData.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="mr-1 sm:mr-2 mb-1 sm:mb-0 px-2 sm:px-3 py-1 bg-gray-800 rounded-full text-xs sm:text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <PlayButton onClick={() => setIsVideoVisible(true)} />
            </div>
          </div>
        </>
      )}
      {isVideoVisible && (
        <>
          <h1 className="text-2xl sm:text-4xl font-bold">{showData.name}</h1>
          <p className="text-sm sm:text-lg mt-1 sm:mt-2">{showData.tagline}</p>
        </>
      )}
      <VideoPlayer
        isVisible={isVideoVisible}
        onClose={() => setIsVideoVisible(false)}
      />
      <div className="mt-8">
        <h2 className="text-xl sm:text-2xl font-bold">Overview</h2>
        <p className="mt-4 text-sm sm:text-base">{showData.overview}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-xl sm:text-2xl font-bold">Created By</h2>
        <div className="mt-4 flex flex-wrap">
          {showData.created_by.map((creator) => (
            <div key={creator.id} className="mr-4 mb-4 flex items-center">
              <p className="mt-2 ml-2 text-sm sm:text-base">{creator.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl sm:text-2xl font-bold">Seasons</h2>
        <div className="mt-4 flex flex-wrap">
          {showData.seasons.map((season) => (
            <div key={season.id} className="mr-4 mb-4 flex flex-col items-center">
              <Image
                src={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
                alt={season.name}
                width={100}
                height={150}
                objectFit="contain"
              />
              <p className="mt-2 text-sm sm:text-base">{season.name}</p>
              <p className="text-xs sm:text-sm">{season.episode_count} episodes</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl sm:text-2xl font-bold">Production Companies</h2>
        <div className="mt-4 flex flex-wrap">
          {showData.production_companies.map((company) => (
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
              <p className="mt-2 ml-2 text-sm sm:text-base">{company.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TVShowPage;