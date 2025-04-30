import React, { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./header";
import PDF from "../assets/download-4.png";
import { exportToPdf } from "../utilities/Download_Excel";
import healthy_food from "../assets/images/healthy_food.png";
import snacks_food from "../assets/images/snacks_food.png";
import home_remedy from "../assets/images/home_remedy.png";
import yoga_pic from "../assets/images/yoga.png";
import herbs_pic from "../assets/images/herbs.png";
import health_tips from "../assets/images/health_tips.png";
import "./Diet_plan.css";
import axios from "axios";
import sample from "../assets/missing-bg.png";
import Paschimutasan from "../assets/Paschimutasan.png";
import Halasana from "../assets/Halasana.png";

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
  // loader timer
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 10 seconds
    return () => clearTimeout(timer);
  }, []);

  const handlePdfDownload = () => {
    exportToPdf("Diet_Chart_Table", "Diet_Chart_Div", "Diet_Chart_Table.pdf");
  };

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

  const [yoga, setYoga] = useState([
    {
      sanskrit_name: "Adho Mukha Svanasana",
      name: "Downward Facing Dog",
      photo_url: Paschimutasan,
      description:
        "A foundational pose that stretches the whole body and builds strength.",
      expertise_level: "Beginner",
      pose_type: ["Standing", "Stretch"],
      duration: "1-3 minutes",
      days: "Monday, Wednesday, Friday",
    },
    {
      sanskrit_name: "Vrikshasana",
      name: "Tree Pose",
      photo_url: Halasana,
      description: "A balancing posture that promotes focus and calm.",
      expertise_level: "Intermediate",
      pose_type: ["Standing", "Balance"],
      duration: "30 seconds - 1 minute",
      days: "Tuesday, Thursday",
    },
  ]);
  const [herbs, setHerbs] = useState([
    {
      name: "Ashwagandha",
      photo_url: sample,
      description:
        "An ancient medicinal herb known for its stress-relieving properties.",
      benifits: "Reduces stress, boosts energy, improves concentration",
      dosage: "300–500 mg daily",
      usage: "Usually taken as a capsule, powder, or tea",
    },
    {
      name: "Tulsi (Holy Basil)",
      photo_url: sample,
      description:
        "A sacred plant in India used for its healing and adaptogenic properties.",
      benifits: "Boosts immunity, fights infections",
      dosage: "1–2 teaspoons of leaves daily",
      usage: "Consumed fresh, as tea, or in supplements",
    },
  ]);
  const [homeRemedies, setHomeRemedies] = useState([
    {
      name: "Honey and Lemon",
      photo_url: sample,
      description:
        "A soothing remedy that helps reduce throat irritation and suppress coughing.",
      benifits:
        "Soothes sore throat, boosts immunity, provides antibacterial effects",
      usage: "Mix and drink on an empty stomach or before bed",
    },
    {
      name: "Turmeric Milk",
      photo_url: sample,
      description:
        "A traditional Ayurvedic drink that helps reduce inflammation and fight infection.",
      benifits: "Relieves cold symptoms, improves sleep, supports healing",
      usage: "Best consumed before bedtime",
    },
  ]);
  const [text, setText] = useState("");
  const [dietData, setDietData] = useState(sections);
  const [expandedCards, setExpandedCards] = useState({});
  const [searchResults, setSearchResults] = useState([
    {
      title: "Yoga",
      items: [
        { name: "Adho Mukha Svanasana", image: Paschimutasan },
        { name: "Vrikshasana", image: Halasana },
      ],
    },
    {
      title: "Herbs",
      items: [
        { name: "Ashwagandha", image: sample },
        { name: "Tulsi (Holy Basil)", image: sample },
      ],
    },
    {
      title: "Home Remedies",
      items: [
        { name: "Turmeric Milk", image: sample },
        { name: "Honey and Lemon", image: sample },
      ],
    },
  ]);

  const toggleExpand = (idx) => {
    setExpandedCards((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2000); // Change text every 2 seconds
    return () => clearInterval(interval);
  }, []);

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
      if (!textBlock) return;

      textBlock
        .split("\n")
        .map((line) => line.replace(/^[\*\-\d\.]\s*/, "").trim())
        .filter((line) => line)
        .forEach((line) => {
          // Handle colon-separated lists
          if (line.includes(":")) {
            const items = line.split(":")[1].split(",");
            items.forEach((item) => {
              const cleanItem = item
                .trim()
                .replace(/\(.*?\)/g, "")
                .trim();
              if (cleanItem) targetArray.push(cleanItem);
            });
          } else {
            targetArray.push(line);
          }
        });
    };

    // Try first format
    const format1 = {
      diet: text.match(/Diet Plan:?\s*([\s\S]*?)(?=Yoga Poses:|$)/i),
      yoga: text.match(/Yoga Poses:?\s*([\s\S]*?)(?=Useful Herbs:|$)/i),
      herbs: text.match(/Useful Herbs:?\s*([\s\S]*?)(?=Foods to Avoid:|$)/i),
      avoid: text.match(/Foods to Avoid:?\s*([\s\S]*?)(?=Tips:|$)/i),
      tips: text.match(/Tips:?\s*([\s\S]*?)(?=Home Remedies:|$)/i),
      remedies: text.match(
        /Home Remedies:?\s*([\s\S]*?)(?=(?:Please note|$))/i
      ),
    };

    // Try second format
    const format2 = {
      diet: text.match(/\*\*Diet Plan\*\*\s*([\s\S]*?)(?=\*\*Yoga Poses|$)/i),
      yoga: text.match(
        /\*\*Yoga Poses\*\*\s*([\s\S]*?)(?=\*\*Useful Herbs|$)/i
      ),
      herbs: text.match(
        /\*\*Useful Herbs\*\*\s*([\s\S]*?)(?=\*\*Foods to Avoid|$)/i
      ),
      avoid: text.match(/\*\*Foods to Avoid\*\*\s*([\s\S]*?)(?=\*\*Tips|$)/i),
      tips: text.match(/\*\*Tips\*\*\s*([\s\S]*?)(?=\*\*Home Remedies|$)/i),
      remedies: text.match(/\*\*Home Remedies\*\*\s*([\s\S]*?)(?=$)/i),
    };

    // Use whichever format matches
    const format = format1.diet ? format1 : format2;

    // Handle Diet Plan section (splitting allowed/avoid foods)
    if (format.diet && format.diet[1]) {
      const dietText = format.diet[1];
      if (dietText.toLowerCase().includes("allowed:")) {
        const [_, ...allowedSection] = dietText.split("Allowed:");
        pushItems(allowed, allowedSection.join(""));
      } else if (dietText.toLowerCase().includes("foods to include:")) {
        const [_, ...includeSection] = dietText.split("Foods to include:");
        pushItems(allowed, includeSection.join(""));
      }
    }

    // Parse other sections
    if (format.yoga) pushItems(yoga, format.yoga[1]);
    if (format.herbs) pushItems(herbs, format.herbs[1]);
    if (format.avoid) pushItems(avoid, format.avoid[1]);
    if (format.tips) pushItems(tips, format.tips[1]);
    if (format.remedies) pushItems(home_remedies, format.remedies[1]);

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
    const finalData = {
      purpose: localStorage.getItem("purpose"),
      illnesses: JSON.parse(localStorage.getItem("illnesses")),
      symptoms: JSON.parse(localStorage.getItem("symptoms")),
      dailyRoutine: JSON.parse(localStorage.getItem("dailyRoutine")),
      acquaintance: JSON.parse(localStorage.getItem("acquaintance")),
      userData: JSON.parse(localStorage.getItem("userData")),
    };
    const filteredData = {
      purpose: finalData.purpose,
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

    const apiUrl = "https://healthydost.in/healthydostdjango/api/addenquiry";

    async function fetchDietPlan() {
      try {
        const response = await axios.post(apiUrl, filteredData);

        if (response.data.success) {
          updateDietPlanFromApi(response.data, setDietData);
          // console.log(response.data);
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
      <div className="glass-card d-flex flex-column justify-content-center align-items-center h-100 text-green">
        <CircleLoader color="#36d7b7" size={80} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-green mt-3 fs-5"
          >
            {loadingTexts[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="main">
        <div className="container diEt_plan">
          <div className="row">
            <div className="col-md-9 safe">
              <div className="row">
                {/* diet plan */}
                <div className="col-md-9 ">
                  <div className=" glass-card d-flex justify-content-center align-items-center">
                    <p className="fs-4 pe-3" style={{ maxWidth: "20%" }}>
                      Here is your <strong>Customized</strong>
                      <br />
                      Diet Plan
                    </p>

                    <div
                      className=" ms-4 d-flex flex-column gap-2 mb-2 ps-3"
                      style={{ borderLeft: "1px solid #ccc", padding: "0" }}
                    >
                      {/* Purpose */}
                      <div className="d-flex card_design">
                        <strong
                          style={{ minWidth: "90px" }}
                          className="text-start"
                        >
                          Purpose
                        </strong>
                        <div className="d-flex gap-2">
                          :{" "}
                          <span className="bg-success-subtle border-success text-green fw-medium rounded-1 px-2 box-shadow">
                            {localStorage.getItem("purpose")}
                          </span>
                        </div>
                      </div>

                      {/* Symptoms */}
                      <div className="d-flex card_design">
                        <strong
                          style={{ minWidth: "90px" }}
                          className="text-start"
                        >
                          Symptoms
                        </strong>
                        <div className="mt-1 d-flex flex-wrap gap-2">
                          :{" "}
                          {JSON.parse(localStorage.getItem("symptoms") || "[]")
                            .filter((e) => e.value === true)
                            .map((e, i) => (
                              <span
                                key={i}
                                className="bg-success-subtle border-success text-green fw-medium rounded-1 px-2 box-shadow"
                              >
                                {e.name}
                              </span>
                            ))}
                        </div>
                      </div>

                      {/* Illnesses */}
                      <div className="d-flex card_design">
                        <strong
                          style={{ minWidth: "90px" }}
                          className="text-start"
                        >
                          Illnesses
                        </strong>
                        <div className="mt-1 d-flex flex-wrap gap-2">
                          :{" "}
                          {JSON.parse(localStorage.getItem("illnesses") || "[]")
                            .filter((e) => e.value === true)
                            .map((e, i) => (
                              <span
                                key={i}
                                className="bg-success-subtle border-success text-green fw-medium rounded-1 px-2 box-shadow"
                              >
                                {e.name}
                              </span>
                            ))}
                        </div>
                      </div>

                      {/* User Info */}
                      <div className="d-flex card_design">
                        <strong
                          style={{ minWidth: "90px" }}
                          className="text-start"
                        >
                          User Info
                        </strong>
                        <div className="mt-1 d-flex flex-wrap gap-2">
                          :{" "}
                          {(() => {
                            const user = JSON.parse(
                              localStorage.getItem("userData")
                            );
                            return [
                              `Age: ${user?.age}`,
                              `Gender: ${user?.gender}`,
                              `Weight: ${user?.weight}`,
                              ...(user?.allergy
                                ? [`Allergy: ${user.allergy}`]
                                : []),
                            ].map((info, i) => (
                              <span
                                key={i}
                                className="bg-success-subtle border-success text-green fw-medium rounded-1 px-2 box-shadow"
                              >
                                {info}
                              </span>
                            ));
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Button in right column */}
                <div className="col-md-3 mt-mob-3">
                  <div className="glass-card">
                    <button
                      type="button"
                      className="btn btn-tranparent"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePdfDownload();
                      }}
                    >
                      <img
                        src={PDF}
                        alt="PDF"
                        style={{ width: "80px" }}
                        className="mb-2 rounded-4"
                      />
                      <br />
                      <span className="text-green fs-5 text-nowrap">
                        {" "}
                        Download PDF
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="row" id="Diet_Chart_Div">
                {/* header */}
                <div className="section-title mb-4 text-green">
                  <h2>2 Best Suggested Yoga for You</h2>
                </div>
                {/* suggested yogas */}
                {yoga.map((yoga, index) => (
                  <div key={index} className="col-md-6 mt-3">
                    <div className="glass-card flex-column">
                      <h4 className="text-left">{yoga.sanskrit_name}</h4>
                      <p className="text-left fst-italic mb-2">{yoga.name}</p>

                      <div className=" m-0 d-flex flex-row align-items-center justify-content-between p-3 gap-3">
                        <div className="d-flex flex-column align-items-left ">
                          <img
                            src={yoga.photo_url}
                            alt={yoga.name}
                            className="rounded-3 w-100"
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-start">
                          <p className="mb-2" style={{ fontSize: "0.9rem" }}>
                            {yoga.description}
                          </p>
                          {/* <p className="mb-1">
                            <strong>Level:</strong> {yoga.expertise_level}
                          </p> */}
                          <p className="mb-1">
                            <strong>Type:</strong> {yoga.pose_type.join(", ")}
                          </p>
                          <p className="mb-1">
                            <strong>Duration:</strong> {yoga.duration}
                          </p>
                          {/* <p className="mb-1">
                            <strong>Days:</strong> {yoga.days}
                          </p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* header */}
                <div className="section-title mb-4 text-green">
                  <h2>2 Best useful Herbs for You</h2>
                </div>
                {/* suggested herbs */}
                {herbs.map((herb, index) => (
                  <div key={index} className="col-md-6 mt-3">
                    <div className="glass-card flex-column">
                      <h4 className="text-left">{herb.name}</h4>

                      <div className=" m-0 d-flex flex-row align-items-center justify-content-between p-3 gap-3">
                        <div className="d-flex flex-column align-items-left ">
                          <img
                            src={herb.photo_url}
                            alt={herb.name}
                            className="rounded-3 w-100"
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-start">
                          <p className="mb-2" style={{ fontSize: "0.9rem" }}>
                            {herb.description}
                          </p>
                          <p className="mb-1">
                            <strong>Benifits:</strong> {herb.benifits}
                          </p>
                          {/* <p className="mb-1">
                            <strong>Dosage:</strong> {herb.dosage}
                          </p> */}
                          <p className="mb-1">
                            <strong>Usage:</strong> {herb.usage}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* header */}
                <div className="section-title mb-4 text-green">
                  <h2>2 Best useful Home Remedies for You</h2>
                </div>
                {/* suggested remedies */}
                {homeRemedies.map((herb, index) => (
                  <div key={index} className="col-md-6 mt-3">
                    <div className="glass-card flex-column">
                      <h4 className="text-left">{herb.name}</h4>

                      <div className=" m-0 d-flex flex-row align-items-center justify-content-between p-3 gap-3">
                        <div className="d-flex flex-column align-items-left ">
                          <img
                            src={herb.photo_url}
                            alt={herb.name}
                            className="rounded-3 w-100"
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-start">
                          <p className="mb-2" style={{ fontSize: "0.9rem" }}>
                            {herb.description}
                          </p>
                          {/* <p className="mb-1">
                            <strong>Benifits:</strong> {herb.benifits}
                          </p> */}
                          <p className="mb-1">
                            <strong>Usage:</strong> {herb.usage}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* header */}
                <div className="section-title mb-4 text-green">
                  <h2>Other Recommendations for You</h2>
                </div>
                {/* diet data in card */}
                {dietData
                  .filter((e) =>
                    ["Other Tips", "Foods to Avoid", "Allowed Foods"].includes(
                      e.title
                    )
                  )
                  .map((section, idx) => (
                    <div className="col-md-4 mb-4" key={idx}>
                      <div className="glass-card d-flex flex-column p-3 w-100 justify-content-start align-items-start">
                        <h5 className="card-title text-center mb-3">
                          {section.title}
                        </h5>

                        <ul className="list-unstyled mb-0">
                          {(expandedCards[idx]
                            ? section.items
                            : section.items.slice(0, 5)
                          ).map((item, itemIdx) => (
                            <li key={itemIdx} className="mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              {item}
                            </li>
                          ))}
                        </ul>

                        {section.items.length > 5 && (
                          <button
                            className="btn btn-link text-end mt-2 p-0 align-self-end"
                            onClick={() => toggleExpand(idx)}
                          >
                            {expandedCards[idx] ? "Show less" : "Show more"}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/*  fixed card at top right */}
            <div className="col-md-3 z-2 top_fixed_card mb-4">
              <div className="glass-card m-0 d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex m-0 p-0 mb-2 w-100">
                  <input
                    name="name"
                    value={text || ""}
                    onChange={(e) => setText(e.target.value)}
                    required
                    type="text"
                    placeholder="Quick Search"
                    className="form-control fs-6 rounded-0"
                    rows={1}
                  />
                  <button
                    className="btn btn-success btn-sm rounded-0"
                    onClick={handleSearch}
                  >
                    Submit
                  </button>
                </div>
                <span
                  style={{
                    lineHeight: "1.2",
                  }}
                  className="ms-2 pb-4 fw-semibold"
                >
                  Enter Disease / Symptoms to get AI suggested Yoda, Herbs and
                  Home Remedies for you
                </span>
                <div className="fixed-container">
                  {searchResults.map((item, index) =>
                    item.items.map((cc, idx) => (
                      <div
                        key={`${index}-${idx}`}
                        className="w-100 glass-card mb-3 d-flex p-0 justify-content-start"
                        style={{
                          maxHeight: "80px",
                        }}
                      >
                        <img src={cc.image} alt="" style={{ width: "100px" }} />
                        <div className="p-2">
                          <h6>{item.title}</h6>
                          <span
                            style={{
                              fontSize: "small",
                            }}
                          >
                            {cc.name}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center m-0 mt-2 d-none">
              <div className="glass-card p-4 mb-5 rounded-5 w-100">
                <table className="table table-bordered" id="Diet_Chart_Table">
                  <thead>
                    <tr>
                      <th colSpan="2" className="py-4">
                        <div className="d-flex flex-column align-items-center">
                          <div
                            className="d-flex flex-column align-items-start p-4 rounded-3 shadow-sm bg-light"
                            style={{ maxWidth: "600px", width: "100%" }}
                          >
                            <h3 className="fw-bold text-primary mb-3">
                              Customized Diet Chart Plan for:{" "}
                              {JSON.parse(
                                localStorage.getItem("userData")
                              )?.name.toUpperCase()}{" "}
                            </h3>
                            <h5 className="fw-semibold text-secondary mb-2">
                              Goal: {localStorage.getItem("purpose")}
                            </h5>
                            <h6 className="fw-semibold text-muted mb-2">
                              Other Parameters:
                            </h6>
                            <div className="d-flex flex-wrap gap-2">
                              {[
                                `Age: ${
                                  JSON.parse(localStorage.getItem("userData"))
                                    ?.age
                                } Years`,
                                `Gender: ${
                                  JSON.parse(localStorage.getItem("userData"))
                                    ?.gender
                                }`,
                                `Weight: ${
                                  JSON.parse(localStorage.getItem("userData"))
                                    ?.weight
                                } KG`,
                                `Allergies: ${
                                  JSON.parse(localStorage.getItem("userData"))
                                    ?.allergy || "No allergy"
                                }`,
                              ].map((item, index) => (
                                <span
                                  key={index}
                                  className="badge bg-primary-subtle text-primary-emphasis p-2"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </th>
                    </tr>
                    <tr>
                      <th colSpan="2" className="py-4">
                        <div className="d-flex flex-column align-items-center">
                          <div
                            className="d-flex flex-column align-items-start p-4 rounded-3 shadow-sm bg-light"
                            style={{ maxWidth: "600px", width: "100%" }}
                          >
                            <span className="fs-3">Your Daily Routine :</span>
                            <span className="fs-5">Sleep Time : 10:00 PM</span>
                            <span className="fs-5">Wake Up Time : 6:00 AM</span>
                            <span className="fs-5">
                              Sleep Duration : 8 Hours
                            </span>
                          </div>
                        </div>
                      </th>
                    </tr>
                    <tr>
                      <th colSpan="2" className="py-4">
                        <div className="d-flex flex-column align-items-center">
                          <div
                            className="d-flex flex-column align-items-start p-4 rounded-3 shadow-sm bg-light"
                            style={{ maxWidth: "600px", width: "100%" }}
                          >
                            <div className="w-100">
                              <h4 className="fw-bold mb-4 text-primary">
                                Daily Routine
                              </h4>

                              <div className="mb-4">
                                <h5 className="fw-semibold text-secondary">
                                  🍳 Breakfast
                                </h5>
                                <ul className="list-unstyled ms-3 mt-2">
                                  <li className="mb-1">
                                    • 8 AM : Juice / Liquid Diet (Launki, Safed
                                    Petha, Siknangi)
                                  </li>
                                  <li className="mb-1">
                                    • 10 AM : Breakfst (Fruits only)
                                  </li>
                                </ul>
                              </div>
                              <div className="mb-4">
                                <h5 className="fw-semibold text-secondary">
                                  🥗 Lunch (1 PM / 2 PM)
                                </h5>
                                <ul className="list-unstyled ms-3 mt-2">
                                  <li className="mb-1">• Plate-1 : Salads</li>
                                  <li className="mb-1">
                                    • Plate-2 : Can have normal meal, Chapati /
                                    Rice (Anaj) with Dal / Sabji
                                  </li>
                                </ul>
                              </div>
                              <div className="mb-2">
                                <h5 className="fw-semibold text-secondary">
                                  🍲 Dinner
                                </h5>
                                <ul className="list-unstyled ms-3 mt-2">
                                  <li className="mb-1">
                                    • 7:00 PM: 2 Dal Katori / 2 Sabji with
                                    Chapati / Half-portion-rice
                                  </li>
                                  <li className="mb-1">
                                    • 8:30 PM : Glass of Milk (if needed)
                                  </li>
                                </ul>
                              </div>
                              <div className="mb-2">
                                <h5 className="fw-semibold text-secondary">
                                  Conclusion
                                </h5>
                                <ul className="list-unstyled ms-3 mt-2">
                                  <li className="mb-1">
                                    • No Meal Time : 14 Hours
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  {/* <tbody>
                    {dietData.map((section, idx) => (
                      <tr key={idx} className="mb-4">
                        <td className="align-middle" style={{ width: "40%" }}>
                          <div className="d-flex card_design justify-content-start gap-4">
                            <img
                              src={section.image || ""}
                              alt=""
                              className="rounded-pill"
                              style={{ height: "90px", width: "100px" }}
                            />
                            <span className="fs-5 fw-bold">{section.title}</span>
                          </div>
                        </td>
                        <td className="align-middle">
                          <ul className="m-0 p-0" style={{ listStyle: "none" }}>
                            {section.items.slice(0, 7).map((item, itemIdx) => (
                              <li key={itemIdx} className="mb-1">
                                • {item}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody> */}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Diet_plan;
