import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Next from "./pages/Next";
import FinalForm from "./pages/FinalForm";
import mainBg from "./assets/images/static-bg.jpg";
import "./App.css";
import BgVideo from "./assets/video.mp4";
import Symptoms_form from "./pages/Symptoms_form";
import Daily_routine from "./pages/Daily_routine";
import Acquaintance_form from "./pages/Acquaintance_form";
import Diet_plan from "./pages/Diet_plan";
import Login from "./admin/login";
import Dashboard from "./admin/Dashboard";
import Diet_plan_2 from "./pages/Diet_plan_2";
// import Page from "./diet_plan/page";

const App = () => {
  return (
    <Router>
      {/* All Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/next" element={<Next />} />
        <Route path="/symptoms-form" element={<Symptoms_form />} />
        <Route path="/daily-routine" element={<Daily_routine />} />
        <Route path="/acquaintance" element={<Acquaintance_form />} />
        <Route path="/final-form" element={<FinalForm />} />
        <Route path="/diet-plan" element={<Diet_plan />} />
        <Route path="/diet-plan-2" element={<Diet_plan_2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
