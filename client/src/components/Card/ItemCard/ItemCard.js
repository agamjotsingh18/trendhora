// import './ItemCard.css';
// import { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { CartItemsContext } from "../../../Context/CartItemsContext";
// import { IconButton } from '@mui/material';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import { WishItemsContext } from '../../../Context/WishItemsContext';
// import Toaster from '../../Toaster/toaster'; // Import the Toaster component

// const ItemCard = (props) => {
//     const [isHovered, setIsHovered] = useState(false);
//     const [showToaster, setShowToaster] = useState(false);
//     const [toasterMessage, setToasterMessage] = useState('');

//     const cartItemsContext = useContext(CartItemsContext);
//     const wishItemsContext = useContext(WishItemsContext);

//     const handleAddToWishList = () => {
//         wishItemsContext.addItem(props.item);
//         setToasterMessage("Your item has been added to wishlist.");
//         setShowToaster(true);
//     };

//     // const handleAddToCart = () => {
//     //     cartItemsContext.addItem(props.item, 1);
//     //     setToasterMessage("Your item has been added to cart.");
//     //     setShowToaster(true);
//     // };
//     const handleAddToCart = () => {
//   const existingItem = cartItemsContext.items.find(item => item._id === props.item._id);

//   const currentQty = existingItem?.quantity ?? 0;
//   const newQuantity = currentQty + 1;

//   cartItemsContext.addItem(props.item, 1);

//   setToasterMessage(`"${props.item.name}" added to cart\nQuantity ${newQuantity} added to cart`);
//   setShowToaster(true);
// };

//     const handleCloseToaster = () => {
//         setShowToaster(false);
//     };

//     if (!props.item || !props.item.category || !props.item.image || props.item.image.length === 0) {
//         return null; // Avoid rendering if item is not defined or missing required properties
//     }

//     const getImageUrl = (image) => {
//         const url = `https://trendhora-api.onrender.com/public/${props.item.category}/${image.filename}`;
//         return url;
//     };

//     return (
//         <>
//             <div className="product__card__card">
//                 <div className="product__card">
//                     <div className="product__image"
//                         onMouseEnter={() => setIsHovered(true)}
//                         onMouseLeave={() => setIsHovered(false)}
//                     >
//                         {isHovered && props.item.image[1] ?
//                             <img src={getImageUrl(props.item.image[1])} alt="item" className="product__img" /> :
//                             <img src={getImageUrl(props.item.image[0])} alt="item" className="product__img" />
//                         }
//                     </div>
//                     <div className="product__card__detail">
//                         <div className="product__name">
//                             <Link to={`/item/${props.item.category}/${props.item._id}`}>
//                                 {props.item.name}
//                             </Link>
//                         </div>
//                         <div className="product__description">
//                             <span>{props.item.description}</span>
//                         </div>
//                         <div className="product__price">
//                             <span>${props.item.price}</span>
//                         </div>
//                         <div className="product__card__action">
//                             <IconButton onClick={handleAddToWishList} sx={{ borderRadius: '20px', width: '40px', height: '40px' }}>
//                                 <FavoriteBorderIcon sx={{ width: '22px', height: '22px', color: 'black' }} />
//                             </IconButton>
//                             <IconButton onClick={handleAddToCart} sx={{ borderRadius: '20px', width: '40px', height: '40px' }}>
//                                 <AddShoppingCartIcon sx={{ width: '22px', height: '22px', color: 'black' }} />
//                             </IconButton>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Toaster Component */}
//             {/* <Toaster
//                 message={toasterMessage}
//                 isVisible={showToaster}
//                 onClose={handleCloseToaster}
//                 type="success"
//                 duration={4000}
//             /> */}
//             <Toaster
//     title={toasterMessage.includes("wishlist")
//         ? `Added "${props.item.name}" to wishlist`
//         : ` "${props.item.name}" added to cart`}
//     message={toasterMessage}
//     isVisible={showToaster}
//     onClose={handleCloseToaster}
//     type="success"
//     duration={1000}
// />

//         </>
//     );
// };

// export default ItemCard;

import "./ItemCard.css";
import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { WishItemsContext } from "../../../Context/WishItemsContext";
import Toaster from "../../Toaster/toaster";
import axios from "axios";

const ItemCard = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showToaster, setShowToaster] = useState(false);
  const [toasterTitle, setToasterTitle] = useState("");
  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterType, setToasterType] = useState("success"); // success | destructive | warning

  const [product, setProduct] = useState(null);
  const { category, id } = useParams();

  useEffect(() => {
    if (!props.item && category && id) {
      axios
        .get(`/api/item/${category}/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => console.error(err));
    }
  }, [props.item, category, id]);

  const cartItemsContext = useContext(CartItemsContext);
  const wishItemsContext = useContext(WishItemsContext);

  const currentItem = props.item || product;

  const saveToRecentlyViewed = (product) => {
    const existing = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    const filtered = existing.filter((p) => p.id !== product._id);

    const updated = [
      {
        id: product._id,
        name: product.name,
        image: `https://trendhora-api.onrender.com/public/${product.category}/${product.image[0]?.filename}`,
        price: product.price,
        category: product.category,
        description: product.description,
      },
      ...filtered,
    ];

    localStorage.setItem("recentlyViewed", JSON.stringify(updated.slice(0, 6)));
  };

  const handleAddToWishList = () => {
    const token = localStorage.getItem("token");
    console.log(token);

    if (!token) {
      setToasterTitle("Login required");
      setToasterMessage("Please log in to add items to your wishlist.");
      setToasterType("destructive"); // 🔴 Error toast
      setShowToaster(true);
      return;
    }

    wishItemsContext.addItem(currentItem);
    setToasterTitle(`Added "${currentItem.name}" to wishlist`);
    setToasterMessage("Your item has been added to wishlist.");
    setToasterType("success"); // ✅ Success toast
    setShowToaster(true);
  };

  const handleAddToCart = () => {
    cartItemsContext.addItem({ ...currentItem, quantity: 1 });
    const cartItem = cartItemsContext.items.find(
      (i) => i._id === currentItem._id
    );
    const updatedQty = cartItem ? cartItem.quantity : 1;
    setToasterTitle(`"${currentItem.name}" added to cart`);
    setToasterMessage(`Quantity: ${updatedQty || 1}`);
    setToasterType("success"); // ✅ Success toast
    setShowToaster(true);
  };

  const handleCloseToaster = () => {
    setShowToaster(false);
  };

  if (
    !currentItem ||
    !currentItem.category ||
    !currentItem.image ||
    currentItem.image.length === 0
  ) {
    return null;
  }

  const getImageUrl = (image) => {
    if (image.filename) {
      return `https://trendhora-api.onrender.com/public/${currentItem.category}/${image.filename}`;
    } else if (typeof image === "string") {
      return image;
    }
    return "";
  };

  return (
    <>
      <div className="product__card__card">
        <div className="product__card">
          <Link to={`/item/${currentItem.category}/${currentItem._id}`}>
            <div
              className="product__image"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isHovered && currentItem.image[1] ? (
                <img
                  src={getImageUrl(currentItem.image[1])}
                  alt="item"
                  className="product__img"
                />
              ) : (
                <img
                  src={getImageUrl(currentItem.image[0])}
                  alt="item"
                  className="product__img"
                />
              )}
            </div>
          </Link>
          <div className="product__card__detail">
            <div className="product__name">
              <Link
                to={`/item/${currentItem.category}/${currentItem._id}`}
                onClick={() => saveToRecentlyViewed(currentItem)}
              >
                {currentItem.name}
              </Link>
            </div>
            <div className="product__description">
              <span>{currentItem.description}</span>
            </div>
            <div className="product__price">
              <span>${currentItem.price}</span>
            </div>
            <div className="product__card__action">
              <IconButton
                onClick={handleAddToWishList}
                sx={{ borderRadius: "20px", width: "40px", height: "40px" }}
              >
                <FavoriteBorderIcon
                  sx={{ width: "22px", height: "22px", color: "black" }}
                />
              </IconButton>
              <IconButton
                onClick={handleAddToCart}
                sx={{ borderRadius: "20px", width: "40px", height: "40px" }}
              >
                <AddShoppingCartIcon
                  sx={{ width: "22px", height: "22px", color: "black" }}
                />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <Toaster
        title={toasterTitle}
        message={toasterMessage}
        isVisible={showToaster}
        onClose={handleCloseToaster}
        type={toasterType} // ✅ Uses dynamic type
        duration={1000}
      />
    </>
  );
};

export default ItemCard;
