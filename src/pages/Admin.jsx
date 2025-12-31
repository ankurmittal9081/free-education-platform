// // // // // // // // // // import { useEffect, useState } from "react";
// // // // // // // // // // import {
// // // // // // // // // //   collection,
// // // // // // // // // //   deleteDoc,
// // // // // // // // // //   doc,
// // // // // // // // // //   query,
// // // // // // // // // //   orderBy,
// // // // // // // // // //   onSnapshot,
// // // // // // // // // // } from "firebase/firestore";
// // // // // // // // // // import { db, auth } from "../firebase";
// // // // // // // // // // import { signOut } from "firebase/auth";
// // // // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // // // import ExportButton from "../components/ExportButton";

// // // // // // // // // // function Admin() {
// // // // // // // // // //   const [bookings, setBookings] = useState([]);
// // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // //   const [filter, setFilter] = useState("all");
// // // // // // // // // //   const [searchTerm, setSearchTerm] = useState("");
// // // // // // // // // //   const [stats, setStats] = useState({
// // // // // // // // // //     total: 0,
// // // // // // // // // //     today: 0,
// // // // // // // // // //     revenue: 0,
// // // // // // // // // //     topics: {},
// // // // // // // // // //   });

// // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
// // // // // // // // // //     const unsub = onSnapshot(q, (snap) => {
// // // // // // // // // //       const data = snap.docs.map((d) => ({
// // // // // // // // // //         id: d.id,
// // // // // // // // // //         ...d.data(),
// // // // // // // // // //         createdAt: d.data().createdAt?.toDate() || new Date(),
// // // // // // // // // //       }));
// // // // // // // // // //       setBookings(data);
// // // // // // // // // //       calculateStats(data);
// // // // // // // // // //       setLoading(false);
// // // // // // // // // //     });
// // // // // // // // // //     return () => unsub();
// // // // // // // // // //   }, []);

// // // // // // // // // //   function calculateStats(data) {
// // // // // // // // // //     const today = new Date();
// // // // // // // // // //     today.setHours(0, 0, 0, 0);

// // // // // // // // // //     const todayBookings = data.filter(
// // // // // // // // // //       (b) => new Date(b.createdAt).setHours(0, 0, 0, 0) === today.getTime()
// // // // // // // // // //     );

// // // // // // // // // //     const topics = {};
// // // // // // // // // //     data.forEach((b) => {
// // // // // // // // // //       topics[b.topic] = (topics[b.topic] || 0) + 1;
// // // // // // // // // //     });

// // // // // // // // // //     setStats({
// // // // // // // // // //       total: data.length,
// // // // // // // // // //       today: todayBookings.length,
// // // // // // // // // //       revenue: data.length * 99,
// // // // // // // // // //       topics,
// // // // // // // // // //     });
// // // // // // // // // //   }

// // // // // // // // // //   async function handleDelete(id) {
// // // // // // // // // //     if (!window.confirm("Delete booking?")) return;
// // // // // // // // // //     await deleteDoc(doc(db, "bookings", id));
// // // // // // // // // //   }

// // // // // // // // // //   async function handleLogout() {
// // // // // // // // // //     await signOut(auth);
// // // // // // // // // //     navigate("/admin-login");
// // // // // // // // // //   }

// // // // // // // // // //   const filteredBookings = bookings.filter((b) => {
// // // // // // // // // //     const f = filter === "all" || b.topic === filter;
// // // // // // // // // //     const s =
// // // // // // // // // //       b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // // // // // //       b.topic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // // // // // //       b.slot?.toLowerCase().includes(searchTerm.toLowerCase());
// // // // // // // // // //     return f && s;
// // // // // // // // // //   });

// // // // // // // // // //   const uniqueTopics = [...new Set(bookings.map((b) => b.topic))];

// // // // // // // // // //   if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="admin-page">
// // // // // // // // // //       {/* HEADER */}
// // // // // // // // // //       <div className="admin-topbar">
// // // // // // // // // //         <div className="admin-topbar-content">
// // // // // // // // // //           <div>
// // // // // // // // // //             <h1>🎯 Admin Dashboard</h1>
// // // // // // // // // //             <button className="logout-btn" onClick={handleLogout}>
// // // // // // // // // //               🚪 Logout
// // // // // // // // // //             </button>
// // // // // // // // // //           </div>

// // // // // // // // // //           <div className="admin-stats-inline">
// // // // // // // // // //             <span>📊 Total: {stats.total}</span>
// // // // // // // // // //             <span>📅 Today: {stats.today}</span>
// // // // // // // // // //             <span>💰 Revenue: ₹{stats.revenue}</span>
// // // // // // // // // //             <span>🔥 Topics: {Object.keys(stats.topics).length}</span>
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* SEARCH */}
// // // // // // // // // //       <div className="admin-search-wrapper">
// // // // // // // // // //         <input
// // // // // // // // // //           className="admin-search"
// // // // // // // // // //           placeholder="Search by name, topic or slot..."
// // // // // // // // // //           value={searchTerm}
// // // // // // // // // //           onChange={(e) => setSearchTerm(e.target.value)}
// // // // // // // // // //         />
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* FILTER TABS */}
// // // // // // // // // //       <div className="admin-tabs">
// // // // // // // // // //         <button
// // // // // // // // // //           className={filter === "all" ? "tab active" : "tab"}
// // // // // // // // // //           onClick={() => setFilter("all")}
// // // // // // // // // //         >
// // // // // // // // // //           All ({bookings.length})
// // // // // // // // // //         </button>

// // // // // // // // // //         {uniqueTopics.map((t) => (
// // // // // // // // // //           <button
// // // // // // // // // //             key={t}
// // // // // // // // // //             className={filter === t ? "tab active" : "tab"}
// // // // // // // // // //             onClick={() => setFilter(t)}
// // // // // // // // // //           >
// // // // // // // // // //             {t}
// // // // // // // // // //           </button>
// // // // // // // // // //         ))}
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* BOOKINGS HEADER */}
// // // // // // // // // //       <div className="bookings-header-row">
// // // // // // // // // //         <h2>📋 Mentorship Bookings</h2>
// // // // // // // // // //         <ExportButton bookings={filteredBookings} />
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* BOOKINGS LIST */}
// // // // // // // // // //       <div className="bookings-list">
// // // // // // // // // //         {filteredBookings.map((b) => (
// // // // // // // // // //           <div key={b.id} className="booking-card">
// // // // // // // // // //             <p>👤 <strong>{b.name}</strong></p>
// // // // // // // // // //             <p>📚 {b.topic}</p>
// // // // // // // // // //             <p>🕐 {b.slot}</p>
// // // // // // // // // //             <p>💰 ₹{b.price || 99}</p>
// // // // // // // // // //             <p className="muted">🆔 {b.paymentId}</p>
// // // // // // // // // //             <p className="muted">
// // // // // // // // // //               📅 {b.createdAt.toLocaleDateString()}{" "}
// // // // // // // // // //               {b.createdAt.toLocaleTimeString()}
// // // // // // // // // //             </p>

// // // // // // // // // //             <button
// // // // // // // // // //               className="delete-btn"
// // // // // // // // // //               onClick={() => handleDelete(b.id)}
// // // // // // // // // //             >
// // // // // // // // // //               🗑 Delete
// // // // // // // // // //             </button>
// // // // // // // // // //           </div>
// // // // // // // // // //         ))}
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }

// // // // // // // // // // export default Admin;
// // // // // // // // // // import { useEffect, useState } from "react";
// // // // // // // // // // import {
// // // // // // // // // //   collection,
// // // // // // // // // //   onSnapshot,
// // // // // // // // // //   deleteDoc,
// // // // // // // // // //   doc,
// // // // // // // // // // } from "firebase/firestore";
// // // // // // // // // // import { db, auth } from "../firebase";
// // // // // // // // // // import { signOut } from "firebase/auth";
// // // // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // // // import ExportButton from "../components/ExportButton";
// // // // // // // // // // import { Link } from "react-router-dom";

// // // // // // // // // // function Admin() {
// // // // // // // // // //   const [bookings, setBookings] = useState([]);
// // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // //   /* ===== FETCH BOOKINGS ===== */
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     const unsub = onSnapshot(collection(db, "bookings"), (snap) => {
// // // // // // // // // //       const data = snap.docs.map((d) => ({
// // // // // // // // // //         id: d.id,
// // // // // // // // // //         ...d.data(),
// // // // // // // // // //       }));
// // // // // // // // // //       setBookings(data);
// // // // // // // // // //     });

// // // // // // // // // //     return () => unsub();
// // // // // // // // // //   }, []);

// // // // // // // // // //   /* ===== STATS ===== */
// // // // // // // // // //   const total = bookings.length;
// // // // // // // // // //   const revenue = total * 99;

// // // // // // // // // //   const today = new Date().toDateString();
// // // // // // // // // //   const todayCount = bookings.filter((b) => {
// // // // // // // // // //     if (!b.createdAt?.seconds) return false;
// // // // // // // // // //     return (
// // // // // // // // // //       new Date(b.createdAt.seconds * 1000).toDateString() === today
// // // // // // // // // //     );
// // // // // // // // // //   }).length;

// // // // // // // // // //   const topicMap = {};
// // // // // // // // // //   bookings.forEach((b) => {
// // // // // // // // // //     topicMap[b.topic] = (topicMap[b.topic] || 0) + 1;
// // // // // // // // // //   });

// // // // // // // // // //   /* ===== DELETE BOOKING ===== */
// // // // // // // // // //   async function handleDelete(id) {
// // // // // // // // // //     if (!window.confirm("Delete this booking?")) return;
// // // // // // // // // //     await deleteDoc(doc(db, "bookings", id));
// // // // // // // // // //   }

// // // // // // // // // //   /* ===== LOGOUT ===== */
// // // // // // // // // //   async function logout() {
// // // // // // // // // //     await signOut(auth);
// // // // // // // // // //     navigate("/admin-login");
// // // // // // // // // //   }

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="admin-page">
// // // // // // // // // //       {/* HEADER */}
// // // // // // // // // //       <div className="admin-header">
// // // // // // // // // //         <h1>🎯 Admin Dashboard</h1>
// // // // // // // // // //         <button onClick={logout} className="logout-btn">
// // // // // // // // // //           Logout
// // // // // // // // // //         </button>
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* STATS */}
// // // // // // // // // //       <div className="admin-stats-grid">
// // // // // // // // // //         <div className="admin-stat-card">
// // // // // // // // // //           <h2>{total}</h2>
// // // // // // // // // //           <p>Total Bookings</p>
// // // // // // // // // //         </div>

// // // // // // // // // //         <div className="admin-stat-card">
// // // // // // // // // //           <h2>₹{revenue}</h2>
// // // // // // // // // //           <p>Total Revenue</p>
// // // // // // // // // //         </div>

// // // // // // // // // //         <div className="admin-stat-card">
// // // // // // // // // //           <h2>{todayCount}</h2>
// // // // // // // // // //           <p>Today Bookings</p>
// // // // // // // // // //         </div>

// // // // // // // // // //         <div className="admin-stat-card">
// // // // // // // // // //           <h2>{Object.keys(topicMap).length}</h2>
// // // // // // // // // //           <p>Topics</p>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* BOOKINGS BY TOPIC */}
// // // // // // // // // //       <div className="admin-chart">
// // // // // // // // // //         <h2>📊 Bookings by Topic</h2>
// // // // // // // // // //         {Object.keys(topicMap).map((topic) => (
// // // // // // // // // //           <div key={topic} className="chart-row">
// // // // // // // // // //             <span>{topic}</span>
// // // // // // // // // //             <div
// // // // // // // // // //               className="chart-bar"
// // // // // // // // // //               style={{ width: `${topicMap[topic] * 30}px` }}
// // // // // // // // // //             >
// // // // // // // // // //               {topicMap[topic]}
// // // // // // // // // //             </div>
// // // // // // // // // //           </div>
// // // // // // // // // //         ))}<Link to="/admin/mock-interviews">
// // // // // // // // // //   View Mock Interview Bookings
// // // // // // // // // // </Link>
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* BOOKINGS TABLE */}
// // // // // // // // // //       <div className="admin-table">
// // // // // // // // // //         <div className="table-header">
// // // // // // // // // //           <h2>👤 Student Booking Details</h2>
// // // // // // // // // //           <ExportButton bookings={bookings} />
// // // // // // // // // //         </div>

// // // // // // // // // //         {bookings.length === 0 ? (
// // // // // // // // // //           <p>No bookings yet</p>
// // // // // // // // // //         ) : (
// // // // // // // // // //           <table>
// // // // // // // // // //             <thead>
// // // // // // // // // //               <tr>
// // // // // // // // // //                 <th>#</th>
// // // // // // // // // //                 <th>Name</th>
// // // // // // // // // //                 <th>Email</th>
// // // // // // // // // //                 <th>Topic</th>
// // // // // // // // // //                 <th>Slot</th>
// // // // // // // // // //                 <th>Amount</th>
// // // // // // // // // //                 <th>Action</th>
// // // // // // // // // //               </tr>
// // // // // // // // // //             </thead>

// // // // // // // // // //             <tbody>
// // // // // // // // // //               {bookings.map((b, i) => (
// // // // // // // // // //                 <tr key={b.id}>
// // // // // // // // // //                   <td>{i + 1}</td>
// // // // // // // // // //                   <td>{b.name || "N/A"}</td>
// // // // // // // // // //                   <td>{b.email}</td>
// // // // // // // // // //                   <td>{b.topic}</td>
// // // // // // // // // //                   <td>{b.slot}</td>
// // // // // // // // // //                   <td>₹{b.price || 99}</td>
// // // // // // // // // //                   <td>
// // // // // // // // // //                     <button
// // // // // // // // // //                       className="delete-btn"
// // // // // // // // // //                       onClick={() => handleDelete(b.id)}
// // // // // // // // // //                     >
// // // // // // // // // //                       🗑 Delete
// // // // // // // // // //                     </button>
// // // // // // // // // //                   </td>
// // // // // // // // // //                 </tr>
// // // // // // // // // //               ))}
// // // // // // // // // //             </tbody>
// // // // // // // // // //           </table>
// // // // // // // // // //         )}
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }

// // // // // // // // // // export default Admin;
// // // // // // // // // import { useEffect, useState } from "react";
// // // // // // // // // import {
// // // // // // // // //   collection,
// // // // // // // // //   onSnapshot,
// // // // // // // // //   deleteDoc,
// // // // // // // // //   doc,
// // // // // // // // // } from "firebase/firestore";
// // // // // // // // // import { db, auth } from "../firebase";
// // // // // // // // // import { signOut } from "firebase/auth";
// // // // // // // // // import { useNavigate, Link } from "react-router-dom";
// // // // // // // // // import ExportButton from "../components/ExportButton";

// // // // // // // // // const ADMIN_EMAIL = "admin@gmail.com"; // 🔐 change if needed

// // // // // // // // // function Admin() {
// // // // // // // // //   const [bookings, setBookings] = useState([]);
// // // // // // // // //   const navigate = useNavigate();

// // // // // // // // //   /* ===== AUTH + FETCH BOOKINGS ===== */
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const user = auth.currentUser;

// // // // // // // // //     // 🔒 Admin Guard
// // // // // // // // //     if (!user || user.email !== ADMIN_EMAIL) {
// // // // // // // // //       navigate("/admin-login");
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     const unsub = onSnapshot(collection(db, "bookings"), (snap) => {
// // // // // // // // //       const data = snap.docs
// // // // // // // // //         .map((d) => ({
// // // // // // // // //           id: d.id,
// // // // // // // // //           ...d.data(),
// // // // // // // // //         }))
// // // // // // // // //         .sort(
// // // // // // // // //           (a, b) =>
// // // // // // // // //             (b.createdAt?.seconds || 0) -
// // // // // // // // //             (a.createdAt?.seconds || 0)
// // // // // // // // //         );

// // // // // // // // //       setBookings(data);
// // // // // // // // //     });

// // // // // // // // //     return () => unsub();
// // // // // // // // //   }, [navigate]);

// // // // // // // // //   /* ===== STATS ===== */
// // // // // // // // //   const total = bookings.length;

// // // // // // // // //   const revenue = bookings.reduce(
// // // // // // // // //     (sum, b) => sum + (b.price || 99),
// // // // // // // // //     0
// // // // // // // // //   );

// // // // // // // // //   const today = new Date().toDateString();
// // // // // // // // //   const todayCount = bookings.filter((b) => {
// // // // // // // // //     if (!b.createdAt?.seconds) return false;
// // // // // // // // //     return (
// // // // // // // // //       new Date(b.createdAt.seconds * 1000).toDateString() === today
// // // // // // // // //     );
// // // // // // // // //   }).length;

// // // // // // // // //   const topicMap = {};
// // // // // // // // //   bookings.forEach((b) => {
// // // // // // // // //     if (!b.topic) return;
// // // // // // // // //     topicMap[b.topic] = (topicMap[b.topic] || 0) + 1;
// // // // // // // // //   });

// // // // // // // // //   /* ===== DELETE BOOKING ===== */
// // // // // // // // //   async function handleDelete(id) {
// // // // // // // // //     if (!window.confirm("Delete this booking?")) return;
// // // // // // // // //     await deleteDoc(doc(db, "bookings", id));
// // // // // // // // //   }

// // // // // // // // //   /* ===== LOGOUT ===== */
// // // // // // // // //   async function logout() {
// // // // // // // // //     await signOut(auth);
// // // // // // // // //     navigate("/admin-login");
// // // // // // // // //   }

// // // // // // // // //   return (
// // // // // // // // //     <div className="admin-page">
// // // // // // // // //       {/* HEADER */}
// // // // // // // // //       <div className="admin-header">
// // // // // // // // //         <h1>🎯 Admin Dashboard</h1>
// // // // // // // // //         <button onClick={logout} className="logout-btn">
// // // // // // // // //           Logout
// // // // // // // // //         </button>
// // // // // // // // //       </div>

// // // // // // // // //       {/* STATS */}
// // // // // // // // //       <div className="admin-stats-grid">
// // // // // // // // //         <div className="admin-stat-card">
// // // // // // // // //           <h2>{total}</h2>
// // // // // // // // //           <p>Total Bookings</p>
// // // // // // // // //         </div>

// // // // // // // // //         <div className="admin-stat-card">
// // // // // // // // //           <h2>₹{revenue}</h2>
// // // // // // // // //           <p>Total Revenue</p>
// // // // // // // // //         </div>

// // // // // // // // //         <div className="admin-stat-card">
// // // // // // // // //           <h2>{todayCount}</h2>
// // // // // // // // //           <p>Today Bookings</p>
// // // // // // // // //         </div>

// // // // // // // // //         <div className="admin-stat-card">
// // // // // // // // //           <h2>{Object.keys(topicMap).length}</h2>
// // // // // // // // //           <p>Topics</p>
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* BOOKINGS BY TOPIC */}
// // // // // // // // //       <div className="admin-chart">
// // // // // // // // //         <h2>📊 Bookings by Topic</h2>

// // // // // // // // //         {Object.keys(topicMap).length === 0 ? (
// // // // // // // // //           <p>No data available</p>
// // // // // // // // //         ) : (
// // // // // // // // //           Object.keys(topicMap).map((topic) => (
// // // // // // // // //             <div key={topic} className="chart-row">
// // // // // // // // //               <span>{topic}</span>
// // // // // // // // //               <div
// // // // // // // // //                 className="chart-bar"
// // // // // // // // //                 style={{ width: `${topicMap[topic] * 30}px` }}
// // // // // // // // //               >
// // // // // // // // //                 {topicMap[topic]}
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //           ))
// // // // // // // // //         )}

// // // // // // // // //         <Link className="admin-link" to="/admin/mock-interviews">
// // // // // // // // //           👉 View Mock Interview Bookings
// // // // // // // // //         </Link>
// // // // // // // // //       </div>

// // // // // // // // //       {/* BOOKINGS TABLE */}
// // // // // // // // //       <div className="admin-table">
// // // // // // // // //         <div className="table-header">
// // // // // // // // //           <h2>👤 Student Booking Details</h2>
// // // // // // // // //           <ExportButton bookings={bookings} />
// // // // // // // // //         </div>

// // // // // // // // //         {bookings.length === 0 ? (
// // // // // // // // //           <p>No bookings yet</p>
// // // // // // // // //         ) : (
// // // // // // // // //           <table>
// // // // // // // // //             <thead>
// // // // // // // // //               <tr>
// // // // // // // // //                 <th>#</th>
// // // // // // // // //                 <th>Name</th>
// // // // // // // // //                 <th>Email</th>
// // // // // // // // //                 <th>Topic</th>
// // // // // // // // //                 <th>Slot</th>
// // // // // // // // //                 <th>Amount</th>
// // // // // // // // //                 <th>Action</th>
// // // // // // // // //               </tr>
// // // // // // // // //             </thead>

// // // // // // // // //             <tbody>
// // // // // // // // //               {bookings.map((b, i) => (
// // // // // // // // //                 <tr key={b.id}>
// // // // // // // // //                   <td>{i + 1}</td>
// // // // // // // // //                   <td>{b.name || "N/A"}</td>
// // // // // // // // //                   <td>{b.email || "N/A"}</td>
// // // // // // // // //                   <td>{b.topic || "N/A"}</td>
// // // // // // // // //                   <td>{b.slot || "N/A"}</td>
// // // // // // // // //                   <td>₹{b.price || 99}</td>
// // // // // // // // //                   <td>
// // // // // // // // //                     <button
// // // // // // // // //                       className="delete-btn"
// // // // // // // // //                       onClick={() => handleDelete(b.id)}
// // // // // // // // //                     >
// // // // // // // // //                       🗑 Delete
// // // // // // // // //                     </button>
// // // // // // // // //                   </td>
// // // // // // // // //                 </tr>
// // // // // // // // //               ))}
// // // // // // // // //             </tbody>
// // // // // // // // //           </table>
// // // // // // // // //         )}
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // export default Admin;
// // // // // // // // import { useEffect, useState } from "react";
// // // // // // // // import {
// // // // // // // //   collection,
// // // // // // // //   onSnapshot,
// // // // // // // //   deleteDoc,
// // // // // // // //   doc,
// // // // // // // // } from "firebase/firestore";
// // // // // // // // import { db, auth } from "../firebase";
// // // // // // // // import { signOut } from "firebase/auth";
// // // // // // // // import { useNavigate, Link } from "react-router-dom";
// // // // // // // // import ExportButton from "../components/ExportButton";

// // // // // // // // function Admin() {
// // // // // // // //   const [bookings, setBookings] = useState([]);
// // // // // // // //   const navigate = useNavigate();

// // // // // // // //   /* ===== FETCH BOOKINGS ===== */
// // // // // // // //   useEffect(() => {
// // // // // // // //     const unsub = onSnapshot(collection(db, "bookings"), (snap) => {
// // // // // // // //       const data = snap.docs
// // // // // // // //         .map((d) => ({
// // // // // // // //           id: d.id,
// // // // // // // //           ...d.data(),
// // // // // // // //         }))
// // // // // // // //         .sort(
// // // // // // // //           (a, b) =>
// // // // // // // //             (b.createdAt?.seconds || 0) -
// // // // // // // //             (a.createdAt?.seconds || 0)
// // // // // // // //         );

// // // // // // // //       setBookings(data);
// // // // // // // //     });

// // // // // // // //     return () => unsub();
// // // // // // // //   }, []);

// // // // // // // //   /* ===== STATS ===== */
// // // // // // // //   const total = bookings.length;

// // // // // // // //   const revenue = bookings.reduce(
// // // // // // // //     (sum, b) => sum + (b.price || 99),
// // // // // // // //     0
// // // // // // // //   );

// // // // // // // //   const today = new Date().toDateString();
// // // // // // // //   const todayCount = bookings.filter((b) => {
// // // // // // // //     if (!b.createdAt?.seconds) return false;
// // // // // // // //     return (
// // // // // // // //       new Date(b.createdAt.seconds * 1000).toDateString() === today
// // // // // // // //     );
// // // // // // // //   }).length;

// // // // // // // //   const topicMap = {};
// // // // // // // //   bookings.forEach((b) => {
// // // // // // // //     if (!b.topic) return;
// // // // // // // //     topicMap[b.topic] = (topicMap[b.topic] || 0) + 1;
// // // // // // // //   });

// // // // // // // //   /* ===== DELETE BOOKING ===== */
// // // // // // // //   async function handleDelete(id) {
// // // // // // // //     if (!window.confirm("Delete this booking?")) return;
// // // // // // // //     await deleteDoc(doc(db, "bookings", id));
// // // // // // // //   }

// // // // // // // //   /* ===== LOGOUT ===== */
// // // // // // // //   async function logout() {
// // // // // // // //     await signOut(auth);
// // // // // // // //     navigate("/admin-login");
// // // // // // // //   }

// // // // // // // //   return (
// // // // // // // //     <div className="admin-page">
// // // // // // // //       {/* HEADER */}
// // // // // // // //       <div className="admin-header">
// // // // // // // //         <h1>🎯 Admin Dashboard</h1>
// // // // // // // //         <button onClick={logout} className="logout-btn">
// // // // // // // //           Logout
// // // // // // // //         </button>
// // // // // // // //       </div>

// // // // // // // //       {/* STATS */}
// // // // // // // //       <div className="admin-stats-grid">
// // // // // // // //         <div className="admin-stat-card">
// // // // // // // //           <h2>{total}</h2>
// // // // // // // //           <p>Total Bookings</p>
// // // // // // // //         </div>

// // // // // // // //         <div className="admin-stat-card">
// // // // // // // //           <h2>₹{revenue}</h2>
// // // // // // // //           <p>Total Revenue</p>
// // // // // // // //         </div>

// // // // // // // //         <div className="admin-stat-card">
// // // // // // // //           <h2>{todayCount}</h2>
// // // // // // // //           <p>Today Bookings</p>
// // // // // // // //         </div>

// // // // // // // //         <div className="admin-stat-card">
// // // // // // // //           <h2>{Object.keys(topicMap).length}</h2>
// // // // // // // //           <p>Topics</p>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* BOOKINGS BY TOPIC */}
// // // // // // // //       <div className="admin-chart">
// // // // // // // //         <h2>📊 Bookings by Topic</h2>

// // // // // // // //         {Object.keys(topicMap).length === 0 ? (
// // // // // // // //           <p>No data available</p>
// // // // // // // //         ) : (
// // // // // // // //           Object.keys(topicMap).map((topic) => (
// // // // // // // //             <div key={topic} className="chart-row">
// // // // // // // //               <span>{topic}</span>
// // // // // // // //               <div
// // // // // // // //                 className="chart-bar"
// // // // // // // //                 style={{ width: `${topicMap[topic] * 30}px` }}
// // // // // // // //               >
// // // // // // // //                 {topicMap[topic]}
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           ))
// // // // // // // //         )}

// // // // // // // //         <Link className="admin-link" to="/admin/mock-interviews">
// // // // // // // //           👉 View Mock Interview Bookings
// // // // // // // //         </Link>
// // // // // // // //       </div>

// // // // // // // //       {/* BOOKINGS TABLE */}
// // // // // // // //       <div className="admin-table">
// // // // // // // //         <div className="table-header">
// // // // // // // //           <h2>👤 Student Booking Details</h2>
// // // // // // // //           <ExportButton bookings={bookings} />
// // // // // // // //         </div>

// // // // // // // //         {bookings.length === 0 ? (
// // // // // // // //           <p>No bookings yet</p>
// // // // // // // //         ) : (
// // // // // // // //           <table>
// // // // // // // //             <thead>
// // // // // // // //               <tr>
// // // // // // // //                 <th>#</th>
// // // // // // // //                 <th>Name</th>
// // // // // // // //                 <th>Email</th>
// // // // // // // //                 <th>Topic</th>
// // // // // // // //                 <th>Slot</th>
// // // // // // // //                 <th>Amount</th>
// // // // // // // //                 <th>Action</th>
// // // // // // // //               </tr>
// // // // // // // //             </thead>

// // // // // // // //             <tbody>
// // // // // // // //               {bookings.map((b, i) => (
// // // // // // // //                 <tr key={b.id}>
// // // // // // // //                   <td>{i + 1}</td>
// // // // // // // //                   <td>{b.name || "N/A"}</td>
// // // // // // // //                   <td>{b.email || "N/A"}</td>
// // // // // // // //                   <td>{b.topic || "N/A"}</td>
// // // // // // // //                   <td>{b.slot || "N/A"}</td>
// // // // // // // //                   <td>₹{b.price || 99}</td>
// // // // // // // //                   <td>
// // // // // // // //                     <button
// // // // // // // //                       className="delete-btn"
// // // // // // // //                       onClick={() => handleDelete(b.id)}
// // // // // // // //                     >
// // // // // // // //                       🗑 Delete
// // // // // // // //                     </button>
// // // // // // // //                   </td>
// // // // // // // //                 </tr>
// // // // // // // //               ))}
// // // // // // // //             </tbody>
// // // // // // // //           </table>
// // // // // // // //         )}
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // export default Admin;
// // // // // // // import { useEffect, useState } from "react";
// // // // // // // import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
// // // // // // // import { db, auth } from "../firebase";
// // // // // // // import { signOut } from "firebase/auth";
// // // // // // // import { useNavigate, Link } from "react-router-dom";
// // // // // // // import ExportButton from "../components/ExportButton";

// // // // // // // function Admin() {
// // // // // // //   const [bookings, setBookings] = useState([]);
// // // // // // //   const navigate = useNavigate();

// // // // // // //   useEffect(() => {
// // // // // // //     const unsub = onSnapshot(collection(db, "bookings"), (snap) => {
// // // // // // //       const data = snap.docs.map((d) => ({
// // // // // // //         id: d.id,
// // // // // // //         ...d.data(),
// // // // // // //       }));
// // // // // // //       setBookings(data);
// // // // // // //     });

// // // // // // //     return () => unsub();
// // // // // // //   }, []);

// // // // // // //   async function logout() {
// // // // // // //     await signOut(auth);
// // // // // // //     navigate("/admin-login");
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <div className="admin-page">
// // // // // // //       <h1>🎯 Admin Dashboard</h1>

// // // // // // //       <button onClick={logout}>Logout</button>

// // // // // // //       <Link to="/admin/mock-interviews">
// // // // // // //         👉 View Mock Interview Bookings
// // // // // // //       </Link>

// // // // // // //       <ExportButton bookings={bookings} />
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // export default Admin;
// // // // // // import { signOut } from "firebase/auth";
// // // // // // import { auth } from "../firebase";
// // // // // // import { useNavigate } from "react-router-dom";

// // // // // // function Admin() {
// // // // // //   const navigate = useNavigate();

// // // // // //   async function logout() {
// // // // // //     await signOut(auth);
// // // // // //     navigate("/admin-login");
// // // // // //   }

// // // // // //   return (
// // // // // //     <div style={{ padding: "20px" }}>
// // // // // //       <h1>🎯 Admin Dashboard</h1>

// // // // // //       <button onClick={logout}>Logout</button>

// // // // // //       <p>Welcome Admin 👑</p>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default Admin;
// // // // // import { useEffect, useState } from "react";
// // // // // import { collection, onSnapshot } from "firebase/firestore";
// // // // // import { db, auth } from "../firebase";
// // // // // import { signOut } from "firebase/auth";
// // // // // import { useNavigate, Link } from "react-router-dom";

// // // // // function Admin() {
// // // // //   const [bookings, setBookings] = useState([]);
// // // // //   const navigate = useNavigate();

// // // // //   // 🔹 Fetch mentorship bookings
// // // // //   useEffect(() => {
// // // // //     const unsub = onSnapshot(collection(db, "bookings"), (snap) => {
// // // // //       const data = snap.docs.map((doc) => ({
// // // // //         id: doc.id,
// // // // //         ...doc.data(),
// // // // //       }));
// // // // //       setBookings(data);
// // // // //     });

// // // // //     return () => unsub();
// // // // //   }, []);

// // // // //   // 🔹 Stats
// // // // //   const totalBookings = bookings.length;
// // // // //   const totalRevenue = bookings.reduce(
// // // // //     (sum, b) => sum + (b.price || 99),
// // // // //     0
// // // // //   );

// // // // //   const today = new Date().toDateString();
// // // // //   const todayBookings = bookings.filter((b) => {
// // // // //     if (!b.createdAt?.seconds) return false;
// // // // //     return (
// // // // //       new Date(b.createdAt.seconds * 1000).toDateString() === today
// // // // //     );
// // // // //   }).length;

// // // // //   // 🔹 Logout
// // // // //   async function logout() {
// // // // //     await signOut(auth);
// // // // //     navigate("/admin-login");
// // // // //   }

// // // // //   return (
// // // // //     <div style={{ padding: "20px" }}>
// // // // //       <h1>🎯 Admin Dashboard</h1>
// // // // //       <button onClick={logout}>Logout</button>

// // // // //       {/* STATS */}
// // // // //       <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
// // // // //         <div>📊 Total Bookings: <b>{totalBookings}</b></div>
// // // // //         <div>💰 Revenue: <b>₹{totalRevenue}</b></div>
// // // // //         <div>📅 Today: <b>{todayBookings}</b></div>
// // // // //       </div>

// // // // //       <hr style={{ margin: "20px 0" }} />

// // // // //       {/* BOOKINGS TABLE */}
// // // // //       <h2>📋 Mentorship Bookings</h2>

// // // // //       {bookings.length === 0 ? (
// // // // //         <p>No bookings yet</p>
// // // // //       ) : (
// // // // //         <table border="1" cellPadding="10">
// // // // //           <thead>
// // // // //             <tr>
// // // // //               <th>#</th>
// // // // //               <th>Name</th>
// // // // //               <th>Email</th>
// // // // //               <th>Topic</th>
// // // // //               <th>Slot</th>
// // // // //               <th>Amount</th>
// // // // //             </tr>
// // // // //           </thead>
// // // // //           <tbody>
// // // // //             {bookings.map((b, i) => (
// // // // //               <tr key={b.id}>
// // // // //                 <td>{i + 1}</td>
// // // // //                 <td>{b.name}</td>
// // // // //                 <td>{b.email}</td>
// // // // //                 <td>{b.topic}</td>
// // // // //                 <td>{b.slot}</td>
// // // // //                 <td>₹{b.price || 99}</td>
// // // // //               </tr>
// // // // //             ))}
// // // // //           </tbody>
// // // // //         </table>
// // // // //       )}

// // // // //       <br />

// // // // //       <Link to="/admin/mock-interviews">
// // // // //         👉 View Mock Interview Bookings
// // // // //       </Link>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default Admin;
// // // // import { useEffect, useState } from "react";
// // // // import { collection, onSnapshot } from "firebase/firestore";
// // // // import { db, auth } from "../firebase";
// // // // import { signOut } from "firebase/auth";
// // // // import { useNavigate, Link } from "react-router-dom";
// // // // import "./Admin.css";

// // // // function Admin() {
// // // //   const [bookings, setBookings] = useState([]);
// // // //   const navigate = useNavigate();

// // // //   // 🔹 Fetch bookings
// // // //   useEffect(() => {
// // // //     const unsub = onSnapshot(collection(db, "bookings"), (snap) => {
// // // //       const data = snap.docs.map((doc) => ({
// // // //         id: doc.id,
// // // //         ...doc.data(),
// // // //       }));
// // // //       setBookings(data);
// // // //     });

// // // //     return () => unsub();
// // // //   }, []);

// // // //   // 🔹 Stats
// // // //   const totalBookings = bookings.length;
// // // //   const revenue = bookings.reduce((sum, b) => sum + (b.price || 99), 0);

// // // //   const today = new Date().toDateString();
// // // //   const todayCount = bookings.filter((b) => {
// // // //     if (!b.createdAt?.seconds) return false;
// // // //     return (
// // // //       new Date(b.createdAt.seconds * 1000).toDateString() === today
// // // //     );
// // // //   }).length;

// // // //   // 🔹 Logout
// // // //   async function logout() {
// // // //     await signOut(auth);
// // // //     navigate("/admin-login");
// // // //   }

// // // //   return (
// // // //     <div className="admin-page">
// // // //       {/* HEADER */}
// // // //       <div className="admin-header">
// // // //         <h1>🎯 Admin Dashboard</h1>
// // // //         <button onClick={logout}>Logout</button>
// // // //       </div>

// // // //       {/* STATS */}
// // // //       <div className="admin-stats">
// // // //         <div className="stat-card">📊 Total: <b>{totalBookings}</b></div>
// // // //         <div className="stat-card">💰 Revenue: <b>₹{revenue}</b></div>
// // // //         <div className="stat-card">📅 Today: <b>{todayCount}</b></div>
// // // //       </div>

// // // //       {/* TABLE */}
// // // //       <div className="admin-table-wrapper">
// // // //         <h2>📋 Mentorship Bookings</h2>

// // // //         {bookings.length === 0 ? (
// // // //           <p>No bookings yet</p>
// // // //         ) : (
// // // //           <table className="admin-table">
// // // //             <thead>
// // // //               <tr>
// // // //                 <th>#</th>
// // // //                 <th>Name</th>
// // // //                 <th>Email</th>
// // // //                 <th>Topic</th>
// // // //                 <th>Slot</th>
// // // //                 <th>Amount</th>
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {bookings.map((b, i) => (
// // // //                 <tr key={b.id}>
// // // //                   <td>{i + 1}</td>
// // // //                   <td>{b.name}</td>
// // // //                   <td>{b.email}</td>
// // // //                   <td>{b.topic}</td>
// // // //                   <td>{b.slot}</td>
// // // //                   <td>₹{b.price || 99}</td>
// // // //                 </tr>
// // // //               ))}
// // // //             </tbody>
// // // //           </table>
// // // //         )}
// // // //       </div>

// // // //       {/* MOCK INTERVIEW LINK */}
// // // //       <div className="admin-footer">
// // // //         <Link to="/admin/mock-interviews">
// // // //           👉 View Mock Interview Bookings
// // // //         </Link>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Admin;
// // // import { useEffect, useState } from "react";
// // // import { collection, onSnapshot } from "firebase/firestore";
// // // import { db, auth } from "../firebase";
// // // import { signOut } from "firebase/auth";
// // // import { useNavigate } from "react-router-dom";

// // // function Admin() {
// // //   const navigate = useNavigate();

// // //   const [bookings, setBookings] = useState([]);
// // //   const [mockBookings, setMockBookings] = useState([]);

// // //   // 🔹 Fetch Mentorship + Mock Interview data
// // //   useEffect(() => {
// // //     const unsub1 = onSnapshot(collection(db, "bookings"), (snap) => {
// // //       setBookings(
// // //         snap.docs.map((doc) => ({
// // //           id: doc.id,
// // //           ...doc.data(),
// // //         }))
// // //       );
// // //     });

// // //     const unsub2 = onSnapshot(collection(db, "mockInterviews"), (snap) => {
// // //       setMockBookings(
// // //         snap.docs.map((doc) => ({
// // //           id: doc.id,
// // //           ...doc.data(),
// // //         }))
// // //       );
// // //     });

// // //     return () => {
// // //       unsub1();
// // //       unsub2();
// // //     };
// // //   }, []);

// // //   // 🔹 Stats
// // //   const totalBookings = bookings.length + mockBookings.length;

// // //   const revenue =
// // //     bookings.reduce((s, b) => s + (b.price || 99), 0) +
// // //     mockBookings.reduce((s, b) => s + (b.price || 199), 0);

// // //   const today = new Date().toDateString();
// // //   const todayCount = [...bookings, ...mockBookings].filter((b) => {
// // //     if (!b.createdAt?.seconds) return false;
// // //     return (
// // //       new Date(b.createdAt.seconds * 1000).toDateString() === today
// // //     );
// // //   }).length;

// // //   // 🔹 Logout
// // //   async function logout() {
// // //     await signOut(auth);
// // //     navigate("/admin-login");
// // //   }

// // //   return (
// // //     <div style={{ padding: "20px" }}>
// // //       <h1>🎯 Admin Dashboard</h1>

// // //       <button
// // //         onClick={logout}
// // //         style={{
// // //           padding: "10px 20px",
// // //           background: "linear-gradient(90deg,#667eea,#764ba2)",
// // //           color: "#fff",
// // //           border: "none",
// // //           borderRadius: "8px",
// // //           cursor: "pointer",
// // //           marginBottom: "20px",
// // //         }}
// // //       >
// // //         Logout
// // //       </button>

// // //       {/* 🔹 STATS */}
// // //       <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
// // //         <div>📊 Total Bookings: <b>{totalBookings}</b></div>
// // //         <div>💰 Revenue: <b>₹{revenue}</b></div>
// // //         <div>📅 Today: <b>{todayCount}</b></div>
// // //       </div>

// // //       {/* ================= MENTORSHIP BOOKINGS ================= */}
// // //       <div
// // //         style={{
// // //           background: "#fff",
// // //           padding: "20px",
// // //           borderRadius: "12px",
// // //           boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
// // //           marginBottom: "30px",
// // //         }}
// // //       >
// // //         <h2>📋 Mentorship Booking History</h2>

// // //         {bookings.length === 0 ? (
// // //           <p>No mentorship bookings</p>
// // //         ) : (
// // //           <table border="1" cellPadding="10" width="100%">
// // //             <thead>
// // //               <tr>
// // //                 <th>#</th>
// // //                 <th>Name</th>
// // //                 <th>Email</th>
// // //                 <th>Topic</th>
// // //                 <th>Slot</th>
// // //                 <th>Amount</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {bookings.map((b, i) => (
// // //                 <tr key={b.id}>
// // //                   <td>{i + 1}</td>
// // //                   <td>{b.name}</td>
// // //                   <td>{b.email}</td>
// // //                   <td>{b.topic}</td>
// // //                   <td>{b.slot}</td>
// // //                   <td>₹{b.price || 99}</td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         )}
// // //       </div>

// // //       {/* ================= MOCK INTERVIEW BOOKINGS ================= */}
// // //       <div
// // //         style={{
// // //           background: "#fff",
// // //           padding: "20px",
// // //           borderRadius: "12px",
// // //           boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
// // //           borderLeft: "6px solid #764ba2",
// // //         }}
// // //       >
// // //         <h2>🎯 Mock Interview Booking History</h2>

// // //         {mockBookings.length === 0 ? (
// // //           <p>No mock interview bookings</p>
// // //         ) : (
// // //           <table border="1" cellPadding="10" width="100%">
// // //             <thead>
// // //               <tr>
// // //                 <th>#</th>
// // //                 <th>Name</th>
// // //                 <th>Email</th>
// // //                 <th>Interview Type</th>
// // //                 <th>Date</th>
// // //                 <th>Time</th>
// // //                 <th>Amount</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {mockBookings.map((b, i) => (
// // //                 <tr key={b.id}>
// // //                   <td>{i + 1}</td>
// // //                   <td>{b.name}</td>
// // //                   <td>{b.email}</td>
// // //                   <td>{b.interviewType}</td>
// // //                   <td>{b.preferredDate}</td>
// // //                   <td>{b.preferredTime}</td>
// // //                   <td>₹{b.price || 199}</td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default Admin;
// // import { useEffect, useState } from "react";
// // import { collection, onSnapshot } from "firebase/firestore";
// // import { db, auth } from "../firebase";
// // import { signOut } from "firebase/auth";
// // import { useNavigate } from "react-router-dom";

// // function Admin() {
// //   const navigate = useNavigate();

// //   const [bookings, setBookings] = useState([]);
// //   const [mockBookings, setMockBookings] = useState([]);

// //   // 🔹 Fetch Mentorship + Mock Interview data
// //   useEffect(() => {
// //     const unsub1 = onSnapshot(collection(db, "bookings"), (snap) => {
// //       setBookings(
// //         snap.docs.map((doc) => ({
// //           id: doc.id,
// //           ...doc.data(),
// //         }))
// //       );
// //     });

// //     const unsub2 = onSnapshot(collection(db, "mockInterviews"), (snap) => {
// //       setMockBookings(
// //         snap.docs.map((doc) => ({
// //           id: doc.id,
// //           ...doc.data(),
// //         }))
// //       );
// //     });

// //     return () => {
// //       unsub1();
// //       unsub2();
// //     };
// //   }, []);

// //   // 🔹 Stats
// //   const totalBookings = bookings.length + mockBookings.length;

// //   const revenue =
// //     bookings.reduce((s, b) => s + (b.price || 99), 0) +
// //     mockBookings.reduce((s, b) => s + (b.price || 199), 0);

// //   const today = new Date().toDateString();
// //   const todayCount = [...bookings, ...mockBookings].filter((b) => {
// //     if (!b.createdAt?.seconds) return false;
// //     return (
// //       new Date(b.createdAt.seconds * 1000).toDateString() === today
// //     );
// //   }).length;

// //   // 🔹 Logout
// //   async function logout() {
// //     await signOut(auth);
// //     navigate("/admin-login");
// //   }

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       <h1>🎯 Admin Dashboard</h1>

// //       <button
// //         onClick={logout}
// //         style={{
// //           padding: "10px 20px",
// //           background: "linear-gradient(90deg,#667eea,#764ba2)",
// //           color: "#fff",
// //           border: "none",
// //           borderRadius: "8px",
// //           cursor: "pointer",
// //           marginBottom: "20px",
// //         }}
// //       >
// //         Logout
// //       </button>

// //       {/* 🔹 STATS */}
// //       <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
// //         <div>📊 Total Bookings: <b>{totalBookings}</b></div>
// //         <div>💰 Revenue: <b>₹{revenue}</b></div>
// //         <div>📅 Today: <b>{todayCount}</b></div>
// //       </div>

// //       {/* ================= MENTORSHIP BOOKINGS ================= */}
// //       <div
// //         style={{
// //           background: "#fff",
// //           padding: "20px",
// //           borderRadius: "12px",
// //           boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
// //           marginBottom: "30px",
// //         }}
// //       >
// //         <h2>📋 Mentorship Booking History</h2>

// //         {bookings.length === 0 ? (
// //           <p>No mentorship bookings</p>
// //         ) : (
// //           <table border="1" cellPadding="10" width="100%">
// //             <thead>
// //               <tr>
// //                 <th>#</th>
// //                 <th>Name</th>
// //                 <th>Email</th>
// //                 <th>Topic</th>
// //                 <th>Slot</th>
// //                 <th>Amount</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {bookings.map((b, i) => (
// //                 <tr key={b.id}>
// //                   <td>{i + 1}</td>
// //                   <td>{b.name}</td>
// //                   <td>{b.email}</td>
// //                   <td>{b.topic}</td>
// //                   <td>{b.slot}</td>
// //                   <td>₹{b.price || 99}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         )}
// //       </div>

// //       {/* ================= MOCK INTERVIEW BOOKINGS ================= */}
// //       <div
// //         style={{
// //           background: "#fff",
// //           padding: "20px",
// //           borderRadius: "12px",
// //           boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
// //           borderLeft: "6px solid #764ba2",
// //         }}
// //       >
// //         <h2>🎯 Mock Interview Booking History</h2>

// //         {mockBookings.length === 0 ? (
// //           <p>No mock interview bookings</p>
// //         ) : (
// //           <table border="1" cellPadding="10" width="100%">
// //             <thead>
// //               <tr>
// //                 <th>#</th>
// //                 <th>Name</th>
// //                 <th>Email</th>
// //                 <th>Interview Type</th>
// //                 <th>Date</th>
// //                 <th>Time</th>
// //                 <th>Amount</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {mockBookings.map((b, i) => (
// //                 <tr key={b.id}>
// //                   <td>{i + 1}</td>
// //                   <td>{b.name}</td>
// //                   <td>{b.email}</td>
// //                   <td>{b.interviewType}</td>
// //                   <td>{b.preferredDate}</td>
// //                   <td>{b.preferredTime}</td>
// //                   <td>₹{b.price || 199}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Admin;
// import { useEffect, useState } from "react";
// import { collection, onSnapshot } from "firebase/firestore";
// import { db, auth } from "../firebase";
// import { signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import ExportButton from "../components/ExportButton";
// import "./Admin.css";

// function Admin() {
//   const navigate = useNavigate();

//   const [bookings, setBookings] = useState([]);
//   const [mockBookings, setMockBookings] = useState([]);

//   // 🔹 Fetch data
//   useEffect(() => {
//     const unsub1 = onSnapshot(collection(db, "bookings"), (snap) => {
//       setBookings(
//         snap.docs.map((d) => ({ id: d.id, ...d.data() }))
//       );
//     });

//     const unsub2 = onSnapshot(collection(db, "mockInterviews"), (snap) => {
//       setMockBookings(
//         snap.docs.map((d) => ({ id: d.id, ...d.data() }))
//       );
//     });

//     return () => {
//       unsub1();
//       unsub2();
//     };
//   }, []);

//   // 🔹 Stats
//   const totalBookings = bookings.length + mockBookings.length;

//   const revenue =
//     bookings.reduce((s, b) => s + (b.price || 99), 0) +
//     mockBookings.reduce((s, b) => s + (b.price || 199), 0);

//   const today = new Date().toDateString();
//   const todayCount = [...bookings, ...mockBookings].filter((b) => {
//     if (!b.createdAt?.seconds) return false;
//     return (
//       new Date(b.createdAt.seconds * 1000).toDateString() === today
//     );
//   }).length;

//   // 🔹 Logout
//   async function logout() {
//     await signOut(auth);
//     navigate("/admin-login");
//   }

//   return (
//     <div className="admin-page">
//       {/* HEADER */}
//       <div className="admin-header">
//         <h1>🎯 Admin Dashboard</h1>
//         <button onClick={logout} className="logout-btn">
//           Logout
//         </button>
//       </div>

//       {/* STATS */}
//       <div className="admin-stats">
//         <div className="stat-card">📊 Total: <b>{totalBookings}</b></div>
//         <div className="stat-card">💰 Revenue: <b>₹{revenue}</b></div>
//         <div className="stat-card">📅 Today: <b>{todayCount}</b></div>
//       </div>

//       {/* ================= MENTORSHIP ================= */}
//       <div className="admin-box">
//         <div className="box-header">
//           <h2>📋 Mentorship Booking History</h2>
//           <ExportButton
//             data={bookings}
//             fileName="Mentorship_Bookings.xlsx"
//           />
//         </div>

//         {bookings.length === 0 ? (
//           <p>No mentorship bookings</p>
//         ) : (
//           <table>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Topic</th>
//                 <th>Slot</th>
//                 <th>Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((b, i) => (
//                 <tr key={b.id}>
//                   <td>{i + 1}</td>
//                   <td>{b.name}</td>
//                   <td>{b.email}</td>
//                   <td>{b.topic}</td>
//                   <td>{b.slot}</td>
//                   <td>₹{b.price || 99}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* ================= MOCK INTERVIEW ================= */}
//       <div className="admin-box mock-box">
//         <div className="box-header">
//           <h2>🎯 Mock Interview Booking History</h2>
//           <ExportButton
//             data={mockBookings}
//             fileName="Mock_Interview_Bookings.xlsx"
//           />
//         </div>

//         {mockBookings.length === 0 ? (
//           <p>No mock interview bookings</p>
//         ) : (
//           <table>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Interview Type</th>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {mockBookings.map((b, i) => (
//                 <tr key={b.id}>
//                   <td>{i + 1}</td>
//                   <td>{b.name}</td>
//                   <td>{b.email}</td>
//                   <td>{b.interviewType}</td>
//                   <td>{b.preferredDate}</td>
//                   <td>{b.preferredTime}</td>
//                   <td>₹{b.price || 199}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Admin;
// import { useEffect, useState } from "react";
// import {
//   collection,
//   onSnapshot,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { db, auth } from "../firebase";
// import { signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import "../pages/Admin.css";

// function Admin() {
//   const navigate = useNavigate();

//   const [bookings, setBookings] = useState([]);
//   const [mockBookings, setMockBookings] = useState([]);

//   // 🔹 Fetch Mentorship + Mock Interview data
//   useEffect(() => {
//     const unsub1 = onSnapshot(collection(db, "bookings"), (snap) => {
//       setBookings(
//         snap.docs.map((d) => ({
//           id: d.id,
//           ...d.data(),
//         }))
//       );
//     });

//     const unsub2 = onSnapshot(collection(db, "mockInterviews"), (snap) => {
//       setMockBookings(
//         snap.docs.map((d) => ({
//           id: d.id,
//           ...d.data(),
//         }))
//       );
//     });

//     return () => {
//       unsub1();
//       unsub2();
//     };
//   }, []);

//   // 🔹 STATS
//   const totalBookings = bookings.length + mockBookings.length;

//   const revenue =
//     bookings.reduce((s, b) => s + (b.price || 99), 0) +
//     mockBookings.reduce((s, b) => s + (b.price || 199), 0);

//   const today = new Date().toDateString();
//   const todayCount = [...bookings, ...mockBookings].filter((b) => {
//     if (!b.createdAt?.seconds) return false;
//     return (
//       new Date(b.createdAt.seconds * 1000).toDateString() === today
//     );
//   }).length;

//   // 🔹 Topic chart (Mentorship)
//   const topicCount = {};
//   bookings.forEach((b) => {
//     if (!b.topic) return;
//     topicCount[b.topic] = (topicCount[b.topic] || 0) + 1;
//   });

//   // 🔹 Delete
//   async function handleDelete(collectionName, id) {
//     if (!window.confirm("Delete this booking?")) return;
//     await deleteDoc(doc(db, collectionName, id));
//   }

//   // 🔹 Logout
//   async function logout() {
//     await signOut(auth);
//     navigate("/admin-login");
//   }

//   return (
//     <div className="admin-page">
//       {/* HEADER */}
//       <div className="admin-header">
//         <h1>🎯 Admin Dashboard</h1>
//         <button className="logout-btn" onClick={logout}>
//           Logout
//         </button>
//       </div>

//       {/* STATS */}
//       <div className="admin-stats">
//         <div className="stat-card">📊 Total: {totalBookings}</div>
//         <div className="stat-card">💰 Revenue: ₹{revenue}</div>
//         <div className="stat-card">📅 Today: {todayCount}</div>
//       </div>

//       {/* 📊 CHART */}
//       <div className="admin-box">
//         <h2>📊 Mentorship Topics</h2>

//         {Object.keys(topicCount).length === 0 ? (
//           <p>No data</p>
//         ) : (
//           Object.keys(topicCount).map((t) => (
//             <div key={t} className="chart-row">
//               <span className="chart-label">{t}</span>
//               <div
//                 className="chart-bar"
//                 style={{ width: topicCount[t] * 40 }}
//               >
//                 {topicCount[t]}
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* ================= MENTORSHIP BOOKINGS ================= */}
//       <div className="admin-box">
//         <h2>📋 Mentorship Booking History</h2>

//         {bookings.length === 0 ? (
//           <p>No mentorship bookings</p>
//         ) : (
//           <table>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Topic</th>
//                 <th>Slot</th>
//                 <th>Amount</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((b, i) => (
//                 <tr key={b.id}>
//                   <td>{i + 1}</td>
//                   <td>{b.name}</td>
//                   <td>{b.email}</td>
//                   <td>{b.topic}</td>
//                   <td>{b.slot}</td>
//                   <td>₹{b.price || 99}</td>
//                   <td>
//                     <button
//                       className="delete-btn"
//                       onClick={() =>
//                         handleDelete("bookings", b.id)
//                       }
//                     >
//                       🗑 Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* ================= MOCK INTERVIEWS ================= */}
//       <div className="admin-box mock-box">
//         <h2>🎯 Mock Interview Booking History</h2>

//         {mockBookings.length === 0 ? (
//           <p>No mock interview bookings</p>
//         ) : (
//           <table>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Type</th>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>Amount</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {mockBookings.map((b, i) => (
//                 <tr key={b.id}>
//                   <td>{i + 1}</td>
//                   <td>{b.name}</td>
//                   <td>{b.email}</td>
//                   <td>{b.interviewType}</td>
//                   <td>{b.preferredDate}</td>
//                   <td>{b.preferredTime}</td>
//                   <td>₹{b.price || 199}</td>
//                   <td>
//                     <button
//                       className="delete-btn"
//                       onClick={() =>
//                         handleDelete("mockInterviews", b.id)
//                       }
//                     >
//                       🗑 Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
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
import "../pages/Admin.css";

function Admin() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [mockBookings, setMockBookings] = useState([]);

  // 🔹 Fetch Mentorship + Mock Interview data
  useEffect(() => {
    const unsub1 = onSnapshot(collection(db, "mentorships"), (snap) => {
      setBookings(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );
    });

    const unsub2 = onSnapshot(collection(db, "mockInterviews"), (snap) => {
      setMockBookings(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );
    });

    return () => {
      unsub1();
      unsub2();
    };
  }, []);

  // 🔹 STATS
  const totalBookings = bookings.length + mockBookings.length;

  const revenue =
    bookings.reduce((s, b) => s + (b.price || 0), 0) +
    mockBookings.reduce((s, b) => s + (b.price || 0), 0);

  const today = new Date().toDateString();
  const todayCount = [...bookings, ...mockBookings].filter((b) => {
    if (!b.createdAt?.seconds) return false;
    return (
      new Date(b.createdAt.seconds * 1000).toDateString() === today
    );
  }).length;

  // 🔹 Topic chart (Mentorship)
  const topicCount = {};
  bookings.forEach((b) => {
    if (!b.topicLabel) return;
    topicCount[b.topicLabel] = (topicCount[b.topicLabel] || 0) + 1;
  });

  // 🔹 Delete
  async function handleDelete(collectionName, id) {
    if (!window.confirm("Delete this booking?")) return;
    await deleteDoc(doc(db, collectionName, id));
  }

  // 🔹 Logout
  async function logout() {
    await signOut(auth);
    navigate("/admin-login");
  }

  return (
    <div className="admin-page">
      {/* HEADER */}
      <div className="admin-header">
        <h1>🎯 Admin Dashboard</h1>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="admin-stats">
        <div className="stat-card">📊 Total: {totalBookings}</div>
        <div className="stat-card">💰 Revenue: ₹{revenue}</div>
        <div className="stat-card">📅 Today: {todayCount}</div>
      </div>

      {/* 📊 TOPIC CHART */}
      <div className="admin-box">
        <h2>📊 Mentorship Topics</h2>
        {Object.keys(topicCount).length === 0 ? (
          <p>No data</p>
        ) : (
          Object.keys(topicCount).map((t) => (
            <div key={t} className="chart-row">
              <span className="chart-label">{t}</span>
              <div className="chart-bar" style={{ width: topicCount[t] * 40 }}>
                {topicCount[t]}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ================= MENTORSHIP BOOKINGS ================= */}
      <div className="admin-box">
        <h2>📋 Mentorship Booking History</h2>

        {bookings.length === 0 ? (
          <p>No mentorship bookings</p>
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
                  <td>{b.name}</td>
                  <td>{b.email}</td>
                  <td>{b.topicLabel}</td>
                  <td>{b.slot}</td>
                  <td>₹{b.price}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete("mentorships", b.id)
                      }
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

      {/* ================= MOCK INTERVIEWS ================= */}
      <div className="admin-box mock-box">
        <h2>🎯 Mock Interview Booking History</h2>

        {mockBookings.length === 0 ? (
          <p>No mock interview bookings</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Type</th>
                <th>Date</th>
                <th>Time</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {mockBookings.map((b, i) => (
                <tr key={b.id}>
                  <td>{i + 1}</td>
                  <td>{b.name}</td>
                  <td>{b.email}</td>
                  <td>{b.interviewType}</td>
                  <td>{b.preferredDate}</td>
                  <td>{b.preferredTime}</td>
                  <td>₹{b.price}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete("mockInterviews", b.id)
                      }
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
