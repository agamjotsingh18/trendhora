import ItemCard from "../../Card/ItemCard/ItemCard";
import "./ShopCategory.css";
import { useTheme } from '../../../Context/ThemeContext';

const ShopCategory = (props) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`shop__category__container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="shop__category__header">
        <div className="shop__category__header__big">
          <div className="shop__category__head">
            <h2>{props.name} Fashion</h2>
          </div>
          <div className="shop__category__header__line"></div>
        </div>
      </div>

      <div className="shop__category__card__container">
        <div className="shop__category__product__card">
          {props.items && props.items.length > 0 ? (
            props.items.map((data, indx) => (
              <ItemCard key={indx} item={data} category={props.category} />
            ))
          ) : (
            <div className="no-results">
              <p>No products available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopCategory;
