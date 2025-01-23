import React, { useState } from 'react';
import '../styles/pages/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-card">
            <span className="info-icon">📍</span>
            <h3>Our Location</h3>
            <p>123 Business Avenue<br />bahawalpur</p>
          </div>
          <div className="info-card">
            <span className="info-icon">📧</span>
            <h3>Email Us</h3>
            <p>danish@gmail.com<br />danish@gmail.com</p>
          </div>
          <div className="info-card">
            <span className="info-icon">📞</span>
            <h3>Call Us</h3>
            <p>+92 3160623655<br />Mon - Fri, 9am - 6pm</p>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Contact; 