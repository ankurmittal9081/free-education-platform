import * as XLSX from "xlsx";

function ExportButton({ data, fileName = "Export.xlsx" }) {
  const exportToExcel = () => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }

    // 🔹 Clean data format
    const formattedData = data.map((item, index) => ({
      "S.No": index + 1,
      Name: item.name || "N/A",
      Email: item.email || "N/A",
      Topic: item.topic || item.interviewLabel || "N/A",
      Slot: item.slot || item.preferredTime || "N/A",
      Amount: item.price || 99,
      Status: item.status || "PAID",
      "Booked At": item.createdAt?.seconds
        ? new Date(item.createdAt.seconds * 1000).toLocaleString("en-IN")
        : new Date(item.createdAt).toLocaleString("en-IN"),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");

    XLSX.writeFile(workbook, fileName);
  };

  return (
    <button className="export-btn" onClick={exportToExcel}>
      📥 Export Excel
    </button>
  );
}

export default ExportButton;
