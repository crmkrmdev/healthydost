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
  headerPage.style.minHeight = "100vh";
  headerPage.style.pageBreakAfter = "always";
  headerPage.appendChild(headerElement.cloneNode(true));
  container.appendChild(headerPage);

  // Create second page with body
  const bodyPage = document.createElement("div");
  bodyPage.style.pageBreakBefore = "always";
  bodyPage.style.marginTop = "0";
  bodyPage.style.paddingTop = "10px";

  // Clone body and add styles
  const bodyClone = bodyElement.cloneNode(true);
  const rows = bodyClone.querySelectorAll("tr");
  rows.forEach((row) => {
    row.style.borderBottom = "1px solid #000";
    row.style.marginBottom = "10px";
    row.style.paddingBottom = "10px";
    row.style.display = "table-row"; // Changed from flex to table-row
    row.style.width = "100%";

    const cells = row.querySelectorAll("td");
    cells.forEach((cell) => {
      cell.style.padding = "8px";
      cell.style.display = "table-cell"; // Added table-cell display
    });
  });

  bodyPage.appendChild(bodyClone);
  container.appendChild(bodyPage);

  const opt = {
    margin: [0.5, 0.5, 0.5, 0.5],
    filename: fileName,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      scrollY: 0,
      windowHeight: 1123, // Letter size height in pixels
    },
    jsPDF: {
      unit: "in",
      format: "letter",
      orientation: "portrait",
    },
    pagebreak: {
      mode: ["css", "legacy"],
      avoid: ["tr"],
    },
  };

  html2pdf().set(opt).from(container).save();
};

export { exportToExcel, tableToJson, exportToPdf };
