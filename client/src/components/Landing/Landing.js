import './Landing.css'
import land from '../../asset/brand/men2.png'
import { Link } from "react-router-dom"
import { Button } from "@mui/material";
import Slider from "react-slick"; // Import Slider component

// Import slick-carousel styles
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import slide1 from '../../asset/brand/men2.png';
import slide2 from '../../asset/brand/women.png';
import slide3 from '../../asset/brand/men3.png';


const Landing = () => {
const settings = {
      dots: true,         // Show dots for navigation
      infinite: true,     // Loop the slides
      speed: 500,         // Transition speed in ms
      slidesToShow: 1,    // Show one slide at a time
      slidesToScroll: 1,  // Scroll one slide at a time
      autoplay: true,     // Automatically change slides
      autoplaySpeed: 3000, // Change slide every 3 seconds
      fade: true,         // Use a fade transition
      cssEase: 'linear'
    };

    // Array of images to display in the carousel
    const carouselImages = [
        { img: slide1, alt: "Stylish Man" },
        { img: slide2, alt: "Stylish Woman" },
        { img: slide3, alt: "Man in Casual Wear" }
    ];


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
                <Slider {...settings} className="landing__slider">
                    {carouselImages.map((item, index) => (
                        <div key={index}>
                            <img className="landing__image" src={item.img} alt={item.alt}/>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
     );
}
 
export default Landing;