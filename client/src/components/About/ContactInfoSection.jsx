import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';

const ContactInfoSection = () => {
  const contactVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const contactInfo = [
    {
      icon: faMapMarkerAlt,
      title: "Our Location",
      details: (
        <>
          123 Fashion Avenue<br />
          New York, NY 10001<br />
          United States
        </>
      )
    },
    {
      icon: faPhone,
      title: "Phone",
      details: (
        <>
          <a href="tel:+1-555-TRENDHORA">+1 (555) TRENDHORA</a><br />
          <a href="tel:+1-555-876-6348">+1 (555) 876-6348</a>
        </>
      )
    },
    {
      icon: faEnvelope,
      title: "Email",
      details: (
        <>
          <a href="mailto:hello@trendhora.com">hello@trendhora.com</a><br />
          <a href="mailto:support@trendhora.com">support@trendhora.com</a>
        </>
      )
    },
    {
      icon: faClock,
      title: "Business Hours",
      details: (
        <>
          Monday - Friday: 9AM - 8PM EST<br />
          Saturday: 10AM - 6PM EST<br />
          Sunday: 12PM - 5PM EST
        </>
      )
    }
  ];

  return (
    <section className="about-section">
      <div className="section-container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="section-content">
          <p className="section-description">
            We'd love to hear from you! Whether you have questions about our products, need styling 
            advice, or want to share feedback, our team is here to help. Reach out to us through 
            any of the channels below, and we'll get back to you as soon as possible.
          </p>
          <motion.div 
            className="contact-info"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.15 }}
          >
            {contactInfo.map((contact, index) => (
              <motion.div
                key={index}
                className="contact-item"
                variants={contactVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={contact.icon} className="contact-icon" />
                <h3 className="contact-title">{contact.title}</h3>
                <div className="contact-details">{contact.details}</div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Call to Action */}
          <motion.div
            className="cta-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              textAlign: 'center',
              marginTop: '60px',
              padding: '40px',
              background: 'var(--bg-secondary)',
              borderRadius: '20px',
              border: '1px solid var(--border-color)'
            }}
          >
            <h3 style={{
              fontSize: '1.5rem',
              color: 'var(--text-primary)',
              marginBottom: '15px',
              fontWeight: '600'
            }}>
              Ready to Start Your Fashion Journey?
            </h3>
            <p style={{
              color: 'var(--text-secondary)',
              marginBottom: '25px',
              fontSize: '1.1rem'
            }}>
              Join thousands of fashion enthusiasts who trust Trendhora for their style needs.
            </p>
            <motion.a
              href="/shop"
              style={{
                display: 'inline-block',
                padding: '15px 30px',
                background: 'var(--accent-color)',
                color: '#2c3e50',
                textDecoration: 'none',
                borderRadius: '30px',
                fontWeight: '600',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer'
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'var(--accent-hover)',
                boxShadow: "0 10px 25px rgba(255, 226, 110, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Collection
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSection;
