import { useState, Fragment, useContext } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Badge from '@mui/material/Badge';
import { Link, useLocation } from 'react-router-dom';
import Cart from '../../Card/Cart/Cart';
import ThemeToggle from '../../ThemeToggle/ThemeToggle';
import { WishItemsContext } from '../../../Context/WishItemsContext';
import { motion, AnimatePresence } from 'framer-motion';
import NavBrand from '../Nav-Brand/Navbrand';
import { ListItemIcon } from '@mui/material';
import manWear from '../../../asset/icons/manWear.png'
import womanWear from '../../../asset/icons/womanWear.png'
import kidsWear from '../../../asset/icons/kidsWear.png'
import home from '../../../asset/icons/home.png'
import shop from '../../../asset/icons/shop.png'


const navLinks = [
  { text: 'Home', to: '/', icon: home},
  { text: 'Shop', to: '/shop', icon: shop },
  { text: 'Men', to: '/category/men', icon: manWear},
  { text: 'Women', to: '/category/women', icon: womanWear },
  { text: 'Kids', to: '/category/kids', icon: kidsWear },
];

const listVariants = {
  open: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  open: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  closed: { opacity: 0, x: -40, transition: { duration: 0.2 } },
};

const menuBtnVariants = {
  initial: { rotate: 0, scale: 1 },
  clicked: { rotate: 90, scale: 1.2, transition: { type: 'spring', stiffness: 200, damping: 25 } },
  unclicked: { rotate: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 25 } },
};

const DrawerNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuClicked, setMenuClicked] = useState(false);
  const wishItems = useContext(WishItemsContext);
  const location = useLocation();

  const linkButtonStyle = {
    transition: '0.3s',
    textDecoration: 'none',
    paddingBottom: '12px',
    paddingTop: '10px',
    color: '#704a08ff',
    borderRadius: '10px',
    borderBottom: 'solid 0.1px #333 ' ,
    boxShadow: '0px 1px 0px 0px #a06b11ff',
  };

  // Helper to check if route is active
  const isActive = (to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  // Animate menu button on click
  const handleMenuClick = () => {
    setMenuClicked(true);
    setTimeout(() => {
      setIsOpen(true);
      setMenuClicked(false);
    }, 200);
  };

  const handleMenuClose = () => {
    setMenuClicked(true);
    setTimeout(() => {
      setIsOpen(false);
      setMenuClicked(false);
    }, 200);
  };

  return (
    <Fragment>
      <Box sx={{ p: 1, zIndex: 1301, position: 'relative' }}>
        <motion.div
          variants={menuBtnVariants}
          animate={menuClicked ? 'clicked' : 'unclicked'}
          style={{ display: 'inline-block' }}
        >
          {isOpen ? (
            <MenuOpenIcon
              fontSize="large"
              onClick={handleMenuClose}
              sx={{
                cursor: 'pointer',
                backgroundColor: '#a78b45ff',
                borderRadius: '25%',
                padding: '4px',
                color: '#333',
                zIndex: 1302,
                position: 'relative',
                transition: 'background 0.2s',
                '&:hover': { backgroundColor: '#ffe066' },
              }}
            />
          ) : (
            <MenuIcon
              fontSize="large"
              onClick={handleMenuClick}
              sx={{
                cursor: 'pointer',
                backgroundColor: '#ffe26e',
                borderRadius: '25%',
                padding: '4px',
                color: '#333',
                zIndex: 1302,
                position: 'relative',
                transition: 'background 0.2s',
                '&:hover': { backgroundColor: '#ffe066' },
              }}
            />
          )}
        </motion.div>
      </Box>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="drawer"
            initial={{ x: -300, width: 0, opacity: 0 }}
            animate={{ x: 0, width: 280, opacity: 1 }}
            exit={{ x: -300, width: 0, opacity: 0 }}
            transition={{ duration: 0.7, type: "tween" }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              height: '100vh',
              background: 'linear-gradient( #a68a64, #f8e3b4)',
              boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
              zIndex: 1300,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <motion.div
              variants={listVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <List sx={{ paddingTop: '1rem'}}>
                <motion.div style={{paddingBottom: '28px'}}>
                  <NavBrand />
                </motion.div>
                {navLinks.map(({ text, to, icon }) => (
                  <motion.div key={text} variants={itemVariants}>
                    <ListItem disablePadding>
                      <ListItemButton
                        component={Link}
                        to={to}
                        onClick={() => setIsOpen(false)}
                        sx={linkButtonStyle}
                        className={isActive(to) ? 'active' : ''}
                      >
                        <ListItemIcon sx={{ minWidth: 36}}>
                          <img src={icon} alt={text + " icon"} style={{ width: 24, height: 24, objectFit: 'contain' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={text}
                          primaryTypographyProps={{
                            fontSize: '1.1rem',
                            color: 'inherit',
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </motion.div>
                ))}
                <Box />
                
                {/* Theme Toggle */}
                <motion.div variants={itemVariants}>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ ...linkButtonStyle, display: 'flex', alignItems: 'center' }}>
                      <ListItemIcon sx={{ minWidth: 24, color: '#333' }}>
                        <ThemeToggle />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Toggle Theme" 
                        primaryTypographyProps={{ 
                          color: 'inherit' 
                        }} 
                      />
                    </ListItemButton>
                  </ListItem>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <ListItem disablePadding>
                    <ListItemButton
                      component={Link}
                      to="/account/login"
                      onClick={() => setIsOpen(false)}
                      sx={linkButtonStyle}
                      className={isActive('/account/login') ? 'active' : ''}
                    >
                      <ListItemIcon sx={{ minWidth: 36, color: '#333', }}>
                        <PersonOutlineIcon />
                      </ListItemIcon>
                      <ListItemText primary="Account" primaryTypographyProps={{ color: 'inherit' }} />
                    </ListItemButton>
                  </ListItem>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <ListItem disablePadding>
                    <ListItemButton
                      component={Link}
                      to="/wishlist"
                      sx={{ ...linkButtonStyle, display: 'flex', alignItems: 'center' }}
                      onClick={() => setIsOpen(false)}
                      className={isActive('/wishlist') ? 'active' : ''}
                    >
                      <ListItemIcon sx={{ minWidth: 36, color: '#333', }}>
                        <Badge
                          badgeContent={wishItems.items.length}
                          sx={{
                            '& .MuiBadge-badge': {
                              backgroundColor: '#e53935',
                              color: '#fff',
                              fontWeight: 600,
                              fontSize: '0.7rem',
                              minWidth: 20,
                              height: 20,
                              borderRadius: '50%',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                              marginRight: '1rem'
                            },
                          }}
                        >
                          <FavoriteBorderIcon />
                        </Badge>
                      </ListItemIcon>
                      <ListItemText primary="Wishlist" primaryTypographyProps={{
                        
                        color: 'inherit',
                      }} />
                    </ListItemButton>
                  </ListItem>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ ...linkButtonStyle, display: 'flex', alignItems: 'center', marginLeft: "-4px" }}>
                      <ListItemIcon sx={{ minWidth: 36, color:'#333',}}>
                        <Cart />
                      </ListItemIcon>
                      <ListItemText
                        primary="Cart"
                        primaryTypographyProps={{                          
                          marginLeft: '10px',
                          color: 'inherit',
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </motion.div>
              </List>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Add style for active class */}
      <style>
        {`
          .MuiListItemButton-root.active {
            background: #f4cc8cff !important;
            color: #a06b11ff !important;
            border-right: solid #a06b11ff 7px !important;
            box-shadow: 1px 1.2px 0px 0px #a06b11ff !important;
          }
          .MuiListItemButton-root.active .MuiListItemText-primary {
            font-size: 18px !important;
            font-weight: 600 !important;
            font-style: italic;
            letter-spacing: 1.1px;
            color: #917143ff !important;
          }
          .MuiListItemButton-root:hover {
            background: #b29157ff !important;
            color: #43341bff !important;
            transform: translateX(8px) scale(1.03);
          }
        `}
      </style>
    </Fragment>
  );
};

export default DrawerNav;