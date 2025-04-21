import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";

const Acquaintance_symptoms = () => {
  const navigate = useNavigate();
  const createDefaultSymptoms = () => [
    { name: "Indigestion", value: false },
    { name: "Muscles/Joint pain ", value: false },
    { name: "Less/Frequent urine ", value: false },
    { name: "Headache", value: false },
    { name: "headache", value: false },
    { name: "Dehydration", value: false },
    { name: "Swelling", value: false },
    { name: "Breathing issue", value: false },
    { name: "High/Low BP", value: false },
    { name: "Lack of appetite", value: false },
  ];

  const [acquaintance, setAcquaintance] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("acquaintance")) || [];
    return saved.map((item) => ({
      ...item,
      oldSymptoms:
        Object.keys(item.oldSymptoms || {}).length === 0
          ? createDefaultSymptoms()
          : item.oldSymptoms,
      newSymptoms:
        Object.keys(item.newSymptoms || {}).length === 0
          ? createDefaultSymptoms()
          : item.newSymptoms,
    }));
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            localStorage.setItem("acquaintance", JSON.stringify(acquaintance));
            navigate("/final-form");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        >
          {acquaintance
            .filter((e) => e.value === true)
            .map((acquaintance, index) => (
              <div className="glass-card mt-3" key={index}>
                <div className="d-flex gap-4">
                  <div className="text-start " style={{ width: "400px" }}>
                    <div className="mb-3">
                      <h5>
                        {`Have your ${acquaintance.name} experienced any of the following
                      symptoms in the last 90 days?`}
                      </h5>
                    </div>
                    {acquaintance.oldSymptoms.map((symptom, idx1) => {
                      return (
                        <div key={idx1} className="form-check ms-3 mt-2">
                          <label className="form-check-label">
                            {symptom.name.charAt(0).toUpperCase() +
                              symptom.name.slice(1).replace(/([A-Z])/g, " $1")}
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={symptom.name}
                              checked={symptom.value}
                              id="flexCheckDefault"
                              onChange={(e) => {
                                const updatedSymptoms = [
                                  ...acquaintance.oldSymptoms,
                                ];
                                updatedSymptoms[idx1].value = e.target.checked;
                                setAcquaintance((prev) =>
                                  prev.map((item, i) =>
                                    i === index
                                      ? {
                                          ...item,
                                          oldSymptoms: updatedSymptoms,
                                        }
                                      : item
                                  )
                                );
                              }}
                            />
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-start " style={{ width: "400px" }}>
                    <div className="mb-3">
                      <h5>
                        {`Is your ${acquaintance.name} currently experiencing any of the following
                      symptoms?`}
                      </h5>
                    </div>
                    {acquaintance.newSymptoms.map((symptom, idx2) => {
                      return (
                        <div key={idx2} className="form-check ms-3 mt-2">
                          <label className="form-check-label">
                            {symptom.name.charAt(0).toUpperCase() +
                              symptom.name.slice(1).replace(/([A-Z])/g, " $1")}
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={symptom.name}
                              checked={symptom.value}
                              id="flexCheckDefault"
                              onChange={(e) => {
                                const updatedSymptoms = [
                                  ...acquaintance.newSymptoms,
                                ];
                                updatedSymptoms[idx2].value = e.target.checked;
                                setAcquaintance((prev) =>
                                  prev.map((item, i) =>
                                    i === index
                                      ? {
                                          ...item,
                                          newSymptoms: updatedSymptoms,
                                        }
                                      : item
                                  )
                                );
                              }}
                            />
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          <div className="d-flex justify-content-center my-4">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Acquaintance_symptoms;
