import React, { useState } from "react";

const Daily_routine = () => {
  const [dailyRoutine, setDailyRoutine] = useState([
    {
      name: "Job type",
      value: "",
      options: ["Sitting", "Standing", "Travel", "Remote"],
    },
    { name: "Water consumption", value: "", options: ["1L", "2L", "3L"] },
    { name: "Coffee or tea per day", value: "", options: ["1", "2", "3"] },
    { name: "Do you smoke?", value: "", options: ["Yes", "No"] },
    { name: "Do you drink?", value: "", options: ["Yes", "No"] },
    { name: "Exercise per week", value: "", options: ["1", "2", "3"] },
    { name: "Sleep hours per night", value: "", options: ["5", "6", "7"] },
    { name: "Stress level", value: "", options: ["Low", "Medium", "High"] },
  ]);

  return (
    <div className="main d-flex flex-column justify-content-center align-items-center">
      <div className="glass-card">
        <form
          className="d-flex gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Daily Routine Data:", dailyRoutine);
          }}
        >
          <div className="text-start " style={{ width: "500px" }}>
            <div className="mb-4">
              <h3 className="text-center">Daily Routine</h3>
            </div>
            {dailyRoutine.map((item, index) => (
              <div key={index} className="mb-3 d-flex gap-3">
                <label className="form-label">{item.name} : </label>
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
  );
};

export default Daily_routine;
