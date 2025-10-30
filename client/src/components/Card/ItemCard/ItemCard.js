import React from 'react';
import './ItemCard.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from "react";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { WishItemsContext } from "../../../Context/WishItemsContext";
import { useComparison } from "../../../Context/ComparisonContext";
import Toaster from "../../Toaster/toaster";
import { success as toastSuccess, error as toastError } from '../../../lib/toast';
import axios from "axios";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { Chip } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";

const ItemCard = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showToaster, setShowToaster] = useState(false);
  const [toasterTitle, setToasterTitle] = useState("");
  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterType, setToasterType] = useState("success");
  const [product, setProduct] = useState(null);
  const [stockInfo, setStockInfo] = useState({ stock: 0, stockStatus: 'in_stock' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { category, id } = useParams();
  const navigate = useNavigate();
  const cartItemsContext = useContext(CartItemsContext);
  const wishItemsContext = useContext(WishItemsContext);
  const { addToCompare } = useComparison();
  const currentItem = props.item || product;
  const itemCategory = currentItem?.category || props.category;

  // Check authentication status on mount and when storage changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      setIsAuthenticated(!!token);
    };

    // Check on mount
    checkAuth();

    // Listen for storage events (when token is added/removed)
    window.addEventListener('storage', checkAuth);
    
    // Also listen for custom auth events
    const handleAuthChange = () => checkAuth();
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  // ✅ Helper function to check login
  const isLoggedIn = () => {
    const token = localStorage.getItem("authToken");
    console.log("Checking auth token:", token ? "Token exists" : "No token"); // Debug log
    return !!token; // token exist → logged in
  };

  const handleProductClick = (e) => {
    e.preventDefault();
    if (!currentItem) return;
    const itemId = currentItem._id || currentItem.id;
    if (itemCategory && itemId) {
      navigate(`/item/${itemCategory}/${itemId}`);
    } else {
      setToasterTitle("Error");
      setToasterMessage("Could not open product details. Please try again.");
      setToasterType("error");
      setShowToaster(true);
    }
  };

  useEffect(() => {
    if (!props.item && category && id) {
      axios
        .get(`/api/item/${category}/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => console.error(err));
    }

    // Fetch stock information
    if (currentItem?._id) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/items/${currentItem._id}`)
        .then((res) => {
          setStockInfo({
            stock: res.data.stock || 0,
            stockStatus: res.data.stockStatus || 'in_stock'
          });
        })
        .catch((err) => console.error("Error fetching stock:", err));
    }
  }, [props.item, category, id, currentItem?._id]);

  const saveToRecentlyViewed = (product) => {
    const existing = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    const filtered = existing.filter((p) => p.id !== product._id);
    const updated = [product, ...filtered].slice(0, 5);
    localStorage.setItem("recentlyViewed", JSON.stringify(updated));
  };

  // ✅ Add to Cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn()) {
      setToasterTitle("Login Required");
      setToasterMessage("Please login to add items to cart.");
      setToasterType("error");
      setShowToaster(true);
      // navigate("/login"); // redirect to login page
      return;
    }

    // Check stock availability
    if (stockInfo.stock === 0 || stockInfo.stockStatus === 'out_of_stock') {
      setToasterTitle("Out of Stock");
      setToasterMessage("This item is currently out of stock.");
      setToasterType("error");
      setShowToaster(true);
      return;
    }

    if (currentItem) {
      const normalized = {
        ...currentItem,
        _id: currentItem._id || currentItem.id,
        category: itemCategory,
      };
      cartItemsContext.addItem(normalized, 1)
      setToasterTitle("Success");
      setToasterMessage("Item added to cart!");
      setToasterType("success");
      setShowToaster(true);
    }
  };

  // ✅ Add to Wishlist
  const handleAddToWishList = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn()) {
  toastError('Please login to add items to wishlist.');
  //     navigate("/login");
  
      return;
    }

    if (currentItem) {
      const normalized = {
        ...currentItem,
        _id: currentItem._id || currentItem.id,
        category: itemCategory,
      };
      const result = wishItemsContext.toggleItem(normalized);
      if (result === 'added') {
        toastSuccess('Item added to wishlist!');
      } else {
        toastSuccess('Item removed from wishlist');
      }
    }
  };

  // ✅ Add to Compare
  const handleAddToCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (currentItem) {
      const normalized = {
        ...currentItem,
        _id: currentItem._id || currentItem.id,
        category: itemCategory,
      };
      const success = addToCompare(normalized);
      if (success) {
        setToasterTitle("Success");
        setToasterMessage("Item added to comparison!");
        setToasterType("success");
      } else {
        setToasterTitle("Info");
        setToasterMessage("Maximum 3 items can be compared or item already added!");
        setToasterType("info");
      }
      setShowToaster(true);
    }
  };

  const handleCloseToaster = () => {
    setShowToaster(false);
  };

  if (!currentItem || !itemCategory || !currentItem.image || currentItem.image.length === 0) {
    return null;
  }

  const getImageUrl = (image) => {
    if (!image) return '';
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
    return typeof image === 'string'
      ? image
      : `${backendUrl}/public/${itemCategory}/${image.filename}`;
  };

  const imageUrl = getImageUrl(currentItem.image[0]);
  const hoverImageUrl =
    Array.isArray(currentItem.image) && currentItem.image[1]
      ? getImageUrl(currentItem.image[1])
      : imageUrl;

  const getConsistentRating = (item) => {
    const key = (item?._id || item?.id || item?.name || "").toString();
    if (!key) return 4.5;
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) | 0;
    }
    const min = 38;
    const max = 50;
    const range = max - min + 1;
    const val = Math.abs(hash % range) + min;
    return val / 10;
  };

  const ratingValue =
    typeof currentItem.rating === "number"
      ? currentItem.rating
      : getConsistentRating(currentItem);

  const itemId = currentItem._id || currentItem.id;
  const detailPath = itemCategory && itemId ? `/item/${itemCategory}/${itemId}` : "#";

  return (
    <div
      className={`product__card__card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: "pointer" }}
    >
      <div className="product__image" onClick={handleProductClick}>
        <img
          src={isHovered && hoverImageUrl ? hoverImageUrl : imageUrl}
          alt={currentItem.name || "Product"}
          className="product__img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/path-to-placeholder-image.png";
          }}
        />
        <div className="rating-overlay">
          <span className="star">★</span>
          <span className="rating-value">{ratingValue.toFixed(1)}/5.0</span>
        </div>
        {/* Stock Status Badge */}
        {stockInfo.stockStatus === 'out_of_stock' && (
          <Chip 
            icon={<ErrorIcon />}
            label="Out of Stock" 
            color="error" 
            size="small"
            className="stock-badge out-of-stock"
          />
        )}
        {stockInfo.stockStatus === 'low_stock' && (
          <Chip 
            icon={<WarningIcon />}
            label={`Only ${stockInfo.stock} left`}
            color="warning" 
            size="small"
            className="stock-badge low-stock"
          />
        )}
      </div>
      <div className="product__card__detail">
        <span className="category-badge">{itemCategory}</span>
        <div className="product__name">
          <Link
            to={detailPath}
            onClick={(e) => {
              if (detailPath === "#") {
                e.preventDefault();
                setToasterTitle("Error");
                setToasterMessage("Could not open product details. Please try again.");
                setToasterType("error");
                setShowToaster(true);
                return;
              }
              saveToRecentlyViewed(currentItem);
            }}
          >
            {currentItem.name}
          </Link>
        </div>
        <div className="product__price">${currentItem.price}</div>
        <div className="product__card__action">
        <button
  type="button"
  className="action-button compare-button"
  onClick={handleAddToCompare}
  aria-label="Add to compare"
>
  <CompareArrowsIcon style={{ fontSize: "1.1rem" }} />
</button>

<button
  type="button"
  className="action-button cart-button"
  onClick={handleAddToCart}
>
  <AddShoppingCartIcon style={{ fontSize: "1.1rem" }} />
  <span>CART</span>
</button>

<button
  type="button"
  className="action-button wishlist-button"
  onClick={handleAddToWishList}
  aria-label="Add to wishlist"
>
  <FavoriteBorderIcon style={{ fontSize: "1.1rem" }} />
</button>

        </div>
      </div>
      <Toaster
        title={toasterTitle}
        message={toasterMessage}
        isVisible={showToaster}
        onClose={handleCloseToaster}
        type={toasterType}
        duration={1000}
      />
    </div>
  );
};

export default ItemCard;
