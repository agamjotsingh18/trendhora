import { Badge, Tooltip, Box } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Cart from '../../Card/Cart/Cart';
import ThemeToggle from '../../ThemeToggle/ThemeToggle';
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
    backgroundColor: 'var(--bg-secondary)',
    boxShadow: 'var(--shadow)',
    cursor: 'pointer',
    transition: '0.25s ease',
    border: '1px solid var(--border-color)',
    '&:hover': {
      backgroundColor: 'var(--bg-tertiary)',
      transform: 'scale(1.08)',
      '& svg': { color: 'var(--accent-color)' },
    },
  };

  const tooltipProps = {
    arrow: true,
    slotProps: {
      popper: {
        sx: {
          '& .MuiTooltip-tooltip': {
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            fontSize: '0.8rem',
            borderRadius: '6px',
            padding: '6px 10px',
          },
          '& .MuiTooltip-arrow': {
            color: 'var(--bg-tertiary)',
          },
        },
      },
    },
  };

  return (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      {/* Theme Toggle */}
      <Tooltip title="Toggle theme" {...tooltipProps}>
        <Box sx={controlButton}>
          <ThemeToggle />
        </Box>
      </Tooltip>

      {/* Account */}
      <Tooltip title="Account" {...tooltipProps}>
        <Box component={Link} to="/account/login" sx={controlButton}>
          <PersonOutlineIcon sx={{ fontSize: '1.8rem', color: 'var(--text-primary)' }} />
        </Box>
      </Tooltip>

      {/* Wishlist */}
      <Tooltip title="Wishlist" {...tooltipProps}>
        <Box component={Link} to="/wishlist" sx={controlButton}>
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
                border: '2px solid var(--bg-primary)',
              },
            }}
          >
            <FavoriteBorderIcon sx={{ fontSize: '1.8rem', color: 'var(--text-primary)' }} />
          </Badge>
        </Box>
      </Tooltip>

      {/* Cart */}
      <Tooltip title="Cart" {...tooltipProps}>
        <Box sx={controlButton}>
          <Box sx={{ 
            '& svg': { 
              color: 'var(--text-primary)',
              fontSize: '1.8rem'
            } 
          }}>
            <Cart />
          </Box>
        </Box>
      </Tooltip>
    </Box>
  );
};

export default Control;
