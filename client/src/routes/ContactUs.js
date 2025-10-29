import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { TabTitle } from '../utils/General';
import './ContactUs.css';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import SubjectIcon from '@mui/icons-material/Subject';
import MessageIcon from '@mui/icons-material/Message';

const ContactUs = () => {
  TabTitle('Contact Us - TrendHora');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToaster, setShowToaster] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email))
      newErrors.email = 'Please enter a valid email address';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowToaster(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  const closeToaster = () => setShowToaster(false);

  return (
    <div className="contact__page__container">
      {/* Hero Section */}
      <div className="contact__hero" data-aos="fade-up">
        <div className="contact__hero__content">
          <h1 className="contact__hero__title">Get In Touch</h1>
          <p className="contact__hero__subtitle">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          <div className="contact__hero__decoration"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="contact__main__content">
        {/* Contact Cards Section */}
        <div className="contact__cards__section">
          <div className="contact__card" data-aos="zoom-in" data-aos-delay="100">
            <div className="contact__card__icon">
              <EmailIcon sx={{ fontSize: 30 }} />
            </div>
            <h3>Email Us</h3>
            <p>shop@trendhora.com</p>
            <span className="contact__card__subtitle">We typically respond within 24 hours</span>
          </div>

          <div className="contact__card" data-aos="zoom-in" data-aos-delay="200">
            <div className="contact__card__icon">
              <PhoneIcon sx={{ fontSize: 30 }} />
            </div>
            <h3>Call Us</h3>
            <p>+91 93190-42075</p>
            <span className="contact__card__subtitle">Mon-Fri from 8am to 5pm</span>
          </div>

          <div className="contact__card" data-aos="zoom-in" data-aos-delay="300">
            <div className="contact__card__icon">
              <LocationOnIcon sx={{ fontSize: 30 }} />
            </div>
            <h3>Visit Us</h3>
            <p>Delhi, India</p>
            <span className="contact__card__subtitle">Come say hello at our office</span>
          </div>
        </div>

        {/* Form Section */}
        <div className="contact__form__section" data-aos="fade-up" data-aos-delay="400">
          <div className="contact__form__header">
            <h2>Send us a message</h2>
            <p>Fill out the form below and we'll get back to you as soon as possible.</p>
          </div>

          <form onSubmit={handleSubmit} className="contact__form">
            {/* Name + Email Row */}
            <div className="form__grid">
              {/* Full Name */}
              <div className="input__group" data-aos="fade-right">
                <div className="input__icon">
                  <PersonIcon sx={{ fontSize: 20 }} />
                </div>
                <div className="input__content">
                  <label className="input__label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    className={`contact__input ${errors.name ? 'error' : ''}`}
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && <span className="error__message">{errors.name}</span>}
                </div>
              </div>

              {/* Email Address */}
              <div className="input__group" data-aos="fade-left">
                <div className="input__icon">
                  <EmailIcon sx={{ fontSize: 20 }} />
                </div>
                <div className="input__content">
                  <label className="input__label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    className={`contact__input ${errors.email ? 'error' : ''}`}
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <span className="error__message">{errors.email}</span>}
                </div>
              </div>
            </div>

            {/* Subject */}
            <div className="input__group" data-aos="fade-right">
              <div className="input__icon">
                <SubjectIcon sx={{ fontSize: 20 }} />
              </div>
              <div className="input__content" style={{ marginTop: '1.5rem' }}>
                <label className="input__label">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  className={`contact__input ${errors.subject ? 'error' : ''}`}
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={handleInputChange}
                />
                {errors.subject && <span className="error__message">{errors.subject}</span>}
              </div>
            </div>

            {/* Message */}
            <div className="input__group" data-aos="fade-left">
              <div className="input__icon">
                <MessageIcon sx={{ fontSize: 20 }} />
              </div>
              <div className="input__content" style={{ marginTop: '1.5rem' }}>
                <label className="input__label">Message *</label>
                <textarea
                  name="message"
                  className={`contact__textarea ${errors.message ? 'error' : ''}`}
                  placeholder="Tell us more about your inquiry..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                />
                {errors.message && <span className="error__message">{errors.message}</span>}
              </div>
            </div>

            <div className="submit__button__container" data-aos="zoom-in">
              <button
                type="submit"
                className="contact__submit__button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="button__spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <SendIcon sx={{ fontSize: 18, marginRight: '8px' }} />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Toaster */}
      {showToaster && (
        <div className="toaster success toaster-show" data-aos="fade-up">
          <div className="toaster-content">
            <div className="toaster-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M7 10L9 12L13 8M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="toaster-message">
              <div className="toaster-title">Message Sent Successfully!</div>
              <div className="toaster-subtitle">
                Thank you for contacting us. We'll get back to you within 24 hours.
              </div>
            </div>
            <button onClick={closeToaster} className="toaster-close">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
