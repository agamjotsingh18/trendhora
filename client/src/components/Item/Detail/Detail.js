import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import "./Detail.css";
import {
  Button,
  IconButton,
  Rating,
  Chip,
  Divider,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { success as toastSuccess, error as toastError } from '../../../lib/toast';
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { WishItemsContext } from "../../../Context/WishItemsContext";

const Detail = ({ item }) => {
  const { id, category } = useParams();
  const cartItems = useContext(CartItemsContext);
  const wishItems = useContext(WishItemsContext);
  const [currentItem, setCurrentItem] = useState(item || null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  // Using react-hot-toast for notifications now
  const [selectedColor, setSelectedColor] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [stockInfo, setStockInfo] = useState({
    stock: 0,
    stockStatus: "in_stock",
  });

  const isLoggedIn = () => {
    return !!localStorage.getItem("authToken");
  };
  const colors = [
    { name: "Red", value: "#FF0000" },
    { name: "Blue", value: "#0000FF" },
    { name: "Green", value: "#008000" },
    { name: "Orange", value: "#FFA500" },
    { name: "Purple", value: "#800080" },
    { name: "Black", value: "#000000" },
    { name: "Pink", value: "#FFC0CB" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    // Sync wishlist state from local storage / context when item loads
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (currentItem) {
      setIsInWishlist(wishlist.some(i => i._id === currentItem._id));
    }

    if (!item && id && category) {
      const recent = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
      const found = recent.find(
        (product) => product._id === id && product.category === category
      );
      setCurrentItem(found || null);
      if (found?.size?.length > 0) {
        setSize(found.size[0]);
      }
    } else if (item?.size?.length > 0) {
      setSize(item.size[0]);
    }

    // Fetch stock information if item exists
    if ((item || currentItem)?._id) {
      const itemId = (item || currentItem)._id;
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/items/${itemId}`)
        .then((res) => res.json())
        .then((data) => {
          setStockInfo({
            stock: data.stock || 0,
            stockStatus: data.stockStatus || "in_stock",
          });
        })
        .catch((err) => console.error("Error fetching stock info:", err));
    }
  }, [id, category, item, currentItem]);

  const handleSizeChange = (selectedSize) => {
    setSize(selectedSize);
  };

  const handleQuantityIncrement = () => {
    // Prevent incrementing beyond available stock
    if (quantity < stockInfo.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleQuantityDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!isLoggedIn()) {
      toastError('Please login to add items to cart.');
      return;
    }
    if (stockInfo.stock === 0 || stockInfo.stockStatus === 'out_of_stock') {
      toastError('This item is currently out of stock.');
      return;
    }

    if (currentItem && stockInfo.stock > 0) {
      cartItems.addItem(currentItem, quantity);
      toastSuccess('Item added to cart!');
    }
  };

  const handleAddToWish = () => {
    if (!isLoggedIn()) {
      toastError('Please login to add items to wishlist.');
      return;
    }
    
    if (currentItem) {
      const res = wishItems.toggleItem(currentItem);
      if (res === 'added') {
        toastSuccess('Item added to wishlist!');
        setIsInWishlist(true);
      } else {
        toastSuccess('Item removed from wishlist');
        setIsInWishlist(false);
      }
    }
  };


  // handled by react-hot-toast

  if (!currentItem) {
    return (
      <div className="enterprise-detail-loading">
        <div className="loading-shimmer product-name-skeleton"></div>
        <div className="loading-shimmer price-skeleton"></div>
        <div className="loading-shimmer description-skeleton"></div>
      </div>
    );
  }

  return (
    <div className="enterprise-product-detail">
      {/* Brand & Name */}
      <div>
        <div className="product-header">
          <Chip 
            label={currentItem.brand || "Premium Brand"} 
            className="brand-chip"
            size="small"
          />
          <div className="product-rating">
            <Rating value={4.5} precision={0.5} readOnly size="small" />
            <span className="rating-text">(127 reviews)</span>
          </div>  
        </div>
        <h1 className="product-title">{currentItem.name}</h1>
      </div>

      {/* Price */}
      <div className="price-section">
        <span className="current-price">${currentItem.price}</span>
        <span className="original-price">
          ${(currentItem.price * 1.2).toFixed(0)}
        </span>
        <Chip label="20% OFF" className="discount-chip" size="small" />
      </div>

      {/* Stock Status Alert */}
      {stockInfo.stockStatus === "out_of_stock" && (
        <Alert severity="error" icon={<WarningIcon />} className="stock-alert">
          Out of Stock - Currently unavailable
        </Alert>
      )}

      {stockInfo.stockStatus === "low_stock" && (
        <Alert
          severity="warning"
          icon={<WarningIcon />}
          className="stock-alert"
        >
          Low Stock - Only {stockInfo.stock} items left!
        </Alert>
      )}

      {stockInfo.stockStatus === "in_stock" && stockInfo.stock > 0 && (
        <Alert
          severity="success"
          icon={<CheckCircleIcon />}
          className="stock-alert"
        >
          In Stock - {stockInfo.stock} available
        </Alert>
      )}

      {/* Description */}
      <div className="product-description">
        <p>
          {currentItem.description ||
            "Premium quality product with exceptional craftsmanship and attention to detail."}
        </p>
      </div>

      <Divider className="section-divider" />

      {/* Color Selection */}
      <div className="selection-section">
        <div className="section-title">Color</div>
        <div className="color-options">
          {colors.map((color, idx) => (
            <button
              key={idx}
              className={`color-swatch ${
                selectedColor === idx ? "selected" : ""
              }`}
              style={{ backgroundColor: color.value }}
              onClick={() => setSelectedColor(idx)}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="selection-section">
        <div className="section-title">Size</div>
        <div className="size-options">
          {sizes.map((sizeOption) => (
            <button
              key={sizeOption}
              className={`size-button ${size === sizeOption ? "selected" : ""}`}
              onClick={() => handleSizeChange(sizeOption)}
            >
              {sizeOption}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="selection-section">
        <div className="section-title">Quantity</div>
        <div className="quantity-selector">
          <IconButton
            onClick={handleQuantityDecrement}
            className="quantity-btn"
            disabled={quantity <= 1}
          >
            <RemoveIcon />
          </IconButton>
          <span className="quantity-display">{quantity}</span>
          <IconButton
            onClick={handleQuantityIncrement}
            className="quantity-btn"
            disabled={quantity >= stockInfo.stock || stockInfo.stock === 0}
          >
            <AddIcon />
          </IconButton>
        </div>
      </div>

      <Divider className="section-divider" />

      {/* Action Buttons */}
      <div className="action-buttons">
        <Button
          variant="contained"
          className="add-to-cart-btn"
          startIcon={<ShoppingBagIcon />}
          onClick={handleAddToCart}
          fullWidth
          disabled={
            stockInfo.stock === 0 || stockInfo.stockStatus === "out_of_stock"
          }
        >
          {stockInfo.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>

        <IconButton className="wishlist-btn" onClick={handleAddToWish}>
          {isInWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </div>

      {/* Features */}
      <div className="product-features">
        <div className="feature-item">
          <LocalShippingIcon className="feature-icon" />
          <div className="feature-text">
            <span className="feature-title">Free Shipping</span>
            <span className="feature-desc">On orders over $100</span>
          </div>
        </div>

        <div className="feature-item">
          <SecurityIcon className="feature-icon" />
          <div className="feature-text">
            <span className="feature-title">Secure Payment</span>
            <span className="feature-desc">SSL encrypted checkout</span>
          </div>
        </div>

        <div className="feature-item">
          <AssignmentReturnIcon className="feature-icon" />
          <div className="feature-text">
            <span className="feature-title">Easy Returns</span>
            <span className="feature-desc">30-day return policy</span>
          </div>
        </div>
      </div>
      {/* react-hot-toast displays notifications */}
    </div>
  );
};

export default Detail;
