import { useState, useEffect } from 'react';
import ItemCard from "../../Card/ItemCard/ItemCard";
import "./ShopCategory.css";

const ShopCategory = (props) => {
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    sort: 'newest',
  });
  const [filteredItems, setFilteredItems] = useState(props.items || []);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  // Apply filters when component mounts or items change
  useEffect(() => {
    applyFilters();
  }, [props.items]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = (e) => {
    e?.preventDefault();
    
    let result = [...(props.items || [])];
    
    // Apply price filter
    if (filters.minPrice) {
      result = result.filter(item => 
        parseFloat(item.price) >= parseFloat(filters.minPrice)
      );
    }
    
    if (filters.maxPrice) {
      result = result.filter(item => 
        parseFloat(item.price) <= parseFloat(filters.maxPrice)
      );
    }
    
    // Apply sorting
    if (filters.sort === 'price-low') {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (filters.sort === 'price-high') {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (filters.sort === 'newest') {
      // Assuming newer items have higher IDs (adjust according to your data structure)
      result.sort((a, b) => (b.id || 0) - (a.id || 0));
    } else if (filters.sort === 'popularity') {
      // Assuming you have a 'popularity' field in your items
      result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }
    
    setFilteredItems(result);
    setIsFilterApplied(true);
  };

  const resetFilters = (e) => {
    e?.preventDefault();
    setFilters({
      minPrice: '',
      maxPrice: '',
      sort: 'newest',
    });
    setFilteredItems(props.items || []);
    setIsFilterApplied(false);
  };

  return (
    <div className="shop__category__container">
      <div className="shop__category__header">
        <div className="shop__category__header__big">
          <div className="shop__category__head">
            <h2>{props.name} Fashion</h2>
          </div>
          <div className="shop__category__header__line"></div>
        </div>
      </div>

      {/* Filter Section */}
      <form onSubmit={applyFilters} className="shop__category__filters">
        <div className="filter__group">
          <label htmlFor="sort">Sort By:</label>
          <select 
            id="sort" 
            name="sort" 
            value={filters.sort}
            onChange={handleFilterChange}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>

        <div className="filter__group">
          <label>Price Range:</label>
          <div className="price__inputs">
            <input
              type="number"
              name="minPrice"
              placeholder="Min"
              className="price__input"
              value={filters.minPrice}
              onChange={handleFilterChange}
              min="0"
              step="0.01"
            />
            <span>-</span>
            <input
              type="number"
              name="maxPrice"
              placeholder="Max"
              className="price__input"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              min={filters.minPrice || '0'}
              step="0.01"
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
          <button 
            type="submit"
            className="apply__filters"
          >
            Apply Filters
          </button>
          
          <button 
            type="button"
            className="reset__filters"
            onClick={resetFilters}
            disabled={!isFilterApplied}
          >
            Reset
          </button>
        </div>
      </form>

      <div className="shop__category__card__container">
        <div className="shop__category__product__card">
          {filteredItems.length > 0 ? (
            filteredItems.map((data, indx) => (
              <ItemCard key={indx} item={data} category={props.category} />
            ))
          ) : (
            <div className="no-results">
              <p>No products match your filters. Try adjusting your criteria.</p>
              <button 
                className="reset__filters"
                onClick={resetFilters}
                style={{ marginTop: '1rem' }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopCategory;
