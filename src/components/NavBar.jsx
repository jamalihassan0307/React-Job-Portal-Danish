import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "../styles/components/NavBar.css";

const NavBar = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    if (location.pathname !== "/jobs") {
      navigate("/jobs");
    }
    onSearch(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-brand">
          <Link to="/">
            <span className="brand-icon">💼</span>
            <span className="brand-text">JobPortal</span>
          </Link>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
          ></span>
        </button>

        <div className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <div className="nav-links">
            <Link
              to="/"
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="nav-icon">🏠</span>
              <span>Home</span>
            </Link>
            <Link
              to="/jobs"
              className={`nav-link ${
                location.pathname === "/jobs" ? "active" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="nav-icon">🔍</span>
              <span>Find Jobs</span>
            </Link>
            <Link
              to="/about"
              className={`nav-link ${
                location.pathname === "/about" ? "active" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="nav-icon">ℹ️</span>
              <span>About</span>
            </Link>
            <Link
              to="/contact"
              className={`nav-link ${
                location.pathname === "/contact" ? "active" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="nav-icon">📞</span>
              <span>Contact</span>
            </Link>
          </div>

          <div className="nav-search">
            <input
              type="text"
              placeholder="Search jobs..."
              onChange={handleSearch}
              className="search-input"
            />
          </div>

          <div className="nav-auth">
            {user?.email ? (
              <div className="profile-menu">
                <img
                  src={user.profile_picture || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="profile-image"
                />
                <div className="profile-dropdown">
                  <div className="profile-info">
                    <span className="profile-name">{user.name}</span>
                    <span className="profile-email">{user.email}</span>
                  </div>
                  <div className="profile-actions">
                    <button
                      onClick={() => navigate("/profile")}
                      className="profile-action"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        localStorage.removeItem("user");
                        navigate("/login");
                      }}
                      className="profile-action logout"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="login-btn">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
