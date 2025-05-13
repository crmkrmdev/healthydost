import React, { useEffect, useState } from "react";
import { exportToExcel, tableToJson } from "../utilities/Download_Excel";
import axios from "axios";

const Dashboard = () => {
  const sampleData = [
    {
      purpose: "stay-healthy",
      name: "Sonu Kushwaha",
      age: "25",
      gender: "Male",
      weight: "65",
      email: "ex@ex.ex",
      phone: "8585858585",
      allergy: "peanuts",
      height: "5.11",
      symptoms: ["Back Pain", "Neck Pain"],
      illness: ["Anxiety / Sleep Disorders"],
      mother_disease: ["No Disease"],
      father_disease: ["Liver", "cancer"],
      sibling_disease: ["No Disease"],
      daily_routine: [
        { name: "Job type", value: "Sitting" },
        { name: "Water Consumption", value: "3-5L" },
        { name: "Coffee or tea per day", value: "2" },
        { name: "Do you smoke?", value: "No" },
        { name: "Do you consume alcohol?", value: "No" },
        { name: "Sleep hours per night", value: "6-8" },
        { name: "Stress level", value: "Medium" },
      ],
    },
    {
      purpose: "weight-loss",
      name: "Priya Singh",
      age: "30",
      gender: "Female",
      weight: "75",
      email: "priya@example.com",
      phone: "9898989898",
      allergy: "none",
      height: "5.4",
      symptoms: ["Fatigue", "Joint Pain"],
      illness: ["Thyroid"],
      mother_disease: ["Diabetes"],
      father_disease: ["No Disease"],
      sibling_disease: ["No Disease"],
      daily_routine: [
        { name: "Job type", value: "Hybrid" },
        { name: "Water Consumption", value: "2-3L" },
        { name: "Coffee or tea per day", value: "3" },
        { name: "Do you smoke?", value: "No" },
        { name: "Do you consume alcohol?", value: "Yes" },
        { name: "Sleep hours per night", value: "7-9" },
        { name: "Stress level", value: "High" },
      ],
    },
    {
      purpose: "fitness",
      name: "Rahul Sharma",
      age: "28",
      gender: "Male",
      weight: "80",
      email: "rahul@example.com",
      phone: "7878787878",
      allergy: "dairy",
      height: "6.0",
      symptoms: ["Muscle Pain"],
      illness: ["None"],
      mother_disease: ["Hypertension"],
      father_disease: ["Heart Disease"],
      sibling_disease: ["None"],
      daily_routine: [
        { name: "Job type", value: "Standing" },
        { name: "Water Consumption", value: "4-6L" },
        { name: "Coffee or tea per day", value: "1" },
        { name: "Do you smoke?", value: "Yes" },
        { name: "Do you consume alcohol?", value: "No" },
        { name: "Sleep hours per night", value: "5-7" },
        { name: "Stress level", value: "Low" },
      ],
    },
  ];

  const [data, setData] = useState(sampleData);

  const handleDownload = () => {
    const data = tableToJson("userDataTable");
    exportToExcel(data, "PatientData.xlsx");
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://healthydost.in/healthydostdjango/api/getenquiries"
  //       );
  //       if (response.data.success) {
  //         console.log(response.data.data);
  //         setData(response.data.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="main">
      <h2 className="text-center text-secondary my-4">Admin Dashboard</h2>
      <div className="card mx-3 px-3">
        <div className="d-flex justify-content-between align-items-center m-3">
          <h4>User Data</h4>
          <button className="btn btn-primary" onClick={handleDownload}>
            Download
          </button>
        </div>
        <div className="table-responsive">
          <table
            id="userDataTable"
            className="table table-bordered table-hover text-center align-middle m-0"
          >
            <thead className="table">
              <tr className="table-dark">
                <th
                  style={{
                    minWidth: "150px",
                  }}
                >
                  Purpose
                </th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Weight</th>
                <th>Height</th>
                <th>Contact</th>
                <th>Allergy</th>
                <th
                  style={{
                    minWidth: "150px",
                  }}
                >
                  Symptoms
                </th>
                <th
                  style={{
                    minWidth: "150px",
                  }}
                >
                  Illness
                </th>
                <th
                  style={{
                    minWidth: "200px",
                  }}
                >
                  Family History
                </th>
                <th>Job Type</th>
                <th>Water Intake</th>
                <th>Coffee/Tea</th>
                <th>Smoke</th>
                <th>Alcohol</th>
                <th>Sleep</th>
                <th>Stress</th>
              </tr>
            </thead>
            <tbody className="table-light">
              {data.map((entry, i) => (
                <tr key={i}>
                  <td>{entry.purpose}</td>
                  <td>{entry.name}</td>
                  <td>{entry.age}</td>
                  <td>{entry.gender}</td>
                  <td>{entry.weight} kg</td>
                  <td>{entry.height}</td>
                  <td>
                    {entry.email}
                    <br />
                    {entry.phone}
                  </td>
                  <td>{entry.allergy}</td>
                  <td>{entry.symptoms.join(", ")}</td>
                  <td>{entry.illness.join(", ")}</td>
                  <td>
                    Mother: {entry.mother_disease.join(", ")}
                    <br />
                    Father: {entry.father_disease.join(", ")}
                    <br />
                    Sibling: {entry.sibling_disease.join(", ")}
                  </td>
                  <td>{entry.daily_routine[0].value}</td>
                  <td>{entry.daily_routine[1].value}</td>
                  <td>{entry.daily_routine[2].value}</td>
                  <td>{entry.daily_routine[3].value}</td>
                  <td>{entry.daily_routine[4].value}</td>
                  <td>{entry.daily_routine[5].value} Hours</td>
                  <td>{entry.daily_routine[6].value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
