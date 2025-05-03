import React from "react";
import LOGO from "../assets/LOGO.png";

const Header = () => {
  return (
    <div
      className={`header d-flex flex-column flex-sm-row justify-content-between align-items-center`}
      style={{
        top: 0,
      }}
    >
      <img
        className="headerLogo"
        src={LOGO}
        alt="Logo"
        style={{ height: "90px", zIndex: 1 }}
      />
      <h3 className="m-0 text-success fw-bold">My India Healthy India</h3>
    </div>
  );
};

export default Header;
