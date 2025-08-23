import React from 'react';
import { motion } from 'framer-motion';
import MissionSection from '../components/About/MissionSection';
import VisionSection from '../components/About/VisionSection';
import OurStorySection from '../components/About/OurStorySection';
import TeamSection from '../components/About/TeamSection';
import ContactInfoSection from '../components/About/ContactInfoSection';
import './About.css';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="about-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.section 
        className="about-hero"
        variants={sectionVariants}
      >
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">About Trendhora</h1>
            <p className="hero-subtitle">
              Where fashion meets innovation, and style tells your story
            </p>
          </div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section variants={sectionVariants}>
        <MissionSection />
      </motion.section>

      {/* Vision Section */}
      <motion.section variants={sectionVariants}>
        <VisionSection />
      </motion.section>

      {/* Our Story Section */}
      <motion.section variants={sectionVariants}>
        <OurStorySection />
      </motion.section>

      {/* Team Section */}
      <motion.section variants={sectionVariants}>
        <TeamSection />
      </motion.section>

      {/* Contact Info Section */}
      <motion.section variants={sectionVariants}>
        <ContactInfoSection />
      </motion.section>
    </motion.div>
  );
};

export default About;
