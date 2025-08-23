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
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former fashion buyer with 10+ years at top retailers. Sarah's vision drives Trendhora's mission to democratize fashion.",
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder",
      bio: "Tech innovator with expertise in AI and e-commerce. Marcus leads our technical strategy and product development.",
      avatar: "MR"
    },
    {
      name: "Aisha Patel",
      role: "Head of Sustainability",
      bio: "Environmental advocate ensuring our fashion choices are ethical and sustainable. Aisha leads our green initiatives.",
      avatar: "AP"
    },
    {
      name: "James Thompson",
      role: "Creative Director",
      bio: "Award-winning designer and stylist who curates our collections and creates compelling visual experiences.",
      avatar: "JT"
    },
    {
      name: "Elena Kowalski",
      role: "Head of Customer Experience",
      bio: "Customer service expert focused on creating delightful shopping experiences and building lasting relationships.",
      avatar: "EK"
    },
    {
      name: "David Kim",
      role: "Head of Operations",
      bio: "Supply chain wizard ensuring fast, reliable delivery and seamless operations across all markets.",
      avatar: "DK"
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
