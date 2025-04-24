import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Next from "./pages/Next";
import FinalForm from "./pages/FinalForm";
import videoBg from "./assets/Healthy_Dost_BG.mp4";
import "./App.css";
import Symptoms_form from "./pages/Symptoms_form";
import Daily_routine from "./pages/Daily_routine";
import Acquaintance_form from "./pages/Acquaintance_form";
import Acquaintance_symptoms from "./pages/Acquaintance_symptoms";
import Diet_plan from "./pages/Diet_plan";
import Login from "./admin/login";
import Dashboard from "./admin/Dashboard";

const App = () => {
  return (
    <Router>
      {/* Background video always playing */}
      <video autoPlay loop muted className="background-video">
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* All Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/next" element={<Next />} />
        <Route path="/symptoms-form" element={<Symptoms_form />} />
        <Route path="/daily-routine" element={<Daily_routine />} />
        <Route path="/acquaintance" element={<Acquaintance_form />} />
        <Route path="/final-form" element={<FinalForm />} />
        <Route
          path="/acquaintance-symptoms"
          element={<Acquaintance_symptoms />}
        />
        <Route path="/diet-plan" element={<Diet_plan />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
