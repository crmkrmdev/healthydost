import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [purpose, setPurpose] = useState(localStorage.getItem("purpose") || "");

  return (
    <div className="main position-relative d-flex flex-column justify-content-center align-items-center vh-100 w-100">
      {/* Fullscreen dark overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark transparent overlay
          zIndex: 1,
        }}
      ></div>

      {/* Foreground content */}
      <div
        className="overlay position-relative z-2 text-center px-4"
        style={{ zIndex: 2 }}
      >
        <div className="overlay-content">
          <h1 className="text-white fw-bold mb-2">
            India's First AI Enabled Dietician!
          </h1>
          <p className="text-warning mb-4" style={{ fontSize: "1.2rem" }}>
            स्वस्थस्य स्वास्थ्य रक्षणं, आतुरस्य विकार प्रशमनं
          </p>
          <div className="mb-3 px-5 d-flex flex-column">
            <div className="d-flex gap-3 flex-wrap justify-content-center">
              <img
                src="/Healthy Dost Logo.png"
                alt="Logo"
                style={{ height: "150px" }}
              />
              <div className="gap-2 d-flex flex-column justify-content-center align-items-center w-100">
                <select
                  className="form-select text-white border-light bg-dark bg-opacity-50"
                  value={purpose || ""}
                  onChange={(e) => setPurpose(e.target.value)}
                >
                  <option value="" disabled>
                    Choose your purpose of getting a Complimentary Diet / Health
                    Plan
                  </option>
                  <option>
                    I have one or more disease and want to get rid of that
                  </option>
                  <option>I am healthy and I don't want to get ill</option>
                  <option>I only want to lose weight</option>
                  <option>I want to gain weight</option>
                  <option>Lifestyle Improvement</option>
                </select>
                <button
                  type="button"
                  className="btn btn-grad w-100"
                  onClick={() => {
                    if (purpose) {
                      localStorage.setItem("purpose", purpose);
                      navigate("/next");
                    } else {
                      alert("Please select a purpose.");
                    }
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer
        className="footer text-white-50 position-relative z-2"
        style={{ zIndex: 2 }}
      >
        © 2025 Healthy Dost. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
