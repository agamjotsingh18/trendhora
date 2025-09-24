import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="not-found-container">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: [0, -20, 0], opacity: 1 }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
        style={{
          fontSize: '6em',
          fontWeight: 'bold',
          color: '#facc15',
          textShadow: `
            0 0 20px rgba(250,204,21,0.8),
            0 0 40px rgba(250,204,21,0.6)
          `,
          marginBottom: '20px',
        }}
      >
        404
      </motion.div>

      <h1>Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="home-button">Go to Homepage</Link>
    </div>
  );
};

export default PageNotFound;
