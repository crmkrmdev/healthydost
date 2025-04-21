import { option } from "framer-motion/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";

const Daily_routine = () => {
  const navigate = useNavigate();
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
      ],
    },
    {
      name: "Brother",
      selected: [],
      options: [
        "Kidney Disease",
        "Liver",
        "Parkinson",
        "Cancer",
        "Arthritis",
        "Psoriasis/Eczema",
      ],
    },
    {
      name: "Sister",
      selected: [],
      options: [
        "Kidney Disease",
        "Liver",
        "Parkinson",
        "Cancer",
        "Arthritis",
        "Psoriasis/Eczema",
      ],
    },
    {
      name: "Other acquaintance",
      selected: [],
      options: [
        "Kidney Disease",
        "Liver",
        "Parkinson",
        "Cancer",
        "Arthritis",
        "Psoriasis/Eczema",
      ],
    },
  ];

  const [acquaintance, setAcquaintance] = useState(() => {
    const saved = localStorage.getItem("acquaintance");
    return saved ? JSON.parse(saved) : defaultAcquaintance;
  });

  return (
    <>
      <div className="main d-flex flex-column justify-content-center align-items-center">
        <div className="glass-card">
          <form
            className="d-flex gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              localStorage.setItem(
                "acquaintance",
                JSON.stringify(acquaintance)
              );
              navigate("/final-form");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          >
            <div className="text-start">
              <div className="mb-4">
                <h3 className="text-center">
                  Do any of your family members are suffering from these
                  diseases?
                </h3>
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
                            if (selected.includes(option)) {
                              updated[itemIndex].selected = selected.filter(
                                (d) => d !== option
                              );
                            } else {
                              updated[itemIndex].selected = [
                                ...selected,
                                option,
                              ];
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
