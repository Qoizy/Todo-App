import React from "react";
import BackToHome from "./BackToHome/BackToHome";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <BackToHome />
      <div className="not-found" role="alert">
        <h2>404 - Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
