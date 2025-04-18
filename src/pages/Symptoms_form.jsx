import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/Form_context";

const Symptoms_form = () => {
  const navigate = useNavigate();
  const { oldSymptoms, setOldSymptoms, newSymptoms, setNewSymptoms } =
    useFormContext();

  return (
    <div className="main d-flex flex-column justify-content-center align-items-center">
      <div className="glass-card">
        <form
          onSubmit={(e) => {
            e.preventDefault();
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
                  Have you experienced any of the following symptoms in the last
                  90 days?
                </h5>
              </div>
              {oldSymptoms.map((symptom, index) => {
                return (
                  <div key={index} className="form-check ms-3 mt-2">
                    <label className="form-check-label">
                      {symptom.name.charAt(0).toUpperCase() +
                        symptom.name.slice(1).replace(/([A-Z])/g, " $1")}
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={symptom.name}
                        id="flexCheckDefault"
                        onChange={(e) => {
                          const updatedSymptoms = [...oldSymptoms];
                          updatedSymptoms[index].value = e.target.checked;
                          setOldSymptoms(updatedSymptoms);
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
                  Are you currently experiencing any of the following symptoms?
                </h5>
              </div>
              {newSymptoms.map((symptom, index) => {
                return (
                  <div key={index} className="form-check ms-3 mt-2">
                    <label className="form-check-label">
                      {symptom.name.charAt(0).toUpperCase() +
                        symptom.name.slice(1).replace(/([A-Z])/g, " $1")}
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={symptom.name}
                        id="flexCheckDefault"
                        onChange={(e) => {
                          const updatedSymptoms = [...newSymptoms];
                          updatedSymptoms[index].value = e.target.checked;
                          setNewSymptoms(updatedSymptoms);
                        }}
                      />
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Symptoms_form;
