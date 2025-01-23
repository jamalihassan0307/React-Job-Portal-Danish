import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/JobCard.css';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="job-card">
      <div className="job-card-header">
        <h3>{job.job_title}</h3>
        <span className={`job-type ${job.job_type.toLowerCase()}`}>
          {job.job_type}
        </span>
      </div>
      
      <div className="job-card-company">
        <span className="company-name">{job.company}</span>
        <span className="location">📍 {job.location}</span>
      </div>
      
      <div className="job-card-salary">
        <span>💰 {job.salary}</span>
      </div>
      
      <div className="job-card-actions">
        <button 
          onClick={() => window.open(job.company_url, '_blank')}
          className="company-site-btn"
        >
          Visit Company
        </button>
        <button 
          onClick={() => navigate(`/job/${job.id}`)}
          className="view-details-btn"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobCard; 