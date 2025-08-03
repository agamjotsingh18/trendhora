import './ItemCard.css';
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { IconButton, Tooltip } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { WishItemsContext } from '../../../Context/WishItemsContext';

const ItemCard = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);
    const cartItemsContext = useContext(CartItemsContext);
    const wishItemsContext = useContext(WishItemsContext);

    if (!item || !item.category || !item.image || item.image.length === 0) return null;

    const getImageUrl = (image) => {
        return window.location.hostname === "localhost"
            ? `/public/${item.category}/${image.filename}`
            : `https://trendhora-api.onrender.com/public/${item.category}/${image.filename}`;
    };

    return (
        <div className="product-card">
            <div
                className="product-card-image"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Link to={`/item/${item.category}/${item._id}`}>
                    <img
                        src={isHovered && item.image[1] ? getImageUrl(item.image[1]) : getImageUrl(item.image[0])}
                        alt={item.name}
                        className="product-img"
                    />
                </Link>
                <div className="product-card-actions">
                    <Tooltip title="Add to Wishlist">
                        <IconButton onClick={() => wishItemsContext.addItem(item)} className="product-action-btn">
                            <FavoriteBorderIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Add to Cart">
                        <IconButton onClick={() => cartItemsContext.addItem(item, 1)} className="product-action-btn">
                            <AddShoppingCartIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <div className="product-card-details">
                <Link to={`/item/${item.category}/${item._id}`} className="product-card-name">
                    {item.name}
                </Link>
                <div className="product-card-description">{item.description}</div>
                <div className="product-card-price">${item.price}</div>
            </div>
        </div>
    );
};

export default ItemCard;
