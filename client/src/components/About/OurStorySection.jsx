import React from 'react';
import { motion } from 'framer-motion';

const OurStorySection = () => {
  const timelineVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const storyMilestones = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Trendhora was born from a simple idea: make high-quality fashion accessible to everyone. Our founders, passionate about style and technology, launched the platform with just 50 curated pieces."
    },
    {
      year: "2021",
      title: "Growing Community",
      description: "We reached 10,000 happy customers and expanded our catalog to include sustainable fashion brands. Our community-driven approach helped us understand what fashion lovers truly want."
    },
    {
      year: "2022",
      title: "Innovation Milestone",
      description: "Launched our AI-powered style recommendation engine and mobile app. We also partnered with emerging designers to bring unique, limited-edition pieces to our platform."
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Expanded to serve customers in 25 countries and launched our sustainability initiative, ensuring 70% of our brands meet eco-friendly standards."
    },
    {
      year: "2024",
      title: "Fashion Forward",
      description: "Introduced virtual try-on technology and AR features. Reached 100,000 active users and became a certified B-Corp, solidifying our commitment to social and environmental responsibility."
    },
    {
      year: "2025",
      title: "The Future",
      description: "Continuing to innovate with new technologies, expanding our sustainable fashion partnerships, and building the most personalized shopping experience in the industry."
    }
  ];

  return (
    <section className="about-section">
      <div className="section-container">
        <h2 className="section-title">Our Story</h2>
        <div className="section-content">
          <p className="section-description">
            Every great journey begins with a single step. Ours started with a vision to revolutionize 
            online fashion retail by combining cutting-edge technology with a deep understanding of 
            style and sustainability. Here's how our story unfolded:
          </p>
          <div className="timeline">
            {storyMilestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={timelineVariants}
                transition={{ delay: index * 0.1 }}
              >
                <div className="timeline-year">{milestone.year}</div>
                <motion.div 
                  className="timeline-content"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <h3 className="timeline-title">{milestone.title}</h3>
                  <p className="timeline-description">{milestone.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
