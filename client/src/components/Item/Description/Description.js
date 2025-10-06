
import "./Description.css";
import { useContext, useMemo, useState } from "react";
import { Button, IconButton, Rating } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { WishItemsContext } from "../../../Context/WishItemsContext";

/* 🔹 Delivery & Offers Component - Enhanced */
const DeliveryOffers = ({ delivery, offers }) => {
  const [pincode, setPincode] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | ok | error

  const checkDelivery = () => {
    const cleaned = (pincode || "").trim();
    if (!/^\d{6}$/.test(cleaned)) {
      setStatus("error");
      setMessage("Please enter a valid 6-digit pincode.");
      return;
    }
    // Simulated logic: even last digit -> 2 days, odd -> 4 days
    const days = parseInt(cleaned[cleaned.length - 1]) % 2 === 0 ? 2 : 4;
    setStatus("ok");
    setMessage(`Estimated delivery: ${days} day${days > 1 ? "s" : ""} to ${cleaned}.`);
  };

  const reset = () => {
    setPincode("");
    setMessage("");
    setStatus("idle");
  };

  return (
    <div className="delivery-offers">
      <div className="section-header">
        <h4>Delivery & Offers</h4>
      </div>

      <p className="delivery-text">{delivery}</p>

      {/* Pincode Check */}
      <div className="pincode-check">
        <div className="pincode-input-group">
          <input
            type="text"
            placeholder="Enter 6-digit pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            maxLength={6}
            inputMode="numeric"
          />
          <button className="btn-primary" onClick={checkDelivery}>Check</button>
          <button className="btn-ghost" onClick={reset}>Reset</button>
        </div>
        {message && (
          <div className={`delivery-status ${status}`}>
            <span className="dot" />
            {message}
          </div>
        )}
      </div>

      <div className="offers-list">
        <h5>Available Offers</h5>
        <ul>
          {offers.length > 0 ? (
            offers.map((offer, i) => <li key={i}>{offer}</li>)
          ) : (
            <li>No current offers.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

/* 🔹 Main Description Component with Tabs */
const Description = ({ item }) => {
  const cartItems = useContext(CartItemsContext);
  const wishItems = useContext(WishItemsContext);

  const handleAddToCart = () => cartItems.addItem(item);
  const handleAddToWish = () => wishItems.addItem(item);

  // Safe access with optional chaining and defaults
  const images = item?.images || ["https://via.placeholder.com/400"];
  const name = item?.name || "Product Name";
  const price = item?.price || 0;
  const details = item?.details || "No details available.";
  const highlights = item?.highlights || [];
  const delivery = item?.delivery || "Delivery within 3-5 business days.";
  const offers = item?.offers || [];
  const reviews = item?.reviews || [];

  const [activeTab, setActiveTab] = useState("highlights");

  const averageRating = useMemo(() => {
    if (!reviews?.length) return 0;
    const sum = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }, [reviews]);

  return (
    <div className="product-container">
      <div className="product-header">
        <h3 className="product-name">{name}</h3>
        <div className="product-price">${price}</div>
      </div>

      {/* Tab Controls */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "highlights" ? "active" : ""}`}
          onClick={() => setActiveTab("highlights")}
        >
          Highlights
        </button>
        <button
          className={`tab-button ${activeTab === "delivery" ? "active" : ""}`}
          onClick={() => setActiveTab("delivery")}
        >
          Delivery & Offers
        </button>
        <button
          className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {/* Panels */}
      <div className="tab-panel">
        {activeTab === "highlights" && (
          <div className="highlights">
            <h4>Highlights</h4>
            <ul>
              {highlights.length > 0 ? (
                highlights.map((h, i) => (
                  <li key={i}>
                    <CheckCircleIcon /> {h}
                  </li>
                ))
              ) : (
                <li>No highlights available.</li>
              )}
            </ul>

            <div className="product-details">
              <h4>Details</h4>
              <p>{details}</p>
            </div>
          </div>
        )}

        {activeTab === "delivery" && (
          <DeliveryOffers delivery={delivery} offers={offers} />
        )}

        {activeTab === "reviews" && (
          <div className="reviews-section">
            <div className="reviews-summary">
              <div className="rating-score">
                <span className="score">{averageRating}</span>
                <Rating value={averageRating} precision={0.5} readOnly size="medium" />
              </div>
              <div className="rating-count">{reviews.length} review{reviews.length !== 1 ? "s" : ""}</div>
            </div>

            {reviews.length > 0 ? (
              reviews.map((r, i) => (
                <div key={i} className="review-card">
                  <div className="review-header">
                    <div className="avatar">{(r.user || "A").charAt(0).toUpperCase()}</div>
                    <div className="meta">
                      <strong>{r.user || "Anonymous"}</strong>
                      <Rating value={r.rating || 0} readOnly size="small" />
                    </div>
                  </div>
                  <p className="review-text">{r.comment || "No comment"}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/* 🔹 Default props fallback */
Description.defaultProps = {
  item: {
    name: "Product Name",
    price: 0,
    details: "No details available.",
    images: ["https://via.placeholder.com/400"],
    highlights: [],
    delivery: "Delivery within 3-5 business days.",
    offers: [],
    reviews: [],
  },
};

export default Description;

import './Description.css';
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Chip
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const Description = (props) => {
  const [expanded, setExpanded] = useState('details');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Mock data for highlights if not available
  const highlights = props.item.highlights || [
    "100% authentic product",
    "Premium quality materials",
    "Expert craftsmanship",
    "Sustainable manufacturing",
    "Designer collaboration"
  ];

  const specifications = [
    { label: "Material", value: "Premium Cotton Blend" },
    { label: "Care Instructions", value: "Machine wash cold, tumble dry low" },
    { label: "Origin", value: "Designed in Italy" },
    { label: "Fit", value: "Regular fit, true to size" },
    { label: "Model", value: "185cm, wearing size M" }
  ];

  return (
    <div className="enterprise-description-container">
      {/* Main Description Card */}
      <Card className="description-main-card">
        <CardContent>
          <Typography variant="h4" className="description-title">
            Product Details
          </Typography>
          <Typography variant="body1" className="description-text">
            {props.item.details || props.item.description || 
            "Discover exceptional quality and timeless design with this premium piece. Crafted with attention to detail and made from the finest materials, this product represents the perfect blend of style, comfort, and durability."}
          </Typography>
        </CardContent>
      </Card>

      {/* Expandable Sections */}
      <div className="description-accordions">
        {/* Product Details */}
        <Accordion 
          expanded={expanded === 'details'} 
          onChange={handleChange('details')}
          className="description-accordion"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className="accordion-header"
          >
            <InfoOutlinedIcon className="accordion-icon" />
            <Typography variant="h6">Product Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="specifications-grid">
              {specifications.map((spec, index) => (
                <div key={index} className="specification-item">
                  <span className="spec-label">{spec.label}:</span>
                  <span className="spec-value">{spec.value}</span>
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Highlights */}
        <Accordion 
          expanded={expanded === 'highlights'} 
          onChange={handleChange('highlights')}
          className="description-accordion"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className="accordion-header"
          >
            <CheckCircleOutlineIcon className="accordion-icon" />
            <Typography variant="h6">Key Features</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="highlights-container">
              {highlights.map((highlight, index) => (
                <div key={index} className="highlight-item">
                  <CheckCircleOutlineIcon className="highlight-icon" />
                  <Typography variant="body2">{highlight}</Typography>
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Shipping & Returns */}
        <Accordion 
          expanded={expanded === 'shipping'} 
          onChange={handleChange('shipping')}
          className="description-accordion"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className="accordion-header"
          >
            <LocalShippingIcon className="accordion-icon" />
            <Typography variant="h6">Shipping & Returns</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="shipping-info">
              <div className="shipping-item">
                <LocalShippingIcon className="shipping-icon" />
                <div>
                  <Typography variant="subtitle2">Free Standard Shipping</Typography>
                  <Typography variant="body2" color="text.secondary">
                    On orders over $100. Delivery in 3-5 business days.
                  </Typography>
                </div>
              </div>
              
              <div className="shipping-item">
                <SecurityIcon className="shipping-icon" />
                <div>
                  <Typography variant="subtitle2">Easy Returns</Typography>
                  <Typography variant="body2" color="text.secondary">
                    30-day return policy. Free return shipping.
                  </Typography>
                </div>
              </div>
              
              <div className="shipping-item">
                <SupportAgentIcon className="shipping-icon" />
                <div>
                  <Typography variant="subtitle2">Customer Support</Typography>
                  <Typography variant="body2" color="text.secondary">
                    24/7 customer service. Live chat available.
                  </Typography>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

      {/* Trust Badges */}
      <div className="trust-badges">
        <Chip 
          icon={<SecurityIcon />} 
          label="Secure Checkout" 
          className="trust-badge"
        />
        <Chip 
          icon={<CheckCircleOutlineIcon />} 
          label="Authentic Products" 
          className="trust-badge"
        />
        <Chip 
          icon={<LocalShippingIcon />} 
          label="Fast Shipping" 
          className="trust-badge"
        />
      </div>
    </div>
  );
}

export default Description;

