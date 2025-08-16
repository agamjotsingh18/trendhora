import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  CircularProgress,
  Divider,
  ListItemIcon
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Cart from '../../Card/Cart/Cart';
import ThemeToggle from '../../ThemeToggle/ThemeToggle';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { WishItemsContext } from '../../../Context/WishItemsContext';
import { supabase } from '../../../lib/supabase';

const Control = () => {
  const wishItems = useContext(WishItemsContext);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = () => {
    navigate('/account/login');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    handleClose();
    navigate('/');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDeleteDialog = () => {
    setDeleteError('');
    setConfirmText('');
    setDeleteOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    if (!deleting) setDeleteOpen(false);
  };

const handleDeleteAccount = async () => {
  setDeleteError('');
  setDeleting(true);

  try {
    // Get current Supabase session for access token
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      throw new Error('Not authenticated. Please log in again.');
    }

    // Step 1: Call your backend to delete MongoDB account
    const resp = await fetch('http://localhost:5000/api/auth/delete', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${session.access_token}`, // send token
      },
    });

    if (!resp.ok) {
      let msg = 'Failed to delete account.';
      try {
        const j = await resp.json();
        if (j?.message) msg = j.message;
      } catch (_) {}
      throw new Error(msg);
    }

    // Step 2: Delete from Supabase (sign out after deletion)
    await supabase.auth.signOut();

    // Step 3: Clear local storage & frontend state
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setDeleteOpen(false);
    handleClose?.(); // close dropdown if open

    // Redirect to home or login page
    navigate('/');
  } catch (err) {
    setDeleteError(err.message || 'Something went wrong.');
  } finally {
    setDeleting(false);
    setConfirmText('');
  }
};


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

  const canDelete = confirmText.trim().toUpperCase() === 'DELETE';

  return (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Login or Profile */}
      {!user ? (
        <Tooltip title="Login to your account" {...tooltipProps}>
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{
              backgroundColor: '#2ecc71',
              color: '#fff',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.9rem',
              borderRadius: '20px',
              '&:hover': {
                backgroundColor: '#27ae60',
              },
            }}
          >
            Login
          </Button>
        </Tooltip>
      ) : (
        <>
          <Tooltip title="Your Profile" {...tooltipProps}>
            <IconButton onClick={handleClick} sx={{ p: 0 }}>
              <Avatar
                alt="Profile"
                src={user?.user_metadata?.avatar_url || '/default-avatar.png'}
                sx={{ width: 36, height: 36 }}
              />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={() => navigate('/account/me')}>
              <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
              My Profile
            </MenuItem>

            <MenuItem onClick={handleLogout}>
              <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
              Sign Out
            </MenuItem>

            <Divider />

            <MenuItem
              onClick={() => { handleClose(); handleOpenDeleteDialog(); }}
              sx={{ color: 'error.main', fontWeight: 600 }}
            >
              <ListItemIcon>
                <DeleteOutlineIcon sx={{ color: 'error.main' }} fontSize="small" />
              </ListItemIcon>
              Delete Account
            </MenuItem>
          </Menu>
        </>
      )}

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
          <Box sx={{ '& svg': { color: 'var(--text-primary)', fontSize: '1.8rem' } }}>
            <Cart />
          </Box>
        </Box>
      </Tooltip>

      {/* Delete Account Dialog */}
      <Dialog open={deleteOpen} onClose={handleCloseDeleteDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Delete your account?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            This will permanently delete your account and associated data. This action cannot be undone.
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            To confirm, type <b>DELETE</b> below:
          </Typography>
          <TextField
            autoFocus
            fullWidth
            size="small"
            placeholder="DELETE"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />
          {deleteError && (
            <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
              {deleteError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDeleteDialog} disabled={deleting}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteAccount}
            disabled={!canDelete || deleting}
            startIcon={!deleting ? <DeleteOutlineIcon /> : null}
          >
            {deleting ? <CircularProgress size={18} /> : 'Delete Account'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Control;
