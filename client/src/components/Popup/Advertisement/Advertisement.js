import React, { useState, useEffect } from 'react';
import './Advertisement.css';
import CloseIcon from '@mui/icons-material/Close';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../Context/ThemeContext';

const Advertisement = () => {
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 12
  });

  useEffect(() => {
    // Check if popup has been shown in this browser session
    const popupShown = sessionStorage.getItem('popupShown');
    
    // Show popup once per session when user visits the website
    if (!popupShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('popupShown', 'true');
        // Prevent body scroll when popup is open
        document.body.classList.add('popup-open');
      }, 3000); // 3 seconds delay for better UX

      return () => clearTimeout(timer);
    }
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Timer finished
          return { hours: 0, minutes: 0, seconds: 0 };
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    document.body.classList.remove('popup-open');
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false);
      document.body.classList.remove('popup-open');
    }
  };

  const handleShopNow = () => {
    setIsVisible(false);
    document.body.classList.remove('popup-open');
  };

  if (!isVisible) return null;

  return (
    <div className={`advertisement-overlay ${isDarkMode ? 'dark-theme' : 'light-theme'}`} onClick={handleBackdropClick}>
      <div className={`advertisement-popup ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
        <button className="close-btn" onClick={handleClose}>
          <CloseIcon />
        </button>
        
        <div className="popup-header">
          <div className="flash-icon">
            <FlashOnIcon />
          </div>
          <h2>MEGA SALE!</h2>
          <div className="sale-badge">
            <LocalOfferIcon />
            <span>UP TO 70% OFF</span>
          </div>
        </div>

        <div className="popup-content">
          <div className="sale-text">
            <h3>🔥 Limited Time Offer!</h3>
            <p>Don't miss out on our biggest sale of the year!</p>
            <ul className="offers-list">
              <li>✨ Fashion Items: Up to 70% OFF</li>
              <li>🎁 Free Shipping on orders above $50</li>
              <li>💳 Extra 10% OFF with code: <strong>SAVE10</strong></li>
              <li>⚡ Flash Sale: Ends in 24 hours!</li>
            </ul>
          </div>
          
          <div className="countdown-timer">
            <div className="timer-label">Sale Ends In:</div>
            <div className="timer-display">
              <div className="time-unit">
                <span className="time-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="time-label">Hours</span>
              </div>
              <div className="time-separator">:</div>
              <div className="time-unit">
                <span className="time-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="time-label">Minutes</span>
              </div>
              <div className="time-separator">:</div>
              <div className="time-unit">
                <span className="time-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="time-label">Seconds</span>
              </div>
            </div>
          </div>
        </div>

        <div className="popup-actions">
          <Link to="/shop" className="shop-now-btn" onClick={handleShopNow}>
            🛍️ SHOP NOW
          </Link>
          <button className="maybe-later-btn" onClick={handleClose}>
            Maybe Later
          </button>
        </div>

        <div className="popup-footer">
          <small>*Terms and conditions apply. Valid until stocks last.</small>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;