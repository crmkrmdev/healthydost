import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="main d-flex flex-column justify-content-center align-items-center vh-100 w-100">
      <div className="overlay">
        <div className="overlay-content">
          <h1 className="text-white fw-bold mb-2">
            India's First AI Enabled Dietitian!
          </h1>
          <p className="text-warning mb-4">
            स्वस्थस्य स्वास्थ्य रक्षणं, आतुरस्य विकार प्रशमनं
          </p>
          <div className="mb-3 px-5 d-flex flex-column gap-3">
            <select className="form-select">
              <option value="">Choose your purpose</option>
              <option value="weight-loss">Weight Loss</option>
              <option value="muscle-gain">Muscle Gain</option>
              <option value="general-health">General Health</option>
            </select>
            <Link className="btn btn-success w-100" to="/next">
              Send
            </Link>
          </div>
        </div>
      </div>

      <footer className="footer text-white-50">
        © 2025 My AI Assistant. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
