import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";

const FinalForm = () => {
  const navigate = useNavigate();
  const defaultUserData = {
    name: "",
    age: "",
    gender: "",
    weight: "",
    email: "",
    phone: "",
    allergy: "",
  };

  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem("userData");
    return saved ? JSON.parse(saved) : defaultUserData;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (/^\d*$/.test(value)) {
        setUserData((prevFormData) => ({ ...prevFormData, [name]: value }));
      }
    } else {
      setUserData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(userData));
    navigate("/diet-plan");
  };

  return (
    <>
      <div
        className="main d-flex justify-content-center align-items-center"
        // style={{ marginTop: "95px" }}
      >
        <Header />
        <div className="glass-card p-4" style={{ width: "500px" }}>
          <h3 className="text-center text-warning">User Details</h3>
          <form
            className="FinalForm"
            onSubmit={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          >
            <div className="mb-2">
              <label className="form-label text-white">Name</label>
              <input
                name="name"
                value={userData.name || ""}
                onChange={handleChange}
                required
                type="text"
                className="form-control text-white border-light"
                placeholder="Enter full name"
              />
            </div>
            <div className="mb-2">
              <label className="form-label text-white">Age</label>
              <input
                name="age"
                value={userData.age || ""}
                onChange={handleChange}
                required
                maxLength={3}
                min="0"
                max="99"
                type="number"
                className="form-control text-white border-light"
                placeholder="Enter age"
              />
            </div>
            <div className="mb-2">
              <label className="form-label text-white">Gender</label>
              <select
                name="gender"
                value={userData.gender || ""}
                onChange={handleChange}
                className="form-select text-white border-light"
                required
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="form-label text-white">Weight (approx)</label>
              <input
                name="weight"
                onChange={handleChange}
                value={userData.weight || ""}
                required
                type="number"
                min="0"
                max="500"
                className="form-control text-white border-light"
                placeholder="In kg"
              />
            </div>

            <div className="mb-2">
              <label className="form-label text-white">
                Height (approx , In feet)
              </label>
              <input
                name="height"
                onChange={(e) => {
                  // Format to two decimal places
                  const value = parseFloat(e.target.value).toFixed(2);
                  handleChange({ target: { name: "height", value: value } });
                }}
                value={userData.height || ""}
                required
                min="0"
                type="number"
                step="0.01"
                className="form-control text-white border-light"
                placeholder="In Feet"
              />
            </div>

            <div className="mb-2">
              <label className="form-label text-white">Email</label>
              <input
                name="email"
                onChange={handleChange}
                value={userData.email || ""}
                required
                type="email"
                className="form-control text-white border-light"
                placeholder="example@email.com"
              />
            </div>
            <div className="mb-2">
              <label className="form-label text-white">Phone</label>
              <input
                type="text"
                name="phone"
                value={userData.phone || ""}
                onChange={handleChange}
                maxLength={10}
                className="form-control text-white border-light"
                placeholder="Enter phone number"
                required
                pattern="\d{10}" // Ensures exactly 10 digits
                title="Phone number must be exactly 10 digits"
              />
            </div>
            <div className="mb-2">
              <label className="form-label text-white">Allergy</label>
              <input
                type="text"
                name="allergy"
                value={userData.allergy || ""}
                onChange={handleChange}
                className="form-control text-white border-light"
                placeholder="Enter allergy (if any)"
              />
            </div>
            <div className="d-flex justify-content-center gap-2 mt-3">
              <button
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
              >
                <i class="bi bi-arrow-left"></i>
              </button>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FinalForm;
