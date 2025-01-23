import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, ENDPOINTS, JOB_TYPES } from '../constants/constant';
import '../styles/pages/Jobs.css';

const AddJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    job_title: '',
    company: '',
    company_url: '',
    location: '',
    salary: '',
    job_type: '',
    contact_details: {
      email: '',
      phone: ''
    }
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 1) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('contact_')) {
      // Handle contact details fields
      const field = name.replace('contact_', '');
      setFormData(prev => ({
        ...prev,
        contact_details: {
          ...prev.contact_details,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}${ENDPOINTS.addjobs}`, formData);
      navigate('/jobs');
    } catch (err) {
      setError('Error adding job');
    }
  };

  return (
    <div className="add-job-container">
      <h2>Add New Job</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            name="job_title"
            value={formData.job_title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Company URL</label>
          <input
            type="url"
            name="company_url"
            value={formData.company_url}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="e.g. New York, NY or Remote"
          />
        </div>

        <div className="form-group">
          <label>Job Type</label>
          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            {JOB_TYPES.filter(type => type !== 'All').map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Salary</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
            placeholder="e.g. $90,000 - $120,000"
          />
        </div>

        <div className="form-group">
          <label>Contact Email</label>
          <input
            type="email"
            name="contact_email"
            value={formData.contact_details.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Contact Phone</label>
          <input
            type="tel"
            name="contact_phone"
            value={formData.contact_details.phone}
            onChange={handleChange}
            required
            placeholder="+1234567890"
          />
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate('/jobs')}
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Add Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob; 