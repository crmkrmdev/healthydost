import React, { useState } from "react";

const FinalForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
  });
  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div
        className="glass-card p-4"
        style={{ width: "600px", minHeight: "100px" }}
      >
        <h3 className="mb-4 text-center">User Details</h3>
        <form className="FinalForm">
          <div className="mb-2">
            <label className="form-label text-white">Name</label>
            <input
              required
              type="text"
              className="form-control bg-transparent text-white border-light"
              placeholder="Enter full name"
            />
          </div>
          <div className="mb-2">
            <label className="form-label text-white">Age</label>
            <input
              required
              minvalue={0}
              type="number"
              className="form-control bg-transparent text-white border-light"
              placeholder="Enter age"
            />
          </div>
          <div className="mb-2">
            <label className="form-label text-white">Gender</label>
            <select
              className="form-select bg-transparent text-white border-light"
              required
            >
              <option value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="form-label text-white">Weight (approx)</label>
            <input
              required
              type="number"
              className="form-control bg-transparent text-white border-light"
              placeholder="In kg"
            />
          </div>
          <div className="mb-2">
            <label className="form-label text-white">Email</label>
            <input
              required
              type="email"
              className="form-control bg-transparent text-white border-light"
              placeholder="example@email.com"
            />
          </div>
          <div className="mb-2">
            <label className="form-label text-white">Phone</label>
            <input
              required
              type="tel"
              className="form-control bg-transparent text-white border-light"
              placeholder="Enter phone number"
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className=" btn btn-light w-50 mt-3">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FinalForm;
