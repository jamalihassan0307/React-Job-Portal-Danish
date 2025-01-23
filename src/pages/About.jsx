import React from 'react';
import '../styles/pages/About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>About JobPortal</h1>
          <p>Connecting talent with opportunity</p>
        </div>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            At JobPortal, we're dedicated to transforming the way people find their dream careers. 
            We believe everyone deserves a job they love, and we're here to make that happen.
          </p>
        </div>

        <div className="stats-section">
          <div className="stat-card">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Active Jobs</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">5K+</span>
            <span className="stat-label">Companies</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">1M+</span>
            <span className="stat-label">Job Seekers</span>
          </div>
        </div>

        <div className="team-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <span className="value-icon">🎯</span>
              <h3>Excellence</h3>
              <p>We strive for excellence in everything we do</p>
            </div>
            <div className="value-card">
              <span className="value-icon">🤝</span>
              <h3>Trust</h3>
              <p>Building trust through transparency</p>
            </div>
            <div className="value-card">
              <span className="value-icon">💡</span>
              <h3>Innovation</h3>
              <p>Constantly improving our platform</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 