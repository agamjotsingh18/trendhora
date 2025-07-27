import './Control.css' // Keep your custom CSS file for overall layout
// REMOVED: import PersonOutlineIcon from '@mui/icons-material/PersonOutline'; // Remove if not used elsewhere
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'; // Assuming this is your cart icon, ensure it's imported
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
// REMOVED: import Cart from '../../Card/Cart/Cart'; // We'll use a direct icon for consistency unless Cart handles more
import { useContext } from 'react';
import { WishItemsContext } from '../../../Context/WishItemsContext';

// Import Material-UI components
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box'; // For flexible container and spacing

const Control = () => {
    const wishItems = useContext(WishItemsContext);
    // If you have a CartContext for the badge, uncomment and import:
    // const cartItems = useContext(CartContext);

    // Define common button styles using a single object for consistency
    const commonButtonStyle = {
        backgroundColor: '#FFE082', // Yellowish background color
        color: 'black',             // Text/icon color
        borderRadius: '15px',       // Rounded corners
        border: '1px solid #FFC107', // Border to mimic the outline
        minWidth: 'unset',          // Allow button to shrink to content
        height: '45px',             // Consistent height for all buttons
        display: 'flex',            // Use flex to center content
        alignItems: 'center',       // Center content vertically
        justifyContent: 'center',   // Center content horizontally
        '&:hover': {
            backgroundColor: '#FFD700', // Slightly darker yellow on hover
            // You might want to remove the border on hover if it looks better:
            // border: '1px solid #FFD700',
        },
    };

    // Styles for buttons that only contain an icon (Heart and Cart)
    const iconButtonStyle = {
        ...commonButtonStyle, // Inherit common styles
        width: '45px',       // Make them square
        padding: '0',        // No internal padding for icon-only buttons
    };

    return (
        <div className="control__bar__container">
            <div className="controls__container">

                {/* LOGIN Button */}
                {/* Wrap in Box if you need individual item spacing not handled by gap on controls__container */}
                <Box>
                    <Link to="/account/login" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            sx={{
                                ...commonButtonStyle, // Apply base styles
                                padding: '6px 15px', // Specific padding for text+icon button to make it wider
                            }}
                            startIcon={<LockOutlinedIcon sx={{ color: 'black' }} />}
                        >
                            LOGIN
                        </Button>
                    </Link>
                </Box>

                {/* Wishlist Button (Heart Icon) */}
                <Box>
                    <Link to="/wishlist" style={{ textDecoration: 'none' }}>
                        <Badge badgeContent={wishItems.items.length} color="error" overlap="circular">
                            <Button
                                variant="contained"
                                sx={iconButtonStyle} // Apply square icon button styles
                                aria-label="Wishlist" // Good for accessibility
                            >
                                <FavoriteBorderIcon sx={{ color: 'black', fontSize: '24px' }}/>
                            </Button>
                        </Badge>
                    </Link>
                </Box>

                {/* Cart Button (Shopping Cart Icon) */}
                <Box>
                    {/* Assuming '/cart' is the path for the cart page */}
                    <Link to="/cart" style={{ textDecoration: 'none' }}>
                        <Badge
                            badgeContent={/* cartItems.items.length || */ 0} // Replace 0 with actual cart item count
                            color="error"
                            overlap="circular"
                            showZero // Show badge even if count is 0
                        >
                            <Button
                                variant="contained"
                                sx={iconButtonStyle} // Apply square icon button styles
                                aria-label="Shopping Cart" // Good for accessibility
                            >
                                {/* Using ShoppingCartOutlinedIcon directly for consistency */}
                                <ShoppingCartOutlinedIcon sx={{ color: 'black', fontSize: '24px' }}/>
                            </Button>
                        </Badge>
                    </Link>
                </Box>

            </div>
        </div>
    );
}

export default Control;