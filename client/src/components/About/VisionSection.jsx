import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faUsers, faStar } from '@fortawesome/free-solid-svg-icons';

const VisionSection = () => {
  const cardVariants = {
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

  const visions = [
    {
      icon: faGlobe,
      title: "Global Fashion Hub",
      description: "To become the world's most trusted online fashion destination, connecting style enthusiasts with the latest trends from around the globe."
    },
    {
      icon: faUsers,
      title: "Community Driven",
      description: "Building a vibrant community where fashion lovers can discover, share, and celebrate their unique style while inspiring others."
    },
    {
      icon: faStar,
      title: "Innovation Leader",
      description: "Leading the fashion e-commerce space through cutting-edge technology, personalized experiences, and trend forecasting."
    }
  ];

  return (
    <section className="about-section">
      <div className="section-container">
        <h2 className="section-title">Our Vision</h2>
        <div className="section-content">
          <p className="section-description">
            We envision a world where everyone has access to fashion that reflects their personality, 
            values, and aspirations. Through innovation, community, and sustainability, we're building 
            the future of fashion retail—one customer, one outfit, one smile at a time.
          </p>
          <motion.div 
            className="feature-cards"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.15 }}
          >
            {visions.map((vision, index) => (
              <motion.div
                key={index}
                className="feature-card"
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={vision.icon} className="card-icon" />
                <h3 className="card-title">{vision.title}</h3>
                <p className="card-description">{vision.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
