import { Badge, Tooltip, Box } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Cart from '../../Card/Cart/Cart';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { WishItemsContext } from '../../../Context/WishItemsContext';

const Control = () => {
  const wishItems = useContext(WishItemsContext);

    return ( 
        <div className="control__bar__container">
            <div className="controls__container">
                <div className="control">
                    <Link to="/account/login">
                        <PersonOutlineIcon color="black" size="large" sx={{ width: '30px'}}/>
                    </Link>
                </div>
                <div className="control">
                    <Link to="/wishlist">
                        <Badge badgeContent={wishItems.items.length} color="error">
                            <FavoriteBorderIcon color="black" sx={{ width: '30px'}}/>
                        </Badge>
                    </Link>
                </div>
                <div className="control">
                    <Cart />
                </div>
                
            </div>
        </div>
     );
}
 
export default Control;
