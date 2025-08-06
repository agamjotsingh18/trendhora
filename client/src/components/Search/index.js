import { useEffect, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchContext } from '../../Context/SearchContext';
import './index.css';
import ReactLoading from 'react-loading';

const Search = () => {
  const search = useContext(SearchContext);
  const [searchParam, setSearchParam] = useSearchParams();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (!search.searchQuery) return;

    setLoading(true);

    // Set search param
    setSearchParam({ query: search.searchQuery }, { replace: true });

    // Simulate delay (e.g., API fetching time)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [search.searchQuery]); 

  return (
    <div className="search__container">
      {loading ? (
        <ReactLoading
          type="balls"
          color="#FFE26E"
          height={100}
          width={100}
          className="m-auto"
        />
      ) : (
        <div className="search__container__header">
          <h1>No results found for "{search.searchQuery}"</h1>
        </div>
      )}
    </div>
  );
};

export default Search;




