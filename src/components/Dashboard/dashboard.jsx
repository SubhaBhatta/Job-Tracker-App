import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.name) {
      setUserName(storedUser.name);
    }
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Welcome, {userName || "Guest"}!</h1>
      <p>This is your personalized dashboard.</p>
    </div>
  );
};

export default Dashboard;
