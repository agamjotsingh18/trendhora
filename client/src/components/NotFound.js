import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh",
        bgcolor: "#0a0a0a", 
        color: "#f8fafc",
        textAlign: "center",
        px: 3,
        position: "relative",
        overflow: "hidden",
        pt: { xs: "120px", md: "250px" }, 
      }}
    >
      {/* Floating 404 */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: [0, -20, 0], opacity: 1 }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "6rem", md: "10rem" },
            fontWeight: "bold",
            color: "#facc15", 
            textShadow: `
              0 0 20px rgba(250,204,21,0.8),
              0 0 40px rgba(250,204,21,0.6)
            `,
          }}
        >
          404
        </Typography>
      </motion.div>

     
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
          Oops! Page not found
        </Typography>
        <Typography
          variant="body1"
          sx={{ maxWidth: 500, mb: 4, opacity: 0.8, color: "#d1d5db" }}
        >
          The page you’re looking for doesn’t exist or has been moved. Let’s get
          you back on track.
        </Typography>
      </motion.div>

      {/* Button */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Button
          variant="contained"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
            borderRadius: "12px",
            bgcolor: "#22c55e", // green accent
            color: "#fff",
            fontWeight: "bold",
            "&:hover": { bgcolor: "#16a34a" },
            boxShadow: "0px 6px 20px rgba(34,197,94,0.6)",
          }}
          onClick={() => navigate("/")}
        >
          GO HOME
        </Button>
      </motion.div>

     
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
        }}
      >
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
          style={{
            position: "absolute",
            top: "25%",
            left: "10%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(250,204,21,0.15)", 
            filter: "blur(100px)",
          }}
        />
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 7 }}
          style={{
            position: "absolute",
            bottom: "20%",
            right: "15%",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "rgba(34,197,94,0.15)", 
            filter: "blur(120px)",
          }}
        />
      </Box>
    </Box>
  );
}
