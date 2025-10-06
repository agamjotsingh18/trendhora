import "./Description.css";
import { useContext, useState } from "react";
import { Button, IconButton, Rating } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { WishItemsContext } from "../../../Context/WishItemsContext";

/* 🔹 Separate DeliveryOffers Component */
const DeliveryOffers = ({ delivery, offers }) => {
  const [pincode, setPincode] = useState("");
  const [message, setMessage] = useState("");

  // Dummy check function
  const checkDelivery = () => {
    if (!pincode || pincode.length !== 6) {
      setMessage("❌ Please enter a valid 6-digit pincode.");
      return;
    }

    // Dummy logic
    const days = parseInt(pincode[pincode.length - 1]) % 2 === 0 ? 2 : 4;
    setMessage(
      `✅ Product will be delivered in approx ${days} days to ${pincode}.`
    );
  };

  return (
    <div className="delivery-offers">
      <h4>Delivery Info</h4>
      <p>{delivery}</p>

      {/* Pincode Check */}
      <div className="pincode-check">
        <input
          type="text"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <button onClick={checkDelivery}>Check</button>
        <button
          onClick={() => {
            setPincode("");
            setMessage("");
          }}
        >
          Reset
        </button>
      </div>
      {message && <p className="delivery-msg">{message}</p>}

      <h4>Offers</h4>
      <ul>
        {offers.length > 0 ? (
          offers.map((offer, i) => <li key={i}>{offer}</li>)
        ) : (
          <li>No current offers.</li>
        )}
      </ul>
    </div>
  );
};

/* 🔹 Main Description Component */
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

  return (
    <div className="product-container">
      <div className="product-info">
        {/* Highlights */}
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
        </div>

        {/* Delivery & Offers ✅ */}
        <DeliveryOffers delivery={delivery} offers={offers} />

        {/* Reviews */}
        <div className="reviews-section">
          <h4>Customer Reviews</h4>
          {reviews.length > 0 ? (
            reviews.map((r, i) => (
              <div key={i} className="review-card">
                <div className="review-header">
                  <strong>{r.user || "Anonymous"}</strong>
                  <Rating value={r.rating || 0} readOnly size="small" />
                </div>
                <p>{r.comment || "No comment"}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
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
