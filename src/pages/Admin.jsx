import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
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

  useEffect(() => {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate() || new Date(),
        }));

        setBookings(data);
        calculateStats(data);
        setLoading(false);
      },
      () => {
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
        new Date(b.createdAt).setHours(0, 0, 0, 0) === today.getTime()
    );

    const topicCount = {};
    data.forEach((b) => {
      topicCount[b.topic] = (topicCount[b.topic] || 0) + 1;
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
    await deleteDoc(doc(db, "bookings", id));
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

  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = filter === "all" || b.topic === filter;
    const matchesSearch =
      b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.topic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.slot?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const uniqueTopics = [...new Set(bookings.map((b) => b.topic))];

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>🎯 Admin Dashboard</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/admin/analytics">
            <button className="nav-btn-primary">📊 Analytics</button>
          </Link>
          <Link to="/admin/notes">
            <button className="nav-btn-primary">➕ Add Notes</button>
          </Link>
          <button onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>

      <div className="admin-stats">
        <div>📊 Total: {stats.total}</div>
        <div>📅 Today: {stats.today}</div>
        <div>💰 Revenue: ₹{stats.revenue}</div>
        <div>🔥 Topics: {Object.keys(stats.topics).length}</div>
      </div>

      <input
        type="text"
        placeholder="Search by name, topic or slot..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div>
        <button onClick={() => setFilter("all")}>
          All ({bookings.length})
        </button>
        {uniqueTopics.map((topic) => (
          <button key={topic} onClick={() => setFilter(topic)}>
            {topic}
          </button>
        ))}
      </div>

      {error && <p>{error}</p>}

      <div className="bookings-header-row">
        <h2>📋 Mentorship Bookings</h2>
        <ExportButton bookings={filteredBookings} />
      </div>

      {filteredBookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        filteredBookings.map((b) => (
          <div key={b.id} className="booking-card">
            <p>👤 {b.name || "N/A"}</p>
            <p>📚 {b.topic}</p>
            <p>🕐 {b.slot}</p>
            <p>💵 ₹{b.price || 99}</p>
            <p>📅 {formatDate(b.createdAt)}</p>
            <button onClick={() => handleDelete(b.id)}>🗑 Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Admin;
