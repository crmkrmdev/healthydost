import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";

const Daily_routine = () => {
  const navigate = useNavigate();
  const defaultDailyRoutine = [
    {
      name: "Job type",
      value: "",
      options: ["Sitting", "Standing", "Travel", "Work from Home"],
    },
    {
      name: "Water Consumption",
      value: "",
      options: ["1L", "2-3L", "3-5L", "6L"],
    },
    {
      name: "Coffee or tea per day",
      value: "",
      options: ["1", "2", "3", "4+"],
    },
    { name: "Do you smoke?", value: "", options: ["Yes", "No"] },
    { name: "Do you consume alcohol?", value: "", options: ["Yes", "No"] },
    { name: "Sleep hours per night", value: "", options: ["5-6", "6-8", "8+"] },
    { name: "Stress level", value: "", options: ["Low", "Medium", "High"] },
  ];

  const [dailyRoutine, setDailyRoutine] = useState(() => {
    const saved = localStorage.getItem("dailyRoutine");
    return saved ? JSON.parse(saved) : defaultDailyRoutine;
  });
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    dailyRoutine.forEach((item) => {
      if (!item.value) {
        newErrors[item.name] = "Please select an option";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="custom-background">
      <Header />
      <div className="main d-flex flex-column justify-content-center align-items-center">
        <div className="glass-card safe lable_resp">
          <form
            className="d-flex gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (validateForm()) {
                localStorage.setItem(
                  "dailyRoutine",
                  JSON.stringify(dailyRoutine)
                );
                navigate("/acquaintance");
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          >
            <div className="text-start ">
              <div className="mb-4">
                <h3 className="text-center ">Daily Routine</h3>
              </div>
              {dailyRoutine.map((item, index) => (
                <div key={index} className="mb-1 d-flex gap-3">
                  <label
                    className="form-label"
                    style={{
                      width: "220px",
                    }}
                  >
                    {item.name}
                    {errors[item.name] && (
                      <span className="text-danger fw-semibold ms-2">*</span>
                    )}
                  </label>
                  <div className="d-flex flex-wrap gap-2">
                    {" "}
                    {item.options.map((option, optIndex) => {
                      const selected = item.value === option;
                      return (
                        <button
                          key={optIndex}
                          type="button"
                          className={`btn btn-sm rounded-3 border px-3 ${
                            selected
                              ? "bg-success-subtle border-success text-green fw-medium"
                              : "bg-white"
                          }`}
                          onClick={() => {
                            const updated = [...dailyRoutine];
                            updated[index].value = option;
                            setDailyRoutine(updated);
                            localStorage.setItem(
                              "dailyRoutine",
                              JSON.stringify(updated)
                            );
                          }}
                        >
                          {option === item.value && "✓ "}
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              <div className="d-flex justify-content-center gap-2 mt-4">
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Daily_routine;
