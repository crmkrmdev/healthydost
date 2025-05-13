import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Next from "./pages/Next";
import FinalForm from "./pages/FinalForm";
import "./App.css";
import Symptoms_form from "./pages/Symptoms_form";
import Daily_routine from "./pages/Daily_routine";
import Acquaintance_form from "./pages/Acquaintance_form";
import Diet_plan from "./pages/Diet_plan";
import Login from "./admin/login";
import Dashboard from "./admin/Dashboard";
import ProtectedRoute from "./utilities/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/next"
          element={
            <ProtectedRoute>
              <Next />
            </ProtectedRoute>
          }
        />
        <Route
          path="/symptoms-form"
          element={
            <ProtectedRoute>
              <Symptoms_form />
            </ProtectedRoute>
          }
        />
        <Route
          path="/daily-routine"
          element={
            <ProtectedRoute>
              <Daily_routine />
            </ProtectedRoute>
          }
        />
        <Route
          path="/acquaintance"
          element={
            <ProtectedRoute>
              <Acquaintance_form />
            </ProtectedRoute>
          }
        />
        <Route
          path="/final-form"
          element={
            <ProtectedRoute>
              <FinalForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/diet-plan"
          element={
            <ProtectedRoute>
              <Diet_plan />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
