import './ItemCard.css';
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { WishItemsContext } from '../../../Context/WishItemsContext';

const ItemCard = (props) => {
    const [isHovered, setIsHovered] = useState(false);
    const cartItemsContext = useContext(CartItemsContext);
    const wishItemsContext = useContext(WishItemsContext);

    const handleAddToWishList = () => {
        wishItemsContext.addItem(props.item);
    };

    const handleAddToCart = () => {
        cartItemsContext.addItem(props.item, 1);
    };

    if (!props.item || !props.item.category || !props.item.image || props.item.image.length === 0) {
        return null; // Avoid rendering if item is not defined or missing required properties
    }

    const getImageUrl = (image) => {
        const url = `https://trendhora-api.onrender.com/public/${props.item.category}/${image.filename}`;
        console.log('Image URL:', url);
        return url;
    };

    return (
        <div className="product__card__card">
            <div className="product__card">

                <Link to={`/item/${props.item.category}/${props.item._id}`}>
                <div className="product__image"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {isHovered && props.item.image[1] ?
                        <img src={getImageUrl(props.item.image[1])} alt="item" className="product__img" /> :
                        <img src={getImageUrl(props.item.image[0])} alt="item" className="product__img" />
                    }
                </div>
                </Link>
                
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
    );
};

export default ItemCard;
