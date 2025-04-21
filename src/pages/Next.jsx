import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Next = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  // continuously increase the progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 80); // Increase the speed of the progress bar
  }, []);
  return (
    <div
    className="main d-flex flex-column justify-content-center align-items-center"
    style={{ minHeight: "100vh" }}
  >
    <div className="overlay w-100 h-100 d-flex flex-column justify-content-center align-items-center">
      <div
        className="overlay-content d-flex flex-column justify-content-center align-items-center gap-4 p-4"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Logo on top */}
        <div className="text-center">
          <img
            src="/Healthy Dost Logo.png"
            alt="Logo"
            className="logo mb-3"
            style={{ width: "150px" }}
          />
        </div>
  
        {/* Heading */}
        <h1 className="text-white fw-bold text-center">
          India's First AI Enabled Dietician!
        </h1>
  
        {/* Progress and Button */}
        <div className="d-flex gap-3">
          <div className="d-flex flex-column justify-content-center gap-2">
            <h4 className="text-center">You are just one step away</h4>
            <div
              className="progress rounded-pill"
              style={{ width: "300px", backgroundColor: "#e0e0e0" }}
            >
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
  
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  navigate("/symptoms-form");
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    {/* Bottom message */}
    <h3 className="mt-4 bg-dark opacity-75 p-2 text-white text-center">
      Get 100% Customized Diet Plan for you | Healthier Future | Improved
      Quality of life
    </h3>
  </div>
  
  );
};

export default Next;
