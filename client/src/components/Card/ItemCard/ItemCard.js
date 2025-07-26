import './ItemCard.css';
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { WishItemsContext } from '../../../Context/WishItemsContext';
import Toaster from '../../Toaster/toaster'; // Import the Toaster component

const ItemCard = (props) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showToaster, setShowToaster] = useState(false);
    const [toasterMessage, setToasterMessage] = useState('');
    
    const cartItemsContext = useContext(CartItemsContext);
    const wishItemsContext = useContext(WishItemsContext);

    const handleAddToWishList = () => {
        wishItemsContext.addItem(props.item);
        setToasterMessage("Your item has been added to wishlist.");
        setShowToaster(true);
    };

    const handleAddToCart = () => {
        cartItemsContext.addItem(props.item, 1);
        setToasterMessage("Your item has been added to cart.");
        setShowToaster(true);
    };

    const handleCloseToaster = () => {
        setShowToaster(false);
    };

    if (!props.item || !props.item.category || !props.item.image || props.item.image.length === 0) {
        return null; // Avoid rendering if item is not defined or missing required properties
    }

    const getImageUrl = (image) => {
        const url = `https://trendhora-api.onrender.com/public/${props.item.category}/${image.filename}`;
        return url;
    };

    return (
        <>
            <div className="product__card__card">
                <div className="product__card">
                    <div className="product__image"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {isHovered && props.item.image[1] ?
                            <img src={getImageUrl(props.item.image[1])} alt="item" className="product__img" /> :
                            <img src={getImageUrl(props.item.image[0])} alt="item" className="product__img" />
                        }
                    </div>
                    <div className="product__card__detail">
                        <div className="product__name">
                            <Link to={`/item/${props.item.category}/${props.item._id}`}>
                                {props.item.name}
                            </Link>
                        </div>
                        <div className="product__description">
                            <span>{props.item.description}</span>
                        </div>
                        <div className="product__price">
                            <span>${props.item.price}</span>
                        </div>
                        <div className="product__card__action">
                            <IconButton onClick={handleAddToWishList} sx={{ borderRadius: '20px', width: '40px', height: '40px' }}>
                                <FavoriteBorderIcon sx={{ width: '22px', height: '22px', color: 'black' }} />
                            </IconButton>
                            <IconButton onClick={handleAddToCart} sx={{ borderRadius: '20px', width: '40px', height: '40px' }}>
                                <AddShoppingCartIcon sx={{ width: '22px', height: '22px', color: 'black' }} />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Toaster Component */}
            <Toaster
                message={toasterMessage}
                isVisible={showToaster}
                onClose={handleCloseToaster}
                type="success"
                duration={4000}
            />
        </>
    );
};

export default ItemCard;