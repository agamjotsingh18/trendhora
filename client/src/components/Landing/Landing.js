import './Landing.css'
import land from '../../asset/brand/men2.png'
import { Link } from "react-router-dom"
import { Button } from "@mui/material";

const Landing = () => {
    return ( 
        <div className="landing__container">
            <div className="landing__header__container">
                <div className="landing__header">
                    <h3 className="landing__header__discount">UP TO 15% DISCOUNT</h3>
                    <h1 className="landing__header__main">Checkout The Best Fashion Style</h1>
                    <Link to="/shop">
                        <Button 
                            variant='outlined' 
                            sx={[
                                {
                                    width: '190px', 
                                    height: '50px', 
                                    borderRadius: '25px', 
                                    fontWeight: '700', 
                                    backgroundColor: 'var(--bg-primary)', 
                                    borderColor: 'var(--accent-color)', 
                                    color: 'var(--text-primary)',
                                    boxShadow: '0 4px 15px rgba(255, 226, 110, 0.3)',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }, 
                                {
                                    '&:hover': {  
                                        backgroundColor: "var(--accent-color)", 
                                        color: "var(--bg-primary)", 
                                        borderColor: 'var(--accent-color)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 25px rgba(255, 226, 110, 0.4)'
                                    },
                                    '&:active': {
                                        transform: 'translateY(0px)'
                                    }
                                }
                            ]}
                        >
                            SHOP NOW
                        </Button>
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