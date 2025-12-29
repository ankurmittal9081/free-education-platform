import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import "./Forum.css";

function Forum() {
  const { courseId } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [forums, setForums] = useState([]);

  const createPost = async () => {
    if (!auth.currentUser) {
      alert("Login required");
      return;
    }
    if (!title || !description) return;

    await addDoc(collection(db, "forums"), {
      title,
      description,
      courseId,
      userId: auth.currentUser.uid,
      userName: auth.currentUser.displayName || "Student",
      createdAt: serverTimestamp(),
      likesCount: 0,
      likedBy: [],
    });

    setTitle("");
    setDescription("");
  };

  const toggleLike = async (forum) => {
    if (!auth.currentUser) {
      alert("Login required");
      return;
    }

    const uid = auth.currentUser.uid;
    const ref = doc(db, "forums", forum.id);
    const alreadyLiked = forum.likedBy?.includes(uid);

    await updateDoc(ref, {
      likedBy: alreadyLiked ? arrayRemove(uid) : arrayUnion(uid),
      likesCount: (forum.likesCount || 0) + (alreadyLiked ? -1 : 1),
    });
  };

  useEffect(() => {
    const q = query(
      collection(db, "forums"),
      where("courseId", "==", courseId)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setForums(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsub();
  }, [courseId]);

  return (
    <div className="forum-container">
      <Link to="/courses" className="back-link">
        ← Back to Courses
      </Link>

      <h2 className="forum-title">💬 Discussion Forum</h2>

      <div className="forum-create-box">
        <input
          placeholder="Question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Explain your doubt clearly…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={createPost}>Post Question</button>
      </div>

      <div className="forum-list">
        {forums.length === 0 && <p>No discussions yet.</p>}

        {forums.map((f) => (
          <div key={f.id} className="forum-card">
            <Link to={`/forum-detail/${f.id}`}>
              <h4>{f.title}</h4>
              <p>{f.description}</p>
            </Link>

            <div className="forum-footer">
              <button onClick={() => toggleLike(f)}>
                👍 {f.likesCount || 0}
              </button>
              <span>👤 {f.userName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forum;
