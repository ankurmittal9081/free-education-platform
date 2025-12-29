import { useParams, Link } from "react-router-dom";
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
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import "./Forum.css";

function ForumDetail() {
  const { id } = useParams();
  const [forum, setForum] = useState(null);
  const [replies, setReplies] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    getDoc(doc(db, "forums", id)).then((snap) => {
      if (snap.exists()) setForum(snap.data());
    });
  }, [id]);

  useEffect(() => {
    const q = query(
  collection(db, "replies"),
  where("forumId", "==", id)
);


    const unsub = onSnapshot(q, (snap) => {
      setReplies(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, [id]);

  const addReply = async () => {
    if (!auth.currentUser || !text) return;

    await addDoc(collection(db, "replies"), {
      forumId: id,
      text,
      userId: auth.currentUser.uid,
      userName: auth.currentUser.displayName || "Student",
      createdAt: serverTimestamp(),
    });

    setText("");
  };

  if (!forum) return null;

  return (
    <div className="forum-container">
      <Link to="/courses" className="back-link">← Back</Link>

      <div className="forum-question">
        <h2>{forum.title}</h2>
        <p>{forum.description}</p>
        <span>👤 {forum.userName}</span>
      </div>

      <h3 className="reply-title">Replies</h3>

      {replies.map(r => (
        <div key={r.id} className="reply-card">
          <p>{r.text}</p>
          <span>— {r.userName}</span>
        </div>
      ))}

      <div className="reply-box">
        <textarea
          placeholder="Write your reply…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addReply}>Reply</button>
      </div>
    </div>
  );
}

export default ForumDetail;
