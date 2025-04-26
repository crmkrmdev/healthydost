import React, { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./header";
import PDF from "../assets/images/download.gif";
import LOGO from "../assets/LOGO.png";
import ashwagandhaImage from "../assets/images/ashwagandha.webp";
import Pashasana from "../assets/images/Pashasana.gif";
import petunia from "../assets/images/petunia.gif";
import { exportToPdf } from "../utilities/Download_Excel";
import healthy_food from "../assets/images/healthy_food.png";
import snacks_food from "../assets/images/snacks_food.png";
import home_remedy from "../assets/images/home_remedy.png";
import yoga_pic from "../assets/images/yoga.png";
import herbs_pic from "../assets/images/herbs.png";
import health_tips from "../assets/images/health_tips.png";
import axios from "axios";

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
  const sections = [
    {
      title: "Allowed Foods",
      image: healthy_food,
      items: [
        "Watermelon",
        "Cucumber",
        "Tomato",
        "Oranges",
        "Melon",
        "Frozen grapes",
        "Cold apples",
        "Chilled berries",
        "Low potassium soup",
        "Flavor ice with lemon",
      ],
    },
    {
      title: "Foods to Avoid",
      image: snacks_food,
      items: [
        "Salty snacks",
        "Sugary drinks",
        "Caffeine and alcohol",
        "Processed foods",
      ],
    },
    {
      title: "Home Remedies",
      image: home_remedy,
      items: [
        "Add fresh mint to salads, beverages, and other dishes for cooling",
      ],
    },
    {
      title: "Recommeded Yoga",
      image: yoga_pic,
      items: ["Bhujangasana", "Savasana"],
    },
    {
      title: "Recommeded Herbs",
      image: herbs_pic,
      items: ["Draksha", "Kharjur"],
    },
    {
      title: "Other Tips",
      image: health_tips,
      items: [
        "Drink plenty of water",
        "Electrolyte rich drink",
        "Low sodium diet",
        "Manage diabetes and BP",
      ],
    },
  ];

  const [yoga, setYoga] = useState(yogaPoses);
  const [text, setText] = useState("");
  const [dietData, setDietData] = useState(sections);

  const handlePdfDownload = () => {
    exportToPdf("Diet_Chart_Table", "Diet_Chart_Table.pdf");
  };

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

  function parseDietPlan(apiResponse) {
    const text = apiResponse.response;

    const allowed = [];
    const avoid = [];
    const yoga = [];
    const herbs = [];
    const tips = [];
    const home_remedies = [];

    // Helper to push multiple items
    const pushItems = (targetArray, textBlock) => {
      textBlock
        .split("\n")
        .map((line) => line.replace(/^[\*\-]\s*/, "").trim())
        .filter((line) => line)
        .forEach((line) => targetArray.push(line));
    };

    // Extract sections
    const dietPlanMatch = text.match(/Diet Plan:\s*([\s\S]*?)Yoga Poses:/i);
    const yogaMatch = text.match(/Yoga Poses:\s*([\s\S]*?)Useful Herbs:/i);
    const herbsMatch = text.match(/Useful Herbs:\s*([\s\S]*?)Foods to Avoid:/i);
    const avoidMatch = text.match(/Foods to Avoid:\s*([\s\S]*?)Tips:/i);
    const tipsMatch = text.match(/Tips:\s*([\s\S]*?)Home Remedies:/i);
    const remediesMatch = text.match(/Home Remedies:\s*([\s\S]*?)Please note/i);

    // Parse each section
    if (dietPlanMatch) pushItems(allowed, dietPlanMatch[1]);
    if (yogaMatch) pushItems(yoga, yogaMatch[1]);
    if (herbsMatch) pushItems(herbs, herbsMatch[1]);
    if (avoidMatch) pushItems(avoid, avoidMatch[1]);
    if (tipsMatch) pushItems(tips, tipsMatch[1]);
    if (remediesMatch) pushItems(home_remedies, remediesMatch[1]);

    return {
      allowed,
      avoid,
      yoga,
      herbs,
      tips,
      home_remedies,
    };
  }

  function updateDietPlanFromApi(apiResponse, setDietData) {
    const parsed = parseDietPlan(apiResponse); // Using the earlier parser function

    setDietData((prevSections) =>
      prevSections.map((section) => {
        const lowerTitle = section.title.toLowerCase();

        if (lowerTitle.includes("allowed")) {
          return { ...section, items: cleanAllowed(parsed.allowed) };
        } else if (lowerTitle.includes("avoid")) {
          return { ...section, items: parsed.avoid };
        } else if (lowerTitle.includes("home remedies")) {
          return { ...section, items: parsed.home_remedies };
        } else if (lowerTitle.includes("yoga")) {
          return { ...section, items: parsed.yoga };
        } else if (lowerTitle.includes("herbs")) {
          return { ...section, items: parsed.herbs };
        } else if (lowerTitle.includes("tips")) {
          return { ...section, items: parsed.tips };
        } else {
          return section;
        }
      })
    );
  }

  // Helper to clean "Allowed foods: Watermelon, cucumber..." into separate items
  function cleanAllowed(allowedArray) {
    if (!allowedArray.length) return [];

    let firstItem = allowedArray[0];
    let foods = [];

    if (firstItem.includes(":")) {
      const splitFoods = firstItem.split(":")[1].split(",");
      foods = splitFoods.map((f) => f.trim());
    }

    // Add remaining items
    const extraItems = allowedArray.slice(1);

    return [...foods, ...extraItems];
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2000); // Change text every 2 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const finalData = {
      purpose: localStorage.getItem("purpose"),
      illnesses: JSON.parse(localStorage.getItem("illnesses")),
      symptoms: JSON.parse(localStorage.getItem("symptoms")),
      dailyRoutine: JSON.parse(localStorage.getItem("dailyRoutine")),
      acquaintance: JSON.parse(localStorage.getItem("acquaintance")),
      userData: JSON.parse(localStorage.getItem("userData")),
    };
    const filteredData = {
      ...finalData.userData,
      symptoms: finalData.symptoms
        .filter((e) => e.value === true)
        .map((e) => e.name),
      illness: finalData.illnesses
        .filter((e) => e.value === true)
        .map((e) => e.name),
      mother_disease: finalData.acquaintance
        .filter((e) => e.name === "Mother")
        .map((e) => e.selected)[0],
      father_disease: finalData.acquaintance
        .filter((e) => e.name === "Father")
        .map((e) => e.selected)[0],
      sibling_disease: finalData.acquaintance
        .filter((e) => e.name === "Siblings")
        .map((e) => e.selected)[0],
      daily_routine: finalData.dailyRoutine.map((e) => ({
        name: e.name,
        value: e.value,
      })),
    };

    console.log(filteredData);

    const apiUrl = "https://karmaayurvedahospital.co/api/addenquiry";
    const payload = {
      query: "Diet for excessive thirst",
    };

    async function fetchDietPlan() {
      try {
        const response = await axios.post(apiUrl, payload);

        if (response.data.success) {
          updateDietPlanFromApi(response.data, setDietData);
        } else {
          console.error("API returned failure:", response.data);
        }
      } catch (error) {
        console.error("API call error:", error);
      }
    }

    fetchDietPlan();
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
      <div className="main">
        <Header />
        <div className="row m-0 mt-5">
          <div className="col-md-9 row">
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
                    `Age: ${
                      JSON.parse(localStorage.getItem("userData"))?.age
                    } Years`,
                    `Gener: ${
                      JSON.parse(localStorage.getItem("userData"))?.gender
                    }`,
                    `Weight: ${
                      JSON.parse(localStorage.getItem("userData"))?.weight
                    } KG`,
                    `Allergies: ${
                      JSON.parse(localStorage.getItem("userData"))?.allergy ||
                      "No allergy"
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
                <button
                  type="button"
                  className="btn btn-tranparent"
                  onClick={() => {
                    handlePdfDownload();
                  }}
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
                </button>
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

          <div className="d-flex justify-content-center m-0 mt-2 col-md-9 d-none">
            <div
              className="card col-md-10 p-4 mb-5 rounded-5"
              style={{ background: "rgba(240, 240, 240, 0.8)" }}
            >
              <table className="table table-bordered" id="Diet_Chart_Table">
                <thead>
                  <tr>
                    <th colSpan="2" className="text-center fs-2 py-3">
                      Excessive Thirst Care Guide
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dietData.map((section, idx) => (
                    <tr key={idx}>
                      <td className="align-middle" style={{ width: "40%" }}>
                        <div className="d-flex align-items-center justify-content-start gap-4">
                          <img
                            src={section.image || ""}
                            alt=""
                            className="rounded-pill"
                            style={{ height: "80px", width: "100px" }}
                          />
                          <span className="fs-5 fw-bold">{section.title}</span>
                        </div>
                      </td>
                      <td className="align-middle">
                        <ul className="m-0 p-0" style={{ listStyle: "none" }}>
                          {section.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="mb-1">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Diet_plan;
