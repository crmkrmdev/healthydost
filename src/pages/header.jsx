import React from "react";

const Header = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="header d-flex justify-content-between align-items-start px-3 py-2 w-100 h-100">
      <button className="btn btn-outline-light" onClick={handleBack}>
        <i className="bi bi-arrow-left"></i> Back
      </button>
      <h4 className="m-0 text-light">My INDIA healthy INDIA</h4>
    </div>
  );
};

export default Header;
