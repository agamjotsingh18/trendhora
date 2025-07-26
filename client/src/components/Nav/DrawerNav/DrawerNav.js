import { useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Control from '../Controls/Control';
import Form from '../Search-Bar/Form';
import { Link } from 'react-router-dom';

const DrawerNav = () => {
  const [state, setState] = useState({ left: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: 280,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff', // white drawer
        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
      }}
      role="presentation"
    >
      {/* Nav Links */}
      <List sx={{ paddingTop: '1rem' }}>
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
              sx={{
                transition: '0.3s ease',
                '&:hover': {
                  backgroundColor: '#fff8e1',
                  paddingLeft: '20px',
                },
              }}
            >
              <ListItemText
                primary={text}
                primaryTypographyProps={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#333',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Control Section */}
      <List sx={{ padding: '0.5rem 1rem' }}>
        <ListItem disablePadding>
          <Control />
        </ListItem>
      </List>

      <Divider />

      {/* Search Bar */}
      <List sx={{ padding: '1rem' }}>
        <ListItem>
          <div className="search__drawer">
            <Form />
          </div>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Fragment>
      {['left'].map((anchor) => (
        <Fragment key={anchor}>
          <Box sx={{ p: 1 }}>
            {state[anchor] ? (
              <MenuOpenIcon
                fontSize="large"
                onClick={toggleDrawer(anchor, false)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: '#FFD600', // yellow circle
                  borderRadius: '50%',
                  padding: '4px',
                  color: '#333',
                }}
              />
            ) : (
              <MenuIcon
                fontSize="large"
                onClick={toggleDrawer(anchor, true)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: '#FFD600', // yellow circle
                  borderRadius: '50%',
                  padding: '4px',
                  color: '#333',
                }}
              />
            )}
          </Box>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default DrawerNav;
