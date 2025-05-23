import React, { useEffect, useState } from "react";
import "../Dashboard/Dashboard.css";
import JobList from "../Job/JobList";
import JobForm from "../Job/JobForm";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [userName, setUserName] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Newest");
  const [searchText, setSearchText] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(stored);
    setFilteredJobs(stored);
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.name) {
      setUserName(storedUser.name);
    }
  }, []);

  const saveJobsToStorage = (jobs) => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  };

  const handleSave = (jobData) => {
    let updatedJobs;
    if (jobs.some((job) => job.id === jobData.id)) {
      updatedJobs = jobs.map((job) => (job.id === jobData.id ? jobData : job));
    } else {
      updatedJobs = [jobData, ...jobs];
    }
    setJobs(updatedJobs);
    saveJobsToStorage(updatedJobs);
    applyFilters(updatedJobs); // Refresh filtered list
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      const updated = jobs.filter((job) => job.id !== id);
      setJobs(updated);
      saveJobsToStorage(updated);
      applyFilters(updated); // Refresh filtered list
    }
  };

  const handleEdit = (job) => {
    setJobToEdit(job);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearEdit = () => {
    setJobToEdit(null);
  };

  const applyFilters = (jobList = jobs) => {
    const filtered = jobList
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
        if (sortOption === "CompanyAZ")
          return a.company.localeCompare(b.company);
        if (sortOption === "CompanyZA")
          return b.company.localeCompare(a.company);
        return 0;
      });

    setFilteredJobs(filtered);
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {userName || "Guest"}!</h1>
      <p>This is your personalized dashboard.</p>

      <div className="filter-container">
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

        <button onClick={applyFilters}>Apply Filters</button>
      </div>

      <div className="form-container">
        <JobForm
          onSave={handleSave}
          jobToEdit={jobToEdit}
          clearEdit={clearEdit}
        />
      </div>

      <h2>Your Job Applications</h2>
      <JobList
        jobs={filteredJobs}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Dashboard;
