import React from 'react';

import './Footer.css'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import PinterestIcon from '@mui/icons-material/Pinterest';

const handlePhoneClick = () => {
    window.location.href = 'tel:+919319042075';
};


const Footer = () => {
    return ( 
        <footer>
            <div className="footer__container">
                <div className="footer__items__container">
                    <div className="footer__help__container">
                        <div className="footer__help__header">
                            <h1>Help</h1>
                        </div>
                        <ul className="fotter__help__links">
                            <li className="help__link">
                                <a href="/"> Shipping</a>
                            </li>
                            <li className="help__link">
                                <a href="/">Refund</a>
                            </li>
                            <li className="help__link">
                                <a href="/">FAQ</a>
                            </li>
                            <li className="help__link">
                                <a href="/">Accessiblity</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer__contact__container">
                        <div className="footer__contact__header">
                            <h1>Contact Us</h1>
                        </div>
                        <ul className="footer__contacts">
                        <li className="footer__contact">
            <a href="tel:+919319042075" className="footer__contact-link">
                <LocalPhoneIcon /> <span>+91 9319042075</span>
            </a>
        </li>

<li className="footer__contact">
    <EmailIcon /> <span><a href="mailto:agamjotsingh1801@gmail.com">shop@trendhora.com</a></span>
</li>
                            <li className="footer__contact">
                                <LocationOnIcon /> <span>Delhi, India</span>
                            </li>
                        </ul>
                    </div>
                    <div className="footer__social__link__container">
                        <div className="footer__social__link__header">
                            <h1>Stay Connected</h1>
                        </div>
                    <ul className="footer__social__links">
                            <li className="social__link">
                                <TwitterIcon />
                            </li>
                            <li className="social__link">
                                <InstagramIcon />
                            </li>
                            <li className="social__link">
                                <YouTubeIcon />
                            </li>
                            <li className="social__link">
                                <TelegramIcon />
                            </li>
                            <li className="social__link">
                                <PinterestIcon />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="fotter__copyright__container">
                    <ul className='nav'>
                        <li className="footer__copyright">©2025 TrendHora</li>
                        <li className="footer__terms__condition"> Terms & Condition</li>
                        <li className="footer__privacy__policy"> Privacy Policy</li>
                    </ul>
                     </div>
            </div>
        </footer>
     );
}
 
export default Footer;