import React, { useState } from "react";

const FinalForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div
        className="glass-card p-4"
        style={{ width: "600px", minHeight: "100px" }}
      >
        <h3 className="mb-4 text-center">User Details</h3>
        <form className="FinalForm" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label text-white">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              type="text"
              className="form-control bg-transparent text-white border-light"
              placeholder="Enter full name"
            />
          </div>
          <div className="mb-2">
            <label className="form-label text-white">Age</label>
            <input
              name="age"
              value={formData.age}
              onChange={handleChange}
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
              name="gender"
              value={formData.gender}
              onChange={handleChange}
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
              name="weight"
              onChange={handleChange}
              value={formData.weight}
              required
              type="number"
              className="form-control bg-transparent text-white border-light"
              placeholder="In kg"
            />
          </div>
          <div className="mb-2">
            <label className="form-label text-white">Email</label>
            <input
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
              type="email"
              className="form-control bg-transparent text-white border-light"
              placeholder="example@email.com"
            />
          </div>
          <div className="mb-2">
            <label className="form-label text-white">Phone</label>
            <input
              name="phone"
              onChange={handleChange}
              value={formData.phone}
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
