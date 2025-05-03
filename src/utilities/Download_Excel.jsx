import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import html2pdf from "html2pdf.js";

const temp = (tableId, fileName = "table.pdf") => {
  const element = document.getElementById(tableId);
  const headerElement = element.querySelector("thead");
  const bodyElement = element.querySelector("tbody");

  // Create a container for the entire table
  const container = document.createElement("div");
  container.style.width = "100%";

  // Combine header and body into one table
  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";

  // Clone and append thead
  const thead = headerElement.cloneNode(true);
  table.appendChild(thead);

  // Clone and style tbody
  const tbody = bodyElement.cloneNode(true);
  const rows = tbody.querySelectorAll("tr");
  rows.forEach((row) => {
    row.style.borderBottom = "1px solid #000";
    row.style.breakInside = "avoid";

    const cells = row.querySelectorAll("td");
    cells.forEach((cell) => {
      cell.style.padding = "8px";
    });
  });
  table.appendChild(tbody);

  container.appendChild(table);

  const opt = {
    margin: [0.3, 0.3, 0.3, 0.3], // Smaller page margin
    filename: fileName,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      scrollY: 0,
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

const exportToPdf = (tableId, divID, fileName = "header.pdf") => {
  const tableElement = document.getElementById(tableId);
  const headerElement = tableElement.querySelector("thead");
  const contentDiv = document.getElementById(divID);

  // Page 1: Table header
  const headerContainer = document.createElement("div");
  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";

  const thead = headerElement.cloneNode(true);
  table.appendChild(thead);
  headerContainer.appendChild(table);

  // Page 2: Cloned content of the div
  const contentClone = contentDiv.cloneNode(true);
  const fullContainer = document.createElement("div");
  fullContainer.appendChild(headerContainer);

  // Add page break before div content
  const pageBreak = document.createElement("div");
  pageBreak.style.pageBreakBefore = "always";
  fullContainer.appendChild(pageBreak);

  fullContainer.appendChild(contentClone);

  const opt = {
    margin: [0.3, 0.3, 0.3, 0.3],
    filename: fileName,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 1, scrollY: 0 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    pagebreak: { mode: ["css", "legacy"], before: "#page-break" },
  };

  return html2pdf().set(opt).from(fullContainer).save();
};

export { exportToExcel, tableToJson, exportToPdf };
