import { useEffect, useState, useRef } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./RecentlyViewedSection.css";
import { success as toastSuccess, error as toastError } from '../lib/toast';

const RecentlyViewed = () => {
  const [products, setProducts] = useState([]);
  const prevViewedRef = useRef("");

  // Load recently viewed from localStorage
  const loadRecentlyViewed = () => {
    const viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    setProducts(viewed.slice(0, 5)); // show latest 5
    prevViewedRef.current = JSON.stringify(viewed);
  };

  useEffect(() => {
    loadRecentlyViewed();

    // Poll localStorage every 500ms for same-tab changes
    const interval = setInterval(() => {
      const currentViewed = localStorage.getItem("recentlyViewed") || "[]";
      if (currentViewed !== prevViewedRef.current) {
        loadRecentlyViewed();
      }
    }, 500);

    // Listen for storage events across tabs
    const handleStorageChange = (event) => {
      if (event.key === "recentlyViewed") {
        loadRecentlyViewed();
      }
    };

    // Listen for custom event in same tab
    const handleCustomEvent = () => {
      loadRecentlyViewed();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("recentlyViewedUpdated", handleCustomEvent);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("recentlyViewedUpdated", handleCustomEvent);
    };
  }, []);

  const handleAddToWishlist = (product) => {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isAlreadyInWishlist = existingWishlist.some(
      (item) => item._id === product._id || item.name === product.name
    );

    if (!isAlreadyInWishlist) {
      localStorage.setItem("wishlist", JSON.stringify([...existingWishlist, product]));
  toastSuccess('Item added to wishlist!');
      // Notify other components (e.g., wishlist badge)
      window.dispatchEvent(new Event('storage'));
    } else {
      toastError('Item already in wishlist');
    }
  };

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const isAlreadyInCart = existingCart.some(
      (item) => item._id === product._id || item.name === product.name
    );

    if (!isAlreadyInCart) {
      localStorage.setItem("cart", JSON.stringify([...existingCart, product]));
    }
  };

  if (!products.length) return null;

  return (
    <section className="recently-viewed-section">
      <div className="recently-viewed-header">
        <h2 className="recently-viewed-title">Recently Viewed Products</h2>
        <p className="recently-viewed-subtitle">Continue shopping from where you left off</p>
        <div className="recently-viewed-divider"></div>
      </div>

      <div className="recently-viewed-grid">
        {products.map((product) => {
          // Make sure we have a valid category and id
          const category = product.category
            ? String(product.category).toLowerCase()
            : null;
          const productId = product._id || product.id;

          // Build link only if valid category and id exist
          const productLink =
            category && productId ? `/item/${category}/${productId}` : "#";

          return (
            <Link
              to={productLink}
              key={productId}
              className="recent-product-card"
              style={{ pointerEvents: productLink === "#" ? "none" : "auto" }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="recent-product-image"
                loading="lazy"
              />
              
              <div className="recent-product-info">
                <h4 className="recent-product-name">{product.name}</h4>
                <p className="recent-product-price">
                  <span className="price-currency">$</span>
                  {new Intl.NumberFormat("en-US", {
                    style: "decimal",
                    maximumFractionDigits: 2,
                  }).format(product.price)}
                </p>
              </div>

              <div className="recent-product-actions">
                <button
                  className="action-button wishlist-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                              handleAddToWishlist(product);
                  }}
                  title="Add to wishlist"
                  aria-label="Add to wishlist"
                >
                  <FaHeart />
                  <span className="button-text">Wishlist</span>
                </button>
                
                <button
                  className="action-button cart-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  title="Add to cart"
                  aria-label="Add to cart"
                >
                  <FaShoppingCart />
                  <span className="button-text">Cart</span>
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RecentlyViewed;
