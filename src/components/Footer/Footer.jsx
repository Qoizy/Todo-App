import React from "react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About</h3>
          <p>A modern todo application built by Quyum.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/test-error">Error Test</a>
            </li>
            <li>
              <a href="/non-existent">404 Test</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Connect</h3>
          <div className="social-links">
            <a
              href="https://github.com/Qoizy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
            <a href="mailto:oladimejiquyum30@gmail.com" aria-label="Email">
              <i className="far fa-envelope"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/oladimeji-quyum-opeyemi-466275222/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; Quyum {currentYear} Todo App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
