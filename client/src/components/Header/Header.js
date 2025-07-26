// import Navbottom from '../Nav/Nav-Links/NavLinks';
import Navtop from '../Nav/Container/Container';
import './Header.css'
import NavLinks from '../Nav/Nav-Links/NavLinks';

const Header = () => {
    return ( 
        <div className='header__container'>
            <Navtop />
            <NavLinks />
        </div>
     );
}
 
export default Header;