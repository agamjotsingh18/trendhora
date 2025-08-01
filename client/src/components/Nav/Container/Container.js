import Control from '../Controls/Control';
import DrawerNav from '../DrawerNav/DrawerNav';
import NavBrand from '../Nav-Brand/Navbrand';
import Form from '../Search-Bar/Form';
import './Container.css';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

const Navtop = () => {
  const isSmallScreen = useMediaQuery('(max-width:768px)');

  return (
    <div className="nav__top__container">
      <div className="top__container">
        {/* Brand */}
        <NavBrand />

        {/* Desktop Search */}
        {!isSmallScreen && (
          <div className="form__container">
            <Form />
          </div>
        )}

        {/* Desktop Controls */}
        {!isSmallScreen && (
          <div className="control__bar">
            <Control />
          </div>
        )}

        {/* Mobile Hamburger */}
        {isSmallScreen && (
          <div className="drawer">
            <DrawerNav />
          </div>
        )}
      </div>
         {isSmallScreen && (
          <div className="form__container">
            <Form />
          </div>
        )}
     
    </div>
  );
};

export default Navtop;
