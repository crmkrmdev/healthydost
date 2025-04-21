import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LOGO from "../assets/LOGO.png";

const Home = () => {
  const navigate = useNavigate();
  const [purpose, setPurpose] = useState("");
  const [customPurpose, setCustomPurpose] = useState("");
  const inputRef = useRef(null);

  // Focus input when "others" is selected
  useEffect(() => {
    if (purpose === "others" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [purpose]);

  const handleSend = () => {
    if (purpose === "others" && !customPurpose.trim()) {
      alert("Please enter your purpose.");
      return;
    }

    const finalPurpose = purpose === "others" ? customPurpose : purpose;
    localStorage.setItem("purpose", finalPurpose);
    navigate("/next");
  };

  return (
    <div className="main position-relative d-flex flex-column justify-content-center align-items-center vh-100 w-100">
      {/* Fullscreen dark overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
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
              <img src={LOGO} alt="Logo" style={{ height: "150px" }} />
              <div className="gap-2 d-flex flex-column justify-content-center align-items-center w-100">
                <select
                  className="form-select text-white border-light bg-dark bg-opacity-50"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                >
                  <option value="" disabled>
                    Choose your purpose of getting a Complimentary Diet / Health
                    Plan
                  </option>
                  <option value="weight-loss">
                    I have one or more disease and want to get rid of that
                  </option>
                  <option value="stay-healthy">
                    I am healthy and I don't want to get ill
                  </option>
                  <option value="only-weight-loss">
                    I only want to lose weight
                  </option>
                  <option value="muscle-gain">I want to gain weight</option>
                  <option value="general-health">Lifestyle Improvement</option>
                  <option value="others">Others</option>
                </select>

                {purpose === "others" && (
                  <input
                    ref={inputRef}
                    type="text"
                    className="form-control text-white border-light bg-dark bg-opacity-50 custom-placeholder"
                    placeholder="Please specify your purpose"
                    value={customPurpose}
                    onChange={(e) => setCustomPurpose(e.target.value)}
                    style={{
                      "::placeholder": {
                        color: "#bbb",
                      },
                      color: "#fff",
                    }}
                  />
                )}

                <button
                  type="button"
                  className="btn btn-grad w-100"
                  onClick={handleSend}
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
