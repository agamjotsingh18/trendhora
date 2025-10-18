import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

import "./Form.css";
import { useContext } from "react";

import { SearchContext } from "../../../Context/SearchContext";

const Form = () => {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  const searchContext = useContext(SearchContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim() === "") {
      navigate("/"); // Go to Home when cleared
    } else {
      navigate("/search"); // Show search page when typing
    }
  };

  const handelFormSubmit = (e) => {
    e.preventDefault();
    searchContext.setSearchQuery(searchQuery);
    navigate("/search");
  };

  return (
    <form className="search__form" onSubmit={handelFormSubmit}>
      <input
        type="text"
        placeholder="Search for products"
        className="search__form__input"
        value={searchQuery}
        onChange={handleChange}
        required
      />
      <button className="search__form__button" type="submit">
        <SearchIcon fontSize="medium" />
      </button>
    </form>
  );
};

export default Form;
