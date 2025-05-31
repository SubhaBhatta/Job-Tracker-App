import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Stats.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Stats = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  const chartLabels = jobs.map((job) => `${job.company} - ${job.position}`);
  const chartStatus = jobs.map((job) => job.status);

  const statusColorMap = {
    Applied: "#36A2EB",
    Interview: "#FFCE56",
    Offer: "#4BC0C0",
    Rejected: "#FF6384",
    Default: "#9966FF",
  };

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Job Applications",
        data: chartStatus.map((status) => 1), 
        backgroundColor: chartStatus.map(
          (status) => statusColorMap[status] || statusColorMap.Default
        ),
        borderColor: "#ffffff",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const job = jobs[tooltipItem.dataIndex];
            return `${job.company} - ${job.position} (${job.status})`;
          },
        },
      },
    },
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jobs");
    window.location.href = "/login";
  };

  return (
    <div className="stats-container">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <h1>Job Application Statistics</h1>
      {jobs.length > 0 ? (
        <div className="chart-wrapper">
          <Pie data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p>No jobs available to show statistics.</p>
      )}
    </div>
  );
};

export default Stats;
