import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="profile-page">
      <div className="profile-hero">
        <div className="profile-header">
          <img 
            src={user.profile_picture || 'https://via.placeholder.com/150'} 
            alt="Profile" 
            className="profile-avatar"
          />
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-title">Software Developer</p>
        </div>
      </div>

      <div className="profile-content">
        <button className="edit-profile-btn">Edit Profile</button>
        
        <div className="profile-grid">
          <div className="profile-sidebar">
            <div className="profile-card">
              <h2>Personal Information</h2>
              <div className="info-list">
                <div className="info-item">
                  <span className="info-icon">📧</span>
                  <span>{user.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">📱</span>
                  <span>03160623655</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">📍</span>
                  <span>Bahawalpur</span>
                </div>
              </div>
            </div>

            <div className="profile-card">
              <h2>Skills</h2>
              <div className="skills-grid">
                <span className="skill-tag">React</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">HTML/CSS</span>
                <span className="skill-tag">Git</span>
              </div>
            </div>
          </div>

          <div className="profile-main">
            <div className="profile-card">
              <h2>Experience</h2>
              <div className="experience-list">
                <div className="experience-item">
                  <div className="experience-header">
                    <span className="company-name">Tech Corp</span>
                    <span className="date-range">2020 - Present</span>
                  </div>
                  <h3 className="job-title">Senior Frontend Developer</h3>
                  <p className="experience-description">
                    Led the development of multiple web applications using React and TypeScript.
                    Implemented responsive designs and improved application performance.
                  </p>
                </div>

                <div className="experience-item">
                  <div className="experience-header">
                    <span className="company-name">Digital Solutions Inc</span>
                    <span className="date-range">2018 - 2020</span>
                  </div>
                  <h3 className="job-title">Frontend Developer</h3>
                  <p className="experience-description">
                    Developed and maintained client websites. Collaborated with designers
                    to implement pixel-perfect UI components.
                  </p>
                </div>
              </div>
            </div>

            <div className="profile-card">
              <h2>Education</h2>
              <div className="experience-item">
                <div className="experience-header">
                  <span className="company-name">University of Technology</span>
                  <span className="date-range">2014 - 2018</span>
                </div>
                <h3 className="job-title">Bachelor of Computer Science</h3>
                <p className="experience-description">
                  Specialized in Software Engineering. Graduated with honors.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile; 