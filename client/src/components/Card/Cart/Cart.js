import { Fragment, useContext, useState } from "react";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import CartCard from "./CartCard/CartCard";
import "./Cart.css";
import Button from "@mui/material/Button";
import axios from "axios";
import land from "../../../asset/brand/cart.jpg";

const style = {
  position: "absolute",
  top: "60%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "350px",
  width: "90%", // mobile ke liye responsive
  maxWidth: "500px",
  height: "400px",
  bgcolor: "background.paper",
  border: "5px solid #FFE26E",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
  zIndex: 1500, // Drawer ke upar
};

const Cart = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openCheckoutModal, setOpenCheckoutModal] = useState(false);
  const handleCheckoutOpen = () => setOpenCheckoutModal(true);
  const handleCheckoutClose = () => setOpenCheckoutModal(false);

  const cartItems = useContext(CartItemsContext);
  const totalBill = cartItems.items.reduce((sum,item)=>sum+item.price,0);


  const handleCheckout = async () => {
    if (cartItems.totalAmount > 0) {
      const config = {
        reason: "checkout",
        amount: cartItems.totalAmount,
      };


      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/payment`, config)
        .then((res) => {
          console.log(res.data);
          window.location.replace(res.data);
          handleCheckoutOpen();
        })
        .catch((err) => console.log(err));
    } else {
      return;


    }
  };

  return (
    <Fragment>
      <Badge
        badgeContent={cartItems.items.length}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "#e53935",
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.7rem",
            minWidth: 20,
            height: 20,
            borderRadius: "50%",
            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
            marginRight: "8px",
          },
        }}
      >
        <ShoppingCartIcon
          color="black"
          onClick={handleOpen}
          sx={{ width: "35px" }}
        />
      </Badge>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="cart__header">
            <h2>Your Cart</h2>
          </div>
          <div className="cart__items__container">
            <div className="cartItems">
              {cartItems.items.length === 0 ? (
                <div className="cart__empty">
                  <img className="cartImg" src={land} alt="" />
                 
                </div>
              ) : (
                <div className="shop__cart__items">
                  {cartItems.items.map((item) => (
                    <CartCard key={item._id} item={item} />
                  ))}
                </div>
              )}
              {cartItems.items.length > 0 && (
                <div className="options">
                  <div className="total__amount">
                    <div className="total__amount__label">Total Amount:</div>
                    <div className="total__amount__value">
                      ${totalBill.toFixed(2)}
                    </div>
                  </div>
                  <div className="checkout">
                    <Button variant="outlined" onClick={handleCheckout}>
                      Checkout
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Box>
      </Modal>
      <Modal open={openCheckoutModal} onClose={handleCheckoutClose}>
        <Box sx={style}>
          <div className="d-flex w-100 h-100 justify-content-center align-items-center">
            <h2>Your checkout was successful</h2>
          </div>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default Cart;
