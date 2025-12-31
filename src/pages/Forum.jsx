// // // // // import { useParams, Link } from "react-router-dom";
// // // // // import { useEffect, useState } from "react";
// // // // // import {
// // // // //   collection,
// // // // //   addDoc,
// // // // //   onSnapshot,
// // // // //   query,
// // // // //   where,
// // // // //   serverTimestamp,
// // // // //   doc,
// // // // //   updateDoc,
// // // // //   arrayUnion,
// // // // //   arrayRemove,
// // // // // } from "firebase/firestore";
// // // // // import { auth, db } from "../firebase";
// // // // // import "./Forum.css";

// // // // // function Forum() {
// // // // //   const { courseId } = useParams();

// // // // //   const [title, setTitle] = useState("");
// // // // //   const [description, setDescription] = useState("");
// // // // //   const [forums, setForums] = useState([]);

// // // // //   const createPost = async () => {
// // // // //     if (!auth.currentUser) {
// // // // //       alert("Login required");
// // // // //       return;
// // // // //     }
// // // // //     if (!title || !description) return;

// // // // //     await addDoc(collection(db, "forums"), {
// // // // //       title,
// // // // //       description,
// // // // //       courseId,
// // // // //       userId: auth.currentUser.uid,
// // // // //       userName: auth.currentUser.displayName || "Student",
// // // // //       createdAt: serverTimestamp(),
// // // // //       likesCount: 0,
// // // // //       likedBy: [],
// // // // //     });

// // // // //     setTitle("");
// // // // //     setDescription("");
// // // // //   };

// // // // //   const toggleLike = async (forum) => {
// // // // //     if (!auth.currentUser) {
// // // // //       alert("Login required");
// // // // //       return;
// // // // //     }

// // // // //     const uid = auth.currentUser.uid;
// // // // //     const ref = doc(db, "forums", forum.id);
// // // // //     const alreadyLiked = forum.likedBy?.includes(uid);

// // // // //     await updateDoc(ref, {
// // // // //       likedBy: alreadyLiked ? arrayRemove(uid) : arrayUnion(uid),
// // // // //       likesCount: (forum.likesCount || 0) + (alreadyLiked ? -1 : 1),
// // // // //     });
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     const q = query(
// // // // //       collection(db, "forums"),
// // // // //       where("courseId", "==", courseId)
// // // // //     );

// // // // //     const unsub = onSnapshot(q, (snapshot) => {
// // // // //       setForums(
// // // // //         snapshot.docs.map((doc) => ({
// // // // //           id: doc.id,
// // // // //           ...doc.data(),
// // // // //         }))
// // // // //       );
// // // // //     });

// // // // //     return () => unsub();
// // // // //   }, [courseId]);

// // // // //   return (
// // // // //     <div className="forum-container">
// // // // //       <Link to="/courses" className="back-link">
// // // // //         ← Back to Courses
// // // // //       </Link>

// // // // //       <h2 className="forum-title">💬 Discussion Forum</h2>

// // // // //       <div className="forum-create-box">
// // // // //         <input
// // // // //           placeholder="Question title"
// // // // //           value={title}
// // // // //           onChange={(e) => setTitle(e.target.value)}
// // // // //         />

// // // // //         <textarea
// // // // //           placeholder="Explain your doubt clearly…"
// // // // //           value={description}
// // // // //           onChange={(e) => setDescription(e.target.value)}
// // // // //         />

// // // // //         <button onClick={createPost}>Post Question</button>
// // // // //       </div>

// // // // //       <div className="forum-list">
// // // // //         {forums.length === 0 && <p>No discussions yet.</p>}

// // // // //         {forums.map((f) => (
// // // // //           <div key={f.id} className="forum-card">
// // // // //             <Link to={`/forum-detail/${f.id}`}>
// // // // //               <h4>{f.title}</h4>
// // // // //               <p>{f.description}</p>
// // // // //             </Link>

// // // // //             <div className="forum-footer">
// // // // //               <button onClick={() => toggleLike(f)}>
// // // // //                 👍 {f.likesCount || 0}
// // // // //               </button>
// // // // //               <span>👤 {f.userName}</span>
// // // // //             </div>
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default Forum;
// // // // import { useParams, Link, useNavigate } from "react-router-dom";
// // // // import { useEffect, useState } from "react";
// // // // import {
// // // //   collection,
// // // //   addDoc,
// // // //   onSnapshot,
// // // //   query,
// // // //   where,
// // // //   orderBy,
// // // //   serverTimestamp,
// // // //   doc,
// // // //   updateDoc,
// // // //   arrayUnion,
// // // //   arrayRemove,
// // // //   getDoc,
// // // // } from "firebase/firestore";
// // // // import { auth, db } from "../firebase";
// // // // import { useAuthState } from "react-firebase-hooks/auth";
// // // // import toast from "react-hot-toast";
// // // // import "./Forum.css";

// // // // function Forum() {
// // // //   const { courseId } = useParams();
// // // //   const navigate = useNavigate();
// // // //   const [user] = useAuthState(auth);

// // // //   const [title, setTitle] = useState("");
// // // //   const [description, setDescription] = useState("");
// // // //   const [forums, setForums] = useState([]);
// // // //   const [courseName, setCourseName] = useState("");
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [filter, setFilter] = useState("all"); // all, recent, popular, myPosts

// // // //   /* ================= LOAD COURSE NAME ================= */
// // // //   useEffect(() => {
// // // //     async function loadCourse() {
// // // //       try {
// // // //         const snap = await getDoc(doc(db, "courses", courseId));
// // // //         if (snap.exists()) {
// // // //           setCourseName(snap.data().title);
// // // //         }
// // // //       } catch (error) {
// // // //         console.error("Error loading course:", error);
// // // //       }
// // // //     }
// // // //     loadCourse();
// // // //   }, [courseId]);

// // // //   /* ================= CREATE POST ================= */
// // // //   const createPost = async () => {
// // // //     if (!user) {
// // // //       toast.error("Please login to post");
// // // //       navigate("/login");
// // // //       return;
// // // //     }

// // // //     if (!title.trim() || !description.trim()) {
// // // //       toast.error("Please fill all fields");
// // // //       return;
// // // //     }

// // // //     try {
// // // //       await addDoc(collection(db, "forums"), {
// // // //         title: title.trim(),
// // // //         description: description.trim(),
// // // //         courseId,
// // // //         userId: user.uid,
// // // //         userName: user.displayName || user.email?.split("@")[0] || "Student",
// // // //         userEmail: user.email,
// // // //         createdAt: serverTimestamp(),
// // // //         likesCount: 0,
// // // //         likedBy: [],
// // // //         repliesCount: 0,
// // // //       });

// // // //       setTitle("");
// // // //       setDescription("");
// // // //       toast.success("Question posted successfully!");
// // // //     } catch (error) {
// // // //       console.error("Error creating post:", error);
// // // //       toast.error("Failed to post question");
// // // //     }
// // // //   };

// // // //   /* ================= TOGGLE LIKE ================= */
// // // //   const toggleLike = async (forum, event) => {
// // // //     event.preventDefault();
// // // //     event.stopPropagation();

// // // //     if (!user) {
// // // //       toast.error("Please login to like posts");
// // // //       navigate("/login");
// // // //       return;
// // // //     }

// // // //     const uid = user.uid;
// // // //     const ref = doc(db, "forums", forum.id);
// // // //     const alreadyLiked = forum.likedBy?.includes(uid);

// // // //     try {
// // // //       await updateDoc(ref, {
// // // //         likedBy: alreadyLiked ? arrayRemove(uid) : arrayUnion(uid),
// // // //         likesCount: (forum.likesCount || 0) + (alreadyLiked ? -1 : 1),
// // // //       });
// // // //     } catch (error) {
// // // //       console.error("Error toggling like:", error);
// // // //       toast.error("Failed to update like");
// // // //     }
// // // //   };

// // // //   /* ================= LOAD FORUMS ================= */
// // // //   useEffect(() => {
// // // //     const q = query(
// // // //       collection(db, "forums"),
// // // //       where("courseId", "==", courseId),
// // // //       orderBy("createdAt", "desc")
// // // //     );

// // // //     const unsub = onSnapshot(
// // // //       q,
// // // //       (snapshot) => {
// // // //         setForums(
// // // //           snapshot.docs.map((doc) => ({
// // // //             id: doc.id,
// // // //             ...doc.data(),
// // // //           }))
// // // //         );
// // // //         setLoading(false);
// // // //       },
// // // //       (error) => {
// // // //         console.error("Error loading forums:", error);
// // // //         toast.error("Failed to load discussions");
// // // //         setLoading(false);
// // // //       }
// // // //     );

// // // //     return () => unsub();
// // // //   }, [courseId]);

// // // //   /* ================= FILTER FORUMS ================= */
// // // //   const getFilteredForums = () => {
// // // //     let filtered = [...forums];

// // // //     switch (filter) {
// // // //       case "recent":
// // // //         // Already sorted by createdAt desc
// // // //         break;
// // // //       case "popular":
// // // //         filtered.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
// // // //         break;
// // // //       case "myPosts":
// // // //         filtered = filtered.filter((f) => f.userId === user?.uid);
// // // //         break;
// // // //       default:
// // // //         break;
// // // //     }

// // // //     return filtered;
// // // //   };

// // // //   const filteredForums = getFilteredForums();

// // // //   /* ================= FORMAT DATE ================= */
// // // //   const formatDate = (timestamp) => {
// // // //     if (!timestamp) return "Just now";
// // // //     const date = timestamp.toDate();
// // // //     const now = new Date();
// // // //     const diffMs = now - date;
// // // //     const diffMins = Math.floor(diffMs / 60000);
// // // //     const diffHours = Math.floor(diffMs / 3600000);
// // // //     const diffDays = Math.floor(diffMs / 86400000);

// // // //     if (diffMins < 1) return "Just now";
// // // //     if (diffMins < 60) return `${diffMins}m ago`;
// // // //     if (diffHours < 24) return `${diffHours}h ago`;
// // // //     if (diffDays < 7) return `${diffDays}d ago`;
// // // //     return date.toLocaleDateString();
// // // //   };

// // // //   /* ================= LOADING STATE ================= */
// // // //   if (loading) {
// // // //     return (
// // // //       <div className="forum-container">
// // // //         <div className="loading-container">
// // // //           <div className="spinner"></div>
// // // //           <p>Loading discussions...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="forum-container">
// // // //       {/* ============ BACK LINK ============ */}
// // // //       <Link to={`/course/${courseId}`} className="back-link">
// // // //         ← Back to Course
// // // //       </Link>

// // // //       {/* ============ HEADER ============ */}
// // // //       <div className="forum-header">
// // // //         <h1>💬 Discussion Forum</h1>
// // // //         {courseName && <p className="course-name">Course: {courseName}</p>}
// // // //         <p className="forum-description">
// // // //           Ask questions, share knowledge, and learn together!
// // // //         </p>
// // // //       </div>

// // // //       {/* ============ CREATE POST BOX ============ */}
// // // //       <div className="forum-create-box">
// // // //         <h3>🤔 Ask a Question</h3>
        
// // // //         <input
// // // //           type="text"
// // // //           placeholder="What's your question? (e.g., How to implement Binary Search?)"
// // // //           value={title}
// // // //           onChange={(e) => setTitle(e.target.value)}
// // // //           maxLength={200}
// // // //         />

// // // //         <textarea
// // // //           placeholder="Explain your question in detail. Be specific and provide context..."
// // // //           value={description}
// // // //           onChange={(e) => setDescription(e.target.value)}
// // // //           rows={5}
// // // //           maxLength={1000}
// // // //         />

// // // //         <div className="create-footer">
// // // //           <span className="char-count">
// // // //             {description.length}/1000 characters
// // // //           </span>
// // // //           <button className="btn-post" onClick={createPost}>
// // // //             📝 Post Question
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* ============ FILTERS ============ */}
// // // //       <div className="forum-filters">
// // // //         <button
// // // //           className={`filter-btn ${filter === "all" ? "active" : ""}`}
// // // //           onClick={() => setFilter("all")}
// // // //         >
// // // //           🌐 All Posts
// // // //         </button>
// // // //         <button
// // // //           className={`filter-btn ${filter === "recent" ? "active" : ""}`}
// // // //           onClick={() => setFilter("recent")}
// // // //         >
// // // //           🕐 Recent
// // // //         </button>
// // // //         <button
// // // //           className={`filter-btn ${filter === "popular" ? "active" : ""}`}
// // // //           onClick={() => setFilter("popular")}
// // // //         >
// // // //           🔥 Popular
// // // //         </button>
// // // //         {user && (
// // // //           <button
// // // //             className={`filter-btn ${filter === "myPosts" ? "active" : ""}`}
// // // //             onClick={() => setFilter("myPosts")}
// // // //           >
// // // //             👤 My Posts
// // // //           </button>
// // // //         )}
// // // //       </div>

// // // //       {/* ============ FORUM LIST ============ */}
// // // //       <div className="forum-list">
// // // //         <div className="forum-list-header">
// // // //           <h3>💡 Questions ({filteredForums.length})</h3>
// // // //         </div>

// // // //         {filteredForums.length === 0 ? (
// // // //           <div className="empty-state">
// // // //             <div className="empty-icon">📝</div>
// // // //             <h3>No discussions yet</h3>
// // // //             <p>
// // // //               {filter === "myPosts"
// // // //                 ? "You haven't posted any questions yet"
// // // //                 : "Be the first to ask a question!"}
// // // //             </p>
// // // //           </div>
// // // //         ) : (
// // // //           filteredForums.map((forum) => (
// // // //             <Link
// // // //               key={forum.id}
// // // //               to={`/forum-detail/${forum.id}`}
// // // //               className="forum-card"
// // // //             >
// // // //               <div className="forum-card-header">
// // // //                 <h4 className="forum-title-text">{forum.title}</h4>
// // // //                 {forum.userId === user?.uid && (
// // // //                   <span className="author-badge">Your Post</span>
// // // //                 )}
// // // //               </div>

// // // //               <p className="forum-description">{forum.description}</p>

// // // //               <div className="forum-footer">
// // // //                 <div className="forum-meta">
// // // //                   <span className="meta-item">
// // // //                     👤 {forum.userName}
// // // //                   </span>
// // // //                   <span className="meta-item">
// // // //                     🕐 {formatDate(forum.createdAt)}
// // // //                   </span>
// // // //                   <span className="meta-item">
// // // //                     💬 {forum.repliesCount || 0} replies
// // // //                   </span>
// // // //                 </div>

// // // //                 <button
// // // //                   className={`like-btn ${
// // // //                     forum.likedBy?.includes(user?.uid) ? "liked" : ""
// // // //                   }`}
// // // //                   onClick={(e) => toggleLike(forum, e)}
// // // //                 >
// // // //                   <span className="like-icon">
// // // //                     {forum.likedBy?.includes(user?.uid) ? "❤️" : "🤍"}
// // // //                   </span>
// // // //                   <span className="like-count">{forum.likesCount || 0}</span>
// // // //                 </button>
// // // //               </div>
// // // //             </Link>
// // // //           ))
// // // //         )}
// // // //       </div>

// // // //       {/* ============ FOOTER INFO ============ */}
// // // //       {filteredForums.length > 0 && (
// // // //         <div className="forum-footer-info">
// // // //           <p>
// // // //             💡 <strong>Tip:</strong> Be respectful and help each other learn!
// // // //           </p>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Forum;
// // // import { useParams, Link, useNavigate } from "react-router-dom";
// // // import { useEffect, useState } from "react";
// // // import {
// // //   collection,
// // //   addDoc,
// // //   onSnapshot,
// // //   query,
// // //   where,
// // //   orderBy,
// // //   serverTimestamp,
// // //   doc,
// // //   updateDoc,
// // //   arrayUnion,
// // //   arrayRemove,
// // //   getDoc,
// // //   increment,
// // // } from "firebase/firestore";
// // // import { auth, db } from "../firebase";
// // // import { useAuthState } from "react-firebase-hooks/auth";
// // // import toast from "react-hot-toast";
// // // import "./Forum.css";

// // // function Forum() {
// // //   const { courseId } = useParams();
// // //   const navigate = useNavigate();
// // //   const [user] = useAuthState(auth);

// // //   const [title, setTitle] = useState("");
// // //   const [description, setDescription] = useState("");
// // //   const [forums, setForums] = useState([]);
// // //   const [courseName, setCourseName] = useState("");
// // //   const [loading, setLoading] = useState(true);
// // //   const [filter, setFilter] = useState("all");
// // //   const [searchTerm, setSearchTerm] = useState("");

// // //   /* ================= LOAD COURSE NAME ================= */
// // //   useEffect(() => {
// // //     async function loadCourse() {
// // //       try {
// // //         const snap = await getDoc(doc(db, "courses", courseId));
// // //         if (snap.exists()) {
// // //           setCourseName(snap.data().title);
// // //         }
// // //       } catch (error) {
// // //         console.error("Error loading course:", error);
// // //       }
// // //     }
// // //     loadCourse();
// // //   }, [courseId]);

// // //   /* ================= CREATE POST ================= */
// // //   const createPost = async () => {
// // //     if (!user) {
// // //       toast.error("Please login to post");
// // //       navigate("/login");
// // //       return;
// // //     }

// // //     if (!title.trim() || !description.trim()) {
// // //       toast.error("Please fill all fields");
// // //       return;
// // //     }

// // //     try {
// // //       await addDoc(collection(db, "forums"), {
// // //         title: title.trim(),
// // //         description: description.trim(),
// // //         courseId,
// // //         userId: user.uid,
// // //         userName: user.displayName || user.email?.split("@")[0] || "Student",
// // //         userEmail: user.email,
// // //         createdAt: serverTimestamp(),
// // //         likesCount: 0,
// // //         likedBy: [],
// // //         repliesCount: 0,
// // //       });

// // //       setTitle("");
// // //       setDescription("");
// // //       toast.success("Question posted successfully! 🎉");
// // //     } catch (error) {
// // //       console.error("Error creating post:", error);
// // //       toast.error("Failed to post question");
// // //     }
// // //   };

// // //   /* ================= TOGGLE LIKE ================= */
// // //   const toggleLike = async (forum, event) => {
// // //     event.preventDefault();
// // //     event.stopPropagation();

// // //     if (!user) {
// // //       toast.error("Please login to like posts");
// // //       navigate("/login");
// // //       return;
// // //     }

// // //     const uid = user.uid;
// // //     const ref = doc(db, "forums", forum.id);
// // //     const alreadyLiked = forum.likedBy?.includes(uid);

// // //     try {
// // //       await updateDoc(ref, {
// // //         likedBy: alreadyLiked ? arrayRemove(uid) : arrayUnion(uid),
// // //         likesCount: increment(alreadyLiked ? -1 : 1),
// // //       });
// // //     } catch (error) {
// // //       console.error("Error toggling like:", error);
// // //       toast.error("Failed to update like");
// // //     }
// // //   };

// // //   /* ================= LOAD FORUMS ================= */
// // //   useEffect(() => {
// // //     const q = query(
// // //       collection(db, "forums"),
// // //       where("courseId", "==", courseId),
// // //       orderBy("createdAt", "desc")
// // //     );

// // //     const unsub = onSnapshot(
// // //       q,
// // //       (snapshot) => {
// // //         setForums(
// // //           snapshot.docs.map((doc) => ({
// // //             id: doc.id,
// // //             ...doc.data(),
// // //           }))
// // //         );
// // //         setLoading(false);
// // //       },
// // //       (error) => {
// // //         console.error("Error loading forums:", error);
// // //         toast.error("Failed to load discussions");
// // //         setLoading(false);
// // //       }
// // //     );

// // //     return () => unsub();
// // //   }, [courseId]);

// // //   /* ================= FILTER & SEARCH FORUMS ================= */
// // //   const getFilteredForums = () => {
// // //     let filtered = [...forums];

// // //     // Apply search filter
// // //     if (searchTerm.trim()) {
// // //       filtered = filtered.filter(
// // //         (f) =>
// // //           f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //           f.description.toLowerCase().includes(searchTerm.toLowerCase())
// // //       );
// // //     }

// // //     // Apply category filter
// // //     switch (filter) {
// // //       case "recent":
// // //         // Already sorted by createdAt desc
// // //         break;
// // //       case "popular":
// // //         filtered.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
// // //         break;
// // //       case "myPosts":
// // //         filtered = filtered.filter((f) => f.userId === user?.uid);
// // //         break;
// // //       case "unanswered":
// // //         filtered = filtered.filter((f) => (f.repliesCount || 0) === 0);
// // //         break;
// // //       default:
// // //         break;
// // //     }

// // //     return filtered;
// // //   };

// // //   const filteredForums = getFilteredForums();

// // //   /* ================= FORMAT DATE ================= */
// // //   const formatDate = (timestamp) => {
// // //     if (!timestamp) return "Just now";
// // //     const date = timestamp.toDate();
// // //     const now = new Date();
// // //     const diffMs = now - date;
// // //     const diffMins = Math.floor(diffMs / 60000);
// // //     const diffHours = Math.floor(diffMs / 3600000);
// // //     const diffDays = Math.floor(diffMs / 86400000);

// // //     if (diffMins < 1) return "Just now";
// // //     if (diffMins < 60) return `${diffMins}m ago`;
// // //     if (diffHours < 24) return `${diffHours}h ago`;
// // //     if (diffDays < 7) return `${diffDays}d ago`;
// // //     return date.toLocaleDateString();
// // //   };

// // //   /* ================= LOADING STATE ================= */
// // //   if (loading) {
// // //     return (
// // //       <div className="forum-container">
// // //         <div className="loading-container">
// // //           <div className="spinner"></div>
// // //           <p>Loading discussions...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="forum-container">
// // //       {/* ============ BACK LINK ============ */}
// // //       <Link to={`/course/${courseId}`} className="back-link">
// // //         ← Back to Course
// // //       </Link>

// // //       {/* ============ HEADER ============ */}
// // //       <div className="forum-header">
// // //         <h1>💬 Discussion Forum</h1>
// // //         {courseName && <p className="course-name">{courseName}</p>}
// // //         <p className="forum-description">
// // //           Ask questions, share knowledge, and learn together!
// // //         </p>
// // //       </div>

// // //       {/* ============ SEARCH BOX ============ */}
// // //       <div className="search-section">
// // //         <div className="search-box">
// // //           <span className="search-icon">🔍</span>
// // //           <input
// // //             type="text"
// // //             placeholder="Search discussions..."
// // //             value={searchTerm}
// // //             onChange={(e) => setSearchTerm(e.target.value)}
// // //           />
// // //           {searchTerm && (
// // //             <button
// // //               className="clear-search"
// // //               onClick={() => setSearchTerm("")}
// // //             >
// // //               ✕
// // //             </button>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* ============ CREATE POST BOX ============ */}
// // //       <div className="forum-create-box">
// // //         <h3>🤔 Ask a Question</h3>

// // //         <input
// // //           type="text"
// // //           placeholder="What's your question? (e.g., How to implement Binary Search?)"
// // //           value={title}
// // //           onChange={(e) => setTitle(e.target.value)}
// // //           maxLength={200}
// // //         />

// // //         <textarea
// // //           placeholder="Explain your question in detail. Be specific and provide context..."
// // //           value={description}
// // //           onChange={(e) => setDescription(e.target.value)}
// // //           rows={5}
// // //           maxLength={1000}
// // //         />

// // //         <div className="create-footer">
// // //           <span className="char-count">
// // //             {description.length}/1000 characters
// // //           </span>
// // //           <button className="btn-post" onClick={createPost}>
// // //             📝 Post Question
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* ============ FILTERS ============ */}
// // //       <div className="forum-filters">
// // //         <button
// // //           className={`filter-btn ${filter === "all" ? "active" : ""}`}
// // //           onClick={() => setFilter("all")}
// // //         >
// // //           🌐 All Posts
// // //         </button>
// // //         <button
// // //           className={`filter-btn ${filter === "recent" ? "active" : ""}`}
// // //           onClick={() => setFilter("recent")}
// // //         >
// // //           🕐 Recent
// // //         </button>
// // //         <button
// // //           className={`filter-btn ${filter === "popular" ? "active" : ""}`}
// // //           onClick={() => setFilter("popular")}
// // //         >
// // //           🔥 Popular
// // //         </button>
// // //         <button
// // //           className={`filter-btn ${filter === "unanswered" ? "active" : ""}`}
// // //           onClick={() => setFilter("unanswered")}
// // //         >
// // //           ❓ Unanswered
// // //         </button>
// // //         {user && (
// // //           <button
// // //             className={`filter-btn ${filter === "myPosts" ? "active" : ""}`}
// // //             onClick={() => setFilter("myPosts")}
// // //           >
// // //             👤 My Posts
// // //           </button>
// // //         )}
// // //       </div>

// // //       {/* ============ FORUM LIST ============ */}
// // //       <div className="forum-list">
// // //         <div className="forum-list-header">
// // //           <h3>💡 Questions ({filteredForums.length})</h3>
// // //           {searchTerm && (
// // //             <p className="search-results-info">
// // //               Showing results for "{searchTerm}"
// // //             </p>
// // //           )}
// // //         </div>

// // //         {filteredForums.length === 0 ? (
// // //           <div className="empty-state">
// // //             <div className="empty-icon">
// // //               {searchTerm ? "🔍" : "📝"}
// // //             </div>
// // //             <h3>
// // //               {searchTerm
// // //                 ? "No results found"
// // //                 : filter === "myPosts"
// // //                 ? "You haven't posted yet"
// // //                 : filter === "unanswered"
// // //                 ? "All questions are answered!"
// // //                 : "No discussions yet"}
// // //             </h3>
// // //             <p>
// // //               {searchTerm
// // //                 ? "Try different keywords"
// // //                 : filter === "myPosts"
// // //                 ? "Ask your first question above!"
// // //                 : "Be the first to start a discussion!"}
// // //             </p>
// // //           </div>
// // //         ) : (
// // //           filteredForums.map((forum) => (
// // //             <Link
// // //               key={forum.id}
// // //               to={`/forum-detail/${forum.id}`}
// // //               className="forum-card"
// // //             >
// // //               <div className="forum-card-header">
// // //                 <h4 className="forum-title-text">{forum.title}</h4>
// // //                 {forum.userId === user?.uid && (
// // //                   <span className="author-badge">Your Post</span>
// // //                 )}
// // //               </div>

// // //               <p className="forum-description">{forum.description}</p>

// // //               <div className="forum-footer">
// // //                 <div className="forum-meta">
// // //                   <span className="meta-item">👤 {forum.userName}</span>
// // //                   <span className="meta-item">
// // //                     🕐 {formatDate(forum.createdAt)}
// // //                   </span>
// // //                   <span className="meta-item">
// // //                     💬 {forum.repliesCount || 0}{" "}
// // //                     {forum.repliesCount === 1 ? "reply" : "replies"}
// // //                   </span>
// // //                 </div>

// // //                 <button
// // //                   className={`like-btn ${
// // //                     forum.likedBy?.includes(user?.uid) ? "liked" : ""
// // //                   }`}
// // //                   onClick={(e) => toggleLike(forum, e)}
// // //                 >
// // //                   <span className="like-icon">
// // //                     {forum.likedBy?.includes(user?.uid) ? "❤️" : "🤍"}
// // //                   </span>
// // //                   <span className="like-count">{forum.likesCount || 0}</span>
// // //                 </button>
// // //               </div>
// // //             </Link>
// // //           ))
// // //         )}
// // //       </div>

// // //       {/* ============ FOOTER INFO ============ */}
// // //       {filteredForums.length > 0 && (
// // //         <div className="forum-footer-info">
// // //           <p>
// // //             💡 <strong>Tip:</strong> Be respectful and help each other learn!
// // //           </p>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default Forum;
// // import { useParams, Link, useNavigate } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import {
// //   collection,
// //   addDoc,
// //   onSnapshot,
// //   query,
// //   where,
// //   orderBy,
// //   serverTimestamp,
// //   doc,
// //   updateDoc,
// //   arrayUnion,
// //   arrayRemove,
// //   getDoc,
// //   increment,
// // } from "firebase/firestore";
// // import { auth, db } from "../firebase";
// // import { useAuthState } from "react-firebase-hooks/auth";
// // import toast from "react-hot-toast";
// // import "./Forum.css";

// // function Forum() {
// //   const { courseId } = useParams();
// //   const navigate = useNavigate();
// //   const [user] = useAuthState(auth);

// //   const [title, setTitle] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [forums, setForums] = useState([]);
// //   const [courseName, setCourseName] = useState("");
// //   const [loading, setLoading] = useState(true);
// //   const [filter, setFilter] = useState("all");
// //   const [searchTerm, setSearchTerm] = useState("");

// //   /* ================= LOAD COURSE NAME ================= */
// //   useEffect(() => {
// //     async function loadCourse() {
// //       try {
// //         const snap = await getDoc(doc(db, "courses", courseId));
// //         if (snap.exists()) {
// //           setCourseName(snap.data().title);
// //         }
// //       } catch (error) {
// //         console.error("Error loading course:", error);
// //       }
// //     }
// //     loadCourse();
// //   }, [courseId]);

// //   /* ================= CREATE POST ================= */
// //   const createPost = async () => {
// //     if (!user) {
// //       toast.error("Please login to post");
// //       navigate("/login");
// //       return;
// //     }

// //     if (!title.trim() || !description.trim()) {
// //       toast.error("Please fill all fields");
// //       return;
// //     }

// //     try {
// //       await addDoc(collection(db, "forums"), {
// //         title: title.trim(),
// //         description: description.trim(),
// //         courseId,
// //         userId: user.uid,
// //         userName: user.displayName || user.email?.split("@")[0] || "Student",
// //         userEmail: user.email,
// //         createdAt: serverTimestamp(),
// //         likesCount: 0,
// //         likedBy: [],
// //         repliesCount: 0,
// //       });

// //       setTitle("");
// //       setDescription("");
// //       toast.success("Question posted successfully! 🎉");
// //     } catch (error) {
// //       console.error("Error creating post:", error);
// //       toast.error("Failed to post question");
// //     }
// //   };

// //   /* ================= TOGGLE LIKE ================= */
// //   const toggleLike = async (forum, event) => {
// //     event.preventDefault();
// //     event.stopPropagation();

// //     if (!user) {
// //       toast.error("Please login to like posts");
// //       navigate("/login");
// //       return;
// //     }

// //     const uid = user.uid;
// //     const ref = doc(db, "forums", forum.id);
// //     const alreadyLiked = forum.likedBy?.includes(uid);

// //     try {
// //       await updateDoc(ref, {
// //         likedBy: alreadyLiked ? arrayRemove(uid) : arrayUnion(uid),
// //         likesCount: increment(alreadyLiked ? -1 : 1),
// //       });
// //     } catch (error) {
// //       console.error("Error toggling like:", error);
// //       toast.error("Failed to update like");
// //     }
// //   };

// //   /* ================= LOAD FORUMS ================= */
// //   useEffect(() => {
// //     const q = query(
// //       collection(db, "forums"),
// //       where("courseId", "==", courseId),
// //       orderBy("createdAt", "desc")
// //     );

// //     const unsub = onSnapshot(
// //       q,
// //       (snapshot) => {
// //         setForums(
// //           snapshot.docs.map((doc) => ({
// //             id: doc.id,
// //             ...doc.data(),
// //           }))
// //         );
// //         setLoading(false);
// //       },
// //       (error) => {
// //         console.error("Error loading forums:", error);
// //         toast.error("Failed to load discussions");
// //         setLoading(false);
// //       }
// //     );

// //     return () => unsub();
// //   }, [courseId]);

// //   /* ================= FILTER & SEARCH FORUMS ================= */
// //   const getFilteredForums = () => {
// //     let filtered = [...forums];

// //     // Apply search filter
// //     if (searchTerm.trim()) {
// //       filtered = filtered.filter(
// //         (f) =>
// //           f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //           f.description.toLowerCase().includes(searchTerm.toLowerCase())
// //       );
// //     }

// //     // Apply category filter
// //     switch (filter) {
// //       case "recent":
// //         // Already sorted by createdAt desc
// //         break;
// //       case "popular":
// //         filtered.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
// //         break;
// //       case "myPosts":
// //         filtered = filtered.filter((f) => f.userId === user?.uid);
// //         break;
// //       case "unanswered":
// //         filtered = filtered.filter((f) => (f.repliesCount || 0) === 0);
// //         break;
// //       default:
// //         break;
// //     }

// //     return filtered;
// //   };

// //   const filteredForums = getFilteredForums();

// //   /* ================= FORMAT DATE ================= */
// //   const formatDate = (timestamp) => {
// //     if (!timestamp) return "Just now";
// //     const date = timestamp.toDate();
// //     const now = new Date();
// //     const diffMs = now - date;
// //     const diffMins = Math.floor(diffMs / 60000);
// //     const diffHours = Math.floor(diffMs / 3600000);
// //     const diffDays = Math.floor(diffMs / 86400000);

// //     if (diffMins < 1) return "Just now";
// //     if (diffMins < 60) return `${diffMins}m ago`;
// //     if (diffHours < 24) return `${diffHours}h ago`;
// //     if (diffDays < 7) return `${diffDays}d ago`;
// //     return date.toLocaleDateString();
// //   };

// //   /* ================= LOADING STATE ================= */
// //   if (loading) {
// //     return (
// //       <div className="forum-container">
// //         <div className="loading-container">
// //           <div className="spinner"></div>
// //           <p>Loading discussions...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="forum-container">
// //       {/* ============ BACK LINK ============ */}
// //       <Link to={`/course/${courseId}`} className="back-link">
// //         ← Back to Course
// //       </Link>

// //       {/* ============ HEADER ============ */}
// //       <div className="forum-header">
// //         <h1>💬 Discussion Forum</h1>
// //         {courseName && <p className="course-name">{courseName}</p>}
// //         <p className="forum-description">
// //           Ask questions, share knowledge, and learn together!
// //         </p>
// //       </div>

// //       {/* ============ SEARCH BOX ============ */}
// //       <div className="search-section">
// //         <div className="search-box">
// //           <span className="search-icon">🔍</span>
// //           <input
// //             type="text"
// //             placeholder="Search discussions..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //           />
// //           {searchTerm && (
// //             <button
// //               className="clear-search"
// //               onClick={() => setSearchTerm("")}
// //             >
// //               ✕
// //             </button>
// //           )}
// //         </div>
// //       </div>

// //       {/* ============ CREATE POST BOX ============ */}
// //       <div className="forum-create-box">
// //         <h3>🤔 Ask a Question</h3>

// //         <input
// //           type="text"
// //           placeholder="What's your question? (e.g., How to implement Binary Search?)"
// //           value={title}
// //           onChange={(e) => setTitle(e.target.value)}
// //           onKeyPress={(e) => {
// //             if (e.key === 'Enter') {
// //               e.preventDefault();
// //             }
// //           }}
// //           maxLength={200}
// //         />

// //         <textarea
// //           placeholder="Explain your question in detail. Be specific and provide context..."
// //           value={description}
// //           onChange={(e) => setDescription(e.target.value)}
// //           onKeyPress={(e) => {
// //             if (e.key === 'Enter' && e.ctrlKey) {
// //               createPost();
// //             }
// //           }}
// //           rows={5}
// //           maxLength={1000}
// //         />

// //         <div className="create-footer">
// //           <span className="char-count">
// //             {description.length}/1000 characters
// //           </span>
// //           <button 
// //             className="btn-post" 
// //             onClick={createPost}
// //             type="button"
// //           >
// //             📝 Post Question
// //           </button>
// //         </div>
// //       </div>

// //       {/* ============ FILTERS ============ */}
// //       <div className="forum-filters">
// //         <button
// //           className={`filter-btn ${filter === "all" ? "active" : ""}`}
// //           onClick={() => setFilter("all")}
// //         >
// //           🌐 All Posts
// //         </button>
// //         <button
// //           className={`filter-btn ${filter === "recent" ? "active" : ""}`}
// //           onClick={() => setFilter("recent")}
// //         >
// //           🕐 Recent
// //         </button>
// //         <button
// //           className={`filter-btn ${filter === "popular" ? "active" : ""}`}
// //           onClick={() => setFilter("popular")}
// //         >
// //           🔥 Popular
// //         </button>
// //         <button
// //           className={`filter-btn ${filter === "unanswered" ? "active" : ""}`}
// //           onClick={() => setFilter("unanswered")}
// //         >
// //           ❓ Unanswered
// //         </button>
// //         {user && (
// //           <button
// //             className={`filter-btn ${filter === "myPosts" ? "active" : ""}`}
// //             onClick={() => setFilter("myPosts")}
// //           >
// //             👤 My Posts
// //           </button>
// //         )}
// //       </div>

// //       {/* ============ FORUM LIST ============ */}
// //       <div className="forum-list">
// //         <div className="forum-list-header">
// //           <h3>💡 Questions ({filteredForums.length})</h3>
// //           {searchTerm && (
// //             <p className="search-results-info">
// //               Showing results for "{searchTerm}"
// //             </p>
// //           )}
// //         </div>

// //         {filteredForums.length === 0 ? (
// //           <div className="empty-state">
// //             <div className="empty-icon">
// //               {searchTerm ? "🔍" : "📝"}
// //             </div>
// //             <h3>
// //               {searchTerm
// //                 ? "No results found"
// //                 : filter === "myPosts"
// //                 ? "You haven't posted yet"
// //                 : filter === "unanswered"
// //                 ? "All questions are answered!"
// //                 : "No discussions yet"}
// //             </h3>
// //             <p>
// //               {searchTerm
// //                 ? "Try different keywords"
// //                 : filter === "myPosts"
// //                 ? "Ask your first question above!"
// //                 : "Be the first to start a discussion!"}
// //             </p>
// //           </div>
// //         ) : (
// //           filteredForums.map((forum) => (
// //             <Link
// //               key={forum.id}
// //               to={`/forum-detail/${forum.id}`}
// //               className="forum-card"
// //             >
// //               <div className="forum-card-header">
// //                 <h4 className="forum-title-text">{forum.title}</h4>
// //                 {forum.userId === user?.uid && (
// //                   <span className="author-badge">Your Post</span>
// //                 )}
// //               </div>

// //               <p className="forum-description">{forum.description}</p>

// //               <div className="forum-footer">
// //                 <div className="forum-meta">
// //                   <span className="meta-item">👤 {forum.userName}</span>
// //                   <span className="meta-item">
// //                     🕐 {formatDate(forum.createdAt)}
// //                   </span>
// //                   <span className="meta-item">
// //                     💬 {forum.repliesCount || 0}{" "}
// //                     {forum.repliesCount === 1 ? "reply" : "replies"}
// //                   </span>
// //                 </div>

// //                 <button
// //                   className={`like-btn ${
// //                     forum.likedBy?.includes(user?.uid) ? "liked" : ""
// //                   }`}
// //                   onClick={(e) => toggleLike(forum, e)}
// //                 >
// //                   <span className="like-icon">
// //                     {forum.likedBy?.includes(user?.uid) ? "❤️" : "🤍"}
// //                   </span>
// //                   <span className="like-count">{forum.likesCount || 0}</span>
// //                 </button>
// //               </div>
// //             </Link>
// //           ))
// //         )}
// //       </div>

// //       {/* ============ FOOTER INFO ============ */}
// //       {filteredForums.length > 0 && (
// //         <div className="forum-footer-info">
// //           <p>
// //             💡 <strong>Tip:</strong> Be respectful and help each other learn!
// //           </p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Forum;
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import {
//   collection,
//   addDoc,
//   onSnapshot,
//   query,
//   where,
//   orderBy,
//   serverTimestamp,
//   doc,
//   updateDoc,
//   arrayUnion,
//   arrayRemove,
//   getDoc,
//   increment,
// } from "firebase/firestore";
// import { auth, db } from "../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import toast from "react-hot-toast";
// import "./Forum.css";

// function Forum() {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const [user] = useAuthState(auth);

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [forums, setForums] = useState([]);
//   const [courseName, setCourseName] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");

//   /* ================= LOAD COURSE NAME ================= */
//   useEffect(() => {
//     async function loadCourse() {
//       try {
//         const snap = await getDoc(doc(db, "courses", courseId));
//         if (snap.exists()) {
//           setCourseName(snap.data().title);
//         }
//       } catch (error) {
//         console.error("Error loading course:", error);
//       }
//     }
//     loadCourse();
//   }, [courseId]);

//   /* ================= CREATE POST ================= */
//   const createPost = async () => {
//     if (!user) {
//       toast.error("Please login to post");
//       navigate("/login");
//       return;
//     }

//     if (!title.trim() || !description.trim()) {
//       toast.error("Please fill all fields");
//       return;
//     }

//     if (!courseId) {
//       toast.error("Invalid course");
//       return;
//     }

//     try {
//       console.log("Creating post for courseId:", courseId); // Debug log

//       await addDoc(collection(db, "forums"), {
//         title: title.trim(),
//         description: description.trim(),
//         courseId: courseId,
//         userId: user.uid,
//         userName: user.displayName || user.email?.split("@")[0] || "Student",
//         userEmail: user.email,
//         createdAt: serverTimestamp(),
//         likesCount: 0,
//         likedBy: [],
//         repliesCount: 0,
//       });

//       setTitle("");
//       setDescription("");
//       toast.success("Question posted successfully! 🎉");
//     } catch (error) {
//       console.error("Error creating post:", error);
      
//       if (error.code === 'permission-denied') {
//         toast.error("Permission denied. Please check Firebase rules.");
//       } else if (error.code === 'failed-precondition') {
//         toast.error("Database index needed. Please wait 1-2 minutes.");
//       } else {
//         toast.error("Failed to post question");
//       }
//     }
//   };

//   /* ================= TOGGLE LIKE ================= */
//   const toggleLike = async (forum, event) => {
//     event.preventDefault();
//     event.stopPropagation();

//     if (!user) {
//       toast.error("Please login to like posts");
//       navigate("/login");
//       return;
//     }

//     const uid = user.uid;
//     const ref = doc(db, "forums", forum.id);
//     const alreadyLiked = forum.likedBy?.includes(uid);

//     try {
//       await updateDoc(ref, {
//         likedBy: alreadyLiked ? arrayRemove(uid) : arrayUnion(uid),
//         likesCount: increment(alreadyLiked ? -1 : 1),
//       });
//     } catch (error) {
//       console.error("Error toggling like:", error);
//       toast.error("Failed to update like");
//     }
//   };

//   /* ================= LOAD FORUMS ================= */
//   useEffect(() => {
//     if (!courseId) {
//       setLoading(false);
//       return;
//     }

//     console.log("Loading forums for courseId:", courseId); // Debug log

//     const q = query(
//       collection(db, "forums"),
//       where("courseId", "==", courseId),
//       orderBy("createdAt", "desc")
//     );

//     const unsub = onSnapshot(
//       q,
//       (snapshot) => {
//         console.log("Forums loaded:", snapshot.docs.length); // Debug log
//         setForums(
//           snapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }))
//         );
//         setLoading(false);
//       },
//       (error) => {
//         console.error("Error loading forums:", error);
        
//         // Check if it's an index error
//         if (error.code === 'failed-precondition') {
//           toast.error("Creating database index... Please wait 1-2 minutes and refresh");
//         } else {
//           toast.error("Failed to load discussions");
//         }
        
//         setLoading(false);
//       }
//     );

//     return () => unsub();
//   }, [courseId]);

//   /* ================= FILTER & SEARCH FORUMS ================= */
//   const getFilteredForums = () => {
//     let filtered = [...forums];

//     // Apply search filter
//     if (searchTerm.trim()) {
//       filtered = filtered.filter(
//         (f) =>
//           f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           f.description.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Apply category filter
//     switch (filter) {
//       case "recent":
//         // Already sorted by createdAt desc
//         break;
//       case "popular":
//         filtered.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
//         break;
//       case "myPosts":
//         filtered = filtered.filter((f) => f.userId === user?.uid);
//         break;
//       case "unanswered":
//         filtered = filtered.filter((f) => (f.repliesCount || 0) === 0);
//         break;
//       default:
//         break;
//     }

//     return filtered;
//   };

//   const filteredForums = getFilteredForums();

//   /* ================= FORMAT DATE ================= */
//   const formatDate = (timestamp) => {
//     if (!timestamp) return "Just now";
//     const date = timestamp.toDate();
//     const now = new Date();
//     const diffMs = now - date;
//     const diffMins = Math.floor(diffMs / 60000);
//     const diffHours = Math.floor(diffMs / 3600000);
//     const diffDays = Math.floor(diffMs / 86400000);

//     if (diffMins < 1) return "Just now";
//     if (diffMins < 60) return `${diffMins}m ago`;
//     if (diffHours < 24) return `${diffHours}h ago`;
//     if (diffDays < 7) return `${diffDays}d ago`;
//     return date.toLocaleDateString();
//   };

//   /* ================= LOADING STATE ================= */
//   if (loading) {
//     return (
//       <div className="forum-container">
//         <div className="loading-container">
//           <div className="spinner"></div>
//           <p>Loading discussions...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="forum-container">
//       {/* ============ BACK LINK ============ */}
//       <Link to={`/course/${courseId}`} className="back-link">
//         ← Back to Course
//       </Link>

//       {/* ============ HEADER ============ */}
//       <div className="forum-header">
//         <h1>💬 Discussion Forum</h1>
//         {courseName && <p className="course-name">{courseName}</p>}
//         <p className="forum-description">
//           Ask questions, share knowledge, and learn together!
//         </p>
//       </div>

//       {/* ============ SEARCH BOX ============ */}
//       <div className="search-section">
//         <div className="search-box">
//           <span className="search-icon">🔍</span>
//           <input
//             type="text"
//             placeholder="Search discussions..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           {searchTerm && (
//             <button
//               className="clear-search"
//               onClick={() => setSearchTerm("")}
//             >
//               ✕
//             </button>
//           )}
//         </div>
//       </div>

//       {/* ============ CREATE POST BOX ============ */}
//       <div className="forum-create-box">
//         <h3>🤔 Ask a Question</h3>

//         <input
//           type="text"
//           placeholder="What's your question? (e.g., How to implement Binary Search?)"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           onKeyPress={(e) => {
//             if (e.key === 'Enter') {
//               e.preventDefault();
//             }
//           }}
//           maxLength={200}
//         />

//         <textarea
//           placeholder="Explain your question in detail. Be specific and provide context..."
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           onKeyPress={(e) => {
//             if (e.key === 'Enter' && e.ctrlKey) {
//               createPost();
//             }
//           }}
//           rows={5}
//           maxLength={1000}
//         />

//         <div className="create-footer">
//           <span className="char-count">
//             {description.length}/1000 characters
//           </span>
//           <button 
//             className="btn-post" 
//             onClick={createPost}
//             type="button"
//           >
//             📝 Post Question
//           </button>
//         </div>
//       </div>

//       {/* ============ FILTERS ============ */}
//       <div className="forum-filters">
//         <button
//           className={`filter-btn ${filter === "all" ? "active" : ""}`}
//           onClick={() => setFilter("all")}
//         >
//           🌐 All Posts
//         </button>
//         <button
//           className={`filter-btn ${filter === "recent" ? "active" : ""}`}
//           onClick={() => setFilter("recent")}
//         >
//           🕐 Recent
//         </button>
//         <button
//           className={`filter-btn ${filter === "popular" ? "active" : ""}`}
//           onClick={() => setFilter("popular")}
//         >
//           🔥 Popular
//         </button>
//         <button
//           className={`filter-btn ${filter === "unanswered" ? "active" : ""}`}
//           onClick={() => setFilter("unanswered")}
//         >
//           ❓ Unanswered
//         </button>
//         {user && (
//           <button
//             className={`filter-btn ${filter === "myPosts" ? "active" : ""}`}
//             onClick={() => setFilter("myPosts")}
//           >
//             👤 My Posts
//           </button>
//         )}
//       </div>

//       {/* ============ FORUM LIST ============ */}
//       <div className="forum-list">
//         <div className="forum-list-header">
//           <h3>💡 Questions ({filteredForums.length})</h3>
//           {searchTerm && (
//             <p className="search-results-info">
//               Showing results for "{searchTerm}"
//             </p>
//           )}
//         </div>

//         {filteredForums.length === 0 ? (
//           <div className="empty-state">
//             <div className="empty-icon">
//               {searchTerm ? "🔍" : "📝"}
//             </div>
//             <h3>
//               {searchTerm
//                 ? "No results found"
//                 : filter === "myPosts"
//                 ? "You haven't posted yet"
//                 : filter === "unanswered"
//                 ? "All questions are answered!"
//                 : "No discussions yet"}
//             </h3>
//             <p>
//               {searchTerm
//                 ? "Try different keywords"
//                 : filter === "myPosts"
//                 ? "Ask your first question above!"
//                 : "Be the first to start a discussion!"}
//             </p>
//           </div>
//         ) : (
//           filteredForums.map((forum) => (
//             <Link
//               key={forum.id}
//               to={`/forum-detail/${forum.id}`}
//               className="forum-card"
//             >
//               <div className="forum-card-header">
//                 <h4 className="forum-title-text">{forum.title}</h4>
//                 {forum.userId === user?.uid && (
//                   <span className="author-badge">Your Post</span>
//                 )}
//               </div>

//               <p className="forum-description">{forum.description}</p>

//               <div className="forum-footer">
//                 <div className="forum-meta">
//                   <span className="meta-item">👤 {forum.userName}</span>
//                   <span className="meta-item">
//                     🕐 {formatDate(forum.createdAt)}
//                   </span>
//                   <span className="meta-item">
//                     💬 {forum.repliesCount || 0}{" "}
//                     {forum.repliesCount === 1 ? "reply" : "replies"}
//                   </span>
//                 </div>

//                 <button
//                   className={`like-btn ${
//                     forum.likedBy?.includes(user?.uid) ? "liked" : ""
//                   }`}
//                   onClick={(e) => toggleLike(forum, e)}
//                 >
//                   <span className="like-icon">
//                     {forum.likedBy?.includes(user?.uid) ? "❤️" : "🤍"}
//                   </span>
//                   <span className="like-count">{forum.likesCount || 0}</span>
//                 </button>
//               </div>
//             </Link>
//           ))
//         )}
//       </div>

//       {/* ============ FOOTER INFO ============ */}
//       {filteredForums.length > 0 && (
//         <div className="forum-footer-info">
//           <p>
//             💡 <strong>Tip:</strong> Be respectful and help each other learn!
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Forum;
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  increment,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import "./Forum.css";

function Forum() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [forums, setForums] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  /* ================= LOAD COURSE NAME ================= */
  useEffect(() => {
    async function loadCourse() {
      try {
        const snap = await getDoc(doc(db, "courses", courseId));
        if (snap.exists()) {
          setCourseName(snap.data().title);
        }
      } catch (error) {
        console.error("Error loading course:", error);
      }
    }
    loadCourse();
  }, [courseId]);

  /* ================= CREATE POST ================= */
  const createPost = async () => {
    if (!user) {
      toast.error("Please login to post");
      navigate("/login");
      return;
    }

    if (!title.trim() || !description.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    if (!courseId) {
      toast.error("Invalid course");
      return;
    }

    try {
      console.log("Creating post for courseId:", courseId); // Debug log

      await addDoc(collection(db, "forums"), {
        title: title.trim(),
        description: description.trim(),
        courseId: courseId,
        userId: user.uid,
        userName: user.displayName || user.email?.split("@")[0] || "Student",
        userEmail: user.email,
        createdAt: serverTimestamp(),
        likesCount: 0,
        likedBy: [],
        repliesCount: 0,
      });

      setTitle("");
      setDescription("");
      toast.success("Question posted successfully! 🎉");
    } catch (error) {
      console.error("Error creating post:", error);
      
      if (error.code === 'permission-denied') {
        toast.error("Permission denied. Please check Firebase rules.");
      } else if (error.code === 'failed-precondition') {
        toast.error("Database index needed. Please wait 1-2 minutes.");
      } else {
        toast.error("Failed to post question");
      }
    }
  };

  /* ================= TOGGLE LIKE ================= */
  const toggleLike = async (forum, event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!user) {
      toast.error("Please login to like posts");
      navigate("/login");
      return;
    }

    const uid = user.uid;
    const ref = doc(db, "forums", forum.id);
    const alreadyLiked = forum.likedBy?.includes(uid);

    try {
      await updateDoc(ref, {
        likedBy: alreadyLiked ? arrayRemove(uid) : arrayUnion(uid),
        likesCount: increment(alreadyLiked ? -1 : 1),
      });
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Failed to update like");
    }
  };

  /* ================= LOAD FORUMS ================= */
  useEffect(() => {
    if (!courseId) {
      setLoading(false);
      return;
    }

    console.log("Loading forums for courseId:", courseId); // Debug log

    const q = query(
      collection(db, "forums"),
      where("courseId", "==", courseId),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        console.log("Forums loaded:", snapshot.docs.length); // Debug log
        setForums(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setLoading(false);
      },
      (error) => {
        console.error("Error loading forums:", error);
        
        // Check if it's an index error
        if (error.code === 'failed-precondition') {
          toast.error("Creating database index... Please wait 1-2 minutes and refresh");
        } else {
          toast.error("Failed to load discussions");
        }
        
        setLoading(false);
      }
    );

    return () => unsub();
  }, [courseId]);

  /* ================= FILTER & SEARCH FORUMS ================= */
  const getFilteredForums = () => {
    let filtered = [...forums];

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (f) =>
          f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    switch (filter) {
      case "recent":
        // Already sorted by createdAt desc
        break;
      case "popular":
        filtered.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
        break;
      case "myPosts":
        filtered = filtered.filter((f) => f.userId === user?.uid);
        break;
      case "unanswered":
        filtered = filtered.filter((f) => (f.repliesCount || 0) === 0);
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredForums = getFilteredForums();

  /* ================= FORMAT DATE ================= */
  const formatDate = (timestamp) => {
    if (!timestamp) return "Just now";
    const date = timestamp.toDate();
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div className="forum-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading discussions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="forum-container">
      {/* ============ BACK LINK ============ */}
      <Link to={`/course/${courseId}`} className="back-link">
        ← Back to Course
      </Link>

      {/* ============ HEADER ============ */}
      <div className="forum-header">
        <h1>💬 Discussion Forum</h1>
        {courseName && <p className="course-name">{courseName}</p>}
        <p className="forum-description">
          Ask questions, share knowledge, and learn together!
        </p>
      </div>

      {/* ============ SEARCH BOX ============ */}
      <div className="search-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search discussions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search discussions"
          />
          {searchTerm && (
            <button
              className="clear-search"
              onClick={() => setSearchTerm("")}
              type="button"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ============ CREATE POST BOX ============ */}
      <div className="forum-create-box">
        <h3>🤔 Ask a Question</h3>

        <input
          type="text"
          placeholder="What's your question? (e.g., How to implement Binary Search?)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
          maxLength={200}
          aria-label="Question title"
          id="question-title"
          name="title"
        />

        <textarea
          placeholder="Explain your question in detail. Be specific and provide context..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
              createPost();
            }
          }}
          rows={5}
          maxLength={1000}
          aria-label="Question description"
          id="question-description"
          name="description"
        />

        <div className="create-footer">
          <span className="char-count">
            {description.length}/1000 characters
          </span>
          <button 
            className="btn-post" 
            onClick={createPost}
            type="button"
          >
            📝 Post Question
          </button>
        </div>
      </div>

      {/* ============ FILTERS ============ */}
      <div className="forum-filters">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          🌐 All Posts
        </button>
        <button
          className={`filter-btn ${filter === "recent" ? "active" : ""}`}
          onClick={() => setFilter("recent")}
        >
          🕐 Recent
        </button>
        <button
          className={`filter-btn ${filter === "popular" ? "active" : ""}`}
          onClick={() => setFilter("popular")}
        >
          🔥 Popular
        </button>
        <button
          className={`filter-btn ${filter === "unanswered" ? "active" : ""}`}
          onClick={() => setFilter("unanswered")}
        >
          ❓ Unanswered
        </button>
        {user && (
          <button
            className={`filter-btn ${filter === "myPosts" ? "active" : ""}`}
            onClick={() => setFilter("myPosts")}
          >
            👤 My Posts
          </button>
        )}
      </div>

      {/* ============ FORUM LIST ============ */}
      <div className="forum-list">
        <div className="forum-list-header">
          <h3>💡 Questions ({filteredForums.length})</h3>
          {searchTerm && (
            <p className="search-results-info">
              Showing results for "{searchTerm}"
            </p>
          )}
        </div>

        {filteredForums.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              {searchTerm ? "🔍" : "📝"}
            </div>
            <h3>
              {searchTerm
                ? "No results found"
                : filter === "myPosts"
                ? "You haven't posted yet"
                : filter === "unanswered"
                ? "All questions are answered!"
                : "No discussions yet"}
            </h3>
            <p>
              {searchTerm
                ? "Try different keywords"
                : filter === "myPosts"
                ? "Ask your first question above!"
                : "Be the first to start a discussion!"}
            </p>
          </div>
        ) : (
          filteredForums.map((forum) => (
            <Link
              key={forum.id}
              to={`/forum-detail/${forum.id}`}
              className="forum-card"
            >
              <div className="forum-card-header">
                <h4 className="forum-title-text">{forum.title}</h4>
                {forum.userId === user?.uid && (
                  <span className="author-badge">Your Post</span>
                )}
              </div>

              <p className="forum-description">{forum.description}</p>

              <div className="forum-footer">
                <div className="forum-meta">
                  <span className="meta-item">👤 {forum.userName}</span>
                  <span className="meta-item">
                    🕐 {formatDate(forum.createdAt)}
                  </span>
                  <span className="meta-item">
                    💬 {forum.repliesCount || 0}{" "}
                    {forum.repliesCount === 1 ? "reply" : "replies"}
                  </span>
                </div>

                <button
                  className={`like-btn ${
                    forum.likedBy?.includes(user?.uid) ? "liked" : ""
                  }`}
                  onClick={(e) => toggleLike(forum, e)}
                >
                  <span className="like-icon">
                    {forum.likedBy?.includes(user?.uid) ? "❤️" : "🤍"}
                  </span>
                  <span className="like-count">{forum.likesCount || 0}</span>
                </button>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* ============ FOOTER INFO ============ */}
      {filteredForums.length > 0 && (
        <div className="forum-footer-info">
          <p>
            💡 <strong>Tip:</strong> Be respectful and help each other learn!
          </p>
        </div>
      )}
    </div>
  );
}

export default Forum;