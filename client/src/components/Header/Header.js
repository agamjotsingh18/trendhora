import NavBrand from '../Nav/Nav-Brand/Navbrand';
import NavLinks from '../Nav/Nav-Links/NavLinks';
import Form from '../Nav/Search-Bar/Form';
import Control from '../Nav/Controls/Control';
import DrawerNav from '../Nav/DrawerNav/DrawerNav';
import useMediaQuery from '@mui/material/useMediaQuery';
import './Header.css';

const Header = () => {
  const isSmallScreen = useMediaQuery('(max-width:768px)');

  return (
    <div className='header__container'>
      <div className='header__main'>
        {/* Left Section - Logo */}
        <div className='header__left'>
          <NavBrand />
        </div>

        {/* Center Section - Navigation and Search */}
        {!isSmallScreen && (
          <div className='header__center'>
            <div className='header__nav'>
              <NavLinks />
            </div>
            <div className='header__search'>
              <Form />
            </div>
          </div>
        )}

        {/* Right Section - Controls */}
        <div className='header__right'>
          {!isSmallScreen ? (
            <Control />
          ) : (
            <DrawerNav />
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      {isSmallScreen && (
        <div className='header__center'>
          <div className='header__search'>
            <Form />
          </div>
          <div className='header__nav'>
            <NavLinks />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
