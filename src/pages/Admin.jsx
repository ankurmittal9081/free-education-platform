import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import ExportButton from "../components/ExportButton";

function Admin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    revenue: 0,
    topics: {},
  });

  const navigate = useNavigate();

  // 🔥 REAL-TIME LISTENER
  useEffect(() => {
    const q = query(
      collection(db, "bookings"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
          createdAt:
            docSnap.data().createdAt?.toDate() || new Date(),
        }));

        setBookings(data);
        calculateStats(data);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError("Failed to load bookings");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  function calculateStats(data) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayBookings = data.filter(
      (b) =>
        new Date(b.createdAt).setHours(0, 0, 0, 0) ===
        today.getTime()
    );

    const topicCount = {};
    data.forEach((b) => {
      topicCount[b.topic] =
        (topicCount[b.topic] || 0) + 1;
    });

    setStats({
      total: data.length,
      today: todayBookings.length,
      revenue: data.length * 99,
      topics: topicCount,
    });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this booking?")) return;

    try {
      await deleteDoc(doc(db, "bookings", id));
    } catch (err) {
      alert("Failed to delete booking");
    }
  }

  async function handleLogout() {
    await signOut(auth);
    navigate("/admin-login");
  }

  function formatDate(date) {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesFilter =
      filter === "all" || booking.topic === filter;

    const matchesSearch =
      booking.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.topic
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.slot
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const uniqueTopics = [
    ...new Set(bookings.map((b) => b.topic)),
  ];

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="admin-page">
      {/* HEADER */}
      <div className="admin-header">
        <h1>🎯 Admin Dashboard</h1>
        <button onClick={handleLogout}>🚪 Logout</button>
      </div>

      {/* STATS */}
      <div className="admin-stats">
        <div>📊 Total: {stats.total}</div>
        <div>📅 Today: {stats.today}</div>
        <div>💰 Revenue: ₹{stats.revenue}</div>
        <div>
          🔥 Topics: {Object.keys(stats.topics).length}
        </div>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by name, topic or slot..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* FILTER */}
      <div>
        <button onClick={() => setFilter("all")}>
          All ({bookings.length})
        </button>
        {uniqueTopics.map((topic) => (
          <button
            key={topic}
            onClick={() => setFilter(topic)}
          >
            {topic}
          </button>
        ))}
      </div>

      {error && <p>{error}</p>}

      {/* BOOKINGS HEADER + EXPORT */}
      <div className="bookings-header-row">
        <h2>📋 Mentorship Bookings</h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <span>
            Showing {filteredBookings.length} booking
            {filteredBookings.length !== 1
              ? "s"
              : ""}
          </span>

          <ExportButton bookings={filteredBookings} />
        </div>
      </div>

      {/* BOOKINGS LIST */}
      {filteredBookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        filteredBookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <p>👤 {booking.name || "N/A"}</p>
            <p>📚 {booking.topic}</p>
            <p>🕐 {booking.slot}</p>
            <p>💵 ₹{booking.price || 99}</p>
            <p>🆔 {booking.paymentId || "N/A"}</p>
            <p>📅 {formatDate(booking.createdAt)}</p>

            <button
              onClick={() => handleDelete(booking.id)}
            >
              🗑 Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Admin;
