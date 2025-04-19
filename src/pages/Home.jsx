import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [purpose, setPurpose] = useState("");

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
          <div className="mb-3 px-5 d-flex flex-column">
            <div className="d-flex gap-3">
              <img
                src="/Healthy Dost Logo.jpeg"
                alt="Logo"
                style={{ height: "150px" }}
              />
              <div className="gap-2 d-flex flex-column justify-content-center align-items-center w-100">
                <select
                  className="form-select text-white border-light"
                  value={purpose || ""}
                  onChange={(e) => setPurpose(e.target.value)}
                >
                  <option value="" disabled>
                  Choose your purpose of getting a  Complimentary Diet / Health Plan

                  </option>
                  <option value="weight-loss">I have one or more disease and want to get rid of that</option>
                  <option value="weight-loss">I am healthy and I don't want to get ill</option>
                  <option value="weight-loss">I only want to loose weight</option>

                  <option value="muscle-gain">I want to gain weight</option>
                  <option value="general-health"> Lifestyle Improvement</option>
                </select>
                <button
                  type="button"
                  className="btn btn-grad w-100"
                  onClick={() => {
                    if (purpose) {
                      localStorage.setItem("purpose", purpose);
                      navigate("/symptoms-form");
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

      <footer className="footer text-white-50">
        © 2025 My AI Assistant. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
