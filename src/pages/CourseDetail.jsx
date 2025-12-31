// // // // import { Link, useParams } from "react-router-dom";
// // // // import { useEffect, useState } from "react";
// // // // import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
// // // // import { db, auth } from "../firebase";
// // // // import { useAuthState } from "react-firebase-hooks/auth";

// // // // function CourseDetail() {
// // // //   const { courseId } = useParams();
// // // //   const [user] = useAuthState(auth);

// // // //   const [course, setCourse] = useState(null);
// // // //   const [sections, setSections] = useState([]);
// // // //   const [activePlaylist, setActivePlaylist] = useState(null);
// // // //   const [loading, setLoading] = useState(true);

// // // //   /* ===== LOAD COURSE ===== */
// // // //   useEffect(() => {
// // // //     async function loadCourse() {
// // // //       const snap = await getDoc(doc(db, "courses", courseId));
// // // //       if (!snap.exists()) {
// // // //         setLoading(false);
// // // //         return;
// // // //       }

// // // //       const data = snap.data();
// // // //       const sectionArray = Array.isArray(data.sections)
// // // //         ? data.sections
// // // //         : Object.values(data.sections || {});

// // // //       setCourse(data);
// // // //       setSections(sectionArray);
// // // //       setLoading(false);
// // // //     }

// // // //     loadCourse();
// // // //   }, [courseId]);

// // // //   /* ===== LOAD PROGRESS ===== */
// // // //   useEffect(() => {
// // // //     if (!user) return;

// // // //     async function loadProgress() {
// // // //       const ref = doc(db, "courseProgress", `${user.uid}_${courseId}`);
// // // //       const snap = await getDoc(ref);
// // // //       if (snap.exists()) {
// // // //         setActivePlaylist(snap.data().lastPlaylist);
// // // //       }
// // // //     }

// // // //     loadProgress();
// // // //   }, [user, courseId]);

// // // //   if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
// // // //   if (!course) return <p>Course not found</p>;

// // // //   const total = sections.length;
// // // //   const watchedIndex = sections.findIndex(
// // // //     (s) => s.playlistIds?.[0] === activePlaylist
// // // //   );
// // // //   const progress =
// // // //     watchedIndex === -1 ? 0 : Math.round(((watchedIndex + 1) / total) * 100);

// // // //   return (
// // // //     <div className="course-detail-page">
// // // //       {/* HEADER */}
// // // //       <div className="course-detail-header">
// // // //         <Link to="/courses">← Back to Courses</Link>
// // // //         <h1>{course.title}</h1>
// // // //         <p>{course.description}</p>
// // // //         <p>
// // // //           ⭐ {course.rating} | 👥 {course.students}+ | ⏱ {course.duration}
// // // //         </p>
// // // //       </div>

// // // //       {/* VIDEO */}
// // // //       {activePlaylist && (
// // // //         <iframe
// // // //           width="100%"
// // // //           height="450"
// // // //           src={`https://www.youtube.com/embed/videoseries?list=${activePlaylist}`}
// // // //           title="Course Player"
// // // //           allowFullScreen
// // // //         />
// // // //       )}

// // // //       <p style={{ margin: "12px 0" }}>
// // // //         📈 Progress: <strong>{progress}%</strong>
// // // //       </p>

// // // //       {/* SECTIONS */}
// // // //       <div className="course-curriculum">
// // // //         {sections.map((section, index) => {
// // // //           const playlistId = section.playlistIds?.[0];
// // // //           return (
// // // //             <div
// // // //               key={index}
// // // //               className="curriculum-section"
// // // //               onClick={async () => {
// // // //                 if (!playlistId) return;
// // // //                 setActivePlaylist(playlistId);

// // // //                 if (!user) return;

// // // //                 await setDoc(
// // // //                   doc(db, "courseProgress", `${user.uid}_${courseId}`),
// // // //                   {
// // // //                     userId: user.uid,
// // // //                     courseId,
// // // //                     lastPlaylist: playlistId,
// // // //                     progress,
// // // //                     updatedAt: serverTimestamp(),
// // // //                   },
// // // //                   { merge: true }
// // // //                 );
// // // //               }}
// // // //             >
// // // //               🎥 {section.title}
// // // //             </div>
// // // //           );
// // // //         })}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default CourseDetail;
// // // import { useParams, Link } from "react-router-dom";
// // // import { useEffect, useState } from "react";
// // // import { doc, getDoc } from "firebase/firestore";
// // // import { db } from "../firebase";
// // // import "./CourseDetail.css";


// // // function CourseDetail() {
// // //   const { courseId } = useParams();

// // //   const [course, setCourse] = useState(null);
// // //   const [sections, setSections] = useState([]);
// // //   const [activePlaylist, setActivePlaylist] = useState(null);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     async function loadCourse() {
// // //       const snap = await getDoc(doc(db, "courses", courseId));
// // //       if (!snap.exists()) {
// // //         setLoading(false);
// // //         return;
// // //       }

// // //       const data = snap.data();

// // //       // ✅ FORCE sections into ARRAY
// // //       const sectionArray = Array.isArray(data.sections)
// // //         ? data.sections
// // //         : Object.values(data.sections || {});

// // //       setCourse(data);
// // //       setSections(sectionArray);

// // //       // ✅ AUTO LOAD FIRST PLAYLIST
// // //       if (
// // //         sectionArray.length > 0 &&
// // //         Array.isArray(sectionArray[0].playlistIds) &&
// // //         sectionArray[0].playlistIds.length > 0
// // //       ) {
// // //         setActivePlaylist(sectionArray[0].playlistIds[0]);
// // //       }

// // //       setLoading(false);
// // //     }

// // //     loadCourse();
// // //   }, [courseId]);

// // //   if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
// // //   if (!course) return <p>Course not found</p>;

// // //   return (
// // //     <div className="course-detail-page">
// // //       <Link to="/courses">← Back to Courses</Link>

// // //       <h1>{course.title}</h1>
// // //       <p>{course.description}</p>
// // //       <p>
// // //         ⭐ {course.rating} | 👥 {course.students}+ | ⏱ {course.duration}
// // //       </p>

// // //       {/* 🎥 VIDEO PLAYER */}
// // //       {activePlaylist && (
// // //         <iframe
// // //           width="100%"
// // //           height="450"
// // //           src={`https://www.youtube.com/embed/videoseries?list=${activePlaylist}`}
// // //           title="Course Playlist"
// // //           allowFullScreen
// // //         />
// // //       )}

// // //       <h3 style={{ marginTop: "20px" }}>📚 Course Content</h3>

// // //       {sections.map((section, index) => {
// // //         const playlistId =
// // //           Array.isArray(section.playlistIds) && section.playlistIds.length > 0
// // //             ? section.playlistIds[0]
// // //             : null;

// // //         return (
// // //           <div
// // //             key={index}
// // //             className="curriculum-section"
// // //             style={{
// // //               cursor: "pointer",
// // //               padding: "10px",
// // //               border: "1px solid #ddd",
// // //               borderRadius: "8px",
// // //               marginBottom: "10px",
// // //             }}
// // //             onClick={() => playlistId && setActivePlaylist(playlistId)}
// // //           >
// // //             🎥 {section.title}
// // //           </div>
// // //         );
// // //       })}
// // //     </div>
// // //   );
// // // }

// // // export default CourseDetail;
// // import { useParams, Link, useNavigate } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
// // import { db, auth } from "../firebase";
// // import { useAuthState } from "react-firebase-hooks/auth";
// // import toast from "react-hot-toast";
// // import "./CourseDetail.css";

// // function CourseDetail() {
// //   const { courseId } = useParams();
// //   const navigate = useNavigate();
// //   const [user] = useAuthState(auth);

// //   const [course, setCourse] = useState(null);
// //   const [sections, setSections] = useState([]);
// //   const [activePlaylist, setActivePlaylist] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [progress, setProgress] = useState(0);
// //   const [completedSections, setCompletedSections] = useState([]);

// //   /* ================= LOAD COURSE ================= */
// //   useEffect(() => {
// //     async function loadCourse() {
// //       try {
// //         const snap = await getDoc(doc(db, "courses", courseId));
// //         if (!snap.exists()) {
// //           setLoading(false);
// //           toast.error("Course not found");
// //           return;
// //         }

// //         const data = snap.data();

// //         // Convert sections to array
// //         const sectionArray = Array.isArray(data.sections)
// //           ? data.sections
// //           : Object.values(data.sections || {});

// //         setCourse(data);
// //         setSections(sectionArray);

// //         // Auto-load first playlist
// //         if (
// //           sectionArray.length > 0 &&
// //           Array.isArray(sectionArray[0].playlistIds) &&
// //           sectionArray[0].playlistIds.length > 0
// //         ) {
// //           setActivePlaylist(sectionArray[0].playlistIds[0]);
// //         }
// //       } catch (error) {
// //         console.error("Error loading course:", error);
// //         toast.error("Failed to load course");
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     loadCourse();
// //   }, [courseId]);

// //   /* ================= LOAD PROGRESS ================= */
// //   useEffect(() => {
// //     if (!user) return;

// //     async function loadProgress() {
// //       try {
// //         const ref = doc(db, "courseProgress", `${user.uid}_${courseId}`);
// //         const snap = await getDoc(ref);
// //         if (snap.exists()) {
// //           const data = snap.data();
// //           setActivePlaylist(data.lastPlaylist);
// //           setProgress(data.progress || 0);
// //           setCompletedSections(data.completedSections || []);
// //         }
// //       } catch (error) {
// //         console.error("Error loading progress:", error);
// //       }
// //     }

// //     loadProgress();
// //   }, [user, courseId]);

// //   /* ================= UPDATE PROGRESS ================= */
// //   async function updateProgress(playlistId, sectionIndex) {
// //     if (!user) {
// //       toast.error("Please login to track progress");
// //       return;
// //     }

// //     try {
// //       // Mark section as completed
// //       const newCompleted = [...new Set([...completedSections, sectionIndex])];
// //       const newProgress = Math.round((newCompleted.length / sections.length) * 100);

// //       await setDoc(
// //         doc(db, "courseProgress", `${user.uid}_${courseId}`),
// //         {
// //           userId: user.uid,
// //           courseId,
// //           lastPlaylist: playlistId,
// //           progress: newProgress,
// //           completedSections: newCompleted,
// //           updatedAt: serverTimestamp(),
// //         },
// //         { merge: true }
// //       );

// //       setProgress(newProgress);
// //       setCompletedSections(newCompleted);
// //       toast.success("Progress saved!");
// //     } catch (error) {
// //       console.error("Error updating progress:", error);
// //       toast.error("Failed to save progress");
// //     }
// //   }

// //   /* ================= HANDLE SECTION CLICK ================= */
// //   function handleSectionClick(playlistId, sectionIndex) {
// //     if (!playlistId) {
// //       toast.error("Video not available");
// //       return;
// //     }

// //     setActivePlaylist(playlistId);
// //     updateProgress(playlistId, sectionIndex);

// //     // Scroll to video player
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //   }

// //   /* ================= MARK AS COMPLETE ================= */
// //   async function markAsComplete() {
// //     if (!user) {
// //       toast.error("Please login first");
// //       return;
// //     }

// //     if (sections.length === 0) return;

// //     const currentIndex = sections.findIndex(
// //       (s) => s.playlistIds?.[0] === activePlaylist
// //     );

// //     if (currentIndex !== -1 && !completedSections.includes(currentIndex)) {
// //       await updateProgress(activePlaylist, currentIndex);
// //     }
// //   }

// //   /* ================= NAVIGATE SECTIONS ================= */
// //   function goToNextSection() {
// //     const currentIndex = sections.findIndex(
// //       (s) => s.playlistIds?.[0] === activePlaylist
// //     );

// //     if (currentIndex < sections.length - 1) {
// //       const nextSection = sections[currentIndex + 1];
// //       const nextPlaylist = nextSection.playlistIds?.[0];
// //       if (nextPlaylist) {
// //         handleSectionClick(nextPlaylist, currentIndex + 1);
// //       }
// //     } else {
// //       toast.success("🎉 Course completed!");
// //     }
// //   }

// //   function goToPreviousSection() {
// //     const currentIndex = sections.findIndex(
// //       (s) => s.playlistIds?.[0] === activePlaylist
// //     );

// //     if (currentIndex > 0) {
// //       const prevSection = sections[currentIndex - 1];
// //       const prevPlaylist = prevSection.playlistIds?.[0];
// //       if (prevPlaylist) {
// //         handleSectionClick(prevPlaylist, currentIndex - 1);
// //       }
// //     }
// //   }

// //   /* ================= LOADING STATE ================= */
// //   if (loading) {
// //     return (
// //       <div className="course-detail-page">
// //         <div className="loading-container">
// //           <div className="spinner"></div>
// //           <p>Loading course...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   /* ================= COURSE NOT FOUND ================= */
// //   if (!course) {
// //     return (
// //       <div className="course-detail-page">
// //         <div className="not-found">
// //           <h2>😕 Course Not Found</h2>
// //           <p>The course you're looking for doesn't exist.</p>
// //           <button onClick={() => navigate("/courses")}>
// //             Browse Courses
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const currentSectionIndex = sections.findIndex(
// //     (s) => s.playlistIds?.[0] === activePlaylist
// //   );

// //   return (
// //     <div className="course-detail-page">
// //       {/* ============ BACK BUTTON ============ */}
// //       <Link to="/courses" className="back-link">
// //         ← Back to Courses
// //       </Link>

// //       {/* ============ COURSE HEADER ============ */}
// //       <div className="course-header">
// //         <div className="course-header-content">
// //           <h1>{course.title}</h1>
// //           <p className="course-description">{course.description}</p>
          
// //           <div className="course-info">
// //             <span className="info-item">⭐ {course.rating || "4.5"}</span>
// //             <span className="info-item">👥 {course.students || "1000"}+ students</span>
// //             <span className="info-item">⏱ {course.duration || "8 weeks"}</span>
// //           </div>
// //         </div>

// //         {/* Progress Bar */}
// //         {user && (
// //           <div className="progress-container">
// //             <div className="progress-info">
// //               <span>📈 Your Progress</span>
// //               <span className="progress-percentage">{progress}%</span>
// //             </div>
// //             <div className="progress-bar">
// //               <div 
// //                 className="progress-fill" 
// //                 style={{ width: `${progress}%` }}
// //               ></div>
// //             </div>
// //             <p className="progress-text">
// //               {completedSections.length} of {sections.length} sections completed
// //             </p>
// //           </div>
// //         )}
// //       </div>

// //       {/* ============ VIDEO PLAYER ============ */}
// //       {activePlaylist ? (
// //         <div className="video-container">
// //           <iframe
// //             width="100%"
// //             height="500"
// //             src={`https://www.youtube.com/embed/videoseries?list=${activePlaylist}`}
// //             title="Course Player"
// //             allowFullScreen
// //             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// //           />
          
// //           {/* Video Controls */}
// //           <div className="video-controls">
// //             <button 
// //               className="control-btn"
// //               onClick={goToPreviousSection}
// //               disabled={currentSectionIndex === 0}
// //             >
// //               ⬅ Previous
// //             </button>
            
// //             <button 
// //               className="control-btn mark-complete"
// //               onClick={markAsComplete}
// //             >
// //               ✓ Mark as Complete
// //             </button>
            
// //             <button 
// //               className="control-btn"
// //               onClick={goToNextSection}
// //               disabled={currentSectionIndex === sections.length - 1}
// //             >
// //               Next ➡
// //             </button>
// //           </div>

// //           {/* Current Section Info */}
// //           {currentSectionIndex !== -1 && (
// //             <div className="current-section-info">
// //               <h3>
// //                 📺 Now Playing: {sections[currentSectionIndex]?.title}
// //               </h3>
// //               <p>
// //                 Section {currentSectionIndex + 1} of {sections.length}
// //               </p>
// //             </div>
// //           )}
// //         </div>
// //       ) : (
// //         <div className="no-video">
// //           <p>👇 Select a section below to start learning</p>
// //         </div>
// //       )}

// //       {/* ============ COURSE CURRICULUM ============ */}
// //       <div className="curriculum-container">
// //         <h2>📚 Course Curriculum</h2>
        
// //         <div className="curriculum-list">
// //           {sections.map((section, index) => {
// //             const playlistId = Array.isArray(section.playlistIds) && 
// //                               section.playlistIds.length > 0
// //               ? section.playlistIds[0]
// //               : null;

// //             const isActive = playlistId === activePlaylist;
// //             const isCompleted = completedSections.includes(index);

// //             return (
// //               <div
// //                 key={index}
// //                 className={`curriculum-section ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
// //                 onClick={() => playlistId && handleSectionClick(playlistId, index)}
// //                 style={{ cursor: playlistId ? 'pointer' : 'not-allowed' }}
// //               >
// //                 <div className="section-number">
// //                   {isCompleted ? '✓' : index + 1}
// //                 </div>
                
// //                 <div className="section-content">
// //                   <h3>{section.title}</h3>
// //                   {section.description && (
// //                     <p className="section-description">{section.description}</p>
// //                   )}
// //                 </div>

// //                 <div className="section-status">
// //                   {isActive && <span className="badge active-badge">Playing</span>}
// //                   {isCompleted && !isActive && <span className="badge complete-badge">Completed</span>}
// //                   {!playlistId && <span className="badge unavailable-badge">Unavailable</span>}
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>

// //       {/* ============ COURSE ACTIONS ============ */}
// //       <div className="course-footer">
// //         <div className="footer-actions">
// //           <button 
// //             className="footer-btn"
// //             onClick={() => navigate("/courses")}
// //           >
// //             📚 Browse More Courses
// //           </button>
          
// //           {user && progress === 100 && (
// //             <button 
// //               className="footer-btn certificate-btn"
// //               onClick={() => toast.success("Certificate feature coming soon!")}
// //             >
// //               🎓 Get Certificate
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default CourseDetail;
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import {
//   doc,
//   getDoc,
//   setDoc,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db, auth } from "../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import toast from "react-hot-toast";
// import "./CourseDetail.css";

// function CourseDetail() {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const [user] = useAuthState(auth);

//   const [course, setCourse] = useState(null);
//   const [sections, setSections] = useState([]);
//   const [activePlaylist, setActivePlaylist] = useState(null);
//   const [completedSections, setCompletedSections] = useState([]);
//   const [progress, setProgress] = useState(0);
//   const [loading, setLoading] = useState(true);

//   /* ================= LOAD COURSE ================= */
//   useEffect(() => {
//     async function loadCourse() {
//       try {
//         const snap = await getDoc(doc(db, "courses", courseId));
//         if (!snap.exists()) {
//           toast.error("Course not found");
//           setLoading(false);
//           return;
//         }

//         const data = snap.data();
//         const sectionArray = Array.isArray(data.sections)
//           ? data.sections
//           : Object.values(data.sections || {});

//         setCourse(data);
//         setSections(sectionArray);

//         if (
//           sectionArray.length > 0 &&
//           sectionArray[0].playlistIds?.length > 0
//         ) {
//           setActivePlaylist(sectionArray[0].playlistIds[0]);
//         }
//       } catch (err) {
//         toast.error("Failed to load course");
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadCourse();
//   }, [courseId]);

//   /* ================= LOAD PROGRESS ================= */
//   useEffect(() => {
//     if (!user) return;

//     async function loadProgress() {
//       const ref = doc(db, "courseProgress", `${user.uid}_${courseId}`);
//       const snap = await getDoc(ref);
//       if (snap.exists()) {
//         const data = snap.data();
//         setActivePlaylist(data.lastPlaylist);
//         setCompletedSections(data.completedSections || []);
//         setProgress(data.progress || 0);
//       }
//     }

//     loadProgress();
//   }, [user, courseId]);

//   /* ================= UPDATE PROGRESS ================= */
//   async function updateProgress(playlistId, index) {
//     if (!user) {
//       toast.error("Login required");
//       return;
//     }

//     const updated = [...new Set([...completedSections, index])];
//     const newProgress = Math.round(
//       (updated.length / sections.length) * 100
//     );

//     await setDoc(
//       doc(db, "courseProgress", `${user.uid}_${courseId}`),
//       {
//         userId: user.uid,
//         courseId,
//         lastPlaylist: playlistId,
//         completedSections: updated,
//         progress: newProgress,
//         updatedAt: serverTimestamp(),
//       },
//       { merge: true }
//     );

//     setCompletedSections(updated);
//     setProgress(newProgress);
//   }

//   function handleSectionClick(playlistId, index) {
//     if (!playlistId) return;
//     setActivePlaylist(playlistId);
//     updateProgress(playlistId, index);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }

//   /* ================= UI STATES ================= */
//   if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
//   if (!course) return <p>Course not found</p>;

//   const currentIndex = sections.findIndex(
//     (s) => s.playlistIds?.[0] === activePlaylist
//   );

//   return (
//     <div className="course-detail-page">
//       {/* BACK */}
//       <Link to="/courses" className="back-link">
//         ← Back to Courses
//       </Link>

//       {/* HEADER */}
//       <div className="course-header">
//         <h1>{course.title}</h1>
//         <p>{course.description}</p>
//         <p>
//           ⭐ {course.rating || "4.5"} | 👥 {course.students || "1000"}+ | ⏱{" "}
//           {course.duration || "8 weeks"}
//         </p>

//         {user && (
//           <p>
//             📈 Progress: <b>{progress}%</b>
//           </p>
//         )}
//       </div>

//       {/* FORUM BUTTON */}
//       <div className="course-actions-bar">
//         <button
//           className="forum-btn"
//           onClick={() => navigate(`/forum/${courseId}`)}
//         >
//           💬 Ask Question in Forum
//         </button>
//       </div>

//       {/* VIDEO */}
//       {activePlaylist && (
//         <iframe
//           width="100%"
//           height="450"
//           src={`https://www.youtube.com/embed/videoseries?list=${activePlaylist}`}
//           title="Course Player"
//           allowFullScreen
//         />
//       )}

//       {/* CONTROLS */}
//       <div style={{ margin: "20px 0" }}>
//         <button
//           disabled={currentIndex <= 0}
//           onClick={() =>
//             handleSectionClick(
//               sections[currentIndex - 1]?.playlistIds?.[0],
//               currentIndex - 1
//             )
//           }
//         >
//           ⬅ Previous
//         </button>

//         <button
//           disabled={currentIndex >= sections.length - 1}
//           onClick={() =>
//             handleSectionClick(
//               sections[currentIndex + 1]?.playlistIds?.[0],
//               currentIndex + 1
//             )
//           }
//         >
//           Next ➡
//         </button>
//       </div>

//       {/* CURRICULUM */}
//       <h2>📚 Course Content</h2>

//       {sections.map((section, index) => {
//         const playlistId = section.playlistIds?.[0];
//         const completed = completedSections.includes(index);

//         return (
//           <div
//             key={index}
//             className="curriculum-section"
//             onClick={() => handleSectionClick(playlistId, index)}
//             style={{
//               cursor: "pointer",
//               marginBottom: "10px",
//               padding: "12px",
//               border: "1px solid #ddd",
//               borderRadius: "8px",
//               background: completed ? "#e8f8f5" : "#fff",
//             }}
//           >
//             {completed ? "✅" : "🎥"} {section.title}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default CourseDetail;
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import "./CourseDetail.css";

function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [completedSections, setCompletedSections] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showProgressBar, setShowProgressBar] = useState(false);

  /* ================= LOAD COURSE ================= */
  useEffect(() => {
    async function loadCourse() {
      try {
        const snap = await getDoc(doc(db, "courses", courseId));
        if (!snap.exists()) {
          toast.error("Course not found");
          setLoading(false);
          return;
        }

        const data = snap.data();
        const sectionArray = Array.isArray(data.sections)
          ? data.sections
          : Object.values(data.sections || {});

        setCourse(data);
        setSections(sectionArray);

        // Auto-load first playlist
        if (sectionArray.length > 0 && sectionArray[0].playlistIds?.length > 0) {
          setActivePlaylist(sectionArray[0].playlistIds[0]);
        }
      } catch (err) {
        console.error("Error loading course:", err);
        toast.error("Failed to load course");
      } finally {
        setLoading(false);
      }
    }

    loadCourse();
  }, [courseId]);

  /* ================= LOAD PROGRESS ================= */
  useEffect(() => {
    if (!user) return;

    async function loadProgress() {
      try {
        const ref = doc(db, "courseProgress", `${user.uid}_${courseId}`);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setActivePlaylist(data.lastPlaylist);
          setCompletedSections(data.completedSections || []);
          setProgress(data.progress || 0);
          setShowProgressBar(true);
        }
      } catch (error) {
        console.error("Error loading progress:", error);
      }
    }

    loadProgress();
  }, [user, courseId]);

  /* ================= UPDATE PROGRESS ================= */
  async function updateProgress(playlistId, index) {
    if (!user) {
      toast.error("Please login to track progress");
      return;
    }

    try {
      const updated = [...new Set([...completedSections, index])];
      const newProgress = Math.round((updated.length / sections.length) * 100);

      await setDoc(
        doc(db, "courseProgress", `${user.uid}_${courseId}`),
        {
          userId: user.uid,
          courseId,
          courseName: course.title,
          lastPlaylist: playlistId,
          completedSections: updated,
          progress: newProgress,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      setCompletedSections(updated);
      setProgress(newProgress);
      setShowProgressBar(true);

      if (newProgress === 100) {
        toast.success("🎉 Congratulations! Course completed!");
      } else {
        toast.success("Progress saved!");
      }
    } catch (error) {
      console.error("Error updating progress:", error);
      toast.error("Failed to save progress");
    }
  }

  /* ================= HANDLE SECTION CLICK ================= */
  function handleSectionClick(playlistId, index) {
    if (!playlistId) {
      toast.error("Video not available");
      return;
    }

    setActivePlaylist(playlistId);
    updateProgress(playlistId, index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ================= NAVIGATION ================= */
  function goToNextSection() {
    const currentIndex = sections.findIndex(
      (s) => s.playlistIds?.[0] === activePlaylist
    );

    if (currentIndex < sections.length - 1) {
      const nextSection = sections[currentIndex + 1];
      const nextPlaylist = nextSection.playlistIds?.[0];
      if (nextPlaylist) {
        handleSectionClick(nextPlaylist, currentIndex + 1);
      }
    } else {
      toast.success("🎉 You've reached the end of the course!");
    }
  }

  function goToPreviousSection() {
    const currentIndex = sections.findIndex(
      (s) => s.playlistIds?.[0] === activePlaylist
    );

    if (currentIndex > 0) {
      const prevSection = sections[currentIndex - 1];
      const prevPlaylist = prevSection.playlistIds?.[0];
      if (prevPlaylist) {
        handleSectionClick(prevPlaylist, currentIndex - 1);
      }
    }
  }

  /* ================= MARK COMPLETE ================= */
  function markAsComplete() {
    const currentIndex = sections.findIndex(
      (s) => s.playlistIds?.[0] === activePlaylist
    );

    if (currentIndex !== -1 && !completedSections.includes(currentIndex)) {
      updateProgress(activePlaylist, currentIndex);
    } else {
      toast.success("Already marked as complete!");
    }
  }

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div className="course-detail-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading course...</p>
        </div>
      </div>
    );
  }

  /* ================= NOT FOUND ================= */
  if (!course) {
    return (
      <div className="course-detail-page">
        <div className="not-found">
          <h2>😕 Course Not Found</h2>
          <p>The course you're looking for doesn't exist.</p>
          <button onClick={() => navigate("/courses")}>Browse Courses</button>
        </div>
      </div>
    );
  }

  const currentIndex = sections.findIndex(
    (s) => s.playlistIds?.[0] === activePlaylist
  );

  return (
    <div className="course-detail-page">
      {/* ============ BACK LINK ============ */}
      <Link to="/courses" className="back-link">
        ← Back to Courses
      </Link>

      {/* ============ COURSE HEADER ============ */}
      <div className="course-header">
        <div className="course-title-section">
          <h1>{course.title}</h1>
          <p className="course-description">{course.description}</p>

          <div className="course-meta">
            <span className="meta-badge">
              ⭐ {course.rating || "4.5"}
            </span>
            <span className="meta-badge">
              👥 {course.students || "1000"}+ students
            </span>
            <span className="meta-badge">
              ⏱ {course.duration || "8 weeks"}
            </span>
            <span className="meta-badge">
              📚 {sections.length} sections
            </span>
          </div>
        </div>

        {/* ============ PROGRESS BAR ============ */}
        {user && showProgressBar && (
          <div className="progress-section">
            <div className="progress-header">
              <span className="progress-label">📈 Your Progress</span>
              <span className="progress-percentage">{progress}%</span>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
              >
                {progress > 10 && (
                  <span className="progress-text">{progress}%</span>
                )}
              </div>
            </div>
            <p className="progress-info">
              {completedSections.length} of {sections.length} sections completed
            </p>
          </div>
        )}

        {!user && (
          <div className="login-prompt">
            <p>
              🔐 <Link to="/login">Login</Link> to track your progress
            </p>
          </div>
        )}
      </div>

      {/* ============ FORUM BUTTON ============ */}
      <div className="course-actions-bar">
        <button className="forum-btn" onClick={() => navigate(`/forum/${courseId}`)}>
          💬 Ask Question in Forum
        </button>
      </div>

      {/* ============ VIDEO PLAYER ============ */}
      {activePlaylist ? (
        <div className="video-section">
          <div className="video-wrapper">
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/videoseries?list=${activePlaylist}`}
              title="Course Video Player"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>

          {/* Current Section Info */}
          {currentIndex !== -1 && (
            <div className="current-section-info">
              <h3>📺 {sections[currentIndex]?.title}</h3>
              <p>
                Section {currentIndex + 1} of {sections.length}
              </p>
            </div>
          )}

          {/* Video Controls */}
          <div className="video-controls">
            <button
              className="control-btn prev-btn"
              onClick={goToPreviousSection}
              disabled={currentIndex === 0}
            >
              ⬅ Previous
            </button>

            <button
              className="control-btn complete-btn"
              onClick={markAsComplete}
            >
              {completedSections.includes(currentIndex)
                ? "✓ Completed"
                : "✓ Mark Complete"}
            </button>

            <button
              className="control-btn next-btn"
              onClick={goToNextSection}
              disabled={currentIndex === sections.length - 1}
            >
              Next ➡
            </button>
          </div>
        </div>
      ) : (
        <div className="no-video-placeholder">
          <div className="placeholder-content">
            <span className="placeholder-icon">🎬</span>
            <h3>Select a section to start learning</h3>
            <p>Choose from the course curriculum below</p>
          </div>
        </div>
      )}

      {/* ============ CURRICULUM ============ */}
      <div className="curriculum-section">
        <div className="curriculum-header">
          <h2>📚 Course Curriculum</h2>
          <p className="curriculum-subtitle">
            {sections.length} sections • {completedSections.length} completed
          </p>
        </div>

        <div className="curriculum-list">
          {sections.map((section, index) => {
            const playlistId = section.playlistIds?.[0];
            const isActive = playlistId === activePlaylist;
            const isCompleted = completedSections.includes(index);

            return (
              <div
                key={index}
                className={`curriculum-card ${isActive ? "active" : ""} ${
                  isCompleted ? "completed" : ""
                }`}
                onClick={() => playlistId && handleSectionClick(playlistId, index)}
                style={{ cursor: playlistId ? "pointer" : "not-allowed" }}
              >
                <div className="section-number-badge">
                  {isCompleted ? "✓" : index + 1}
                </div>

                <div className="section-content">
                  <h3 className="section-title">{section.title}</h3>
                  {section.description && (
                    <p className="section-description">{section.description}</p>
                  )}
                </div>

                <div className="section-status-badges">
                  {isActive && (
                    <span className="status-badge playing">▶ Playing</span>
                  )}
                  {isCompleted && !isActive && (
                    <span className="status-badge completed-badge">✓ Done</span>
                  )}
                  {!playlistId && (
                    <span className="status-badge unavailable">🔒 Locked</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============ COURSE FOOTER ============ */}
      <div className="course-footer-actions">
        {progress === 100 && user && (
          <div className="completion-message">
            <h3>🎉 Congratulations!</h3>
            <p>You've completed this course!</p>
            <button
              className="certificate-btn"
              onClick={() => toast.success("Certificate feature coming soon!")}
            >
              🎓 Get Certificate
            </button>
          </div>
        )}

        <button
          className="browse-more-btn"
          onClick={() => navigate("/courses")}
        >
          📚 Browse More Courses
        </button>
      </div>
    </div>
  );
}

export default CourseDetail;