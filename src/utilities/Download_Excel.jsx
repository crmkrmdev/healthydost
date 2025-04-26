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

  const opt = {
    margin: [0, 0, 0, 0], // [top, right, bottom, left] margins in inches
    filename: fileName,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      scrollY: -window.scrollY, // Prevents extra space at top
    },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(opt).from(element).save();
};

export { exportToExcel, tableToJson, exportToPdf };
