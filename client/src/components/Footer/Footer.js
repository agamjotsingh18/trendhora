import React from 'react';
import './Footer.css';
import {
    LocalPhone,
    Email,
    LocationOn,
    Instagram,
    YouTube,
    Twitter,
    Telegram,
    Pinterest
} from '@mui/icons-material';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Help Section */}
                <div className="footer-section">
                    <h2 className="footer-title">Help</h2>
                    <ul className="footer-links">
                        <li><a href="/">Shipping</a></li>
                        <li><a href="/">Refund</a></li>
                        <li><a href="/">FAQ</a></li>
                        <li><a href="/">Accessibility</a></li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div className="footer-section">
                    <h2 className="footer-title">Contact Us</h2>
                    <ul className="footer-contact">
                        <li>
                            <a href="tel:+919319042075">
                                <LocalPhone /> +91 9319042075
                            </a>
                        </li>
                        <li>
                            <a href="mailto:shop@trendhora.com">
                                <Email /> shop@trendhora.com
                            </a>
                        </li>
                        <li>
                            <LocationOn /> Delhi, India
                        </li>
                    </ul>
                </div>

                {/* Social Section */}
                <div className="footer-section">
                    <h2 className="footer-title">Stay Connected</h2>
                    <div className="footer-social">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><Twitter /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Instagram /></a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><YouTube /></a>
                        <a href="https://t.me" target="_blank" rel="noopener noreferrer"><Telegram /></a>
                        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer"><Pinterest /></a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <p>©2024 TrendHora | <a href="/">Terms & Conditions</a> | <a href="/">Privacy Policy</a></p>
            </div>
        </footer>
    );
};

export default Footer;
