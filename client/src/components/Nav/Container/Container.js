import Control from '../Controls/Control';
import DrawerNav from '../DrawerNav/DrawerNav';
import NavBrand from '../Nav-Brand/Navbrand';
import Form from '../Search-Bar/Form';
import './Container.css';
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
<<<<<<< HEAD

        {/* Mobile Search */}
        {isSmallScreen && (
          <div className="form__container">
            <Form />
          </div>
        )}
=======
>>>>>>> upstream/main
        
        {/* Mobile Hamburger */}
        {isSmallScreen && (
          <div className="drawer">
            <DrawerNav />
          </div>
        )}
      </div>
<<<<<<< HEAD
=======
      {isSmallScreen && (
        <div className='mbox'>
          <div className="form__container">
            <Form />
          </div>
          <div className="control__bar">
            <Control />
          </div>
          </div>
        )}
        
     
>>>>>>> upstream/main
    </div>
  );
};

export default Navtop;
