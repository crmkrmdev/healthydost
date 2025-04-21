import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./header";
import { CircleLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";

const Buttons = () => {
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
  const herbs = [
    {
      name: "Ashwagandha",
      description: "Adaptogen, reduces stress, boosts stamina and immunity",
    },
    {
      name: "Haldi",
      description:
        "Anti-inflammatory, antioxidant, good for skin and digestion",
    },
    {
      name: "Tulsi",
      description: "Respiratory health, immune booster, stress relief",
    },
    {
      name: "Triphala",
      description:
        "A blend of Amalaki, Haritaki, and Bibhitaki; great for digestion and detox",
    },
    {
      name: "Neem",
      description: "Purifies blood, treats skin conditions, antibacterial",
    },
    {
      name: "Brahmi",
      description: "Enhances memory, calms the mind, supports nervous system",
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
      photo_url:
        "https://pocketyoga.com/assets/images/full/MarichiIIITraditional_R.png",
    },
    {
      name: "Wind Removing Pose",
      sanskrit_name: "Pavanamuktasana",
      description:
        "Pavanamuktasana (Wind Removing Pose) is a beginner supine pose gently massaging the abdomen, relieving gas and bloating. Draw knees to chest, hugging them tightly. Maintain a relaxed neck and shoulders.",
      expertise_level: "Beginner",
      pose_type: ["Supine"],
      photo_url: "https://pocketyoga.com/assets/images/full/Turtle.png",
    },
  ];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2000); // Change text every 2 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 10000); // 10 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center vh-100"
        style={{ backgroundColor: "black", width: "108%" }}
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
      {/* <CircleLoader color="#36d7b7" size={80} /> */}
      <div className="main d-flex flex-column justify-content-center align-items-center ">
        <Header />
        {/* Buttons */}
        <div className="d-flex flex-column justify-content-center gap-3 mt-5">
          {/* download pdf button */}
          <Link
            type="button"
            className="btn btn-primary"
            target="_blank"
            to="https://drive.google.com/file/d/1C_zyZINNrU3K3hL-ZfgHhsx3pJlhVqGz/view?usp=sharing"
            style={{ zIndex: 2 }}
          >
            Your PDF is ready! Click to download
          </Link>
          <div className="d-flex gap-3">
            {/* usefull herbs */}
            <div
              className="glass-card p-4"
              style={{ width: "500px", margin: "0" }}
            >
              <h3 className="mb-4 text-center">Useful Herbs for You</h3>
              <div className="text-start">
                {herbs.map((herb, index) => (
                  <div key={index} className="mb-2">
                    <strong>{herb.name}</strong>: {herb.description}
                  </div>
                ))}
              </div>
            </div>
            {/* home remedies */}
            <div
              className="glass-card p-4"
              style={{ width: "500px", margin: "0" }}
            >
              <h3 className="mb-4 text-center">Home Remedies for You</h3>
              <div className="text-start">
                {remedies.map((remedy, index) => (
                  <div key={index} className="mb-2">
                    <strong>{remedy.name}</strong>: {remedy.description}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* suggested yogas */}
          <div className="d-flex flex-wrap justify-content-between">
            {yogaPoses.map((yoga, index) => (
              <div
                key={index}
                className="glass-card p-4"
                style={{ width: "330px", margin: "0" }}
              >
                <h4 className="mb-2 text-center">{yoga.name}</h4>
                <p className="text-center fst-italic mb-2">
                  {yoga.sanskrit_name}
                </p>
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
                <p>
                  <strong>Type:</strong> {yoga.pose_type.join(", ")}
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
            For any Assistance or Personalized support call : ??
          </button>
        </div>
      </div>
    </>
  );
};

export default Buttons;
