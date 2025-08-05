import './Landing.css'
import land from '../../asset/brand/models.jpg'
import { Link } from "react-router-dom"
import { Button } from "@mui/material";


const Landing = () => {
    return (
        <div className="landing__container">
            <div className="landing__header__container">
                <div className="landing__header">
                    <h3 className="landing__header__discount"></h3>
                    <h1 className="landing__header__main">Wear the Moment,<br />
                                 Live the Trend.</h1>
                    <p className="landing__header__sub">“Curated streetwear for every vibe – bold, edgy, timeless.</p>
                    <Link to="/shop">
                        <Button variant='outlined' sx={[ {width: '190px', height: '50px', borderRadius: '20px' , fontWeight: '700', backgroundColor: 'none', borderColor: 'black', color: 'black' }, {'&:hover': {  backgroundColor: "black" , color: "#FFE26E", borderColor: 'black'}}]}>SHOP NOW</Button>
                    </Link>
                </div>
            </div>
            <div className="landing__image__container">
                <img className="landing__image" src={land} alt=""/>
            </div>
        </div>
     );
}
 
export default Landing;