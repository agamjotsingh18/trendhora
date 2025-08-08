import './Description.css';
import { useContext, useState } from "react";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { WishItemsContext } from "../../../Context/WishItemsContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Description = (props) => {

      const cartItems = useContext(CartItemsContext);
      const wishItems = useContext(WishItemsContext);

      const handelAddToCart = () => {
    cartItems.addItem(props.item);
  };

  const handelAddToWish = () => {
    wishItems.addItem(props.item);
  };
    return ( 
        <div className="product__description__product">
            <div className="description__header__container">
                <div className="description__header__line"></div>
                <div className="description__header">DETAILS</div>
            </div>
            <div className="description__detail__container">
                <div className="description__detail">
                <p>{props.item.details}</p>
                </div>
            </div>
            <div className="description__specifics__container">
                <div className="description__specifics w-100">
                <div className="description__header__line"></div>
                <div className="description__highlights__header">Highlights</div>
                    <ul className='list-group list-group-flush '>
                        {props.item.highlights.map((highlight) =>
                        <div className='list-item-container mb-4'>
                            <li className='list-group-item'> <CheckCircleIcon/>{highlight}</li> 
                        </div>
                        )}   
                    </ul>                
                    </div>
                <div className='card__wrapper'>
                    <div className='card text-center desc__card'>
                        <h3 className='card-header desc__title'><b><b>$ {props.item.price}</b></b> for {props.item.name}</h3>
                        <div className='card-body desc__body'>
                            <div className='bg-light-subtle'>{props.item.description}</div>
                            <div className="collect__item__actions">
                                <div className="add__cart__add__wish">
                                    <div className="add__cart">
                                        <Button
                                        size='small'
                                        variant="outlined"
                                        sx={[
                                            {
                                            "&:hover": {
                                                backgroundColor: "#FFE26E",
                                                borderColor: "#FFE26E",
                                                borderWidth: "3px",
                                                color: "black",
                                            },
                                            minWidth:100,
                                            borderColor: "#ff385c",
                                            backgroundColor: "#ff385c",
                                            color: "white",
                                            borderWidth: "3px",
                                            },
                                        ]}
                                        onClick={handelAddToCart}
                                        >
                                        ADD TO BAG
                                        </Button>
                                    </div>
                                    <div className="add__wish">
                                        <IconButton
                                        variant="outlined"
                                        size="small"
                                        sx={[
                                            {
                                            "&:hover": {
                                                backgroundColor: "#FFE26E",
                                                borderColor: "#FFE26E",
                                                borderWidth: "3px",
                                                color: "black",
                                            },
                                            borderColor: "black",
                                            backgroundColor:"#ff385c",
                                            color: "white",
                                            },
                                        ]}
                                        onClick={handelAddToWish}
                                        >
                                        <FavoriteBorderIcon sx={{ width: "22px", height: "22px" }} />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Description;