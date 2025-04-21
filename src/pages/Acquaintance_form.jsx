import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Daily_routine = () => {
  const navigate = useNavigate();
  const defaultAcquaintance = [
    {
      name: "Father",
      value: false,
      oldSymptoms: {},
      newSymptoms: {},
    },
    {
      name: "Mother",
      value: false,
      oldSymptoms: {},
      newSymptoms: {},
    },
    {
      name: "Brother",
      value: false,
      oldSymptoms: {},
      newSymptoms: {},
    },
    { name: "Sister", value: false, oldSymptoms: {}, newSymptoms: {} },
    {
      name: "Other acquaintance",
      value: false,
      oldSymptoms: {},
      newSymptoms: {},
    },
  ];

  const [acquaintance, setAcquaintance] = useState(() => {
    const saved = localStorage.getItem("acquaintance");
    return saved ? JSON.parse(saved) : defaultAcquaintance;
  });

  return (
    <div className="main d-flex flex-column justify-content-center align-items-center">
      <div className="glass-card">
        <form
          className="d-flex gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            localStorage.setItem("acquaintance", JSON.stringify(acquaintance));
            //  fi all are false then navigate to final page
            const allFalse = acquaintance.every((item) => !item.value);
            allFalse
              ? navigate("/final-form")
              : navigate("/acquaintance-symptoms");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        >
          <div className="text-start " style={{ width: "600px" }}>
            <div className="mb-4">
              <h3 className="text-center">
                Do any of your acquaintances have a medical condition?
              </h3>
            </div>
            {acquaintance.map((item, index) => (
              <div key={index} className="mb-3 d-flex gap-3">
                <label className="form-check-label d-flex gap-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={item.name}
                    checked={item.value}
                    id="flexCheckDefault"
                    onChange={(e) => {
                      const updatedAcquaintance = [...acquaintance];
                      updatedAcquaintance[index].value = e.target.checked;
                      setAcquaintance(updatedAcquaintance);
                      localStorage.setItem(
                        "acquaintance",
                        JSON.stringify(updatedAcquaintance)
                      );
                    }}
                  />
                  {item.name}
                </label>
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
