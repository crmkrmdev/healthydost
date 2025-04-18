import React from "react";

const Home = () => {
  return (
    <div className="home-container">
      <div className="overlay">
        <div className="content-box bg-dark bg-opacity-75 p-4 rounded shadow text-center">
          <h1 className="text-white fw-bold mb-2">
            India's First AI Enabled Dietitian!
          </h1>
          <p className="text-warning mb-4">
            स्वस्थस्य स्वास्थ्य रक्षणं, आतुरस्य विकार प्रशमनं
          </p>

          <div className="mb-3">
            <select className="form-select">
              <option value="">Choose your purpose</option>
              <option value="weight-loss">Weight Loss</option>
              <option value="muscle-gain">Muscle Gain</option>
              <option value="general-health">General Health</option>
            </select>
          </div>
          <button className="btn btn-success w-100">Send</button>
        </div>
      </div>

      <footer className="footer text-white-50">
        © 2025 My AI Assistant. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
