import React from "react";

const JobList = ({ jobs, onEdit, onDelete }) => {
  if (jobs.length === 0) return <p>No jobs to display.</p>;

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <div key={job.id} className="job-card">
          <h3>
            {job.position} at {job.company}
          </h3>
          <p>Status: {job.status}</p>
          <p>Date: {job.date}</p>
          <button onClick={() => onEdit(job)}>Edit</button>
          <button onClick={() => onDelete(job.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default JobList;
