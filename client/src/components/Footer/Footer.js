import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../../asset/brand/logo_footer.png";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TelegramIcon from "@mui/icons-material/Telegram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReplayIcon from "@mui/icons-material/Replay";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SiX } from "react-icons/si";

const Footer = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || email.trim() === "") {
      toast.error("Please enter your email address", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    // More robust email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Random success messages for variety
      const successMessages = [
        "You're subscribed! Welcome to the TrendHora family! 🎉",
        "Success! Get ready for exclusive offers in your inbox! ✨",
        "Welcome aboard! Check your email for a special discount! 🎁",
        "Subscription confirmed! You'll love our updates! 💫",
      ];

      const randomMessage =
        successMessages[Math.floor(Math.random() * successMessages.length)];

      toast.success(randomMessage, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer>
      {isVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            background:
              "linear-gradient(135deg, var(--accent-color) 0%, #FFD700 100%)",
            width: "45px",
            height: "45px",
            position: "fixed",
            zIndex: "1000",
            bottom: "20px",
            right: "95px",
            borderRadius: "50%",
            border: "none",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(255, 226, 110, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, #FFD700 0%, var(--accent-color) 100%)";
            e.currentTarget.style.transform = "scale(1.1) translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 8px 25px rgba(255, 226, 110, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, var(--accent-color) 0%, #FFD700 100%)";
            e.currentTarget.style.transform = "scale(1) translateY(0px)";
            e.currentTarget.style.boxShadow =
              "0 4px 15px rgba(255, 226, 110, 0.4)";
          }}
          aria-label="Scroll to top"
        >
          <KeyboardDoubleArrowUpIcon
            style={{ color: "#FFD700", fontSize: "24px" }}
          />
        </button>
      )}

      <div className="footer__container">
        <div className="content">
          <div className="footer__main__container">
            <div className="footer__left__section">
              <div className="footer__brand__container">
                <Link to="/" className="footer-logo-link">
                  <img src={logo} alt="TrendHora" className="footer-logo" />
                </Link>
                <p className="footer-tagline">Welcome to Trendhora – your gateway to a seamless online shopping experience.</p>
                <div className="footer__newsletter__container">
                  <div className="footer__newsletter__header">
                    <h1>SUBSCRIBE TO OUR NEWSLETTER</h1>
                    <p>Get the latest updates, shopping tips, and exclusive offers.</p>
                  </div>
                  <form
                    className="footer__newsletter__form"
                    onSubmit={handleSubmit}
                  >
                    <div className="newsletter__input__container">
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="newsletter__input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                      />
                      <button 
                        type="submit" 
                        className="newsletter__button"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Subscribing..." : "Subscribe"}
                      </button>
                    </div>
                    <p className="newsletter__disclaimer">We respect your privacy. Unsubscribe at any time.</p>
                  </form>
                </div>
                
              </div>
            </div>
            
            <div className="footer__right__section">
              <div className="footer__links__container">
                <div className="footer__quick__links__container">
                  <div className="footer__quick__links__header">
                    <h1>QUICK LINKS</h1>
                  </div>
                  <ul className="footer__quick__links">
                    <li className="quick__link">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="quick__link">
                      <Link to="/shop">Shop</Link>
                    </li>
                    <li className="quick__link">
                      <Link to="/about">About Us</Link>
                    </li>
                    <li className="quick__link">
                      <Link to="/wishlist">Wishlist</Link>
                    </li>
                    <li className="quick__link">
                      <Link to="/cart">Cart</Link>
                    </li>
                  </ul>
                </div>
                
                <div className="footer__help__container">
                  <div className="footer__help__header">
                    <h1>Help</h1>
                  </div>
                  <ul className="fotter__help__links">
                    <li className="help__link">
                      <a href="/shipping">
                        <LocalShippingIcon fontSize="small" /> Shipping
                      </a>
                    </li>
                    <li className="help__link">
                      <a href="/refund">
                        <ReplayIcon /> Refund
                      </a>
                    </li>
                    <li className="help__link">
                      <a href="/faq">
                        <HelpCenterIcon /> FAQ
                      </a>
                    </li>
                    <li className="help__link">
                      <a href="/accessibility">
                        <AccessibilityNewIcon /> Accessibility
                      </a>
                    </li>
                    <li className="help__link">
                      <a href="/contact">
                        <EmailIcon /> Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div className="footer__contact__container">
                  <div className="footer__contact__header">
                    <h1>SUPPORT</h1>
                  </div>
                  <ul className="footer__contacts">
                    <li className="footer__contact">
                      <a href="tel:+919319042075" className="footer__contact-link">
                        <LocalPhoneIcon /> +91 93190-42075
                      </a>
                    </li>
                    <li className="footer__contact">
                      <a href="mailto:agamjotsingh1801@gmail.com">
                        <EmailIcon /> shop@trendhora.com
                      </a>
                    </li>
                    <li className="footer__contact">
                      <button
                        onClick={() => {}}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--text-primary)",
                          cursor: "default",
                          padding: 0,
                          font: "inherit",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                        aria-label="Location information"
                      >
                        <LocationOnIcon /> Delhi, India
                      </button>
                    </li>
                    <li className="footer__contact">
                      <Link to="/terms">Terms & Conditions</Link>
                    </li>
                    <li className="footer__contact">
                      <Link to="/privacy">Privacy Policy</Link>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="footer__social__container">
                <ul className="footer__social__links">
                  <li className="social__link">
                    <a
                      href="https://twitter.com/trendhora"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow us on Twitter"
                    >
                      <SiX />
                    </a>
                  </li>
                  <li className="social__link">
                    <a
                      href="https://instagram.com/trendhora"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow us on Instagram"
                    >
                      <InstagramIcon />
                    </a>
                  </li>
                  <li className="social__link">
                    <a
                      href="https://youtube.com/trendhora"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Subscribe to our YouTube channel"
                    >
                      <YouTubeIcon />
                    </a>
                  </li>
                  <li className="social__link">
                    <a
                      href="https://t.me/trendhora"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Join our Telegram channel"
                    >
                      <TelegramIcon />
                    </a>
                  </li>
                  <li className="social__link">
                    <a
                      href="https://pinterest.com/trendhora"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow us on Pinterest"
                    >
                      <PinterestIcon />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom__container">
        <div className="footer__bottom__content">
          <div className="footer__copyright__section">
            <p className="footer__copyright">©{new Date().getFullYear()} TrendHora. All rights reserved.</p>
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </footer>
  );
};

export default Footer;
