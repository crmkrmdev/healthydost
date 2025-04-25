import React, { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "./header";
import PDF from "../assets/images/download.gif";
import LOGO from "../assets/LOGO.png";
import ashwagandhaImage from "../assets/images/ashwagandha.webp";
import Pashasana from "../assets/images/Pashasana.gif";
import petunia from "../assets/images/petunia.gif";

const Diet_plan = () => {
  const loadingTexts = [
    "Analyzing your dietary needs...",
    "Preparing your personalized diet...",
    "Balancing your nutrition...",
    "Generating healthy meal options...",
    "Loading your AI-powered meal plan...",
    "Customizing meals just for you...",
    "Fetching your data...",
    "Initializing...",
    "Almost there...",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 10000); // 10 seconds
    return () => clearTimeout(timer);
  }, []);
  const herbs = [
    {
      name: "Ashwagandha",
      description:
        "A powerful adaptogen known to reduce stress, enhance stamina, and strengthen the immune system.",
      photo_url: ashwagandhaImage,

      benifits:
        "Reduces stress and anxiety, enhances stamina, boosts immunity.",
      dosage: "500 mg to 1 g per day.",
      usage: "Can be taken in powder form with warm milk or water.",
    },
    {
      name: "Tulsi",
      description:
        "A revered herb for respiratory wellness, boosting immunity, and promoting mental calm and clarity.",
      photo_url: petunia,
      benifits:
        "Supports respiratory health, boosts immunity, promotes mental clarity.",
      dosage: "2-3 leaves daily or as tulsi tea.",
      usage: "Can be consumed fresh or brewed as tea.",
    },
  ];
  const yogaPoses = [
    {
      name: "Noose Pose",
      sanskrit_name: "Pashasana",
      description:
        "Pashasana (Noose Pose) is a beginner seated twist that gently massages abdominal organs. Keep your spine lengthened and twist from the torso, not the neck. Benefits include improved digestion and spinal flexibility.",
      expertise_level: "Beginner",
      pose_type: ["Seated", "Twist"],
      duration: "10 minutes to 15 minutes",
      days: "3-4 times a week",
      photo_url: Pashasana,
    },
    {
      name: "Sage Marichi's III Pose",
      sanskrit_name: "Marichyasana C",
      description:
        "Marichyasana C (Sage Marichi's III) is a beginner seated twist. Lengthen your spine, gently twist to the right, placing your left hand behind your sacrum. Benefits include improved spinal mobility and digestion. Keep your chest lifted and shoulders relaxed.",
      expertise_level: "Beginner",
      pose_type: ["Seated", "Twist"],
      duration: "15 minutes to 20 minutes",
      days: "3-4 times a week",
      photo_url: Pashasana,
    },
  ];

  const [yoga, setYoga] = useState(yogaPoses);

  const [text, setText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const response = fetch(
      "https://yogaposes-22510563985.us-central1.run.app/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: text,
        }),
      }
    );
    response
      .then((res) => res.json())
      .then((data) => {
        const updated = data.result.slice(0, 2).map((item, index) => {
          const original = yoga[index]; // to keep original duration & days
          return {
            ...item.meta_data,
            duration: original.duration,
            days: original.days,
          };
        });
        setYoga(updated);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2000); // Change text every 2 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div
        className="main d-flex flex-column justify-content-center align-items-center vh-100"
        style={{ backgroundColor: "black" }}
      >
        <CircleLoader color="#36d7b7" size={80} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-light mt-3 fs-5"
          >
            {loadingTexts[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
  return (
    <>
      <div
        className="main"
        // style={{
        //   marginTop: "95px",
        // }}
      >
        <Header />
        <div className="row m-0 mt-5">
          <div className="col-md-9 row  ">
            <div className="d-flex gap-3">
              {/* diet plan */}
              <div
                className="glass-card m-0 mb-4 text-center"
                style={{ lineHeight: "1.2" }}
              >
                <p className="fs-4">
                  Here is your <span className="fw-bold">customized</span>
                  <br />
                  Diet Plan
                </p>
                <div className="d-flex flex-wrap justify-content-center gap-2 mb-2">
                  {[
                    localStorage.getItem("purpose"),
                    ...JSON.parse(localStorage.getItem("symptoms") || "[]")
                      .filter((e) => e.value === true)
                      .map((e) => e.name),
                    ...JSON.parse(localStorage.getItem("illnesses") || "[]")
                      .filter((e) => e.value === true)
                      .map((e) => e.name),
                    `Age: ${JSON.parse(localStorage.getItem("userData"))?.age}`,
                    `Gener: ${
                      JSON.parse(localStorage.getItem("userData"))?.gender
                    }`,
                    `Weight: ${
                      JSON.parse(localStorage.getItem("userData"))?.weight
                    }`,
                  ].map((symptom, index) => (
                    <span key={index} className="badge bg-success px-3 py-2">
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
              {/* Button in right column */}
              <div className="glass-card m-0 d-flex align-items-center justify-content-center mb-4 ">
                <Link
                  type="button"
                  className="btn btn-tranparent"
                  target="_blank"
                  to="https://drive.google.com/file/d/1C_zyZINNrU3K3hL-ZfgHhsx3pJlhVqGz/view?usp=sharing"
                >
                  <img
                    src={PDF}
                    alt="PDF"
                    style={{ width: "100px" }}
                    className="mb-2 rounded-pill"
                  />
                  <br />
                  <span className="text-white fs-5 text-nowrap">
                    {" "}
                    Download PDF
                  </span>
                </Link>
              </div>
            </div>
            {/* header */}
            <div className="section-title mb-4">
              <h2>Top 2 Yoga Routines Chosen Just for You</h2>
            </div>
            {/* suggested yogas */}
            <div className="d-flex mb-4 gap-3">
              {yoga.map((yoga, index) => (
                <div
                  key={index}
                  className="glass-card col-md-6 m-0 d-flex flex-column align-items-center justify-content-center"
                >
                  <h4 className="text-center">{yoga.sanskrit_name}</h4>
                  <p className="text-center fst-italic mb-2">{yoga.name}</p>
                  <img
                    src={yoga.photo_url}
                    alt={yoga.name}
                    style={{
                      maxHeight: "200px",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                  <p className="mb-2" style={{ fontSize: "0.9rem" }}>
                    {yoga.description}
                  </p>
                  <p className="mb-1">
                    <strong>Level:</strong> {yoga.expertise_level}
                  </p>
                  <p className="mb-1">
                    <strong>Type:</strong> {yoga.pose_type.join(", ")}
                  </p>
                  <p className="mb-1">
                    <strong>Duration:</strong> {yoga.duration}
                  </p>
                  <p className="mb-1">
                    <strong>Days:</strong> {yoga.days}
                  </p>
                </div>
              ))}
            </div>
            {/* header */}
            <div className="section-title mb-4">
              <h2>Top 2 Herbal Picks Just for You</h2>
            </div>
            {/* suggested herbs */}
            <div className="d-flex mb-4 gap-3">
              {herbs.map((herb, index) => (
                <div
                  key={index}
                  className="glass-card col-md-6 m-0 d-flex flex-column align-items-center justify-content-center"
                >
                  <h4 className="text-center">{herb.name}</h4>
                  <img
                    src={herb.photo_url}
                    alt={herb.name}
                    style={{
                      maxHeight: "200px",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                  <p className="mb-2" style={{ fontSize: "0.9rem" }}>
                    {herb.description}
                  </p>
                  <p className="mb-1">
                    <strong>Benefit:</strong> {herb.benifits}
                  </p>
                  <p className="mb-1">
                    <strong>Dosage:</strong> {herb.dosage}
                  </p>
                  <p className="mb-1">
                    <strong>Usage:</strong> {herb.usage}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/*  fixed card at top right */}
          <div
            className="col-md-3 z-2 mt-5"
            style={{ position: "fixed", top: "10px", right: "10px" }}
          >
            <div className="glass-card m-0 d-flex flex-column justify-content-center align-items-center">
              <img
                src={LOGO}
                alt="Logo"
                style={{ height: "150px" }}
                className="mb-4 rounded-5"
              />
              <h6>
                Enter Disease/Symptoms to get AI suggested Yoda / Herbs / Home
                Remedies for you
              </h6>
              <div className="mb-2 w-100">
                <textarea
                  name="name"
                  value={text || ""}
                  onChange={(e) => setText(e.target.value)}
                  required
                  type="text"
                  placeholder="Enter your disease/symptoms"
                  className="form-control text-white border-light fs-6"
                  rows={3}
                />
              </div>
              <button className="btn btn-success mb-3" onClick={handleSearch}>
                Submit
              </button>
              {/* horizontal border */}
              <div
                className="w-100 mb-3"
                style={{ borderTop: "1px solid white" }}
              />

              {/* call button */}
              <div className="glass-card px-3 py-2" style={{ zIndex: 2 }}>
                For any Assistance or Personalized support call :{" "}
                <span className="fs-5 fw-semibold text-warning">
                  9971928080
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Diet_plan;
