import { useContext } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { IconButton, Button, Box, Typography } from "@mui/material";
import { WishItemsContext } from "../../../Context/WishItemsContext";
import "./WishCard.css";

const WishCard = ({ item }) => {
  const wishItems = useContext(WishItemsContext);

  const handelRemoveItem = () => {
    wishItems.removeItem(item);
  };

  const handelAddToCart = () => {
    wishItems.addToCart(item);
  };

  return (
    <Box
      className="wishcard"
      sx={{
        position: "relative",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
        },
        p: 2,
        bgcolor: "white",
        textAlign: "center",
      }}
    >
      {/* Remove Icon */}
      <IconButton
        onClick={handelRemoveItem}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          bgcolor: "white",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          "&:hover": { bgcolor: "#FFE26E" },
        }}
      >
        <HighlightOffIcon sx={{ color: "black" }} />
      </IconButton>

      {/* Image */}
      <Box
        sx={{
          height: 200, // slightly bigger for better product view
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <img
          src={`https://trendhora-api.onrender.com/public/${item.category}/${item.image[0].filename}`}
          alt={item.name}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            objectFit: "contain",
          }}
        />
      </Box>

      {/* Name */}
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "#333", mb: 1 }}
      >
        {item.name}
      </Typography>

      {/* Price */}
      <Typography variant="body1" sx={{ color: "#666", mb: 2 }}>
        ${item.price}
      </Typography>

      {/* Add to cart */}
      <Button
        variant="contained"
        onClick={handelAddToCart}
        sx={{
          bgcolor: "black",
          color: "#FFE26E",
          fontWeight: "bold",
          "&:hover": {
            bgcolor: "#FFE26E",
            color: "black",
          },
        }}
      >
        Add to Cart
      </Button>
    </Box>
  );
};

export default WishCard;
