import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, ENDPOINTS, JOB_TYPES } from "../constants/constant";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";
import "../styles/pages/Jobs.css";

const Jobs = ({ searchTerm }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [activeJobType, setActiveJobType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
    salary: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));
    fetchJobs();
  }, [navigate]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}${ENDPOINTS.JOBS}`);
      setJobs(response.data);
      setFilteredJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    setSelectedJob(jobId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}${ENDPOINTS.deletejob}/${selectedJob}`);
      setShowDeleteDialog(false);
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleEdit = (job) => {
    setSelectedJob(job.id);
    setEditFormData({
      job_title: job.job_title || "",
      company: job.company || "",
      company_url: job.company_url || "",
      location: job.location || "",
      job_type: job.job_type || "",
      salary: job.salary || "",
      contact_details: {
        email: job.contact_details?.email || "",
        phone: job.contact_details?.phone || "",
      },
    });
    setShowEditDialog(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${BASE_URL}${ENDPOINTS.editjob}/${selectedJob}`,
        editFormData
      );
      setShowEditDialog(false);
      fetchJobs();
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  useEffect(() => {
    if (jobs.length > 0) {
      applyFilters(activeJobType, searchTerm);
    }
  }, [searchTerm, jobs, activeJobType]);

  const applyFilters = (jobType, search) => {
    let filtered = [...jobs];

    if (search) {
      filtered = filtered.filter(
        (job) =>
          job.job_title.toLowerCase().includes(search.toLowerCase()) ||
          job.company.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (jobType !== "All") {
      filtered = filtered.filter((job) => job.job_type === jobType);
    }

    setFilteredJobs(filtered);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="jobs-page">
      <div className="jobs-hero">
        <div className="jobs-hero-content">
          <h1>Find Your Dream Job</h1>
          <p>Discover opportunities that match your skills and aspirations</p>
        </div>
      </div>

      {user && user.role === 1 && (
        <div className="admin-controls">
          <button className="add-job-btn" onClick={() => navigate("/add-job")}>
            Add New Job
          </button>
        </div>
      )}

      <div className="jobs-filters">
        <div className="filter-container">
          <div className="filter-section">
            <h3>Job Type</h3>
            <div className="filter-tags">
              {JOB_TYPES.map((type) => (
                <span
                  key={type}
                  className={`filter-tag ${
                    activeJobType === type ? "active" : ""
                  }`}
                  onClick={() => setActiveJobType(type)}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="jobs-main">
        <div className="jobs-grid">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="job-card-wrapper">
                <JobCard job={job} />
                {user && user.role === 1 && (
                  <div className="admin-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(job)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(job.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-jobs-message">
              <p>No jobs found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this job?</p>
            <div className="dialog-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </button>
              <button className="confirm-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Job Dialog */}
      {showEditDialog && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <h3>Edit Job</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Job Title</label>
                <input
                  type="text"
                  name="job_title"
                  value={editFormData.job_title}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      job_title: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  name="company"
                  value={editFormData.company}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      company: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Company URL</label>
                <input
                  type="url"
                  name="company_url"
                  value={editFormData.company_url}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      company_url: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={editFormData.location}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      location: e.target.value,
                    })
                  }
                  required
                  placeholder="e.g. New York, NY or Remote"
                />
              </div>

              <div className="form-group">
                <label>Job Type</label>
                <select
                  name="job_type"
                  value={editFormData.job_type}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      job_type: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select Type</option>
                  {JOB_TYPES.filter((type) => type !== "All").map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Salary</label>
                <input
                  type="text"
                  name="salary"
                  value={editFormData.salary}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, salary: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Contact Email</label>
                <input
                  type="email"
                  name="contact_email"
                  value={editFormData.contact_details.email}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      contact_details: {
                        ...editFormData.contact_details,
                        email: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Contact Phone</label>
                <input
                  type="tel"
                  name="contact_phone"
                  value={editFormData.contact_details.phone}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      contact_details: {
                        ...editFormData.contact_details,
                        phone: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>

              <div className="dialog-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowEditDialog(false);
                    setEditFormData({});
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="confirm-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
