import React, { useEffect, useState } from "react";

const Next = () => {
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
    }, 100); // Increase the speed of the progress bar
  }, []);

  return (
    <div className="main">
      <div className="" style={{ width: "150px" }}>
        <img src="/Healthy Dost Logo.png" alt="Logo" className="logo" />
      </div>
      <div
        className="w-full d-flex flex-column justify-content-center align-items-center gap-4"
        style={{ height: "70vh" }}
      >
        <h1 className="">India's First AI Enabled Dietitian!</h1>
        <div className="d-flex gap-4">
          <div className="" style={{ width: "150px" }}>
            <img src="/Healthy Dost Logo.png" alt="Logo" className="logo" />
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center gap-2">
            <h4 className="">You are just one step away</h4>
            {/* progress line*/}
            <div
              className="progress"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Next;
