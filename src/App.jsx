import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import AddJob from "./pages/AddJob";
import "./styles/common.css";
import "./App.css";

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user && user.role === 1 ? children : <Navigate to="/" />;
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <Router>
      <div className={`app-container ${isNavOpen ? "nav-open" : ""}`}>
        <NavBar
          onSearch={setSearchTerm}
          isOpen={isNavOpen}
          onToggle={() => setIsNavOpen(!isNavOpen)}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/jobs"
            element={
              <PrivateRoute>
                <Jobs searchTerm={searchTerm} />
              </PrivateRoute>
            }
          />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/add-job"
            element={
              <AdminRoute>
                <AddJob />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
