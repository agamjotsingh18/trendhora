import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import "./Detail.css";
import { Button, IconButton, Rating, Chip, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { WishItemsContext } from "../../../Context/WishItemsContext";

const Detail = ({ item }) => {
  const { id, category } = useParams();
  const cartItems = useContext(CartItemsContext);
  const wishItems = useContext(WishItemsContext);
  const [currentItem, setCurrentItem] = useState(item || null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);

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
  }, [id, category, item]);

  const handleSizeChange = (selectedSize) => {
    setSize(selectedSize);
  };

  const handleQuantityIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleQuantityDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (currentItem) cartItems.addItem(currentItem, quantity); ;
  };

  const handleAddToWish = () => {
    if (currentItem) {
      wishItems.addItem(currentItem);
      setIsInWishlist(!isInWishlist);
    }
  };

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
      <div className="product-header">
        <Chip 
          label={currentItem.brand || "Premium Brand"} 
          className="brand-chip"
          size="small"
        />
        <h1 className="product-title">{currentItem.name}</h1>
        <div className="product-rating">
          <Rating value={4.5} precision={0.5} readOnly size="small" />
          <span className="rating-text">(127 reviews)</span>
        </div>
      </div>

      {/* Price */}
      <div className="price-section">
        <span className="current-price">${currentItem.price}</span>
        <span className="original-price">${(currentItem.price * 1.2).toFixed(0)}</span>
        <Chip label="20% OFF" className="discount-chip" size="small" />
      </div>

      {/* Description */}
      <div className="product-description">
        <p>{currentItem.description || "Premium quality product with exceptional craftsmanship and attention to detail."}</p>
      </div>

      <Divider className="section-divider" />

      {/* Color Selection */}
      <div className="selection-section">
        <div className="section-title">Color</div>
        <div className="color-options">
          {colors.map((color, idx) => (
            <button
              key={idx}
              className={`color-swatch ${selectedColor === idx ? 'selected' : ''}`}
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
              className={`size-button ${size === sizeOption ? 'selected' : ''}`}
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
        >
          Add to Cart
        </Button>
        
        <IconButton
          className="wishlist-btn"
          onClick={handleAddToWish}
        >
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
    </div>
  );
};

export default Detail;
