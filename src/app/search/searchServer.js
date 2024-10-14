import React from "react";
import SearchResultsClient from "./searchClient";
import Navigation from "../components/navigation";
import SearchBar from "../components/searchBar";

async function fetchSearchResults(query) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
      query
    )}&include_adult=false&language=en-US&page=1&api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }
  return response.json();
}

const SearchResultsServer = async ({ searchParams }) => {
  const query = searchParams.query;
  if (!query) {
    return <div>No search query provided.</div>;
  }

  let results = [];
  let error = null;

  try {
    const data = await fetchSearchResults(query);
    results = data.results;
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return <div>Error loading search results: {error}</div>;
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 pb-20 sm:pb-20 font-[family-name:var(--font-geist-sans)] text-white bg-black select-none">
      <Navigation />
      <SearchBar />
      <h1 className="text-3xl font-bold mb-8">Search Results</h1>
      <SearchResultsClient results={results} />
    </div>
  );
};

export default SearchResultsServer;
