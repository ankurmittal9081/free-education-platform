import * as XLSX from "xlsx";

function ExportButton({ bookings }) {
  const exportToExcel = () => {
    if (!bookings || bookings.length === 0) {
      alert("No bookings to export");
      return;
    }

    const data = bookings.map((b, index) => ({
      "S.No": index + 1,
      "Student Name": b.name || "N/A",
      "Topic": b.topic || "N/A",
      "Time Slot": b.slot || "N/A",
      "Price": b.price || 99,
      "Payment ID": b.paymentId || "N/A",
      "Status": b.status || "PENDING",
      "Booked On": new Date(b.createdAt).toLocaleString("en-IN"),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");

    // ✅ IMPORTANT FIX
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Mentorship_Bookings.xlsx";
    link.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <button onClick={exportToExcel} className="export-btn">
      📥 Export to Excel
    </button>
  );
}

export default ExportButton;
