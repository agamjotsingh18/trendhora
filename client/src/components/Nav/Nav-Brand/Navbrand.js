import { useNavigate } from 'react-router-dom';
import './NavBrand.css';

const NavBrand = () => {
  const navigate = useNavigate();

  return (
    <div className="navbrand__container" onClick={() => navigate('/')}>
      <img
        src="/logo.png"
        alt="Website Logo"
        className="navbrand__logo"
      />
    </div>
  );
};

export default NavBrand;
