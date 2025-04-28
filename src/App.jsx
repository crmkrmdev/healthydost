import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Next from "./pages/Next";
import FinalForm from "./pages/FinalForm";
import mainBg from "./assets/ai-bg.jpg";
import "./App.css";
import BgVideo from "./assets/video.mp4";
import Symptoms_form from "./pages/Symptoms_form";
import Daily_routine from "./pages/Daily_routine";
import Acquaintance_form from "./pages/Acquaintance_form";
import Diet_plan from "./pages/Diet_plan";
import Login from "./admin/login";
import Dashboard from "./admin/Dashboard";

const App = () => {
  return (
    <Router>
      {/* Background video always playing */}
      {/* <div className="main_bg background-video">
        <video src={BgVideo} autoPlay muted loop playsInline />
        <img src={mainBg} alt="Healthy Dost" className="img-fluid " />
      </div> */}

      {/* All Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/next" element={<Next />} />
        <Route path="/symptoms-form" element={<Symptoms_form />} />
        <Route path="/daily-routine" element={<Daily_routine />} />
        <Route path="/acquaintance" element={<Acquaintance_form />} />
        <Route path="/user-form" element={<FinalForm />} />
        <Route path="/diet-plan" element={<Diet_plan />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
