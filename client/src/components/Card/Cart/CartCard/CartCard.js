import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext, useState, useEffect } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './CartCard.css';
import { CartItemsContext } from '../../../../Context/CartItemsContext';
import { IconButton, Tooltip, Chip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import WarningIcon from '@mui/icons-material/Warning';

const CartCard = (props) => {
    let cartItems  = useContext(CartItemsContext)
    const [size, setSize] = useState(props.item.size[0]);
    const [stockInfo, setStockInfo] = useState({ stock: 0, stockStatus: 'in_stock' });
    const [stockWarning, setStockWarning] = useState('');

    useEffect(() => {
        // Fetch stock information for this item
        if (props.item._id) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/items/${props.item._id}`)
                .then(res => res.json())
                .then(data => {
                    setStockInfo({
                        stock: data.stock || 0,
                        stockStatus: data.stockStatus || 'in_stock'
                    });
                    
                    // Check if current quantity exceeds available stock
                    if (props.item.itemQuantity > data.stock) {
                        setStockWarning(`Only ${data.stock} available`);
                    } else {
                        setStockWarning('');
                    }
                })
                .catch(err => console.error("Error fetching stock info:", err));
        }
    }, [props.item._id, props.item.itemQuantity]);

    const handelQuantityIncrement = (event) => {
        // Check if we can increment based on available stock
        if (props.item.itemQuantity < stockInfo.stock) {
            cartItems.quantity(props.item.id, 'INC');
        }
    };

    const handelQuantityDecrement = (event) => {
        if(props.item.itemQuantity >1){
            cartItems.quantity(props.item.id, 'DEC');
        }
    };

    const handelRemoveItem = () => {
        cartItems.removeItem(props.item)
    }

    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };

    return (
        <div className='cart__item__card'>
            <div className="cart__item__detail">
                <div className="cart__item__image">
                    <img src={`https://trendhora-api.onrender.com/${props.item.category}/${props.item.image[0].filename}`} alt="item" className="item__image"/>
                </div>
                <div className="cart__item__name">
                    {props.item.name}
                    {stockInfo.stockStatus === 'out_of_stock' && (
                        <Chip 
                            icon={<WarningIcon />}
                            label="Out of Stock" 
                            color="error" 
                            size="small"
                            style={{ marginLeft: '8px' }}
                        />
                    )}
                    {stockInfo.stockStatus === 'low_stock' && (
                        <Chip 
                            icon={<WarningIcon />}
                            label={`Only ${stockInfo.stock} left`}
                            color="warning" 
                            size="small"
                            style={{ marginLeft: '8px' }}
                        />
                    )}
                    {stockWarning && (
                        <div style={{ color: 'red', fontSize: '0.85rem', marginTop: '4px' }}>
                            {stockWarning}
                        </div>
                    )}
                </div>
            </div>
            <div className="cart__item__quantity">
                <Tooltip title={props.item.itemQuantity >= stockInfo.stock ? 'Max stock reached' : 'Increase quantity'}>
                    <span>
                        <IconButton 
                            onClick={handelQuantityIncrement}
                            disabled={props.item.itemQuantity >= stockInfo.stock || stockInfo.stock === 0}
                        >
                            <AddCircleIcon />
                        </IconButton>
                    </span>
                </Tooltip>
                <div type="text" name="quantity" className="quantity__input">{props.item.itemQuantity}</div>
                <IconButton onClick={handelQuantityDecrement}>
                    <RemoveCircleIcon fontSize='medium'/>
                </IconButton>
            </div>
            <div className="product size">
                <Box sx={{ minWidth: 80} }>
                    <FormControl fullWidth size="small">
                        <InputLabel>Size</InputLabel>
                        <Select
                        value={size}
                        label="size"
                        onChange={handleSizeChange}
                        >
                        {props.item.size.map((size) => <MenuItem value={size}>{size}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <div className="cart__item__price">${props.item.price}</div>
            <div className="remove__item__icon">
                <IconButton>
                    <HighlightOffIcon onClick={handelRemoveItem}/>
                </IconButton>
            </div>
        </div>
     );
}
 
export default CartCard;