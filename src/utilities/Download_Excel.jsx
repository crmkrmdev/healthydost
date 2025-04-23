import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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

export { exportToExcel, tableToJson };
