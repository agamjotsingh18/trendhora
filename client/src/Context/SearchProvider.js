import { useState } from "react";
import { SearchContext } from "./SearchContext";

const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");

  const setSearchQuery = (value) => {
    setQuery(value);
  };

  return (
    <SearchContext.Provider value={{ searchQuery: query, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
