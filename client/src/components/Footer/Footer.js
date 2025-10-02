import React from 'react';
import { Link } from 'react-router-dom';
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
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import SendIcon from '@mui/icons-material/Send';

const Footer = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [isSubscribed, setIsSubscribed] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (email) {
            // Here you would typically send the email to your backend
            console.log('Newsletter signup:', email);
            setIsSubscribed(true);
            setEmail('');
            setTimeout(() => setIsSubscribed(false), 3000);
        }
    };

return (
    <footer>
    { isVisible && <button 
onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
style={{
    background: 'linear-gradient(135deg, var(--accent-color) 0%, #FFD700 100%)',
    width:'45px',
    height:'45px',
    position: 'fixed',
    zIndex: '1000',
    bottom: '30px',
    right: '40px',
    borderRadius: '50%',
    border: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(255, 226, 110, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}}
onMouseEnter={e => {
    e.currentTarget.style.background = 'linear-gradient(135deg, #FFD700 0%, var(--accent-color) 100%)';
    e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)';
    e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 226, 110, 0.6)';
}}
onMouseLeave={e => {
    e.currentTarget.style.background = 'linear-gradient(135deg, var(--accent-color) 0%, #FFD700 100%)';
    e.currentTarget.style.transform = 'scale(1) translateY(0px)';
    e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 226, 110, 0.4)';
}}
>
  <KeyboardDoubleArrowUpIcon style={{ color: 'white', fontSize: '24px' }} />
</button>}

        <div className="footer__container">
            <div className="content">
                <h1 id="navBrand" >TrendHora</h1>
                
                {/* Newsletter Section */}
                <div className="footer__newsletter__container">
                    <div className="footer__newsletter__content">
                        <h2>Stay in the Loop!</h2>
                        <p>Get the latest trends, exclusive offers, and fashion updates delivered straight to your inbox.</p>
                        <form className="newsletter__form" onSubmit={handleNewsletterSubmit}>
                            <div className="newsletter__input__container">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="newsletter__input"
                                    required
                                />
                                <button type="submit" className="newsletter__button">
                                    <SendIcon />
                                </button>
                            </div>
                            {isSubscribed && (
                                <div className="newsletter__success">
                                    ✨ Thank you for subscribing! Check your inbox for exclusive offers.
                                </div>
                            )}
                        </form>
                    </div>
                </div>

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
                                <a href="/accessibility"><AccessibilityNewIcon /> Accessibility</a>
                            </li>
                            <li className="help__link">
                                <a href="/contact"><EmailIcon /> Contact Us</a>
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
                                <a href="mailto:shop@trendhora.com"><EmailIcon /> shop@trendhora.com</a>
                            </li>
                            <li className="footer__contact">
                                <button 
                                    onClick={() => {}} 
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--text-secondary)',
                                        cursor: 'default',
                                        padding: 0,
                                        font: 'inherit',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        fontWeight: '500',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}
                                    aria-label="Location information"
                                >
                                    <LocationOnIcon /> Delhi, India
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="footer__social__link__container">
                        <div className="footer__social__link__header">
                            <h1>Stay Connected</h1>
                        </div>
                        <ul className="footer__social__links">
                            <li className="social__link">
                                <a href='https://twitter.com/trendhora' target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter"> <TwitterIcon /> </ a>
                            </li>
                            <li className="social__link">
                                <a href='https://instagram.com/trendhora' target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram"> <InstagramIcon /> </a>
                            </li>
                            <li className="social__link">
                                <a href='https://youtube.com/trendhora' target="_blank" rel="noopener noreferrer" aria-label="Subscribe to our YouTube channel"> <YouTubeIcon /> </a>
                            </li>
                            <li className="social__link">
                                <a href='https://t.me/trendhora' target="_blank" rel="noopener noreferrer" aria-label="Join us on Telegram"> <TelegramIcon /> </a>
                            </li>
                            <li className="social__link">
                                <a href='https://pinterest.com/trendhora' target="_blank" rel="noopener noreferrer" aria-label="Follow us on Pinterest"> <PinterestIcon /> </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="fotter__copyright__container">
            <ul className='nav'>
                <li className="footer__copyright">©2025 TrendHora</li>
                <li className="footer__terms__condition">
                    <Link to="/terms" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Terms & Condition
                    </Link>
                </li>
                <li className="footer__privacy__policy">
                    <Link to="/privacy" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Privacy Policy
                    </Link>
                </li>
            </ul>
        </div>
        
    </footer>
);
}

export default Footer;