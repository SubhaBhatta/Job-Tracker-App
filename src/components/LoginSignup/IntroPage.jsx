import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Intro.css";
import imgReact from "../../../src/assets/imgReact.png";

const Intro = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <>
      <div style={{ textAlign: "right", marginTop: "100px" }}>
        <button
          className="toggle-button"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? "Switch to Light Mode ☀️☀️" : "Switch to Dark Mode 🌙🌙"}
        </button>
      </div>
      <div className="intro-wrapper">
        <div className="intro-left">
          <h1 role="heading" aria-level="1">
            Welcome to the App
          </h1>

          <div className="button-group">
            <Link to="/login" className="intro-button">
              Login
            </Link>
            <Link to="/signup" className="intro-button">
              Signup
            </Link>
          </div>
        </div>

        <div className="intro-right">
          <img src={imgReact} alt="React Logo" className="intro-image" />
        </div>
      </div>
    </>
  );
};

export default Intro;
