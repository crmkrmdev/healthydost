import React from "react";
import Header from "./header";
import { exportToPdf } from "../utilities/Download_Excel";
import healthy_food from "../assets/images/healthy_food.png";
import snacks_food from "../assets/images/snacks_food.png";
import home_remedy from "../assets/images/home_remedy.png";
import yoga from "../assets/images/yoga.png";
import herbs from "../assets/images/herbs.png";
import health_tips from "../assets/images/health_tips.png";

const Table_to_PDF = () => {
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
      image: yoga,
      items: ["Bhujangasana", "Savasana"],
    },
    {
      title: "Recommeded Herbs",
      image: herbs,
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

  const handlePdfDownload = () => {
    exportToPdf("Diet_Chart_Table", "Diet_Chart_Table.pdf");
  };

  return (
    <div className="main">
      <Header />
      <div className="d-flex justify-content-center mt-5">
        <button
          className="btn btn-warning z-2"
          onClick={() => {
            handlePdfDownload();
          }}
        >
          Download PDF
        </button>
      </div>

      <div className="d-flex justify-content-center m-0 mt-2">
        <div
          className="card col-md-10 p-4 mb-5 rounded-5"
          style={{ background: "rgba(240, 240, 240, 0.5)" }}
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
              {sections.map((section, idx) => (
                <tr key={idx}>
                  <td className="align-middle" style={{ width: "40%" }}>
                    <div className="d-flex align-items-center justify-content-start gap-4">
                      <img
                        src={section.image || ""}
                        alt=""
                        className="rounded-pill"
                        style={{ height: "100px", width: "100px" }}
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
  );
};

export default Table_to_PDF;
