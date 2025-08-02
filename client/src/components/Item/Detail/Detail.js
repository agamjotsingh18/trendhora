import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import "./Detail.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { WishItemsContext } from "../../../Context/WishItemsContext";

const Detail = ({ item }) => {
  const { id, category } = useParams(); // ✅ Ensure category is retrieved
  const cartItems = useContext(CartItemsContext);
  const wishItems = useContext(WishItemsContext);
  const [currentItem, setCurrentItem] = useState(item || null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  useEffect(() => {
    // 🔁 Load from localStorage if item is not passed as a prop
    if (!item && id && category) {
      const recent = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
      const found = recent.find(
        (product) => product._id === id && product.category === category
      );
      setCurrentItem(found);
      if (found && found.size?.length > 0) {
        setSize(found.size[0]);
      }
    } else if (item && item.size?.length > 0) {
      setSize(item.size[0]);
    }
  }, [id, category, item]);

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handelQuantityIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handelQuantityDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handelAddToCart = () => {
    cartItems.addItem(currentItem, quantity, size);
  };

  const handelAddToWish = () => {
    wishItems.addItem(currentItem);
  };

  if (!currentItem) return <p>Loading product details...</p>;

  return (
    <div className="product__detail__container">
      <div className="product__detail">
        <div className="product__main__detail">
          <div className="product__name__main">{currentItem.name}</div>
          <div className="product__detail__description">
            {currentItem.description || "No description available."}
          </div>
          <div className="product__color">
            <div className="product-color-label">COLOR</div>
            <div className="product-color-options">
              {["#FF0000", "#0000FF", "#008000", "#FFA500", "#800080", "#000000", "#FFC0CB"].map(
                (clr, idx) => (
                  <div
                    key={idx}
                    className="product-color"
                    style={{ backgroundColor: clr }}
                  ></div>
                )
              )}
            </div>
          </div>
          <div className="product__price__detail">${currentItem.price}</div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="product__form">
          <div className="product__quantity__and__size">
            <div className="product__quantity">
              <IconButton onClick={handelQuantityIncrement}>
                <AddCircleIcon />
              </IconButton>
              <div className="quantity__input">{quantity}</div>
              <IconButton onClick={handelQuantityDecrement}>
                <RemoveCircleIcon fontSize="medium" />
              </IconButton>
            </div>

            <div className="product size">
              <Box sx={{ minWidth: 100 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Size</InputLabel>
                  <Select value={size} label="size" onChange={handleSizeChange}>
                    {currentItem.size?.map((s, idx) => (
                      <MenuItem value={s} key={idx}>
                        {s}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>

          <div className="collect__item__actions">
            <div className="add__cart__add__wish">
              <div className="add__cart">
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    "&:hover": {
                      backgroundColor: "#FFE26E",
                      borderColor: "#FFE26E",
                      borderWidth: "3px",
                      color: "black",
                    },
                    minWidth: 200,
                    borderColor: "black",
                    backgroundColor: "black",
                    color: "#FFE26E",
                    borderWidth: "3px",
                  }}
                  onClick={handelAddToCart}
                >
                  ADD TO BAG
                </Button>
              </div>

              <div className="add__wish">
                <IconButton
                  variant="outlined"
                  size="large"
                  sx={{
                    "&:hover": {
                      backgroundColor: "#FFE26E",
                      borderColor: "#FFE26E",
                      borderWidth: "3px",
                      color: "black",
                    },
                    borderColor: "black",
                    backgroundColor: "black",
                    color: "#FFE26E",
                    borderWidth: "3px",
                  }}
                  onClick={handelAddToWish}
                >
                  <FavoriteBorderIcon sx={{ width: "22px", height: "22px" }} />
                </IconButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Detail;
