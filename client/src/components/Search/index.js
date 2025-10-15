import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { SearchContext } from "../../Context/SearchContext";
import ItemCard from "../Card/ItemCard/ItemCard";
import ReactLoading from "react-loading";
import "./index.css";

const Search = () => {
  const { searchQuery } = useContext(SearchContext);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery || searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      setLoading(true);

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/items/search?q=${searchQuery}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div className="search__container">
      {loading ? (
        <div className="d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto">
          <ReactLoading type="balls" height={100} width={100} />
        </div>
      ) : searchResults.length > 0 ? (
        <>
          <div className="search__container__header">
            <h1>Results for "{searchQuery}"</h1>
            <p>{searchResults.length} items found</p>
          </div>
          <div className="search__results__grid">
            {searchResults.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        </>
      ) : (
        <div className="search__container__header">
          {searchQuery ? (
            <>
              <h1>No results found for "{searchQuery}"</h1>
              <p>Please try a different search term.</p>
            </>
          ) : (
            <h1>What are you looking for today? 🛍️</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
