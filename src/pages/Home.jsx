import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Find Your Dream Job Today</h1>
          <p>
            Discover thousands of job opportunities with all the information you
            need.
          </p>
          <button className="cta-button" onClick={() => navigate("/jobs")}>
            Explore Jobs
          </button>
        </div>
      </div>
      /* */
      <div className="featured-jobs">
        <div className="container">
          <h2>Featured Job Categories</h2>
          <div className="category-grid">
            <div className="category-card">
              <h3>Technology</h3>
              <p>Software, Data, IT & More</p>
            </div>
            <div className="category-card">
              <h3>Business</h3>
              <p>Marketing, Sales & Finance</p>
            </div>
            <div className="category-card">
              <h3>Healthcare</h3>
              <p>Medical, Nursing & Pharma</p>
            </div>
          </div>
        </div>
      </div>
      <div className="features-section ">
        <div className="container">
          <h2>Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🎯</span>
              <h3>Perfect Match</h3>
              <p>Smart job matching system to find your ideal position</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🌍</span>
              <h3>Remote Work</h3>
              <p>Access global opportunities and work from anywhere</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">💼</span>
              <h3>Top Companies</h3>
              <p>Connect with leading companies worldwide</p>
            </div>
          </div>
        </div>
      </div>
      <div className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Career Journey?</h2>
          <p>Join thousands of professionals who've found their dream jobs</p>
          <button className="cta-button" onClick={() => navigate("/jobs")}>
            Search Jobs Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
