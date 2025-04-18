import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/Form_context";

const Daily_routine = () => {
  const navigate = useNavigate();
  const { dailyRoutine, setDailyRoutine } = useFormContext();

  return (
    <div className="main d-flex flex-column justify-content-center align-items-center">
      <div className="glass-card">
        <form
          className="d-flex gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/final-form");
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
