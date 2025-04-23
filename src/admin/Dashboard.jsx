import React, { useState } from "react";
import { exportToExcel, tableToJson } from "../utilities/Download_Excel";

const Dashboard = () => {
  const sampleData = [
    {
      purpose: "Checkup",
      illnesses: ["Diabetes", "Hypertension"],
      symptoms: ["Fatigue", "Blurred vision"],
      Daily_routine: { sleepHours: 6, waterIntake: "2L", exercise: "None" },
      user_data: { name: "John Doe", age: 45, gender: "Male" },
    },
    {
      purpose: "Consultation",
      illnesses: ["Asthma", "Allergy"],
      symptoms: ["Shortness of breath", "Coughing"],
      Daily_routine: {
        sleepHours: 7,
        waterIntake: "1.5L",
        exercise: "Walking",
      },
      user_data: { name: "Jane Smith", age: 30, gender: "Female" },
    },
    {
      purpose: "Follow-up",
      illnesses: ["Thyroid"],
      symptoms: ["Weight gain", "Tiredness"],
      Daily_routine: { sleepHours: 8, waterIntake: "2.5L", exercise: "Yoga" },
      user_data: { name: "Amit Roy", age: 38, gender: "Male" },
    },
    {
      purpose: "New symptoms",
      illnesses: [],
      symptoms: ["Headache", "Nausea"],
      Daily_routine: { sleepHours: 5, waterIntake: "1L", exercise: "None" },
      user_data: { name: "Sara Lee", age: 27, gender: "Female" },
    },
    {
      purpose: "General Checkup",
      illnesses: ["Hypertension"],
      symptoms: ["Dizziness", "Chest pain"],
      Daily_routine: { sleepHours: 6.5, waterIntake: "2L", exercise: "Gym" },
      user_data: { name: "Ravi Kumar", age: 52, gender: "Male" },
    },
  ];

  const [data, setData] = useState(sampleData);

  const handleDownload = () => {
    const data = tableToJson("userDataTable");
    exportToExcel(data, "PatientData.xlsx");
  };

  return (
    <div className="main bg-dark">
      <h2 className="text-center my-4">Admin Dashboard</h2>
      <div className="card bg-secondary p-2 table-responsive mx-4">
        <div className="d-flex justify-content-between align-items-center m-2">
          <h4 className="text-center text-light">User Data</h4>
          <button className="btn btn-primary" onClick={handleDownload}>
            Download
          </button>
        </div>
        <table
          id="userDataTable"
          className="table table-bordered table-hover text-center align-middle m-0"
        >
          <thead className="table-dark">
            <tr>
              <th>User</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Purpose</th>
              <th>Illnesses</th>
              <th>Symptoms</th>
              <th>Sleep</th>
              <th>Water</th>
              <th>Exercise</th>
            </tr>
          </thead>
          <tbody className="table-secondary">
            {data.map((entry, i) => (
              <tr key={i}>
                <td>{entry.user_data.name}</td>
                <td>{entry.user_data.age}</td>
                <td>{entry.user_data.gender}</td>
                <td>{entry.purpose}</td>
                <td>{entry.illnesses.join(", ") || "None"}</td>
                <td>{entry.symptoms.join(", ")}</td>
                <td>{entry.Daily_routine.sleepHours} hrs</td>
                <td>{entry.Daily_routine.waterIntake}</td>
                <td>{entry.Daily_routine.exercise}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
