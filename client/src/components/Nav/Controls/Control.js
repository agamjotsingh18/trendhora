import { Badge, Tooltip, Box } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Cart from '../../Card/Cart/Cart';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { WishItemsContext } from '../../../Context/WishItemsContext';

const Control = () => {
  const wishItems = useContext(WishItemsContext);

  // Reusable style for buttons
  const controlButton = {
    width: 44,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: '#fff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
    cursor: 'pointer',
    transition: '0.25s ease',
    '&:hover': {
      backgroundColor: '#f9f9f9',
      transform: 'scale(1.08)',
      '& svg': { color: '#e53935' },
    },
  };

  const tooltipProps = {
    arrow: true,
    slotProps: {
      popper: {
        sx: {
          '& .MuiTooltip-tooltip': {
            backgroundColor: '#2c2c2c',
            fontSize: '0.8rem',
            borderRadius: '6px',
            padding: '6px 10px',
          },
          '& .MuiTooltip-arrow': {
            color: '#2c2c2c',
          },
        },
      },
    },
  };

  return (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      {/* Account */}
      <Tooltip title="Account" {...tooltipProps}>
        <Box component={Link} to="/account/login" sx={controlButton}>
          <PersonOutlineIcon sx={{ fontSize: '1.8rem', color: '#2c2c2c' }} />
        </Box>
      </Tooltip>

      {/* Wishlist */}
      <Tooltip title="Wishlist" {...tooltipProps}>
        <Box component={Link} to="/wishlist" sx={controlButton}>
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
                border: '2px solid #fff',
              },
            }}
          >
            <FavoriteBorderIcon sx={{ fontSize: '1.8rem', color: '#2c2c2c' }} />
          </Badge>
        </Box>
      </Tooltip>

      {/* Cart */}
      <Tooltip title="Cart" {...tooltipProps}>
        <Box sx={controlButton}>
          <Cart />
        </Box>
      </Tooltip>
    </Box>
  );
};

export default Control;
