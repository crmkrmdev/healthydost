import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [toggle, setToggle] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId === "admin" && password === "admin") {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="main d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="card p-4 shadow col-6 col-md-4 col-lg-3">
        <h3 className="text-center mb-4">Admin Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">User ID</label>
            <input
              type="text"
              className="form-control bg-dark text-white"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type={`${toggle ? "text" : "password"}`}
              className="form-control bg-dark text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-link text-secondary m-0 p-0 ms-2"
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? (
                <i class="bi bi-eye-fill"></i>
              ) : (
                <i class="bi bi-eye-slash-fill"></i>
              )}
            </button>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
