import { useState, Fragment, useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import Cart from '../../Card/Cart/Cart';
import WishCard from '../../Card/Wishlist/WishCard';
import { WishItemsContext } from '../../../Context/WishItemsContext';

const DrawerNav = () => {
  const [state, setState] = useState({ left: false });
  const wishItems = useContext(WishItemsContext);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setState({ ...state, [anchor]: open });
  };

  const linkButtonStyle = {
    transition: '0.3s ease',
    textDecoration: 'none',
    color: 'var(--text-primary)',
    '&:hover': {
      backgroundColor: 'var(--bg-secondary)',
      paddingLeft: '20px',
      color: 'var(--accent-color)',
    },
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: 280,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-primary)',
        boxShadow: 'var(--shadow)',
        borderRight: '1px solid var(--border-color)',
        '& .cart__items__container': {
          backgroundColor: 'var(--bg-secondary)',
        },
        '& .dark-mode .cart__items__container': {
          backgroundColor: 'var(--bg-tertiary)',
          boxShadow: '0 2px 8px rgba(255, 255, 255, 0.1)',
        },
      }}
      role="presentation"
    >
      <List sx={{ paddingTop: '1rem' }}>
        {/* Navigation links */}
        {[
          { text: 'Home', to: '/' },
          { text: 'Shop', to: '/shop' },
          { text: 'Men', to: '/category/men' },
          { text: 'Women', to: '/category/women' },
          { text: 'Kids', to: '/category/kids' },
        ].map(({ text, to }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              component={Link}
              to={to}
              onClick={toggleDrawer(anchor, false)}
              sx={linkButtonStyle}
            >
              <ListItemText
                primary={text}
                primaryTypographyProps={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'inherit',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}

        {/* Divider */}
        <Box sx={{ my: 1, borderTop: '1px solid var(--border-color)' }} />

        {/* Account */}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/account/login"
            onClick={toggleDrawer(anchor, false)}
            sx={linkButtonStyle}
          >
            <PersonOutlineIcon sx={{ mr: 2 }} />
            <ListItemText primary="Account" primaryTypographyProps={{ fontWeight: 600, color: 'inherit' }} />
          </ListItemButton>
        </ListItem>

        {/* Wishlist */}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/wishlist"
          sx={{ ...linkButtonStyle, display: 'flex', alignItems: 'center' }}
          >
            <Badge
              badgeContent={wishItems.items.length}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: 'var(--danger-color)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  minWidth: 20,
                  height: 20,
                  borderRadius: '50%',
                  boxShadow: 'var(--shadow)',
                  marginRight: '1rem'
                },
              }}
            >
              <FavoriteBorderIcon sx={{ mr: 2 }} />
            </Badge>
            <ListItemText primary="Wishlist" primaryTypographyProps={{
              fontWeight: 600,              
              color: 'inherit',
            }} />
          </ListItemButton>
        </ListItem>

                 {/* Cart */}
         <ListItem disablePadding>
           <ListItemButton sx={{ ...linkButtonStyle, display: 'flex', alignItems: 'center',marginLeft:"-4px"}}>
             <Box sx={{ 
               '& svg': { 
                 color: 'var(--text-primary)',
                 fontSize: '1.8rem'
               } 
             }}>
               <Cart />
             </Box>
             <ListItemText
               primary="Cart"
               primaryTypographyProps={{
                 fontWeight: 600,
                 marginLeft:'10px',
                 color: 'inherit',
               }}
             />
           </ListItemButton>
         </ListItem>
      </List>
    </Box>
  );

  return (
    <Fragment>
      <Box sx={{ p: 1 }}>
        {state.left ? (
          <MenuOpenIcon
            fontSize="large"
            onClick={toggleDrawer('left', false)}
            sx={{
              cursor: 'pointer',
              backgroundColor: 'var(--accent-color)',
              borderRadius: '50%',
              padding: '4px',
              color: 'var(--bg-primary)',
            }}
          />
        ) : (
          <MenuIcon
            fontSize="large"
            onClick={toggleDrawer('left', true)}
            sx={{
              cursor: 'pointer',
              backgroundColor: 'var(--accent-color)',
              borderRadius: '50%',
              padding: '4px',
              color: 'var(--bg-primary)',
            }}
          />
        )}
      </Box>
      <Drawer anchor="left" open={state.left} onClose={toggleDrawer('left', false)}>
        {list('left')}
      </Drawer>
    </Fragment>
  );
};

export default DrawerNav;
