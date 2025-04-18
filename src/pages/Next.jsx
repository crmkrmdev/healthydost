import React from "react";

const Next = () => {
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
            <button className="btn btn-primary">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Next;
