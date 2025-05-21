import React from "react";
import { Link } from "react-router-dom";
import "./Intro.css";
import imgReact from "./imgReact.png";

const Intro = () => {
  return (
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
  );
};

export default Intro;
