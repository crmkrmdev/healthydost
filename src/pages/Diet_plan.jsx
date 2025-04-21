import React, { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "./header";
import PDF from "../assets/PDF_file_icon.svg";
import LOGO from "../assets/LOGO.png";

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
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const timer = setTimeout(() => setLoading(false), 10000); // 10 seconds
  //   return () => clearTimeout(timer);
  // }, []);
  const herbs = [
    {
      name: "Ashwagandha",
      description:
        "A powerful adaptogen known to reduce stress, enhance stamina, and strengthen the immune system.",
      photo_url:
        "https://t4.ftcdn.net/jpg/03/88/41/55/240_F_388415502_Q2Mhpzt9rf4nxOogCHRBqlGwsycrCevS.jpg",

      benifits:
        "Reduces stress and anxiety, enhances stamina, boosts immunity.",
      dosage: "500 mg to 1 g per day.",
      usage: "Can be taken in powder form with warm milk or water.",
    },
    {
      name: "Tulsi",
      description:
        "A revered herb for respiratory wellness, boosting immunity, and promoting mental calm and clarity.",
      photo_url:
        "https://t3.ftcdn.net/jpg/02/63/84/64/240_F_263846480_zQ9YO4y7zkUE5q8d1RD20h8SgtrRBoV0.jpg",
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
      photo_url:
        "https://pocketyoga.com/assets/images/full/SeatedOnHeelsTwistBound_R.png",
    },
    {
      name: "Sage Marichi's III Pose",
      sanskrit_name: "Marichyasana C",
      description:
        "Marichyasana C (Sage Marichi's III) is a beginner seated twist. Lengthen your spine, gently twist to the right, placing your left hand behind your sacrum. Benefits include improved spinal mobility and digestion. Keep your chest lifted and shoulders relaxed.",
      expertise_level: "Beginner",
      pose_type: ["Seated", "Twist"],
      duration: "15 seconds to 20 minutes",
      days: "3-4 times a week",
      photo_url:
        "https://pocketyoga.com/assets/images/full/MarichiIIITraditional_R.png",
    },
  ];

  const [text, setText] = useState("");

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
      <div className="main" style={{ backgroundColor: "black" }}>
        <Header />
        <div className="row d-flex justify-content-center align-items-start m-0">
          <div className="col-md-9 row mt-5">
            {/* header */}
            <div className="glass-card col-md-12 m-0 mb-2">
              <h2 className="text-center">Here is your customized Diet Plan</h2>
            </div>
            {/* diet plan */}
            <div className="glass-card col-md-9 m-0 mb-4">
              <p className="fs-5">
                Your customized Diet Plan for :{" "}
                <span className="fw-semibold fs-5">
                  {localStorage.getItem("purpose")}
                </span>
              </p>
              <p className="fs-5">Keeping in mind :</p>
              <div className="d-flex flex-wrap gap-2 mb-2">
                {[
                  ...JSON.parse(localStorage.getItem("newSymptoms"))
                    .filter((e) => e.value === true)
                    .map((e) => e.name),
                  ...JSON.parse(localStorage.getItem("oldSymptoms"))
                    .filter((e) => e.value === true)
                    .map((e) => e.name),
                ].map((symptom, index) => (
                  <span key={index} className="badge bg-primary me-2 mb-2">
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
            {/* Button in right column */}
            <div className="glass-card col-md-3 m-0 d-flex align-items-center justify-content-center mb-4 ">
              <Link
                type="button"
                className="btn btn-tranparent"
                target="_blank"
                to="https://drive.google.com/file/d/1C_zyZINNrU3K3hL-ZfgHhsx3pJlhVqGz/view?usp=sharing"
              >
                <img src={PDF} alt="PDF" style={{ width: "100px" }} />
                <br />
                Download Diet Plan
              </Link>
            </div>
            {/* header */}
            <div className="glass-card col-md-12 m-0 mb-2">
              <h2 className="text-center">2 best suggested yoga for you :</h2>
            </div>
            {/* suggested yogas */}
            <div className="row mb-4">
              {yogaPoses.map((yoga, index) => (
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
                      width: "50%",
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
            <div className="glass-card col-md-12 m-0 mb-2">
              <h2 className="text-center">2 best suggested Herbs for you :</h2>
            </div>
            {/* suggested yogas */}
            <div className="row mb-4">
              {herbs.map((herb, index) => (
                <div key={index} className="glass-card col-md-6 m-0">
                  <h4 className="text-center">{herb.name}</h4>
                  <img
                    src={herb.photo_url}
                    alt={herb.name}
                    style={{
                      width: "100%",
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
          <div className="col-md-3 z-2 mt-5">
            <div className="glass-card m-0 d-flex flex-column justify-content-center align-items-center">
              <img
                src={LOGO}
                alt="Logo"
                style={{ height: "150px" }}
                className="mb-4"
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
              <button className="btn btn-success mb-3">Submit</button>
              {/* horizontal border */}
              <div
                className="w-100 mb-3"
                style={{ borderTop: "1px solid white" }}
              />

              {/* call button */}
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {}}
                style={{ zIndex: 2 }}
              >
                For any Assistance or Personalized support call : 9971928080
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Diet_plan;
