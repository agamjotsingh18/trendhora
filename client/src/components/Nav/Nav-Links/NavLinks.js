import { Link, useLocation } from 'react-router-dom';
import './NavLinks.css';

const NavLinks = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Don't show navigation on item detail pages in any screen size
  if (currentPath.includes("/item")) return null;

  const isActive = (path) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="nav__container">
      <ul className="nav__list">
        <li className="nav__item">
          <Link
            to="/"
            className={`nav__link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
        </li>
        <li className="nav__item">
          <Link
            to="/shop"
            className={`nav__link ${isActive('/shop') ? 'active' : ''}`}
          >
            Shop
          </Link>
        </li>
        <li className="nav__item">
          <Link
            to="/category/men"
            className={`nav__link ${isActive('/category/men') ? 'active' : ''}`}
          >
            Men
          </Link>
        </li>
        <li className="nav__item">
          <Link
            to="/category/women"
            className={`nav__link ${isActive('/category/women') ? 'active' : ''}`}
          >
            Women
          </Link>
        </li>
        <li className="nav__item">
          <Link
            to="/category/kids"
            className={`nav__link ${isActive('/category/kids') ? 'active' : ''}`}
          >
            Kids
          </Link>
        </li>
        <li className="nav__item">
          <Link
            to="/about"
            className={`nav__link ${isActive('/about') ? 'active' : ''}`}
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavLinks;
