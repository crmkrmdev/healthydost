import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./header";

const Next = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const message =
    "Get 100% Customized Diet Plan for you | Healthier Future | Improved Quality of life";
  const words = message.split(" ");

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
    <>
      <div className="main d-flex flex-column justify-content-center align-items-center">
        <Header />
        <div className="glass-card d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex flex-column justify-content-center align-items-center gap-4 p-4">
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
            <h1 className="text-warning fw-bold text-center">
              India's First AI Enabled Health System!
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

                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                  >
                    <i class="bi bi-arrow-left"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                      navigate("/symptoms-form");
                    }}
                    disabled={progress < 100} // Disable button until progress is 100%
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="mt-4 bg-dark opacity-75 p-2 text-white text-center d-flex flex-wrap justify-content-center z-2 rounded">
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.4 }}
              className="mx-1"
            >
              {word}
            </motion.span>
          ))}
        </h3>
      </div>
    </>
  );
};

export default Next;
