import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "../src/components/LoginSignup/IntroPage";
import Login from "../src/components/LoginSignup/Login";
import Signup from "../src/components/LoginSignup/SignUp";
import Dashboard from "../src/components/Dashboard/dashboard";
import Stats from "../src/components/Stats/Stats";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
};

export default App;
