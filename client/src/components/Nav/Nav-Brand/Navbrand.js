import './NavBrand.css';
import { Link } from 'react-router-dom';
import logo from '../../../asset/brand/logo.png';

const NavBrand = () => {
  return (
    <div className='navbrand__container'>
      <Link to="/" className='navbrand'>
        <img src={logo} alt="Trendhora Logo" />
      </Link>
    </div>
  );
};

export default NavBrand;
