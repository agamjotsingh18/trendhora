import { useEffect, useState, useRef } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

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
    <div style={{ padding: "30px", backgroundColor: "#f9f9f9" }}>
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "600",
          marginBottom: "25px",
          borderBottom: "2px solid #ddd",
          paddingBottom: "10px",
          color: "#333",
        }}
      >
        Recently Viewed Products
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "24px",
        }}
      >
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
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className="recent-product-card"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "16px",
                  backgroundColor: "#fff",
                  transition: "transform 0.2s",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                  cursor: productLink === "#" ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.02)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <h4
                  style={{
                    marginTop: "12px",
                    fontSize: "18px",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  {product.name}
                </h4>
                <p
                  style={{
                    fontWeight: "bold",
                    color: "#2e7d32",
                    margin: "6px 0",
                  }}
                >
                  $
                  {new Intl.NumberFormat("en-US", {
                    style: "decimal",
                    maximumFractionDigits: 2,
                  }).format(product.price)}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    marginTop: "10px",
                  }}
                >
                  <FaHeart
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToWishlist(product);
                    }}
                    style={{ color: "#888", cursor: "pointer" }}
                    title="Add to wishlist"
                  />
                  <FaShoppingCart
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                    style={{ color: "#888", cursor: "pointer" }}
                    title="Add to cart"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RecentlyViewed;
