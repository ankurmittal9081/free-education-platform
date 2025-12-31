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
//   getDoc,
//   updateDoc,
//   arrayUnion,
//   arrayRemove,
//   increment,
// } from "firebase/firestore";
// import { auth, db } from "../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import toast from "react-hot-toast";
// import "./ForumDetail.css";

// function ForumDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user] = useAuthState(auth);

//   const [forum, setForum] = useState(null);
//   const [replies, setReplies] = useState([]);
//   const [replyText, setReplyText] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   /* ================= LOAD FORUM POST ================= */
//   useEffect(() => {
//     async function loadForum() {
//       try {
//         const snap = await getDoc(doc(db, "forums", id));
//         if (snap.exists()) {
//           setForum({ id: snap.id, ...snap.data() });
//         } else {
//           toast.error("Discussion not found");
//           navigate("/courses");
//         }
//       } catch (error) {
//         console.error("Error loading forum:", error);
//         toast.error("Failed to load discussion");
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadForum();
//   }, [id, navigate]);

//   /* ================= LOAD REPLIES ================= */
//   useEffect(() => {
//     const q = query(
//       collection(db, "replies"),
//       where("forumId", "==", id),
//       orderBy("createdAt", "asc")
//     );

//     const unsub = onSnapshot(
//       q,
//       (snap) => {
//         setReplies(
//           snap.docs.map((d) => ({
//             id: d.id,
//             ...d.data(),
//           }))
//         );
//       },
//       (error) => {
//         console.error("Error loading replies:", error);
//       }
//     );

//     return () => unsub();
//   }, [id]);

//   /* ================= ADD REPLY ================= */
//   const addReply = async () => {
//     if (!user) {
//       toast.error("Please login to reply");
//       navigate("/login");
//       return;
//     }

//     if (!replyText.trim()) {
//       toast.error("Please write a reply");
//       return;
//     }

//     setSubmitting(true);

//     try {
//       // Add reply
//       await addDoc(collection(db, "replies"), {
//         forumId: id,
//         text: replyText.trim(),
//         userId: user.uid,
//         userName: user.displayName || user.email?.split("@")[0] || "Student",
//         userEmail: user.email,
//         createdAt: serverTimestamp(),
//         likesCount: 0,
//         likedBy: [],
//       });

//       // Update reply count in forum
//       const forumRef = doc(db, "forums", id);
//       await updateDoc(forumRef, {
//         repliesCount: increment(1),
//       });

//       setReplyText("");
//       toast.success("Reply posted!");
//     } catch (error) {
//       console.error("Error adding reply:", error);
//       toast.error("Failed to post reply");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   /* ================= TOGGLE LIKE ON MAIN POST ================= */
//   const toggleLikePost = async () => {
//     if (!user) {
//       toast.error("Please login to like");
//       navigate("/login");
//       return;
//     }

//     const uid = user.uid;
//     const ref = doc(db, "forums", id);
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

//   /* ================= TOGGLE LIKE ON REPLY ================= */
//   const toggleLikeReply = async (reply) => {
//     if (!user) {
//       toast.error("Please login to like");
//       navigate("/login");
//       return;
//     }

//     const uid = user.uid;
//     const ref = doc(db, "replies", reply.id);
//     const alreadyLiked = reply.likedBy?.includes(uid);

//     try {
//       await updateDoc(ref, {
//         likedBy: alreadyLiked ? arrayRemove(uid) : arrayUnion(uid),
//         likesCount: increment(alreadyLiked ? -1 : 1),
//       });
//     } catch (error) {
//       console.error("Error toggling reply like:", error);
//       toast.error("Failed to update like");
//     }
//   };

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
//       <div className="forum-detail-page">
//         <div className="loading-container">
//           <div className="spinner"></div>
//           <p>Loading discussion...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!forum) {
//     return (
//       <div className="forum-detail-page">
//         <div className="not-found">
//           <h2>😕 Discussion Not Found</h2>
//           <p>The discussion you're looking for doesn't exist.</p>
//           <button onClick={() => navigate("/courses")}>Browse Courses</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="forum-detail-page">
//       {/* ============ BACK LINK ============ */}
//       <Link to={`/forum/${forum.courseId}`} className="back-link">
//         ← Back to Forum
//       </Link>

//       {/* ============ MAIN QUESTION ============ */}
//       <div className="forum-question-card">
//         <div className="question-header">
//           <div className="user-info">
//             <div className="user-avatar">
//               {forum.userName?.charAt(0).toUpperCase() || "?"}
//             </div>
//             <div className="user-details">
//               <h4>{forum.userName}</h4>
//               <span className="timestamp">{formatDate(forum.createdAt)}</span>
//             </div>
//           </div>

//           {forum.userId === user?.uid && (
//             <span className="author-badge">Your Post</span>
//           )}
//         </div>

//         <h1 className="question-title">{forum.title}</h1>
//         <p className="question-description">{forum.description}</p>

//         <div className="question-footer">
//           <button
//             className={`like-btn ${
//               forum.likedBy?.includes(user?.uid) ? "liked" : ""
//             }`}
//             onClick={toggleLikePost}
//           >
//             <span className="like-icon">
//               {forum.likedBy?.includes(user?.uid) ? "❤️" : "🤍"}
//             </span>
//             <span className="like-count">{forum.likesCount || 0}</span>
//           </button>

//           <span className="replies-count">
//             💬 {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
//           </span>
//         </div>
//       </div>

//       {/* ============ REPLY BOX ============ */}
//       <div className="reply-box">
//         <h3>💭 Write a Reply</h3>
        
//         <textarea
//           placeholder="Share your thoughts, answer the question, or provide helpful insights..."
//           value={replyText}
//           onChange={(e) => setReplyText(e.target.value)}
//           rows={4}
//           maxLength={1000}
//         />

//         <div className="reply-footer">
//           <span className="char-count">{replyText.length}/1000 characters</span>
//           <button
//             className="btn-reply"
//             onClick={addReply}
//             disabled={submitting || !replyText.trim()}
//           >
//             {submitting ? "Posting..." : "📤 Post Reply"}
//           </button>
//         </div>
//       </div>

//       {/* ============ REPLIES LIST ============ */}
//       <div className="replies-section">
//         <h3 className="replies-header">
//           💬 Replies ({replies.length})
//         </h3>

//         {replies.length === 0 ? (
//           <div className="empty-replies">
//             <div className="empty-icon">💬</div>
//             <h4>No replies yet</h4>
//             <p>Be the first to share your thoughts!</p>
//           </div>
//         ) : (
//           <div className="replies-list">
//             {replies.map((reply) => (
//               <div key={reply.id} className="reply-card">
//                 <div className="reply-header">
//                   <div className="user-info">
//                     <div className="user-avatar small">
//                       {reply.userName?.charAt(0).toUpperCase() || "?"}
//                     </div>
//                     <div className="user-details">
//                       <h5>{reply.userName}</h5>
//                       <span className="timestamp">
//                         {formatDate(reply.createdAt)}
//                       </span>
//                     </div>
//                   </div>

//                   {reply.userId === user?.uid && (
//                     <span className="author-badge-small">You</span>
//                   )}
//                 </div>

//                 <p className="reply-text">{reply.text}</p>

//                 <div className="reply-footer">
//                   <button
//                     className={`like-btn-small ${
//                       reply.likedBy?.includes(user?.uid) ? "liked" : ""
//                     }`}
//                     onClick={() => toggleLikeReply(reply)}
//                   >
//                     <span className="like-icon">
//                       {reply.likedBy?.includes(user?.uid) ? "❤️" : "🤍"}
//                     </span>
//                     <span className="like-count">{reply.likesCount || 0}</span>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ============ FOOTER INFO ============ */}
//       <div className="forum-footer-info">
//         <p>
//           💡 <strong>Tip:</strong> Be respectful and constructive in your
//           replies
//         </p>
//       </div>
//     </div>
//   );
// }

// export default ForumDetail;
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  increment,
  updateDoc
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

function ForumDetail() {
  const { forumId } = useParams();
  const [user] = useAuthState(auth);

  const [forum, setForum] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(true);

  /* 🔹 Load forum */
  useEffect(() => {
    async function loadForum() {
      const ref = doc(db, "forums", forumId);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setForum({ id: snap.id, ...snap.data() });
      }
      setLoading(false);
    }

    loadForum();
  }, [forumId]);

  /* 🔹 Load replies */
  useEffect(() => {
    const q = query(
      collection(db, "replies"),
      where("forumId", "==", forumId),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, (snap) => {
      setReplies(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );
    });

    return () => unsub();
  }, [forumId]);

  /* 🔹 Add reply */
  const addReply = async () => {
    if (!user) {
      toast.error("Login required");
      return;
    }

    if (!replyText.trim()) {
      toast.error("Reply empty hai");
      return;
    }

    await addDoc(collection(db, "replies"), {
      forumId,
      text: replyText,
      userId: user.uid,
      userName: user.displayName || "Student",
      createdAt: serverTimestamp(),
    });

    // repliesCount update
    await updateDoc(doc(db, "forums", forumId), {
      repliesCount: increment(1),
    });

    setReplyText("");
    toast.success("Reply added");
  };

  if (loading) return <p>Loading...</p>;
  if (!forum) return <p>Forum not found</p>;

  return (
    <div className="forum-detail">
      <Link to={`/forum/${forum.courseId}`}>← Back</Link>

      <h2>{forum.title}</h2>
      <p>{forum.description}</p>

      <hr />

      <h3>💬 Replies ({replies.length})</h3>

      {replies.map((r) => (
        <div key={r.id} className="reply-card">
          <p>{r.text}</p>
          <small>— {r.userName}</small>
        </div>
      ))}

      <div className="reply-box">
        <textarea
          placeholder="Write your reply..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <button onClick={addReply}>Reply</button>
      </div>
    </div>
  );
}

export default ForumDetail;
