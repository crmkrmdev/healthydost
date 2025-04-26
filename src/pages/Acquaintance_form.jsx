import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";

const Daily_routine = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const defaultAcquaintance = [
    {
      name: "Father",
      selected: [],
      options: [
        "Kidney Disease",
        "Liver",
        "Parkinson",
        "Cancer",
        "Arthritis",
        "Psoriasis/Eczema",
        "No Disease",
      ],
    },
    {
      name: "Mother",
      selected: [],
      options: [
        "Kidney Disease",
        "Liver",
        "Parkinson",
        "Cancer",
        "Arthritis",
        "Psoriasis/Eczema",
        "No Disease",
      ],
    },
    {
      name: "Siblings",
      selected: [],
      options: [
        "Kidney Disease",
        "Liver",
        "Parkinson",
        "Cancer",
        "Arthritis",
        "Psoriasis/Eczema",
        "No Disease",
      ],
    },
  ];

  const [acquaintance, setAcquaintance] = useState(() => {
    const saved = localStorage.getItem("acquaintance");
    return saved ? JSON.parse(saved) : defaultAcquaintance;
  });

  const validateForm = () => {
    if (acquaintance.some((item) => item.selected.length === 0)) {
      setError("Please select diseases for all family members or No disease");
      return false;
    }
    setError("");
    return true;
  };

  return (
    <>
      <div className="main d-flex flex-column justify-content-center align-items-center">
        <Header />
        <div className="glass-card">
          <form
            className="d-flex gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (validateForm()) {
                localStorage.setItem(
                  "acquaintance",
                  JSON.stringify(acquaintance)
                );
                navigate("/user-form");
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          >
            <div className="text-start">
              <div className="mb-4">
                <h3 className="text-center text-warning">
                  Do any of your family members are suffering from these
                  diseases?
                </h3>
                {error && (
                  <div className="text-danger text-center">({error})</div>
                )}
              </div>
              {acquaintance.map((item, itemIndex) => (
                <div key={itemIndex} className="mb-3 d-flex align-items-center">
                  <h4 className="form-label fw-bold me-3">{item.name} :</h4>
                  <div className="d-flex flex-wrap gap-3">
                    {item.options.map((option, optionIndex) => (
                      <div className="form-check" key={optionIndex}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`check-${itemIndex}-${optionIndex}`}
                          checked={item.selected.includes(option)}
                          onChange={() => {
                            const updated = [...acquaintance];
                            const selected = updated[itemIndex].selected;

                            if (option === "No Disease") {
                              // If "No Disease" is being selected, clear all other selections
                              if (!selected.includes("No Disease")) {
                                updated[itemIndex].selected = ["No Disease"];
                              } else {
                                updated[itemIndex].selected = [];
                              }
                            } else {
                              // If any other disease is being selected
                              if (selected.includes(option)) {
                                // Remove the disease if it was already selected
                                updated[itemIndex].selected = selected.filter(
                                  (d) => d !== option
                                );
                              } else {
                                // Add the new disease and remove "No Disease" if present
                                updated[itemIndex].selected = [
                                  ...selected.filter((d) => d !== "No Disease"),
                                  option,
                                ];
                              }
                            }

                            setAcquaintance(updated);
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`check-${itemIndex}-${optionIndex}`}
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="d-flex justify-content-center gap-2">
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
    </>
  );
};

export default Daily_routine;
