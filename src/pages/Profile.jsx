// // // // // import { useEffect, useState } from "react";
// // // // // import { auth, db } from "../firebase";
// // // // // import {
// // // // //   doc,
// // // // //   getDoc,
// // // // //   updateDoc,
// // // // //   collection,
// // // // //   query,
// // // // //   where,
// // // // //   getDocs,
// // // // // } from "firebase/firestore";
// // // // // import { useAuthState } from "react-firebase-hooks/auth";
// // // // // import { Link } from "react-router-dom";
// // // // // import Navbar from "../components/Navbar";

// // // // // function Profile() {
// // // // //   const [user] = useAuthState(auth);
// // // // //   const [userData, setUserData] = useState(null);
// // // // //   const [bookings, setBookings] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   const [editMode, setEditMode] = useState(false);
// // // // //   const [name, setName] = useState("");

// // // // //   /* ===== FETCH USER ===== */
// // // // //   useEffect(() => {
// // // // //     async function fetchUser() {
// // // // //       if (!user) return;
// // // // //       const snap = await getDoc(doc(db, "users", user.uid));
// // // // //       if (snap.exists()) {
// // // // //         setUserData(snap.data());
// // // // //         setName(snap.data().name || "Student");
// // // // //       }
// // // // //       setLoading(false);
// // // // //     }
// // // // //     fetchUser();
// // // // //   }, [user]);

// // // // //   /* ===== FETCH BOOKINGS ===== */
// // // // //   useEffect(() => {
// // // // //     async function fetchBookings() {
// // // // //       if (!user?.email) return;
// // // // //       const q = query(
// // // // //         collection(db, "bookings"),
// // // // //         where("email", "==", user.email)
// // // // //       );
// // // // //       const snap = await getDocs(q);
// // // // //       setBookings(snap.docs.map((d) => d.data()));
// // // // //     }
// // // // //     fetchBookings();
// // // // //   }, [user]);

// // // // //   async function saveProfile() {
// // // // //     await updateDoc(doc(db, "users", user.uid), { name });
// // // // //     setUserData((p) => ({ ...p, name }));
// // // // //     setEditMode(false);
// // // // //   }

// // // // //   if (loading) return <p>Loading...</p>;

// // // // //   return (
// // // // //     <>
// // // // //       <Navbar />

// // // // //       <div className="profile-page">
// // // // //         <div className="profile-container">
// // // // //           {/* HEADER */}
// // // // //           <div className="profile-header">
// // // // //             <div className="profile-avatar">
// // // // //               {name.charAt(0).toUpperCase()}
// // // // //             </div>

// // // // //             {editMode ? (
// // // // //               <>
// // // // //                 <input
// // // // //                   className="edit-input"
// // // // //                   value={name}
// // // // //                   onChange={(e) => setName(e.target.value)}
// // // // //                 />
// // // // //                 <button className="primary-button" onClick={saveProfile}>
// // // // //                   Save
// // // // //                 </button>
// // // // //               </>
// // // // //             ) : (
// // // // //               <>
// // // // //                 <h1>{name}</h1>
// // // // //                 <p>{user.email}</p>
// // // // //                 <button className="edit-btn" onClick={() => setEditMode(true)}>
// // // // //                   ✏️ Edit
// // // // //                 </button>
// // // // //               </>
// // // // //             )}
// // // // //           </div>

// // // // //           {/* STATS */}
// // // // //           <div className="profile-stats">
// // // // //             <div className="stat-box">🔥 {userData?.streak || 0} Day Streak</div>
// // // // //             <div className="stat-box">
// // // // //               📚 {userData?.enrolledCourses?.length || 0} Courses
// // // // //             </div>
// // // // //             <div className="stat-box">
// // // // //               ✅ {userData?.completedLessons?.length || 0} Lessons
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* COURSES */}
// // // // //           <div className="profile-section">
// // // // //             <h2>📖 Your Learning Journey</h2>

// // // // //             {userData?.enrolledCourses?.length ? (
// // // // //               <div className="enrolled-courses">
// // // // //                 {userData.enrolledCourses.map((cid) => (
// // // // //                   <Link
// // // // //                     key={cid}
// // // // //                     to={`/course/${cid}`}
// // // // //                     className="enrolled-course-card"
// // // // //                   >
// // // // //                     {cid.toUpperCase()} → Continue
// // // // //                   </Link>
// // // // //                 ))}
// // // // //               </div>
// // // // //             ) : (
// // // // //               <Link to="/courses">
// // // // //                 <button className="primary-button">
// // // // //                   Browse Courses
// // // // //                 </button>
// // // // //               </Link>
// // // // //             )}
// // // // //           </div>

// // // // //           {/* MENTORSHIP */}
// // // // //           <div className="profile-section">
// // // // //             <h2>🤝 Mentorship History</h2>
// // // // //             {bookings.length === 0 ? (
// // // // //               <p>No mentorship sessions yet</p>
// // // // //             ) : (
// // // // //               bookings.map((b, i) => (
// // // // //                 <div key={i} className="enrolled-course-card">
// // // // //                   <b>{b.topic}</b> | {b.slot} | ₹{b.price || 99}
// // // // //                 </div>
// // // // //               ))
// // // // //             )}
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </>
// // // // //   );
// // // // // }

// // // // // export default Profile;
// // // // import { useEffect, useState } from "react";
// // // // import { auth, db } from "../firebase";
// // // // import { signOut } from "firebase/auth";
// // // // import { collection, query, where, onSnapshot } from "firebase/firestore";
// // // // import { useNavigate } from "react-router-dom";
// // // // import "./Profile.css";

// // // // function Profile() {
// // // //   const navigate = useNavigate();
// // // //   const user = auth.currentUser;

// // // //   const [bookings, setBookings] = useState([]);

// // // //   // 🔹 Fetch user mentorship history
// // // //   useEffect(() => {
// // // //     if (!user) return;

// // // //     const q = query(
// // // //       collection(db, "bookings"),
// // // //       where("email", "==", user.email)
// // // //     );

// // // //     const unsub = onSnapshot(q, (snap) => {
// // // //       setBookings(
// // // //         snap.docs.map((doc) => ({
// // // //           id: doc.id,
// // // //           ...doc.data(),
// // // //         }))
// // // //       );
// // // //     });

// // // //     return () => unsub();
// // // //   }, [user]);

// // // //   // 🔹 Logout
// // // //   async function logout() {
// // // //     await signOut(auth);
// // // //     navigate("/login");
// // // //   }

// // // //   if (!user) return null;

// // // //   return (
// // // //     <div className="profile-page">
// // // //       {/* HEADER */}
// // // //       <div className="profile-header">
// // // //         <h2>👤 My Profile</h2>
// // // //         <button onClick={logout}>Logout</button>
// // // //       </div>

// // // //       {/* PROFILE CARD */}
// // // //       <div className="profile-card">
// // // //         <div className="avatar">
// // // //           {user.email[0].toUpperCase()}
// // // //         </div>

// // // //         <h3>Student</h3>
// // // //         <p>{user.email}</p>

// // // //         <button className="edit-btn">✏ Edit Profile</button>
// // // //       </div>

// // // //       {/* STATS */}
// // // //       <div className="profile-stats">
// // // //         <div className="stat-box">🔥 0 Day Streak</div>
// // // //         <div className="stat-box">📚 2 Courses</div>
// // // //         <div className="stat-box">✅ 0 Lessons</div>
// // // //       </div>

// // // //       {/* LEARNING */}
// // // //       <div className="profile-section">
// // // //         <h3>📘 Your Learning Journey</h3>
// // // //         <div className="learning-row">
// // // //           <span>DSA</span>
// // // //           <button>Continue →</button>
// // // //         </div>
// // // //         <div className="learning-row">
// // // //           <span>System Design</span>
// // // //           <button>Continue →</button>
// // // //         </div>
// // // //       </div>

// // // //       {/* MENTORSHIP HISTORY */}
// // // //       <div className="profile-section">
// // // //         <h3>🤝 Mentorship History</h3>

// // // //         {bookings.length === 0 ? (
// // // //           <p className="muted">No mentorship sessions yet</p>
// // // //         ) : (
// // // //           bookings.map((b) => (
// // // //             <div key={b.id} className="history-card">
// // // //               <strong>{b.topic}</strong>
// // // //               <span>
// // // //                 {b.slot} • ₹{b.price || 99}
// // // //               </span>
// // // //             </div>
// // // //           ))
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Profile;
// // // import { useEffect, useState } from "react";
// // // import { auth, db } from "../firebase";
// // // import { signOut } from "firebase/auth";
// // // import {
// // //   collection,
// // //   query,
// // //   where,
// // //   onSnapshot,
// // // } from "firebase/firestore";
// // // import { useNavigate } from "react-router-dom";
// // // import "./Profile.css";

// // // function Profile() {
// // //   const navigate = useNavigate();
// // //   const user = auth.currentUser;

// // //   const [bookings, setBookings] = useState([]);
// // //   const [mockBookings, setMockBookings] = useState([]);

// // //   // 🔹 Mentorship History
// // //   useEffect(() => {
// // //     if (!user) return;

// // //     const q = query(
// // //       collection(db, "bookings"),
// // //       where("email", "==", user.email)
// // //     );

// // //     const unsub = onSnapshot(q, (snap) => {
// // //       setBookings(
// // //         snap.docs.map((doc) => ({
// // //           id: doc.id,
// // //           ...doc.data(),
// // //         }))
// // //       );
// // //     });

// // //     return () => unsub();
// // //   }, [user]);

// // //   // 🔹 Mock Interview History
// // //   useEffect(() => {
// // //     if (!user) return;

// // //     const q = query(
// // //       collection(db, "mockInterviews"),
// // //       where("email", "==", user.email)
// // //     );

// // //     const unsub = onSnapshot(q, (snap) => {
// // //       setMockBookings(
// // //         snap.docs.map((doc) => ({
// // //           id: doc.id,
// // //           ...doc.data(),
// // //         }))
// // //       );
// // //     });

// // //     return () => unsub();
// // //   }, [user]);

// // //   // 🔹 Logout
// // //   async function logout() {
// // //     await signOut(auth);
// // //     navigate("/login");
// // //   }

// // //   if (!user) return null;

// // //   return (
// // //     <div className="profile-page">
// // //       {/* HEADER */}
// // //       <div className="profile-header">
// // //         <h2>👤 My Profile</h2>
// // //         <button onClick={logout}>Logout</button>
// // //       </div>

// // //       {/* PROFILE CARD */}
// // //       <div className="profile-card">
// // //         <div className="avatar">
// // //           {user.email[0].toUpperCase()}
// // //         </div>

// // //         <h3>Student</h3>
// // //         <p>{user.email}</p>

// // //         <button className="edit-btn">✏ Edit Profile</button>
// // //       </div>

// // //       {/* STATS */}
// // //       <div className="profile-stats">
// // //         <div className="stat-box">🔥 0 Day Streak</div>
// // //         <div className="stat-box">📚 2 Courses</div>
// // //         <div className="stat-box">✅ 0 Lessons</div>
// // //       </div>

// // //       {/* LEARNING */}
// // //       <div className="profile-section">
// // //         <h3>📘 Your Learning Journey</h3>

// // //         <div className="learning-row">
// // //           <span>DSA</span>
// // //           <button>Continue →</button>
// // //         </div>

// // //         <div className="learning-row">
// // //           <span>System Design</span>
// // //           <button>Continue →</button>
// // //         </div>
// // //       </div>

// // //       {/* MENTORSHIP HISTORY */}
// // //       <div className="profile-section">
// // //         <h3>🤝 Mentorship History</h3>

// // //         {bookings.length === 0 ? (
// // //           <p className="muted">No mentorship sessions yet</p>
// // //         ) : (
// // //           bookings.map((b) => (
// // //             <div key={b.id} className="history-card">
// // //               <strong>{b.topic}</strong>
// // //               <span>
// // //                 {b.slot} • ₹{b.price || 99}
// // //               </span>
// // //             </div>
// // //           ))
// // //         )}
// // //       </div>

// // //       {/* 🎯 MOCK INTERVIEW HISTORY */}
// // //       <div className="profile-section mock-section">
// // //         <h3>🎯 Mock Interview History</h3>

// // //         {mockBookings.length === 0 ? (
// // //           <p className="muted">No mock interviews booked</p>
// // //         ) : (
// // //           mockBookings.map((m) => (
// // //             <div key={m.id} className="history-card">
// // //               <strong>{m.interviewType}</strong>
// // //               <span>
// // //                 {m.preferredDate} • {m.preferredTime} • ₹{m.price || 199}
// // //               </span>
// // //             </div>
// // //           ))
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default Profile;
// // import { useEffect, useState } from "react";
// // import { auth, db } from "../firebase";
// // import { signOut } from "firebase/auth";
// // import {
// //   collection,
// //   query,
// //   where,
// //   onSnapshot,
// // } from "firebase/firestore";
// // import { useNavigate } from "react-router-dom";
// // import { useAuthState } from "react-firebase-hooks/auth";
// // import "./Profile.css";

// // function Profile() {
// //   const navigate = useNavigate();
// //   const [user, loading] = useAuthState(auth);

// //   const [mentorships, setMentorships] = useState([]);
// //   const [mockBookings, setMockBookings] = useState([]);

// //   /* ================= MENTORSHIP HISTORY ================= */
// //   useEffect(() => {
// //     if (!user) return;

// //     const q = query(
// //       collection(db, "mentorships"),           // ✅ CORRECT
// //       where("userId", "==", user.uid)           // ✅ RULE MATCH
// //     );

// //     const unsub = onSnapshot(q, (snap) => {
// //       setMentorships(
// //         snap.docs.map((doc) => ({
// //           id: doc.id,
// //           ...doc.data(),
// //         }))
// //       );
// //     });

// //     return () => unsub();
// //   }, [user]);

// //   /* ================= MOCK INTERVIEW HISTORY ================= */
// //   useEffect(() => {
// //     if (!user) return;

// //     const q = query(
// //       collection(db, "mockInterviews"),
// //       where("userId", "==", user.uid)
// //     );

// //     const unsub = onSnapshot(q, (snap) => {
// //       setMockBookings(
// //         snap.docs.map((doc) => ({
// //           id: doc.id,
// //           ...doc.data(),
// //         }))
// //       );
// //     });

// //     return () => unsub();
// //   }, [user]);

// //   /* ================= LOGOUT ================= */
// //   async function logout() {
// //     await signOut(auth);
// //     navigate("/login");
// //   }

// //   if (loading) return <p>Loading...</p>;
// //   if (!user) return null;

// //   return (
// //     <div className="profile-page">
// //       {/* HEADER */}
// //       <div className="profile-header">
// //         <h2>👤 My Profile</h2>
// //         <button onClick={logout}>Logout</button>
// //       </div>

// //       {/* PROFILE CARD */}
// //       <div className="profile-card">
// //         <div className="avatar">
// //           {user.email[0].toUpperCase()}
// //         </div>

// //         <h3>Student</h3>
// //         <p>{user.email}</p>

// //         <button className="edit-btn">✏ Edit Profile</button>
// //       </div>

// //       {/* STATS */}
// //       <div className="profile-stats">
// //         <div className="stat-box">🔥 0 Day Streak</div>
// //         <div className="stat-box">📚 2 Courses</div>
// //         <div className="stat-box">✅ 0 Lessons</div>
// //       </div>

// //       {/* LEARNING */}
// //       <div className="profile-section">
// //         <h3>📘 Your Learning Journey</h3>

// //         <div className="learning-row">
// //           <span>DSA</span>
// //           <button>Continue →</button>
// //         </div>

// //         <div className="learning-row">
// //           <span>System Design</span>
// //           <button>Continue →</button>
// //         </div>
// //       </div>

// //       {/* 🤝 MENTORSHIP HISTORY */}
// //       <div className="profile-section">
// //         <h3>🤝 Mentorship History</h3>

// //         {mentorships.length === 0 ? (
// //           <p className="muted">No mentorship sessions yet</p>
// //         ) : (
// //           mentorships.map((m) => (
// //             <div key={m.id} className="history-card">
// //               <strong>{m.topicLabel}</strong>
// //               <span>
// //                 {m.slot} • ₹{m.price}
// //               </span>
// //             </div>
// //           ))
// //         )}
// //       </div>

// //       {/* 🎯 MOCK INTERVIEW HISTORY */}
// //       <div className="profile-section mock-section">
// //         <h3>🎯 Mock Interview History</h3>

// //         {mockBookings.length === 0 ? (
// //           <p className="muted">No mock interviews booked</p>
// //         ) : (
// //           mockBookings.map((m) => (
// //             <div key={m.id} className="history-card">
// //               <strong>{m.interviewType}</strong>
// //               <span>
// //                 {m.preferredDate} • {m.preferredTime} • ₹{m.price || 199}
// //               </span>
// //             </div>
// //           ))
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Profile;
// import { useEffect, useState } from "react";
// import { auth, db } from "../firebase";
// import { signOut } from "firebase/auth";
// import {
//   collection,
//   query,
//   where,
//   onSnapshot,
// } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import "./Profile.css";

// function Profile() {
//   const navigate = useNavigate();
//   const [user, loading] = useAuthState(auth);

//   const [mentorships, setMentorships] = useState([]);
//   const [mockBookings, setMockBookings] = useState([]);

//   /* ================= MENTORSHIP HISTORY ================= */
//   useEffect(() => {
//     if (!user) return;

//     const q = query(
//       collection(db, "mentorships"),
//       where("userId", "==", user.uid)
//     );

//     const unsub = onSnapshot(q, (snap) => {
//       setMentorships(
//         snap.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//       );
//     });

//     return () => unsub();
//   }, [user]);

//   /* ================= MOCK INTERVIEW HISTORY ================= */
//   useEffect(() => {
//     if (!user) return;

//     const q = query(
//       collection(db, "mockInterviews"),
//       where("userId", "==", user.uid)
//     );

//     const unsub = onSnapshot(q, (snap) => {
//       setMockBookings(
//         snap.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//       );
//     });

//     return () => unsub();
//   }, [user]);

//   /* ================= LOGOUT ================= */
//   async function logout() {
//     await signOut(auth);
//     navigate("/login");
//   }

//   if (loading) return <p>Loading...</p>;
//   if (!user) return null;

//   return (
//     <div className="profile-page">
//       {/* HEADER */}
//       <div className="profile-header">
//         <h2>👤 My Profile</h2>
//         <button onClick={logout}>Logout</button>
//       </div>

//       {/* PROFILE CARD */}
//       <div className="profile-card">
//         <div className="avatar">
//           {user.email[0].toUpperCase()}
//         </div>

//         <h3>Student</h3>
//         <p>{user.email}</p>

//         <button className="edit-btn">✏ Edit Profile</button>
//       </div>

//       {/* STATS */}
//       <div className="profile-stats">
//         <div className="stat-box">🔥 0 Day Streak</div>
//         <div className="stat-box">📚 2 Courses</div>
//         <div className="stat-box">✅ 0 Lessons</div>
//       </div>

//       {/* LEARNING JOURNEY (✅ REDIRECT FIXED) */}
//       <div className="profile-section">
//         <h3>📘 Your Learning Journey</h3>

//         <div className="learning-row">
//           <span>DSA</span>
//           <button onClick={() => navigate("/course/dsa")}>
//             Continue →
//           </button>
//         </div>

//         <div className="learning-row">
//           <span>System Design</span>
//           <button onClick={() => navigate("/course/system-design")}>
//             Continue →
//           </button>
//         </div>
//       </div>

//       {/* 🤝 MENTORSHIP HISTORY */}
//       <div className="profile-section">
//         <h3>🤝 Mentorship History</h3>

//         {mentorships.length === 0 ? (
//           <p className="muted">No mentorship sessions yet</p>
//         ) : (
//           mentorships.map((m) => (
//             <div key={m.id} className="history-card">
//               <strong>{m.topicLabel}</strong>
//               <span>
//                 {m.slot} • ₹{m.price}
//               </span>
//             </div>
//           ))
//         )}
//       </div>

//       {/* 🎯 MOCK INTERVIEW HISTORY */}
//       <div className="profile-section mock-section">
//         <h3>🎯 Mock Interview History</h3>

//         {mockBookings.length === 0 ? (
//           <p className="muted">No mock interviews booked</p>
//         ) : (
//           mockBookings.map((m) => (
//             <div key={m.id} className="history-card">
//               <strong>{m.interviewType}</strong>
//               <span>
//                 {m.preferredDate} • {m.preferredTime} • ₹{m.price || 199}
//               </span>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default Profile;
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  const [mentorships, setMentorships] = useState([]);
  const [mockBookings, setMockBookings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState("Student");

  /* ================= MENTORSHIP HISTORY ================= */
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "mentorships"),
      where("userId", "==", user.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      setMentorships(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsub();
  }, [user]);

  /* ================= MOCK INTERVIEW HISTORY ================= */
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "mockInterviews"),
      where("userId", "==", user.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      setMockBookings(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsub();
  }, [user]);

  /* ================= LOGOUT ================= */
  async function logout() {
    await signOut(auth);
    navigate("/login");
  }

  /* ================= EDIT PROFILE ================= */
  function toggleEdit() {
    setIsEditing(!isEditing);
  }

  function saveProfile() {
    // Here you can add logic to save to Firestore if needed
    setIsEditing(false);
  }

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div className="profile-page">
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <div className="spinner" style={{
            width: '50px',
            height: '50px',
            border: '5px solid #e0e0e0',
            borderTop: '5px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ fontSize: '18px', color: '#7f8c8d' }}>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  /* ================= CALCULATE STATS ================= */
  const totalSessions = mentorships.length + mockBookings.length;
  const totalCourses = 2; // Can be dynamic based on enrolled courses

  return (
    <div className="profile-page">
      {/* ============ HEADER ============ */}
      <div className="profile-header">
        <h2>👤 My Profile</h2>
        <button onClick={logout}>🚪 Logout</button>
      </div>

      {/* ============ PROFILE CARD ============ */}
      <div className="profile-card">
        <div className="avatar">
          {user.email ? user.email[0].toUpperCase() : "U"}
        </div>

        {isEditing ? (
          <>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              style={{
                padding: '10px',
                fontSize: '18px',
                borderRadius: '8px',
                border: '2px solid #667eea',
                marginBottom: '15px',
                textAlign: 'center',
                fontWeight: '600'
              }}
            />
            <button 
              onClick={saveProfile}
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                padding: '10px 30px',
                borderRadius: '30px',
                fontWeight: '700',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              💾 Save
            </button>
            <button 
              onClick={toggleEdit}
              style={{
                background: 'transparent',
                border: '2px solid #667eea',
                color: '#667eea',
                padding: '10px 30px',
                borderRadius: '30px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              ❌ Cancel
            </button>
          </>
        ) : (
          <>
            <h3>{displayName}</h3>
            <p>{user.email}</p>
            <button className="edit-btn" onClick={toggleEdit}>
              ✏️ Edit Profile
            </button>
          </>
        )}
      </div>

      {/* ============ STATS ============ */}
      <div className="profile-stats">
        <div className="stat-box">
          🔥 <strong>0</strong> Day Streak
        </div>
        <div className="stat-box">
          📚 <strong>{totalCourses}</strong> Courses
        </div>
        <div className="stat-box">
          🎯 <strong>{totalSessions}</strong> Sessions
        </div>
      </div>

      {/* ============ LEARNING JOURNEY ============ */}
      <div className="profile-section">
        <h3>📘 Your Learning Journey</h3>

        <div className="learning-row">
          <span>Data Structures & Algorithms</span>
          <button onClick={() => navigate("/course/dsa")}>
            Continue →
          </button>
        </div>

        <div className="learning-row">
          <span>System Design Mastery</span>
          <button onClick={() => navigate("/course/system-design")}>
            Continue →
          </button>
        </div>

        <div className="learning-row">
          <span>Full Stack Development</span>
          <button onClick={() => navigate("/courses")}>
            Explore More →
          </button>
        </div>
      </div>

      {/* ============ MENTORSHIP HISTORY ============ */}
      <div className="profile-section">
        <h3>🤝 Mentorship History</h3>

        {mentorships.length === 0 ? (
          <p className="muted">
            No mentorship sessions yet. 
            <span 
              onClick={() => navigate("/mentorship")}
              style={{
                color: '#667eea',
                cursor: 'pointer',
                fontWeight: '700',
                marginLeft: '5px',
                textDecoration: 'underline'
              }}
            >
              Book your first session!
            </span>
          </p>
        ) : (
          <>
            {mentorships.map((m) => (
              <div key={m.id} className="history-card">
                <strong>📌 {m.topicLabel || "Mentorship Session"}</strong>
                <span>
                  🕐 {m.slot} • 💰 ₹{m.price}
                </span>
              </div>
            ))}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button 
                onClick={() => navigate("/mentorship")}
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 28px',
                  borderRadius: '30px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                📅 Book Another Session
              </button>
            </div>
          </>
        )}
      </div>

      {/* ============ MOCK INTERVIEW HISTORY ============ */}
      <div className="profile-section mock-section">
        <h3>🎯 Mock Interview History</h3>

        {mockBookings.length === 0 ? (
          <p className="muted">
            No mock interviews booked yet.
            <span 
              onClick={() => navigate("/mock-interview")}
              style={{
                color: '#764ba2',
                cursor: 'pointer',
                fontWeight: '700',
                marginLeft: '5px',
                textDecoration: 'underline'
              }}
            >
              Schedule your first mock!
            </span>
          </p>
        ) : (
          <>
            {mockBookings.map((m) => (
              <div key={m.id} className="history-card">
                <strong>💼 {m.interviewType || "Mock Interview"}</strong>
                <span>
                  📅 {m.preferredDate} • 🕐 {m.preferredTime} • 💰 ₹{m.price || 199}
                </span>
              </div>
            ))}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button 
                onClick={() => navigate("/mock-interview")}
                style={{
                  background: 'linear-gradient(135deg, #764ba2, #667eea)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 28px',
                  borderRadius: '30px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                📝 Schedule Mock Interview
              </button>
            </div>
          </>
        )}
      </div>

      {/* ============ QUICK ACTIONS ============ */}
      <div className="profile-section" style={{ borderLeftColor: '#27ae60' }}>
        <h3>⚡ Quick Actions</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <button 
            onClick={() => navigate("/courses")}
            style={{
              background: 'linear-gradient(135deg, #3498db, #2980b9)',
              color: 'white',
              border: 'none',
              padding: '15px 20px',
              borderRadius: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            📚 Browse Courses
          </button>

          <button 
            onClick={() => navigate("/mentorship")}
            style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              padding: '15px 20px',
              borderRadius: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            🤝 Get Mentorship
          </button>

          <button 
            onClick={() => navigate("/mock-interview")}
            style={{
              background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
              color: 'white',
              border: 'none',
              padding: '15px 20px',
              borderRadius: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            🎯 Mock Interview
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;