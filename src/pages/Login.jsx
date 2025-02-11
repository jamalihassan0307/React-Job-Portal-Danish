import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, ENDPOINTS } from "../constants/constant";
import "../styles/pages/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Check if user is already logged in
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      navigate("/");
    }
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}${ENDPOINTS.PROFILE}`);
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Error loading user data");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = users.find(
        (user) =>
          (user.username === formData.username ||
            user.email === formData.username) &&
          user.password === formData.password
      );

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username or Email</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
