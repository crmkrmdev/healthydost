import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import html2pdf from "html2pdf.js";

const exportToExcel = (data, fileName = "table.xlsx") => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const file = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(file, fileName);
};

const tableToJson = (tableId) => {
  const table = document.getElementById(tableId);
  const rows = table.querySelectorAll("tr");
  const headers = Array.from(rows[0].querySelectorAll("th")).map(
    (th) => th.innerText
  );

  return Array.from(rows)
    .slice(1)
    .map((row) => {
      const cells = row.querySelectorAll("td");
      let rowData = {};
      cells.forEach((cell, i) => {
        rowData[headers[i]] = cell.innerText;
      });
      return rowData;
    });
};

const exportToPdf = (tableId, fileName = "table.pdf") => {
  const element = document.getElementById(tableId);
  const headerElement = element.querySelector("thead");
  const bodyElement = element.querySelector("tbody");

  // Create a container for both pages
  const container = document.createElement("div");
  container.style.width = "100%";

  // Create first page with header
  const headerPage = document.createElement("div");
  headerPage.style.height = "100vh";
  headerPage.style.pageBreakAfter = "always";
  headerPage.appendChild(headerElement.cloneNode(true));
  container.appendChild(headerPage);

  // Create second page with body
  const bodyPage = document.createElement("div");
  bodyPage.style.pageBreakBefore = "always";
  bodyPage.style.marginTop = "0"; // Remove top margin
  bodyPage.style.paddingTop = "0"; // Remove top padding
  const bodyWrapper = document.createElement("div");
  bodyWrapper.style.marginTop = "-1in"; // Negative margin to pull content up
  bodyWrapper.appendChild(bodyElement.cloneNode(true));
  bodyPage.appendChild(bodyWrapper);
  container.appendChild(bodyPage);

  const opt = {
    margin: [0.25, 0.5, 0.5, 0.5], // Reduced top margin to 0.25 inches
    filename: fileName,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      scrollY: 0,
      windowHeight: 1123,
    },
    jsPDF: {
      unit: "in",
      format: "letter",
      orientation: "portrait",
    },
    pagebreak: {
      mode: ["css", "legacy"],
      before: "#bodyPage",
    },
  };

  html2pdf().set(opt).from(container).save();
};

export { exportToExcel, tableToJson, exportToPdf };
