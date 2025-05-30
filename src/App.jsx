import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "../src/components/LoginSignup/IntroPage";
import Login from "../src/components/LoginSignup/Login";
import Signup from "../src/components/LoginSignup/SignUp";
import Dashboard from "../src/components/Dashboard/dashboard";
import Stats from "../src/components/Stats/Stats";
import ProtectedRoute from "../src/components/Protected Routes /ProtectedRoute.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stats"
          element={
            <ProtectedRoute>
              <Stats />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
