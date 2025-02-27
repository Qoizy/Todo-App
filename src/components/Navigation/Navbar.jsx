import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="nav-brand">
          <i className="fas fa-check-double"></i>
          <span>TodoApp</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            <i className="fas fa-home"></i>
            <span>Home</span>
          </Link>
          <Link
            to="/test-error"
            className={location.pathname === "/test-error" ? "active" : ""}
          >
            <i className="fas fa-exclamation-triangle"></i>
            <span>Error Test</span>
          </Link>
          <Link
            to="/non-existent"
            className={location.pathname === "/non-existent" ? "active" : ""}
          >
            <i className="fas fa-unlink"></i>
            <span>404 Test</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
