import { Link } from 'react-router-dom';
import './NavLinks.css';
import useMediaQuery from '@mui/material/useMediaQuery';

const NavLinks = () => {
  const isSmallScreen = useMediaQuery('(max-width:768px)');
  if (isSmallScreen) return null;

  return (
    <nav className="nav__bottom__container">
      <div className="bottom__container">
        <ul className="nav">
          <li className='nav-link'><Link to="/">Home</Link></li> 
          <li className='nav-link'><Link to="/shop">Shop</Link></li>
          <li className='nav-link'><Link to="/category/men">Men</Link></li> 
          <li className='nav-link'><Link to="/category/women">Women</Link></li> 
          <li className='nav-link'><Link to="/category/kids">Kids</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default NavLinks;
