import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackToHome.css";

const BackToHome = () => {
  const navigate = useNavigate();

  return (
    <button
      className="back-to-home"
      onClick={() => navigate("/")}
      aria-label="Back to home"
    >
      <i className="fas fa-arrow-left"></i> Back to Home
    </button>
  );
};

export default BackToHome;
