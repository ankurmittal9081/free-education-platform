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
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({ total: 0, today: 0, revenue: 0, topics: {} });

  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(d => ({
        id: d.id,
        ...d.data(),
        createdAt: d.data().createdAt?.toDate() || new Date(),
      }));
      setBookings(data);
      calculateStats(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  function calculateStats(data) {
    const today = new Date(); today.setHours(0,0,0,0);
    const todayBookings = data.filter(b => new Date(b.createdAt).setHours(0,0,0,0) === today.getTime());
    const topics = {};
    data.forEach(b => topics[b.topic] = (topics[b.topic] || 0) + 1);

    setStats({
      total: data.length,
      today: todayBookings.length,
      revenue: data.length * 99,
      topics,
    });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete booking?")) return;
    await deleteDoc(doc(db, "bookings", id));
  }

  async function handleLogout() {
    await signOut(auth);
    navigate("/admin-login");
  }

  const filteredBookings = bookings.filter(b => {
    const f = filter === "all" || b.topic === filter;
    const s =
      b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.topic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.slot?.toLowerCase().includes(searchTerm.toLowerCase());
    return f && s;
  });

  const uniqueTopics = [...new Set(bookings.map(b => b.topic))];

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>🎯 Admin Dashboard</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/admin/analytics"><button className="nav-btn-primary">📊 Analytics</button></Link>
          <Link to="/admin/notes"><button className="nav-btn-primary">➕ Add Notes</button></Link>
          <Link to="/admin/certificates"><button className="nav-btn-primary">🎓 Issue Certificate</button></Link>
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
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div>
        <button onClick={() => setFilter("all")}>All</button>
        {uniqueTopics.map(t => (
          <button key={t} onClick={() => setFilter(t)}>{t}</button>
        ))}
      </div>

      <div className="bookings-header-row">
        <h2>📋 Bookings</h2>
        <ExportButton bookings={filteredBookings} />
      </div>

      {filteredBookings.map(b => (
        <div key={b.id} className="booking-card">
          <p>👤 {b.name}</p>
          <p>📚 {b.topic}</p>
          <p>🕐 {b.slot}</p>
          <p>💵 ₹{b.price || 99}</p>
          <button onClick={() => handleDelete(b.id)}>🗑 Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Admin;
