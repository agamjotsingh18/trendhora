import { Fragment, useContext, useState } from "react";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import CartCard from "./CartCard/CartCard";
import "./Cart.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import land from "../../../asset/brand/cart.jpg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "320px",
  width: "90%",
  maxWidth: "480px",
  height: "auto",
  maxHeight: "90vh",
  bgcolor: "background.paper",
  border: "3px solid #FFE26E",
  borderRadius: "12px",
  boxShadow: 24,
  p: 2,
  zIndex: 1500,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column"
};

const Cart = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openCheckoutModal, setOpenCheckoutModal] = useState(false);
  const handleCheckoutOpen = () => setOpenCheckoutModal(true);
  const handleCheckoutClose = () => setOpenCheckoutModal(false);

  // Customer details state
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  const cartItems = useContext(CartItemsContext);
  const totalBill = cartItems.items.reduce((sum,item)=>sum+item.price,0);


  const handleCheckout = () => {
    if (cartItems.items.length > 0) {
      handleCheckoutOpen();
    }
  };

  const handleWhatsAppOrder = () => {
    if (!customerDetails.name || !customerDetails.phone) {
      alert('Please fill in your name and phone number');
      return;
    }

    // Format cart items for WhatsApp message
    const itemsList = cartItems.items.map(item => 
      `• ${item.name} - Size: ${item.size?.[0] || 'N/A'} - $${item.price} (Qty: ${item.itemQuantity || 1})`
    ).join('\n');

    const message = `🛍️ *New Order from Trendhora*\n\n📋 *Order Details:*\n${itemsList}\n\n💰 *Total: $${totalBill.toFixed(2)}*\n\n👤 *Customer Details:*\n📞 Name: ${customerDetails.name}\n📱 Phone: ${customerDetails.phone}\n📧 Email: ${customerDetails.email || 'Not provided'}\n📍 Address: ${customerDetails.address || 'Not provided'}\n\nPlease confirm this order!`;

    const whatsappNumber = '919876543210'; // Same number from reference site
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    handleCheckoutClose();
    setCustomerDetails({ name: '', phone: '', email: '', address: '' });
  };

  const handleInputChange = (field, value) => {
    setCustomerDetails(prev => ({ ...prev, [field]: value }));
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
          <div className="checkout-form">
            <h3>Complete Your Order</h3>
            
            <div>
              <TextField
                fullWidth
                label="Full Name *"
                variant="outlined"
                size="small"
                value={customerDetails.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            
            <div>
              <TextField
                fullWidth
                label="Phone Number *"
                variant="outlined"
                size="small"
                value={customerDetails.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>
            
            <div>
              <TextField
                fullWidth
                label="Email (Optional)"
                variant="outlined"
                size="small"
                value={customerDetails.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
            
            <div>
              <TextField
                fullWidth
                label="Delivery Address (Optional)"
                variant="outlined"
                size="small"
                multiline
                rows={2}
                value={customerDetails.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </div>
            
            <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>
              Total: ${totalBill.toFixed(2)}
            </div>
            
            <div className="checkout-buttons">
              <Button 
                variant="contained" 
                onClick={handleWhatsAppOrder}
                startIcon={<WhatsAppIcon />}
                className="whatsapp-btn"
              >
                Order via WhatsApp
              </Button>
              <Button variant="outlined" onClick={handleCheckoutClose} className="cancel-btn">
                CANCEL
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default Cart;
