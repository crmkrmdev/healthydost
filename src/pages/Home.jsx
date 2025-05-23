import React, { useState, useRef, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import Dish from "../assets/bot_gif.gif";

const Home = () => {
  const navigate = useNavigate();
  const [purpose, setPurpose] = useState("");
  const [customPurpose, setCustomPurpose] = useState("");
  const inputRef = useRef(null);

  // Focus input when "others" is selected
  useEffect(() => {
    if (purpose === "others" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [purpose]);

  const handleSend = (e) => {
    e.preventDefault();
    // Validate purpose and customPurpose
    if ((purpose === "others" && !customPurpose.trim()) || purpose === "") {
      alert("Please enter your purpose.");
      return;
    }

    const finalPurpose = purpose === "others" ? customPurpose : purpose;
    localStorage.setItem("purpose", finalPurpose);
    navigate("/next");
  };

  useEffect(() => {
    // claer localStorage on component mount
    localStorage.clear();
  }, []);

  return (
    <>
      <Header />
      <div className="main d-flex flex-column justify-content-center align-items-center">
        <div className="fn__center_title safe" id="img_gen">
          {/* <div className="lines">
            <span className="l"></span>
            <span className="c"></span>
            <span className="r"></span>
          </div> */}
          <div className="text">
            <div className="fn__animated_text ready stop">
              <h1 className="text-green fw-bold mb-2">
                India's First AI Enabled Health System!
              </h1>
              <p className="text-green mb-4" style={{ fontSize: "1.2rem" }}>
                स्वस्थस्य स्वास्थ्य रक्षणं, आतुरस्य विकार प्रशमनं
              </p>
            </div>
          </div>
          <div className="mt-5">
            <form
              className="mb-3 mt-4 px-5 d-flex flex-column mobile-w"
              onSubmit={handleSend}
            >
              <div className="d-flex gap-3 flex-wrap justify-content-center">
                {/* <img src={LOGO} alt="Logo" style={{ height: "150px" }} /> */}
                <div className="gap-2 d-flex flex justify-content-center align-items-center w-100">
                  <select
                    className="form-select text-white border-light bg-dark bg-opacity-50"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Choose your purpose of getting a Complimentary Diet /
                      Health Plan
                    </option>
                    <option value="weight-loss">
                      I have one or more disease and want to get rid of that
                    </option>
                    <option value="stay-healthy">
                      I am healthy and I don't want to get ill
                    </option>
                    <option value="only-weight-loss">
                      I only want to lose weight
                    </option>
                    <option value="muscle-gain">I want to gain weight</option>
                    <option value="general-health">
                      Lifestyle Improvement
                    </option>
                    <option value="others">Others</option>
                  </select>

                  {purpose === "others" && (
                    <input
                      ref={inputRef}
                      type="text"
                      className="form-control text-white border-light bg-dark bg-opacity-50 custom-placeholder"
                      placeholder="Please specify your purpose"
                      value={customPurpose}
                      onChange={(e) => setCustomPurpose(e.target.value)}
                      style={{
                        "::placeholder": {
                          color: "#bbb",
                        },
                        color: "#fff",
                      }}
                      required
                    />
                  )}

                  <button type="submit" className="btn btn-grad md-px-4">
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="dish_card_container">
          <div className="row">
            <div className="col">
              <img src={Dish} alt="aaa" className="img-fluid" />
            </div>
          </div>
        </div>

        <div className="footer position-absolute z-2" style={{ zIndex: 2 }}>
          © 2025 Healthy Dost. All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Home;
