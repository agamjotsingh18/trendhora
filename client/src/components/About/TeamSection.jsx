import React from 'react';
import { motion } from 'framer-motion';

const TeamSection = () => {
  const memberVariants = {
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

  const teamMembers = [
    {
      name: "Agamjot Singh",
      role: "CEO & Co-Founder",
      bio: "Visionary leader with a passion for fashion and technology. Agamjot drives our mission to revolutionize online shopping.",
      avatar: "AS"
    }
  ];

  return (
    <section className="about-section">
      <div className="section-container">
        <h2 className="section-title">Meet Our Team</h2>
        <div className="section-content">
          <p className="section-description">
            Behind every great fashion experience is a passionate team of individuals who believe in 
            the power of style to transform lives. Our diverse team brings together expertise in 
            fashion, technology, sustainability, and customer service to create something truly special.
          </p>
          <motion.div 
            className="team-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="team-member"
                variants={memberVariants}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="member-avatar"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {member.avatar}
                </motion.div>
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-bio">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
