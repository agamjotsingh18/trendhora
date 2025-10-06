import { Link, useLocation } from 'react-router-dom';
import './NavLinks.css';
import useMediaQuery from '@mui/material/useMediaQuery';

const NavLinks = () => {
  const path = useLocation().pathname;
  const isSmallScreen = useMediaQuery('(max-width:768px)');

  if (isSmallScreen) return null;
  if (path.includes("/item")) return null;

  return (
    <nav className="nav__bottom__container">
      <div className="bottom__container">
        <ul className="nav">
          <li className='nav-link'>
            <Link to="/" className={path === "/" ? "active" : ""}>Home</Link>
          </li>
          <li className='nav-link'>
            <Link to="/shop" className={path === "/shop" ? "active" : ""}>Shop</Link>
          </li>
          <li className='nav-link'>
            <Link to="/category/men" className={path === "/category/men" ? "active" : ""}>Men</Link>
          </li>
          <li className='nav-link'>
            <Link to="/category/women" className={path === "/category/women" ? "active" : ""}>Women</Link>
          </li>
          <li className='nav-link'>
            <Link to="/category/kids" className={path === "/category/kids" ? "active" : ""}>Kids</Link>
          </li>
          <li className='nav-link'>
            <Link to="/about" className={path === "/about" ? "active" : ""}>About</Link>
          </li>
          <li className='nav-link'>
            <Link to="/contact" className={path === "/contact" ? "active" : ""}>Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavLinks;
