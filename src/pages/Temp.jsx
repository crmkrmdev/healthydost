import React from "react";
import LOGO from "../assets/LOGO.png";

const Header = () => {
  return (
    <div
      className="header d-flex justify-content-between align-items-center px-3 py-2"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 1000,
      }}
    >
      <img
        src={LOGO}
        alt="Logo"
        style={{ height: "80px" }}
        className="rounded-5"
      />
      <button className="header-btn px-5 py-3 rounded-pill fw-semibold">
        My INDIA Healthy INDIA
      </button>
    </div>
  );
};

export default Header;
