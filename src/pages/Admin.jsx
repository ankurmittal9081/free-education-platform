// import { useEffect, useState } from "react";
// import {
//   collection,
//   deleteDoc,
//   doc,
//   query,
//   orderBy,
//   onSnapshot,
// } from "firebase/firestore";
// import { db, auth } from "../firebase";
// import { signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import ExportButton from "../components/ExportButton";

// function Admin() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [stats, setStats] = useState({
//     total: 0,
//     today: 0,
//     revenue: 0,
//     topics: {},
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
//     const unsub = onSnapshot(q, (snap) => {
//       const data = snap.docs.map((d) => ({
//         id: d.id,
//         ...d.data(),
//         createdAt: d.data().createdAt?.toDate() || new Date(),
//       }));
//       setBookings(data);
//       calculateStats(data);
//       setLoading(false);
//     });
//     return () => unsub();
//   }, []);

//   function calculateStats(data) {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const todayBookings = data.filter(
//       (b) => new Date(b.createdAt).setHours(0, 0, 0, 0) === today.getTime()
//     );

//     const topics = {};
//     data.forEach((b) => {
//       topics[b.topic] = (topics[b.topic] || 0) + 1;
//     });

//     setStats({
//       total: data.length,
//       today: todayBookings.length,
//       revenue: data.length * 99,
//       topics,
//     });
//   }

//   async function handleDelete(id) {
//     if (!window.confirm("Delete booking?")) return;
//     await deleteDoc(doc(db, "bookings", id));
//   }

//   async function handleLogout() {
//     await signOut(auth);
//     navigate("/admin-login");
//   }

//   const filteredBookings = bookings.filter((b) => {
//     const f = filter === "all" || b.topic === filter;
//     const s =
//       b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       b.topic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       b.slot?.toLowerCase().includes(searchTerm.toLowerCase());
//     return f && s;
//   });

//   const uniqueTopics = [...new Set(bookings.map((b) => b.topic))];

//   if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

//   return (
//     <div className="admin-page">
//       {/* HEADER */}
//       <div className="admin-topbar">
//         <div className="admin-topbar-content">
//           <div>
//             <h1>🎯 Admin Dashboard</h1>
//             <button className="logout-btn" onClick={handleLogout}>
//               🚪 Logout
//             </button>
//           </div>

//           <div className="admin-stats-inline">
//             <span>📊 Total: {stats.total}</span>
//             <span>📅 Today: {stats.today}</span>
//             <span>💰 Revenue: ₹{stats.revenue}</span>
//             <span>🔥 Topics: {Object.keys(stats.topics).length}</span>
//           </div>
//         </div>
//       </div>

//       {/* SEARCH */}
//       <div className="admin-search-wrapper">
//         <input
//           className="admin-search"
//           placeholder="Search by name, topic or slot..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* FILTER TABS */}
//       <div className="admin-tabs">
//         <button
//           className={filter === "all" ? "tab active" : "tab"}
//           onClick={() => setFilter("all")}
//         >
//           All ({bookings.length})
//         </button>

//         {uniqueTopics.map((t) => (
//           <button
//             key={t}
//             className={filter === t ? "tab active" : "tab"}
//             onClick={() => setFilter(t)}
//           >
//             {t}
//           </button>
//         ))}
//       </div>

//       {/* BOOKINGS HEADER */}
//       <div className="bookings-header-row">
//         <h2>📋 Mentorship Bookings</h2>
//         <ExportButton bookings={filteredBookings} />
//       </div>

//       {/* BOOKINGS LIST */}
//       <div className="bookings-list">
//         {filteredBookings.map((b) => (
//           <div key={b.id} className="booking-card">
//             <p>👤 <strong>{b.name}</strong></p>
//             <p>📚 {b.topic}</p>
//             <p>🕐 {b.slot}</p>
//             <p>💰 ₹{b.price || 99}</p>
//             <p className="muted">🆔 {b.paymentId}</p>
//             <p className="muted">
//               📅 {b.createdAt.toLocaleDateString()}{" "}
//               {b.createdAt.toLocaleTimeString()}
//             </p>

//             <button
//               className="delete-btn"
//               onClick={() => handleDelete(b.id)}
//             >
//               🗑 Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Admin;
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ExportButton from "../components/ExportButton";

function Admin() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  /* ===== FETCH BOOKINGS ===== */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "bookings"), (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setBookings(data);
    });

    return () => unsub();
  }, []);

  /* ===== STATS ===== */
  const total = bookings.length;
  const revenue = total * 99;

  const today = new Date().toDateString();
  const todayCount = bookings.filter((b) => {
    if (!b.createdAt?.seconds) return false;
    return (
      new Date(b.createdAt.seconds * 1000).toDateString() === today
    );
  }).length;

  const topicMap = {};
  bookings.forEach((b) => {
    topicMap[b.topic] = (topicMap[b.topic] || 0) + 1;
  });

  /* ===== DELETE BOOKING ===== */
  async function handleDelete(id) {
    if (!window.confirm("Delete this booking?")) return;
    await deleteDoc(doc(db, "bookings", id));
  }

  /* ===== LOGOUT ===== */
  async function logout() {
    await signOut(auth);
    navigate("/admin-login");
  }

  return (
    <div className="admin-page">
      {/* HEADER */}
      <div className="admin-header">
        <h1>🎯 Admin Dashboard</h1>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <h2>{total}</h2>
          <p>Total Bookings</p>
        </div>

        <div className="admin-stat-card">
          <h2>₹{revenue}</h2>
          <p>Total Revenue</p>
        </div>

        <div className="admin-stat-card">
          <h2>{todayCount}</h2>
          <p>Today Bookings</p>
        </div>

        <div className="admin-stat-card">
          <h2>{Object.keys(topicMap).length}</h2>
          <p>Topics</p>
        </div>
      </div>

      {/* BOOKINGS BY TOPIC */}
      <div className="admin-chart">
        <h2>📊 Bookings by Topic</h2>
        {Object.keys(topicMap).map((topic) => (
          <div key={topic} className="chart-row">
            <span>{topic}</span>
            <div
              className="chart-bar"
              style={{ width: `${topicMap[topic] * 30}px` }}
            >
              {topicMap[topic]}
            </div>
          </div>
        ))}
      </div>

      {/* BOOKINGS TABLE */}
      <div className="admin-table">
        <div className="table-header">
          <h2>👤 Student Booking Details</h2>
          <ExportButton bookings={bookings} />
        </div>

        {bookings.length === 0 ? (
          <p>No bookings yet</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Topic</th>
                <th>Slot</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b, i) => (
                <tr key={b.id}>
                  <td>{i + 1}</td>
                  <td>{b.name || "N/A"}</td>
                  <td>{b.email}</td>
                  <td>{b.topic}</td>
                  <td>{b.slot}</td>
                  <td>₹{b.price || 99}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(b.id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Admin;
