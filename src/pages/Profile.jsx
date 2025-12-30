// // import { useEffect, useState } from "react";
// // import { auth, db } from "../firebase";
// // import {
// //   doc,
// //   getDoc,
// //   updateDoc,
// //   collection,
// //   query,
// //   where,
// //   getDocs,
// // } from "firebase/firestore";
// // import { useAuthState } from "react-firebase-hooks/auth";
// // import { Link } from "react-router-dom";
// // import Navbar from "../components/Navbar";

// // function Profile() {
// //   const [user] = useAuthState(auth);
// //   const [userData, setUserData] = useState(null);
// //   const [bookings, setBookings] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const [editMode, setEditMode] = useState(false);
// //   const [name, setName] = useState("");

// //   /* ===== FETCH USER ===== */
// //   useEffect(() => {
// //     async function fetchUser() {
// //       if (!user) return;
// //       const snap = await getDoc(doc(db, "users", user.uid));
// //       if (snap.exists()) {
// //         setUserData(snap.data());
// //         setName(snap.data().name || "Student");
// //       }
// //       setLoading(false);
// //     }
// //     fetchUser();
// //   }, [user]);

// //   /* ===== FETCH BOOKINGS ===== */
// //   useEffect(() => {
// //     async function fetchBookings() {
// //       if (!user?.email) return;
// //       const q = query(
// //         collection(db, "bookings"),
// //         where("email", "==", user.email)
// //       );
// //       const snap = await getDocs(q);
// //       setBookings(snap.docs.map((d) => d.data()));
// //     }
// //     fetchBookings();
// //   }, [user]);

// //   async function saveProfile() {
// //     await updateDoc(doc(db, "users", user.uid), { name });
// //     setUserData((p) => ({ ...p, name }));
// //     setEditMode(false);
// //   }

// //   if (loading) return <p>Loading...</p>;

// //   return (
// //     <>
// //       <Navbar />

// //       <div className="profile-page">
// //         <div className="profile-container">
// //           {/* HEADER */}
// //           <div className="profile-header">
// //             <div className="profile-avatar">
// //               {name.charAt(0).toUpperCase()}
// //             </div>

// //             {editMode ? (
// //               <>
// //                 <input
// //                   className="edit-input"
// //                   value={name}
// //                   onChange={(e) => setName(e.target.value)}
// //                 />
// //                 <button className="primary-button" onClick={saveProfile}>
// //                   Save
// //                 </button>
// //               </>
// //             ) : (
// //               <>
// //                 <h1>{name}</h1>
// //                 <p>{user.email}</p>
// //                 <button className="edit-btn" onClick={() => setEditMode(true)}>
// //                   ✏️ Edit
// //                 </button>
// //               </>
// //             )}
// //           </div>

// //           {/* STATS */}
// //           <div className="profile-stats">
// //             <div className="stat-box">🔥 {userData?.streak || 0} Day Streak</div>
// //             <div className="stat-box">
// //               📚 {userData?.enrolledCourses?.length || 0} Courses
// //             </div>
// //             <div className="stat-box">
// //               ✅ {userData?.completedLessons?.length || 0} Lessons
// //             </div>
// //           </div>

// //           {/* COURSES */}
// //           <div className="profile-section">
// //             <h2>📖 Your Learning Journey</h2>

// //             {userData?.enrolledCourses?.length ? (
// //               <div className="enrolled-courses">
// //                 {userData.enrolledCourses.map((cid) => (
// //                   <Link
// //                     key={cid}
// //                     to={`/course/${cid}`}
// //                     className="enrolled-course-card"
// //                   >
// //                     {cid.toUpperCase()} → Continue
// //                   </Link>
// //                 ))}
// //               </div>
// //             ) : (
// //               <Link to="/courses">
// //                 <button className="primary-button">
// //                   Browse Courses
// //                 </button>
// //               </Link>
// //             )}
// //           </div>

// //           {/* MENTORSHIP */}
// //           <div className="profile-section">
// //             <h2>🤝 Mentorship History</h2>
// //             {bookings.length === 0 ? (
// //               <p>No mentorship sessions yet</p>
// //             ) : (
// //               bookings.map((b, i) => (
// //                 <div key={i} className="enrolled-course-card">
// //                   <b>{b.topic}</b> | {b.slot} | ₹{b.price || 99}
// //                 </div>
// //               ))
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // export default Profile;
// import { useEffect, useState } from "react";
// import { auth, db } from "../firebase";
// import { signOut } from "firebase/auth";
// import { collection, query, where, onSnapshot } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import "./Profile.css";

// function Profile() {
//   const navigate = useNavigate();
//   const user = auth.currentUser;

//   const [bookings, setBookings] = useState([]);

//   // 🔹 Fetch user mentorship history
//   useEffect(() => {
//     if (!user) return;

//     const q = query(
//       collection(db, "bookings"),
//       where("email", "==", user.email)
//     );

//     const unsub = onSnapshot(q, (snap) => {
//       setBookings(
//         snap.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//       );
//     });

//     return () => unsub();
//   }, [user]);

//   // 🔹 Logout
//   async function logout() {
//     await signOut(auth);
//     navigate("/login");
//   }

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

//       {/* LEARNING */}
//       <div className="profile-section">
//         <h3>📘 Your Learning Journey</h3>
//         <div className="learning-row">
//           <span>DSA</span>
//           <button>Continue →</button>
//         </div>
//         <div className="learning-row">
//           <span>System Design</span>
//           <button>Continue →</button>
//         </div>
//       </div>

//       {/* MENTORSHIP HISTORY */}
//       <div className="profile-section">
//         <h3>🤝 Mentorship History</h3>

//         {bookings.length === 0 ? (
//           <p className="muted">No mentorship sessions yet</p>
//         ) : (
//           bookings.map((b) => (
//             <div key={b.id} className="history-card">
//               <strong>{b.topic}</strong>
//               <span>
//                 {b.slot} • ₹{b.price || 99}
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
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [bookings, setBookings] = useState([]);
  const [mockBookings, setMockBookings] = useState([]);

  // 🔹 Mentorship History
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "bookings"),
      where("email", "==", user.email)
    );

    const unsub = onSnapshot(q, (snap) => {
      setBookings(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsub();
  }, [user]);

  // 🔹 Mock Interview History
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "mockInterviews"),
      where("email", "==", user.email)
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

  // 🔹 Logout
  async function logout() {
    await signOut(auth);
    navigate("/login");
  }

  if (!user) return null;

  return (
    <div className="profile-page">
      {/* HEADER */}
      <div className="profile-header">
        <h2>👤 My Profile</h2>
        <button onClick={logout}>Logout</button>
      </div>

      {/* PROFILE CARD */}
      <div className="profile-card">
        <div className="avatar">
          {user.email[0].toUpperCase()}
        </div>

        <h3>Student</h3>
        <p>{user.email}</p>

        <button className="edit-btn">✏ Edit Profile</button>
      </div>

      {/* STATS */}
      <div className="profile-stats">
        <div className="stat-box">🔥 0 Day Streak</div>
        <div className="stat-box">📚 2 Courses</div>
        <div className="stat-box">✅ 0 Lessons</div>
      </div>

      {/* LEARNING */}
      <div className="profile-section">
        <h3>📘 Your Learning Journey</h3>

        <div className="learning-row">
          <span>DSA</span>
          <button>Continue →</button>
        </div>

        <div className="learning-row">
          <span>System Design</span>
          <button>Continue →</button>
        </div>
      </div>

      {/* MENTORSHIP HISTORY */}
      <div className="profile-section">
        <h3>🤝 Mentorship History</h3>

        {bookings.length === 0 ? (
          <p className="muted">No mentorship sessions yet</p>
        ) : (
          bookings.map((b) => (
            <div key={b.id} className="history-card">
              <strong>{b.topic}</strong>
              <span>
                {b.slot} • ₹{b.price || 99}
              </span>
            </div>
          ))
        )}
      </div>

      {/* 🎯 MOCK INTERVIEW HISTORY */}
      <div className="profile-section mock-section">
        <h3>🎯 Mock Interview History</h3>

        {mockBookings.length === 0 ? (
          <p className="muted">No mock interviews booked</p>
        ) : (
          mockBookings.map((m) => (
            <div key={m.id} className="history-card">
              <strong>{m.interviewType}</strong>
              <span>
                {m.preferredDate} • {m.preferredTime} • ₹{m.price || 199}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;
