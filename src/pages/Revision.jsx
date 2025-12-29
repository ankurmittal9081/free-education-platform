import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

function Revision() {
  const [topic, setTopic] = useState("");
  const [revisions, setRevisions] = useState([]);

  const addRevision = async () => {
    if (!auth.currentUser || !topic) return;

    await addDoc(collection(db, "revisions"), {
      topic,
      userId: auth.currentUser.uid,
      createdAt: serverTimestamp(),
    });

    setTopic("");
  };

  const removeRevision = async (id) => {
    await deleteDoc(doc(db, "revisions", id));
  };

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "revisions"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      setRevisions(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, []);

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px" }}>
      <h2>📚 Revision Tracker</h2>

      <input
        placeholder="Enter topic (e.g. Binary Search)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />

      <button
        onClick={addRevision}
        style={{ marginTop: "10px", padding: "10px 20px" }}
      >
        Mark as Revised
      </button>

      <h3 style={{ marginTop: "30px" }}>Your Revisions</h3>

      {revisions.length === 0 && <p>No revisions yet</p>}

      {revisions.map((r) => (
        <div
          key={r.id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "6px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>✅ {r.topic}</span>
          <button onClick={() => removeRevision(r.id)}>❌</button>
        </div>
      ))}
    </div>
  );
}

export default Revision;
