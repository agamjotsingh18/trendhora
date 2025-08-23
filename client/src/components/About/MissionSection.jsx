import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faHeart, faLeaf } from '@fortawesome/free-solid-svg-icons';

const MissionSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const missions = [
    {
      icon: faBullseye,
      title: "Quality First",
      description: "We curate only the finest fashion pieces that meet our rigorous standards for quality, style, and craftsmanship."
    },
    {
      icon: faHeart,
      title: "Customer Happiness",
      description: "Your satisfaction is our priority. We're committed to providing an exceptional shopping experience from browse to delivery."
    },
    {
      icon: faLeaf,
      title: "Sustainable Fashion",
      description: "We promote sustainable and ethical fashion choices, supporting brands that care about our planet and its people."
    }
  ];

  return (
    <section className="about-section">
      <div className="section-container">
        <h2 className="section-title">Our Mission</h2>
        <div className="section-content">
          <p className="section-description">
            At Trendhora, we believe fashion is more than just clothing—it's a form of self-expression, 
            confidence, and creativity. Our mission is to make high-quality, trendy fashion accessible 
            to everyone while promoting sustainable practices and ethical sourcing.
          </p>
          <motion.div 
            className="feature-cards"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.2 }}
          >
            {missions.map((mission, index) => (
              <motion.div
                key={index}
                className="feature-card"
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={mission.icon} className="card-icon" />
                <h3 className="card-title">{mission.title}</h3>
                <p className="card-description">{mission.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
