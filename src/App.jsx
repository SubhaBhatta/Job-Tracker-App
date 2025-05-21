import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "../src/components/LoginSignup/IntroPage";
import Login from "../src/components/LoginSignup/Login";
import Signup from "../src/components/LoginSignup/SignUp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
