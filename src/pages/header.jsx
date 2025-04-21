import React from "react";

const Header = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center px-3 py-2"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1,
      }}
    >
      <button className="btn btn-outline-light" onClick={handleBack}>
        Back
      </button>
      <p className="m-0 text-light">My INDIA healthy INDIA</p>
    </div>
  );
};

export default Header;                                                                                                          
