import { useEffect } from "react";
import Search from "../components/Search";

const SearchView = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return <Search />;
};

export default SearchView;
