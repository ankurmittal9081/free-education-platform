// // // // // // import { useEffect, useState } from "react";
// // // // // // import { collection, getDocs } from "firebase/firestore";
// // // // // // import { db } from "../firebase";

// // // // // // function AdminMockInterviews() {
// // // // // //   const [interviews, setInterviews] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);

// // // // // //   useEffect(() => {
// // // // // //     async function fetchData() {
// // // // // //       try {
// // // // // //         const querySnapshot = await getDocs(
// // // // // //           collection(db, "mockInterviews")
// // // // // //         );

// // // // // //         const data = querySnapshot.docs.map(doc => ({
// // // // // //           id: doc.id,
// // // // // //           ...doc.data(),
// // // // // //         }));

// // // // // //         setInterviews(data);
// // // // // //       } catch (error) {
// // // // // //         console.log(error);
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     }

// // // // // //     fetchData();
// // // // // //   }, []);

// // // // // //   if (loading) return <h2>Loading...</h2>;

// // // // // //   return (
// // // // // //     <div style={{ padding: "20px" }}>
// // // // // //       <h2>📋 Mock Interview Bookings</h2>

// // // // // //       {interviews.length === 0 ? (
// // // // // //         <p>No bookings yet</p>
// // // // // //       ) : (
// // // // // //         <table border="1" cellPadding="10">
// // // // // //           <thead>
// // // // // //             <tr>
// // // // // //               <th>Name</th>
// // // // // //               <th>Email</th>
// // // // // //               <th>Interview Type</th>
// // // // // //               <th>Date</th>
// // // // // //               <th>Time</th>
// // // // // //               <th>Price</th>
// // // // // //             </tr>
// // // // // //           </thead>

// // // // // //           <tbody>
// // // // // //             {interviews.map(item => (
// // // // // //               <tr key={item.id}>
// // // // // //                 <td>{item.name}</td>
// // // // // //                 <td>{item.email}</td>
// // // // // //                 <td>{item.interviewLabel}</td>
// // // // // //                 <td>{item.preferredDate}</td>
// // // // // //                 <td>{item.preferredTime}</td>
// // // // // //                 <td>₹{item.price}</td>
// // // // // //               </tr>
// // // // // //             ))}
// // // // // //           </tbody>
// // // // // //         </table>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default AdminMockInterviews;
// // // // // import { useEffect, useState } from "react";
// // // // // import { collection, getDocs } from "firebase/firestore";
// // // // // import { db } from "../firebase";

// // // // // function AdminMockInterviews() {
// // // // //   const [data, setData] = useState([]);

// // // // //   useEffect(() => {
// // // // //     async function load() {
// // // // //       const snap = await getDocs(collection(db, "mockInterviews"));
// // // // //       setData(snap.docs.map(d => ({ id: d.id, ...d.data() })));
// // // // //     }
// // // // //     load();
// // // // //   }, []);

// // // // //   return (
// // // // //     <div style={{ padding: "40px" }}>
// // // // //       <h2>📋 Mock Interview Bookings</h2>

// // // // //       {data.length === 0 ? (
// // // // //         <p>No bookings</p>
// // // // //       ) : (
// // // // //         <table border="1" cellPadding="10">
// // // // //           <thead>
// // // // //             <tr>
// // // // //               <th>Name</th>
// // // // //               <th>Email</th>
// // // // //               <th>Type</th>
// // // // //               <th>Date</th>
// // // // //               <th>Time</th>
// // // // //               <th>Price</th>
// // // // //             </tr>
// // // // //           </thead>
// // // // //           <tbody>
// // // // //             {data.map(b => (
// // // // //               <tr key={b.id}>
// // // // //                 <td>{b.name}</td>
// // // // //                 <td>{b.email}</td>
// // // // //                 <td>{b.interviewLabel}</td>
// // // // //                 <td>{b.preferredDate}</td>
// // // // //                 <td>{b.preferredTime}</td>
// // // // //                 <td>₹{b.price}</td>
// // // // //               </tr>
// // // // //             ))}
// // // // //           </tbody>
// // // // //         </table>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default AdminMockInterviews;
// // // // import { useEffect, useState } from "react";
// // // // import { collection, onSnapshot } from "firebase/firestore";
// // // // import { db } from "../firebase";
// // // // import { Link } from "react-router-dom";

// // // // function AdminMockInterviews() {
// // // //   const [interviews, setInterviews] = useState([]);
// // // //   const [loading, setLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     const unsub = onSnapshot(
// // // //       collection(db, "mockInterviews"),
// // // //       (snap) => {
// // // //         const data = snap.docs.map((doc) => ({
// // // //           id: doc.id,
// // // //           ...doc.data(),
// // // //         }));
// // // //         setInterviews(data);
// // // //         setLoading(false);
// // // //       },
// // // //       (error) => {
// // // //         console.error("Firestore error:", error);
// // // //         setLoading(false);
// // // //       }
// // // //     );

// // // //     return () => unsub();
// // // //   }, []);

// // // //   if (loading) {
// // // //     return <h2 style={{ padding: "20px" }}>Loading mock interviews...</h2>;
// // // //   }

// // // //   return (
// // // //     <div style={{ padding: "20px" }}>
// // // //       <h1>🎯 Mock Interview Bookings</h1>

// // // //       <Link to="/admin">← Back to Dashboard</Link>
// // // //       <br /><br />

// // // //       {interviews.length === 0 ? (
// // // //         <p>No mock interview bookings yet</p>
// // // //       ) : (
// // // //         <table border="1" cellPadding="10">
// // // //           <thead>
// // // //             <tr>
// // // //               <th>#</th>
// // // //               <th>Name</th>
// // // //               <th>Email</th>
// // // //               <th>Interview</th>
// // // //               <th>Date</th>
// // // //               <th>Time</th>
// // // //               <th>Price</th>
// // // //             </tr>
// // // //           </thead>
// // // //           <tbody>
// // // //             {interviews.map((m, i) => (
// // // //               <tr key={m.id}>
// // // //                 <td>{i + 1}</td>
// // // //                 <td>{m.name}</td>
// // // //                 <td>{m.email}</td>
// // // //                 <td>{m.interviewLabel}</td>
// // // //                 <td>{m.preferredDate}</td>
// // // //                 <td>{m.preferredTime}</td>
// // // //                 <td>₹{m.price}</td>
// // // //               </tr>
// // // //             ))}
// // // //           </tbody>
// // // //         </table>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default AdminMockInterviews;
// // // import { useEffect, useState } from "react";
// // // import { collection, onSnapshot } from "firebase/firestore";
// // // import { db } from "../firebase";
// // // import { Link } from "react-router-dom";

// // // function AdminMockInterviews() {
// // //   const [mockBookings, setMockBookings] = useState([]);

// // //   useEffect(() => {
// // //     const unsub = onSnapshot(
// // //       collection(db, "mockInterviews"),
// // //       (snap) => {
// // //         const data = snap.docs.map((doc) => ({
// // //           id: doc.id,
// // //           ...doc.data(),
// // //         }));
// // //         setMockBookings(data);
// // //       }
// // //     );

// // //     return () => unsub();
// // //   }, []);

// // //   return (
// // //     <div style={{ padding: "20px" }}>
// // //       <h1>🎯 Mock Interview Bookings</h1>

// // //       <Link to="/admin">← Back to Admin</Link>

// // //       <br /><br />

// // //       {mockBookings.length === 0 ? (
// // //         <p>No mock interviews booked yet</p>
// // //       ) : (
// // //         <table border="1" cellPadding="10">
// // //           <thead>
// // //             <tr>
// // //               <th>#</th>
// // //               <th>Name</th>
// // //               <th>Email</th>
// // //               <th>Interview Type</th>
// // //               <th>Date</th>
// // //               <th>Time</th>
// // //               <th>Experience</th>
// // //               <th>Amount</th>
// // //             </tr>
// // //           </thead>

// // //           <tbody>
// // //             {mockBookings.map((b, i) => (
// // //               <tr key={b.id}>
// // //                 <td>{i + 1}</td>
// // //                 <td>{b.name}</td>
// // //                 <td>{b.email}</td>
// // //                 <td>{b.interviewLabel}</td>
// // //                 <td>{b.preferredDate}</td>
// // //                 <td>{b.preferredTime}</td>
// // //                 <td>{b.experience}</td>
// // //                 <td>₹{b.price}</td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default AdminMockInterviews;

// // import { useEffect, useState } from "react";
// // import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
// // import { db } from "../firebase";
// // import { Link } from "react-router-dom";

// // function AdminMockInterviews() {
// //   const [mockBookings, setMockBookings] = useState([]);
// //   const [filterType, setFilterType] = useState("all");

// //   // 🔹 Fetch mock interviews
// //   useEffect(() => {
// //     const unsub = onSnapshot(collection(db, "mockInterviews"), (snap) => {
// //       const data = snap.docs.map((d) => ({
// //         id: d.id,
// //         ...d.data(),
// //       }));
// //       setMockBookings(data);
// //     });

// //     return () => unsub();
// //   }, []);

// //   // 🔹 Delete mock interview
// //   async function handleDelete(id) {
// //     const ok = window.confirm("Delete this mock interview?");
// //     if (!ok) return;

// //     await deleteDoc(doc(db, "mockInterviews", id));
// //   }

// //   // 🔹 Filter logic
// //   const filteredMocks =
// //     filterType === "all"
// //       ? mockBookings
// //       : mockBookings.filter((m) => m.interviewLabel === filterType);

// //   // 🔹 Unique interview types (for filter dropdown)
// //   const interviewTypes = [
// //     ...new Set(mockBookings.map((m) => m.interviewLabel)),
// //   ];

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       <h1>🎯 Mock Interview Bookings</h1>

// //       <Link to="/admin">← Back to Admin</Link>

// //       <br /><br />

// //       {/* FILTER */}
// //       <label>
// //         Filter by Interview Type:{" "}
// //         <select
// //           value={filterType}
// //           onChange={(e) => setFilterType(e.target.value)}
// //         >
// //           <option value="all">All</option>
// //           {interviewTypes.map((t) => (
// //             <option key={t} value={t}>
// //               {t}
// //             </option>
// //           ))}
// //         </select>
// //       </label>

// //       <br /><br />

// //       {filteredMocks.length === 0 ? (
// //         <p>No mock interviews found</p>
// //       ) : (
// //         <table border="1" cellPadding="10">
// //           <thead>
// //             <tr>
// //               <th>#</th>
// //               <th>Name</th>
// //               <th>Email</th>
// //               <th>Interview Type</th>
// //               <th>Date</th>
// //               <th>Time</th>
// //               <th>Experience</th>
// //               <th>Amount</th>
// //               <th>Action</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {filteredMocks.map((b, i) => (
// //               <tr key={b.id}>
// //                 <td>{i + 1}</td>
// //                 <td>{b.name}</td>
// //                 <td>{b.email}</td>
// //                 <td>{b.interviewLabel}</td>
// //                 <td>{b.preferredDate}</td>
// //                 <td>{b.preferredTime}</td>
// //                 <td>{b.experience}</td>
// //                 <td>₹{b.price}</td>
// //                 <td>
// //                   <button
// //                     onClick={() => handleDelete(b.id)}
// //                     style={{ color: "red" }}
// //                   >
// //                     🗑 Delete
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );
// // }

// // export default AdminMockInterviews;
// import { useEffect, useState } from "react";
// import {
//   collection,
//   onSnapshot,
//   deleteDoc,
//   doc
// } from "firebase/firestore";
// import { db } from "../firebase";
// import { Link } from "react-router-dom";

// function AdminMockInterviews() {
//   const [interviews, setInterviews] = useState([]);
//   const [filterType, setFilterType] = useState("All");

//   /* ================= FETCH DATA ================= */
//   useEffect(() => {
//     const unsub = onSnapshot(collection(db, "mockInterviews"), (snap) => {
//       const data = snap.docs.map((d) => ({
//         id: d.id,
//         ...d.data(),
//       }));
//       setInterviews(data);
//     });

//     return () => unsub();
//   }, []);

//   /* ================= DELETE ================= */
//   async function handleDelete(id) {
//     if (!window.confirm("Delete this mock interview booking?")) return;
//     await deleteDoc(doc(db, "mockInterviews", id));
//   }

//   /* ================= FILTER OPTIONS ================= */
//   const interviewTypes = [
//     "All",
//     ...new Set(interviews.map((i) => i.interviewLabel)),
//   ];

//   /* ================= FILTERED DATA ================= */
//   const filteredInterviews =
//     filterType === "All"
//       ? interviews
//       : interviews.filter((i) => i.interviewLabel === filterType);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>🎯 Mock Interview Bookings</h1>

//       <Link to="/admin">← Back to Admin</Link>

//       <br /><br />

//       {/* FILTER */}
//       <label>
//         <b>Filter by Interview Type: </b>
//         <select
//           value={filterType}
//           onChange={(e) => setFilterType(e.target.value)}
//           style={{ marginLeft: "10px" }}
//         >
//           {interviewTypes.map((type) => (
//             <option key={type} value={type}>
//               {type}
//             </option>
//           ))}
//         </select>
//       </label>

//       <br /><br />

//       {/* TABLE */}
//       {filteredInterviews.length === 0 ? (
//         <p>No mock interview bookings found.</p>
//       ) : (
//         <table border="1" cellPadding="10" cellSpacing="0">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Interview Type</th>
//               <th>Date</th>
//               <th>Time</th>
//               <th>Experience</th>
//               <th>Amount</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredInterviews.map((i, index) => (
//               <tr key={i.id}>
//                 <td>{index + 1}</td>
//                 <td>{i.name}</td>
//                 <td>{i.email}</td>
//                 <td>{i.interviewLabel}</td>
//                 <td>{i.preferredDate}</td>
//                 <td>{i.preferredTime}</td>
//                 <td>{i.experience || "-"}</td>
//                 <td>₹{i.price}</td>
//                 <td>
//                   <button
//                     style={{ color: "red" }}
//                     onClick={() => handleDelete(i.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default AdminMockInterviews;
import { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function AdminMockInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "mockInterviews"), (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setInterviews(data);
    });

    return () => unsub();
  }, []);

  // 🔹 unique interview types (Backend, Frontend, DSA etc.)
  const interviewTypes = [
    "All",
    ...new Set(interviews.map(i => i.interviewType).filter(Boolean))
  ];

  const filteredData =
    filter === "All"
      ? interviews
      : interviews.filter(i => i.interviewType === filter);

  async function handleDelete(id) {
    if (!window.confirm("Delete this mock interview?")) return;
    await deleteDoc(doc(db, "mockInterviews", id));
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎯 Mock Interview Bookings</h1>
      <Link to="/admin">← Back to Admin</Link>

      <br /><br />

      <label>
        Filter by Interview Type:{" "}
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          {interviewTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </label>

      <br /><br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Interview Type</th>
            <th>Date</th>
            <th>Time</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((i, idx) => (
            <tr key={i.id}>
              <td>{idx + 1}</td>
              <td>{i.name}</td>
              <td>{i.email}</td>
              <td>{i.interviewType || "N/A"}</td>
              <td>{i.preferredDate}</td>
              <td>{i.preferredTime}</td>
              <td>₹{i.price}</td>
              <td>
                <button onClick={() => handleDelete(i.id)} style={{ color: "red" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminMockInterviews;
