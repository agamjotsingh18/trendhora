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
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReplayIcon from '@mui/icons-material/Replay';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import NavBrand from '../Nav/Nav-Brand/Navbrand';

const handlePhoneClick = () => {
    window.location.href = 'tel:+919319042075';
};


const Footer = () => {
    return (
        <footer>
            <div className="footer__container">
                <div className="content">
                    <h1 id="navBrand" >TrendHora</h1>
                    <div className="footer__items__container">
                        <div className="footer__help__container">
                            <div className="footer__help__header">
                                <h1>Help</h1>
                            </div>
                            <ul className="fotter__help__links">
                                <li className="help__link">
                                    <a href="/shipping"><LocalShippingIcon fontSize='small' /> Shipping</a>
                                </li>
                                <li className="help__link">
                                    <a href="/refund"><ReplayIcon /> Refund</a>
                                </li>
                                <li className="help__link">
                                    <a href="/faq"> <HelpCenterIcon /> FAQ</a>
                                </li>
                                <li className="help__link">
                                    <a href="/accessibility"><AccessibilityNewIcon /> Accessiblity</a>
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
                                        <LocalPhoneIcon /> +91 93190-42075
                                    </a>
                                </li>

                                <li className="footer__contact">
                                    <a href="mailto:agamjotsingh1801@gmail.com"><EmailIcon /> shop@trendhora.com</a>
                                </li>
                                <li className="footer__contact">
                                    <a href='#' ><LocationOnIcon />  Delhi, India</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer__social__link__container">
                            <div className="footer__social__link__header">
                                <h1>Stay Connected</h1>
                            </div>
                            <ul className="footer__social__links">
                                <li className="social__link">
                                    <a href='#'> <TwitterIcon /> </ a>
                                </li>
                                <li className="social__link">
                                    <a href='#'> <InstagramIcon /> </a>
                                </li>
                                <li className="social__link">
                                    <a href='#'> <YouTubeIcon /> </a>
                                </li>
                                <li className="social__link">
                                    <a href='#'> <TelegramIcon /> </a>
                                </li>
                                <li className="social__link">
                                    <a href='#'> <PinterestIcon /> </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fotter__copyright__container">
                <ul className='nav'>
                    <li className="footer__copyright">©2025 TrendHora</li>
                    <li className="footer__terms__condition"> Terms & Condition</li>
                    <li className="footer__privacy__policy"> Privacy Policy</li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;