import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Next from "./pages/Next";
import videoBg from "./assets/video.mp4";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Background video always playing */}
        <video autoPlay loop muted className="background-video">
          <source src={videoBg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* All Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/next" element={<Next />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
