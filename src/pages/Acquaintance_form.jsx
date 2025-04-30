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
    <div className="custom-background">
      <Header />
      <div className="main d-flex flex-column justify-content-center align-items-center">
        <div className="glass-card safe">
          <form
            className="d-flex gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (validateForm()) {
                localStorage.setItem(
                  "acquaintance",
                  JSON.stringify(acquaintance)
                );
                navigate("/final-form");
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          >
            <div className="text-start">
              <div className="mb-4">
                <h3 className="text-center ">
                  Do any of your family members are suffering from these
                  diseases?
                </h3>
                {error && (
                  <div className="text-danger text-center">({error})</div>
                )}
              </div>
              {acquaintance.map((item, itemIndex) => (
                <div key={itemIndex} className="mb-3 d-flex align-items-center">
                  <h4
                    className="form-label fw-bold me-3"
                    style={{ minWidth: "90px" }}
                  >
                    {item.name}
                  </h4>
                  <div className="d-flex flex-wrap gap-2">
                    :
                    {item.options.map((option, optionIndex) => (
                      <button
                        type="button"
                        key={optionIndex}
                        className={`btn btn-sm rounded-3 border ${
                          item.selected.includes(option)
                            ? "bg-success-subtle border-success text-green fw-medium"
                            : "bg-white"
                        } ${
                          option === "No Disease"
                            ? "fw-medium text-danger"
                            : "fw-normal"
                        }`}
                        onClick={() => {
                          const updated = [...acquaintance];
                          const selected = updated[itemIndex].selected;

                          if (option === "No Disease") {
                            updated[itemIndex].selected = selected.includes(
                              "No Disease"
                            )
                              ? []
                              : ["No Disease"];
                          } else {
                            updated[itemIndex].selected = selected.includes(
                              option
                            )
                              ? selected.filter((d) => d !== option)
                              : [
                                  ...selected.filter((d) => d !== "No Disease"),
                                  option,
                                ];
                          }
                          setAcquaintance(updated);
                        }}
                      >
                        {item.selected.includes(option) && "✓ "}
                        {option}
                      </button>
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
    </div>
  );
};

export default Daily_routine;
