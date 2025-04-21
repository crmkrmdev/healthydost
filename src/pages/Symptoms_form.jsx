import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";

const Symptoms_form = () => {
  const navigate = useNavigate();

  const defaultIllnesses = [
    { name: "Asthma", value: false },
    { name: "Sinusitis", value: false },
    { name: "Typhoid", value: false },
    { name: "Jaundice", value: false },
    { name: "Food Poisoning", value: false },
    { name: "Viral Fever", value: false },
    { name: "Acidity / GERD", value: false },
    { name: "Anxiety / Sleep Disorders", value: false },
    { name: "High Blood Pressure", value: false },
  ];

  const defaultSymptoms = [
    { name: "saansFulna", value: false },
    { name: "frequentUrination", value: false },
    { name: "lowUrination", value: false },
    { name: "excessiveThirst", value: false },
    { name: "lowThirst", value: false },
    { name: "swelling", value: false },
    { name: "headache", value: false },
    { name: "muscleOrJointPain", value: false },
    { name: "indigestionOrBloating", value: false },
    { name: "fatigueOrLowEnergy", value: false },
    { name: "backPain", value: false },
    { name: "neckPain", value: false },
  ];

  const [illnesses, setIllnesses] = useState(() => {
    const saved = localStorage.getItem("illnesses");
    return saved ? JSON.parse(saved) : defaultIllnesses;
  });

  const [symptoms, setSymptoms] = useState(() => {
    const saved = localStorage.getItem("symptoms");
    return saved ? JSON.parse(saved) : defaultSymptoms;
  });

  return (
    <>
      <div className="main d-flex flex-column justify-content-center align-items-center">
        <Header />
        <div className="glass-card">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              localStorage.setItem("illnesses", JSON.stringify(illnesses));
              localStorage.setItem("symptoms", JSON.stringify(symptoms));
              navigate("/daily-routine");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          >
            <div className="d-flex gap-4">
              <div className="text-start " style={{ width: "400px" }}>
                <div className="mb-3">
                  <h5>
                    Have you experienced any of the following illnesses in the
                    past 90 days? (Choose as many)
                  </h5>
                </div>
                {illnesses.map((symptom, index) => {
                  return (
                    <div key={index} className="form-check ms-3 mt-2">
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
                            const updatedSymptoms = [...illnesses];
                            updatedSymptoms[index].value = e.target.checked;
                            setIllnesses(updatedSymptoms);
                            localStorage.setItem(
                              "illnesses",
                              JSON.stringify(updatedSymptoms)
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
                    Have you experienced any of these symptoms in the last 90
                    days?
                  </h5>
                </div>
                {symptoms.map((symptom, index) => {
                  return (
                    <div key={index} className="form-check ms-3 mt-2">
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
                            const updatedSymptoms = [...symptoms];
                            updatedSymptoms[index].value = e.target.checked;
                            setSymptoms(updatedSymptoms);
                            localStorage.setItem(
                              "symptoms",
                              JSON.stringify(updatedSymptoms)
                            );
                          }}
                        />
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
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
          </form>
        </div>
      </div>
    </>
  );
};

export default Symptoms_form;
