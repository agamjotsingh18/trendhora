import './NavBrand.css';
import { Link } from 'react-router-dom';
import logo from '../../../asset/brand/logo.png';


const NavBrand = () => {
    return ( 
        
        <div href="#home" className='navbrand__container'>
           <h1 className='navbrand'>
               <Link to="/">TrendHora</Link>
            </h1>
        </div>
     );
}
 
export default NavBrand;
