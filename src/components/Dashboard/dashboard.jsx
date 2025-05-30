import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import JobList from "../Job/JobList";
import JobForm from "../Job/JobForm";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [userName, setUserName] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Newest");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(stored);
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.name) {
      setUserName(storedUser.name);
    }
  }, []);

  const saveJobsToStorage = (updatedJobs) => {
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  const handleSave = (jobData) => {
    let updatedJobs;

    if (!jobData.id) {
      jobData.id = Date.now();
      jobData.date = new Date().toISOString();
      updatedJobs = [jobData, ...jobs];
    } else {
      updatedJobs = jobs.map((job) => (job.id === jobData.id ? jobData : job));
    }

    setJobs(updatedJobs);
    saveJobsToStorage(updatedJobs);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      const updated = jobs.filter((job) => job.id !== id);
      setJobs(updated);
      saveJobsToStorage(updated);
    }
  };

  const handleEdit = (job) => {
    setJobToEdit(job);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearEdit = () => {
    setJobToEdit(null);
  };

  const filteredJobs = jobs
    .filter((job) =>
      statusFilter === "All" ? true : job.status === statusFilter
    )
    .filter(
      (job) =>
        job.company.toLowerCase().includes(searchText.toLowerCase()) ||
        job.position.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "Newest") return new Date(b.date) - new Date(a.date);
      if (sortOption === "Oldest") return new Date(a.date) - new Date(b.date);
      if (sortOption === "CompanyAZ") return a.company.localeCompare(b.company);
      if (sortOption === "CompanyZA") return b.company.localeCompare(a.company);
      return 0;
    });

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jobs");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-wrapper">
      <header className="welcome-header">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
        <h1 className="welcome-heading">Welcome, {userName || "Guest"}!</h1>
        <p className="welcome-paragraph">
          This is your personalized dashboard.
        </p>
      </header>

      <main className="dashboard-scrollable">
        <div className="filters-container">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
            <option value="CompanyAZ">Company A-Z</option>
            <option value="CompanyZA">Company Z-A</option>
          </select>

          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search company or position"
          />
        </div>

        <div className="form-section">
          <JobForm
            onSave={handleSave}
            jobToEdit={jobToEdit}
            clearEdit={clearEdit}
          />
        </div>

        <div className="job-section">
          <h1>Your Job Applications</h1>
          <JobList
            jobs={filteredJobs}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <div className="stats-section">
          <Link to="/Stats">
            <button className="stats-btn">Click To See Stats !! :)</button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
