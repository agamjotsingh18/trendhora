import { useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Control from '../Controls/Control';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Form from '../Search-Bar/Form';
import { Link } from 'react-router-dom';

const DrawerNav = () => {
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <List>
        {[
          { text: 'Home', to: '/' },
          { text: 'Shop', to: '/shop' },
          { text: 'Men', to: '/category/men' },
          { text: 'Women', to: '/category/women' },
          { text: 'Kids', to: '/category/kids' }
        ].map(({ text, to }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={to} onClick={toggleDrawer(anchor, false)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem disablePadding>
          <Control />
        </ListItem>
      </List>
      <List>
        <ListItem>
          <div className="search__drawer">
            <Form />
          </div>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <Fragment>
      {['left'].map((anchor) => (
        <Fragment key={anchor}>
          <Box sx={{ p: 1 }}>
            {state[anchor] ? (
              <MenuOpenIcon fontSize="large" onClick={toggleDrawer(anchor, false)} />
            ) : (
              <MenuIcon fontSize="large" onClick={toggleDrawer(anchor, true)} />
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
}

export default DrawerNav;
