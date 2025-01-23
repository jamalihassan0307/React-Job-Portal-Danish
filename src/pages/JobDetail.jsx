import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '../constants/constant';
import '../styles/pages/JobDetail.css';

const JobDetail = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    fetchJobDetail();
  }, [id, navigate]);

  const fetchJobDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}${ENDPOINTS.JOBS}`);
      const jobs = response.data;
      const selectedJob = jobs.find(job => job.id === parseInt(id));
      if (selectedJob) {
        setJob(selectedJob);
      } else {
        navigate('/jobs');
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading job details...</p>
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="job-detail-page">
      <div className="job-detail-hero">
        <div className="job-detail-hero-content">
          <h1>{job.job_title}</h1>
          <div className="company-info">
            <span className="company-name">{job.company}</span>
            <span className="location">📍 {job.location}</span>
          </div>
          <span className={`job-type ${job.job_type?.toLowerCase()}`}>
            {job.job_type}
          </span>
        </div>
      </div>

      <div className="job-detail-content">
        <div className="job-main-info">
          <div className="info-section">
            <h2>Job Description</h2>
            <p>{job.description}</p>
          </div>

          {job.requirements && job.requirements.length > 0 && (
            <div className="info-section">
              <h2>Requirements</h2>
              <ul>
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {job.benefits && job.benefits.length > 0 && (
            <div className="info-section">
              <h2>Benefits</h2>
              <ul>
                {job.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="job-side-info">
          <div className="info-card">
            <h3>Salary</h3>
            <p className="salary">💰 {job.salary}</p>
          </div>

          {job.contact_details && (
            <div className="info-card">
              <h3>Contact Information</h3>
              <p>📧 {job.contact_details.email}</p>
              <p>📞 {job.contact_details.phone}</p>
            </div>
          )}

          <div className="action-buttons">
            {job.company_url && (
              <a 
                href={job.company_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="action-button primary"
              >
                Visit Company Website
              </a>
            )}
            <button 
              onClick={() => navigate('/jobs')} 
              className="action-button secondary"
            >
              Back to Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail; 