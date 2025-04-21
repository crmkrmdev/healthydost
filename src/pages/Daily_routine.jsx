import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";

const Daily_routine = () => {
  const navigate = useNavigate();
  const defaultDailyRoutine = [
    {
      name: "Job type",
      value: "",
      options: ["Sitting", "Standing", "Travel", "Remote"],
    },
    {
      name: "Water consumption",
      value: "",
      options: ["1L", "2-3L", "3-5L", "6L"],
    },
    {
      name: "Coffee or tea per day",
      value: "",
      options: ["1", "2", "3", "4+"],
    },
    { name: "Do you smoke?", value: "", options: ["Yes", "No"] },
    { name: "Do you drink?", value: "", options: ["Yes", "No"] },
    { name: "Sleep hours per night", value: "", options: ["5-6", "6-8", "8+"] },
    { name: "Stress level", value: "", options: ["Low", "Medium", "High"] },
  ];

  const [dailyRoutine, setDailyRoutine] = useState(() => {
    const saved = localStorage.getItem("dailyRoutine");
    return saved ? JSON.parse(saved) : defaultDailyRoutine;
  });

  return (
    <>
      <Header />
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
        className="main d-flex flex-column justify-content-center align-items-center"
      >
        <div className="glass-card">
          <form
            className="d-flex gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              localStorage.setItem(
                "dailyRoutine",
                JSON.stringify(dailyRoutine)
              );
              navigate("/acquaintance");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          >
            <div className="text-start " style={{ width: "600px" }}>
              <div className="mb-4">
                <h3 className="text-center">Daily Routine</h3>
              </div>
              {dailyRoutine.map((item, index) => (
                <div key={index} className="mb-3 d-flex gap-3">
                  <label
                    className="form-label"
                    style={{
                      width: "200px",
                    }}
                  >
                    {item.name}
                  </label>
                  <div className="d-flex gap-3">
                    {item.options.map((option, optIndex) => (
                      <div key={optIndex} className="form-check">
                        <label className="form-check-label">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`${item.name}-${option}`}
                            checked={item.value === option}
                            onChange={() => {
                              const updated = [...dailyRoutine];
                              updated[index].value = option;
                              setDailyRoutine(updated);
                              localStorage.setItem(
                                "dailyRoutine",
                                JSON.stringify(updated)
                              );
                            }}
                          />
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Daily_routine;
