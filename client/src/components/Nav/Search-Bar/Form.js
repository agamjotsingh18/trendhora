import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import './Form.css';
import { SearchContext } from '../../../Context/SearchContext';

// Suggestion tags
const tags = [
  "T-Shirts", "Shirts", "Jeans", "Joggers", "Trousers",
  "Dresses", "Jumpsuits", "Skirts", "Shorts", "Sweaters",
  "Hoodies", "Jackets", "Blazers", "Suits", "Track Pants",
  "Kurtas", "Kurtis", "Sarees", "Lehengas", "Anarkali",
  "Salwar Suits", "Palazzos", "Denim Jackets", "Crop Tops", "Tank Tops",
  "Formal Shirts", "Casual Wear", "Ethnic Wear", "Winter Wear", "Summer Wear",
  "Activewear", "Gym Wear", "Loungewear", "Innerwear", "Sleepwear",
  "Party Wear", "Workwear", "Co-ords", "Oversized Tees", "Graphic Tees"
];

const Form = () => {
  const [searchInput, setSearchInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContext = useContext(SearchContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    searchContext.setSearchQuery(searchInput);
    
    // Simulate loading delay
    setTimeout(() => {
      navigate('/search');
    }, 1000); // 1 second
    setShowSuggestions(false);
  };

  const handleTagClick = (tag) => {
    setSearchInput(tag);
    searchContext.setSearchQuery(tag);
    setTimeout(() => {
      navigate('/search');
    }, 1000);
    setShowSuggestions(false);
  };

  return (
    <div className="search__form__container">
      <form className="search__form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Search for products"
          className="search__form__input"
          value={searchInput}
          onChange={handleChange}
          onFocus={() => setShowSuggestions(true)}
          required
        />
        <button className="search__form__button" type="submit">
          <SearchIcon fontSize="medium" />
        </button>
      </form>

      {showSuggestions && (
        <div className="search__tags__box">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="search__tag"
              onMouseDown={() => handleTagClick(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Form;