
import  { Suspense } from 'react';
import Loading from '../components/loading';
import SearchResultsServer from './searchServer';



const SearchPage = ({ searchParams }) => {
  return (
    <Suspense fallback={<Loading />}>
      <SearchResultsServer searchParams={searchParams} />
    </Suspense>
  );
};

export default SearchPage;