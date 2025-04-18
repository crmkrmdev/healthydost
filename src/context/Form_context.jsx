import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [purpose, setPurpose] = useState("");
  const [oldSymptoms, setOldSymptoms] = useState([
    { name: "fever", value: false },
    { name: "cough", value: false },
    { name: "soreThroat", value: false },
    { name: "fatigue", value: false },
    { name: "headache", value: false },
    { name: "musclePain", value: false },
    { name: "shortnessOfBreath", value: false },
    { name: "lossOfTasteOrSmell", value: false },
    { name: "nauseaOrVomiting", value: false },
    { name: "diarrhea", value: false },
  ]);
  const [newSymptoms, setNewSymptoms] = useState([
    { name: "fever", value: false },
    { name: "cough", value: false },
    { name: "soreThroat", value: false },
    { name: "fatigue", value: false },
    { name: "headache", value: false },
    { name: "musclePain", value: false },
    { name: "shortnessOfBreath", value: false },
    { name: "lossOfTasteOrSmell", value: false },
    { name: "nauseaOrVomiting", value: false },
    { name: "diarrhea", value: false },
  ]);
  const [dailyRoutine, setDailyRoutine] = useState([
    {
      name: "Job type",
      value: "",
      options: ["Sitting", "Standing", "Travel", "Remote"],
    },
    {
      name: "Water consumption",
      value: "",
      options: ["1L", "2-3L", "3-5L", "6L"],
    },
    {
      name: "Coffee or tea per day",
      value: "",
      options: ["1", "2", "3", "4+"],
    },
    { name: "Do you smoke?", value: "", options: ["Yes", "No"] },
    { name: "Do you drink?", value: "", options: ["Yes", "No"] },
    { name: "Sleep hours per night", value: "", options: ["5-6", "6-8", "8+"] },
    { name: "Stress level", value: "", options: ["Low", "Medium", "High"] },
  ]);
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    email: "",
    phone: "",
  });

  return (
    <FormContext.Provider
      value={{
        purpose,
        setPurpose,
        oldSymptoms,
        setOldSymptoms,
        newSymptoms,
        setNewSymptoms,
        dailyRoutine,
        setDailyRoutine,
        userData,
        setUserData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
