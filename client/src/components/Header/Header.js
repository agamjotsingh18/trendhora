import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiSun, FiMoon, FiMic } from "react-icons/fi";
import "./Header.css";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartItems, setCartItems] = useState(2);
  const [wishlistItems, setWishlistItems] = useState(1);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      setSuggestions([
        { name: "Black Jacket", price: "$49", img: "/img/jacket.jpg" },
        { name: "White Sneakers", price: "$59", img: "/img/shoes.jpg" },
      ]);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      {/* Logo */}
      <div className="logo">
        <Link to="/" className="flex items-center">
          <img 
            src="/favicon.png"   
            alt="Trendhora Logo" 
            className="logo-img"
          />
          <span className="logo-text">Trendhora</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="nav-links">
        <div className="nav-item"><Link to="/">Home</Link></div>
        <div className="nav-item mega">
          <span>Shop</span>
          <div className="mega-menu">
            <div>
              <h4>Men</h4>
              <Link to="/category/men/tshirts">T-Shirts</Link>
              <Link to="/category/men/jeans">Jeans</Link>
              <Link to="/category/men/shoes">Shoes</Link>
            </div>
            <div>
              <h4>Women</h4>
              <Link to="/category/women/dresses">Dresses</Link>
              <Link to="/category/women/handbags">Handbags</Link>
              <Link to="/category/women/heels">Heels</Link>
            </div>
          </div>
        </div>
        <div className="nav-item"><Link to="/category/men">Men</Link></div>
        <div className="nav-item"><Link to="/category/women">Women</Link></div>
        <div className="nav-item"><Link to="/category/kids">Kids</Link></div>
        <div className="nav-item"><Link to="/contact">Contact Us</Link></div>
      </nav>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <FiMic className="mic" />
        {suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((item, i) => (
              <div className="suggestion-item" key={i}>
                <img src={item.img} alt={item.name} />
                <span>{item.name}</span>
                <strong>{item.price}</strong>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Icons */}
      <div className="nav-icons">
        <button onClick={() => setDarkMode(!darkMode)} className="icon-btn">
          {darkMode ? <FiMoon /> : <FiSun />}
        </button>
        <div className="icon-btn">
          <FiHeart />
          {wishlistItems > 0 && <span className="badge">{wishlistItems}</span>}
        </div>
        <div className="icon-btn">
          <FiShoppingCart />
          {cartItems > 0 && <span className="badge">{cartItems}</span>}
        </div>

        {/* ✅ Clean Login Button only */}
        <div className="login-btn">
          <Link to="/login">Login</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
