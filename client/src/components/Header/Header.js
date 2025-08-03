import Navtop from '../Nav/Container/Container';
import DrawerNav from '../Nav/DrawerNav/DrawerNav';
import NavLinks from '../Nav/Nav-Links/NavLinks';
import './Header.css';

const Header = () => {
  return (
    <div className='header__container'>
      <Navtop />  
     <NavLinks />
    </div>
  );
}

export default Header;
