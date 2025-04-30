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
    { name: "No Illness", value: false },
  ];

  const defaultSymptoms = [
    { name: "Saans Fulna", value: false },
    { name: "Frequent Urination", value: false },
    { name: "Low Urination", value: false },
    { name: "Excessive Thirst", value: false },
    { name: "Low Thirst", value: false },
    { name: "Swelling", value: false },
    { name: "Headache", value: false },
    { name: "Muscle Or Joint Pain", value: false },
    { name: "Indigestion Or Bloating", value: false },
    { name: "Fatigue Or LowEnergy", value: false },
    { name: "Back Pain", value: false },
    { name: "Neck Pain", value: false },
    { name: "No Symptoms", value: false },
  ];

  const [illnesses, setIllnesses] = useState(() => {
    const saved = localStorage.getItem("illnesses");
    return saved ? JSON.parse(saved) : defaultIllnesses;
  });

  const [symptoms, setSymptoms] = useState(() => {
    const saved = localStorage.getItem("symptoms");
    return saved ? JSON.parse(saved) : defaultSymptoms;
  });
  const [errors, setErrors] = useState({
    illnesses: false,
    symptoms: false,
  });

  const validateForm = () => {
    const newErrors = {
      illnesses: !illnesses.some((item) => item.value),
      symptoms: !symptoms.some((item) => item.value),
    };
    setErrors(newErrors);
    return !newErrors.illnesses && !newErrors.symptoms;
  };

  return (
    <div className="custom-background">
      <Header />
      <div className="main d-flex flex-column justify-content-center align-items-center">
        <div className="glass-card safe">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (validateForm()) {
                localStorage.setItem("illnesses", JSON.stringify(illnesses));
                localStorage.setItem("symptoms", JSON.stringify(symptoms));
                navigate("/daily-routine");
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          >
            <div className="d-flex gap-4">
              <div className="text-start " style={{ width: "400px" }}>
                <div className="mb-3">
                  <h5 className="text-green">
                    Have you experienced any of the following illnesses in the
                    past 90 days?{" "}
                    <span
                      style={{
                        fontSize: "0.7em",
                        color: "black",
                      }}
                    >
                      (Choose as many)
                    </span>{" "}
                    {errors.illnesses && (
                      <span
                        className="text-danger ms-2"
                        style={{ fontSize: "0.7em" }}
                      >
                        *Please select no illnesss or at least one illness
                      </span>
                    )}
                  </h5>
                </div>
                <div className="d-flex flex-wrap gap-2 ms-2 mt-2">
                  {illnesses.map((symptom, index) => {
                    return (
                      <button
                        key={index}
                        type="button"
                        className={`btn btn-sm rounded-3 border ${
                          symptom.value
                            ? "bg-success-subtle border-success text-green fw-medium"
                            : "bg-white"
                        } ${
                          symptom.name === "No Illness"
                            ? "fw-medium text-danger"
                            : "fw-normal"
                        }`}
                        onClick={() => {
                          const updatedSymptoms = [...illnesses];

                          if (
                            updatedSymptoms[index].name === "No Illness" &&
                            !updatedSymptoms[index].value
                          ) {
                            updatedSymptoms.forEach((s, i) => {
                              updatedSymptoms[i].value =
                                s.name === "No Illness";
                            });
                          } else {
                            updatedSymptoms[index].value =
                              !updatedSymptoms[index].value;

                            const noIllnessIndex = updatedSymptoms.findIndex(
                              (s) => s.name === "No Illness"
                            );
                            if (
                              noIllnessIndex !== -1 &&
                              updatedSymptoms[index].value
                            ) {
                              updatedSymptoms[noIllnessIndex].value = false;
                            }
                          }

                          setIllnesses(updatedSymptoms);
                          localStorage.setItem(
                            "illnesses",
                            JSON.stringify(updatedSymptoms)
                          );
                        }}
                      >
                        {symptom.value && "✓ "}
                        {symptom.name}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="text-start " style={{ width: "400px" }}>
                <div className="mb-3">
                  <h5 className="text-green">
                    Have you experienced any of these symptoms in the last 90
                    days?{" "}
                    <span
                      style={{
                        fontSize: "0.7em",
                        color: "black",
                      }}
                    >
                      (Choose as many)
                    </span>{" "}
                    {errors.symptoms && (
                      <span
                        className="text-danger ms-2"
                        style={{ fontSize: "0.7em" }}
                      >
                        *Please select no symptoms or at least one symptom
                      </span>
                    )}
                  </h5>
                </div>
                <div className="d-flex flex-wrap gap-2 ms-2 mt-2">
                  {symptoms.map((symptom, index) => {
                    return (
                      <button
                        key={index}
                        type="button"
                        className={`btn btn-sm rounded-3 border ${
                          symptom.value
                            ? "bg-success-subtle border-success text-green fw-medium"
                            : "bg-white"
                        } ${
                          symptom.name === "No Symptoms"
                            ? "fw-medium text-danger"
                            : "fw-normal"
                        }`}
                        onClick={() => {
                          const updatedSymptoms = [...symptoms];

                          if (
                            updatedSymptoms[index].name === "No Symptoms" &&
                            !updatedSymptoms[index].value
                          ) {
                            updatedSymptoms.forEach((s, i) => {
                              updatedSymptoms[i].value =
                                s.name === "No Symptoms";
                            });
                          } else {
                            updatedSymptoms[index].value =
                              !updatedSymptoms[index].value;

                            const noSymptomsIndex = updatedSymptoms.findIndex(
                              (s) => s.name === "No Symptoms"
                            );
                            if (
                              noSymptomsIndex !== -1 &&
                              updatedSymptoms[index].value
                            ) {
                              updatedSymptoms[noSymptomsIndex].value = false;
                            }
                          }

                          setSymptoms(updatedSymptoms);
                          localStorage.setItem(
                            "symptoms",
                            JSON.stringify(updatedSymptoms)
                          );
                        }}
                      >
                        {symptom.value && "✓ "}
                        {symptom.name}
                      </button>
                    );
                  })}
                </div>
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
    </div>
  );
};

export default Symptoms_form;
