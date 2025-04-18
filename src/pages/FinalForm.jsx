import React from "react";

const FinalForm = () => {
  return (
    <div className="container my-5">
      <div className="glass-card">
        <h3 className="mb-4 text-center">User Details</h3>
        <form>
          <div className="mb-3">
            <label className="form-label text-white">Name</label>
            <input
              type="text"
              className="form-control bg-transparent text-white border-light"
              placeholder="Enter full name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Age</label>
            <input
              type="number"
              className="form-control bg-transparent text-white border-light"
              placeholder="Enter age"
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Gender</label>
            <select className="form-select bg-transparent text-white border-light">
              <option value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Weight (approx)</label>
            <input
              type="number"
              className="form-control bg-transparent text-white border-light"
              placeholder="In kg"
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Email</label>
            <input
              type="email"
              className="form-control bg-transparent text-white border-light"
              placeholder="example@email.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Phone</label>
            <input
              type="tel"
              className="form-control bg-transparent text-white border-light"
              placeholder="Enter phone number"
            />
          </div>

          <button
            type="submit"
            className="btn btn-outline-light w-100 mt-3 rounded-3"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FinalForm;
