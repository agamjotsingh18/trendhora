import React from "react";

const ScrollToBottomButton = ({ containerRef }) => {
  const handleClick = () => {
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: "#FFD700", // bright yellow like your screenshot
        color: "#fff",
        border: "none",
        cursor: "pointer",
        fontSize: "28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 12px rgba(255, 215, 0, 0.6)", // glowing effect
        transition: "all 0.3s ease",
        zIndex: 1000,
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "scale(1.1)";
        e.target.style.boxShadow = "0 0 20px rgba(255, 215, 0, 0.9)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "scale(1)";
        e.target.style.boxShadow = "0 4px 12px rgba(255, 215, 0, 0.6)";
      }}
      title="Scroll to Bottom"
    >
      ⬇
    </button>
  );
};

export default ScrollToBottomButton;
