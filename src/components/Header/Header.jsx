import React from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const location = useLocation();

  if (location.pathname !== "/") {
    return null;
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="profile-section">
          <div className="profile-picture">
            <i className="fas fa-user"></i>
          </div>
          <div className="profile-info">
            <h1>Quyum</h1>
            <h2>ALT/SEO/024/0906</h2>
          </div>
        </div>
        <div className="app-description">
          <p>A Modern Todo Application</p>
          <div className="tech-stack">
            <span>React</span>
            <span>JavaScript</span>
            <span>HTML</span>
            <span>CSS</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
