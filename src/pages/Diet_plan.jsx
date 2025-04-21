import React from "react";
import { Link } from "react-router-dom";
import Header from "./header";
import PDF from "../assets/PDF_file_icon.svg";

const Diet_plan = () => {
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
  const remedies = [
    {
      name: "Cold & Cough",
      description:
        "Mix honey and ginger juice; sip tulsi tea with black pepper",
    },
    {
      name: "Indigestion",
      description:
        "Drink warm water with lemon and a pinch of cumin; take ajwain with salt",
    },
    {
      name: "Acidity",
      description: "Mix 1 tsp amla powder with warm water before meals",
    },
    {
      name: "Headache",
      description:
        "Apply sandalwood paste on the forehead or inhale eucalyptus oil",
    },
    {
      name: "Skin issues",
      description:
        "Apply turmeric paste with honey for acne; use neem water for cleansing",
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

  return (
    <>
      <div className="main">
        <Header />
        <div className="row">
          <div className="col-md-9">
            <div className="row mt-5">
              {/* header */}
              <div className="glass-card col-md-12 m-0 mb-2">
                <h2 className="text-center">
                  Here is your customized Diet Plan
                </h2>
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
                  <div key={index} className="glass-card col-md-6 m-0">
                    <h4 className="text-center">{yoga.sanskrit_name}</h4>
                    <p className="text-center fst-italic mb-2">{yoga.name}</p>
                    <img
                      src={yoga.photo_url}
                      alt={yoga.name}
                      style={{
                        width: "100%",
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
                <h2 className="text-center">
                  2 best suggested Herbs for you :
                </h2>
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
