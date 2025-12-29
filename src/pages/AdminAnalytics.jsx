import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

function AdminAnalytics() {
  const [users, setUsers] = useState(0);
  const [forums, setForums] = useState(0);
  const [replies, setReplies] = useState(0);
  const [revisions, setRevisions] = useState(0);

  useEffect(() => {
    const unsubUsers = onSnapshot(collection(db, "users"), (snap) =>
      setUsers(snap.size)
    );

    const unsubForums = onSnapshot(collection(db, "forums"), (snap) =>
      setForums(snap.size)
    );

    const unsubReplies = onSnapshot(collection(db, "replies"), (snap) =>
      setReplies(snap.size)
    );

    const unsubRevisions = onSnapshot(collection(db, "revisions"), (snap) =>
      setRevisions(snap.size)
    );

    return () => {
      unsubUsers();
      unsubForums();
      unsubReplies();
      unsubRevisions();
    };
  }, []);

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h2>📊 Admin Analytics Dashboard</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div className="stat-card">
          <h3>{users}</h3>
          <p>Total Users</p>
        </div>

        <div className="stat-card">
          <h3>{forums}</h3>
          <p>Forum Questions</p>
        </div>

        <div className="stat-card">
          <h3>{replies}</h3>
          <p>Total Replies</p>
        </div>

        <div className="stat-card">
          <h3>{revisions}</h3>
          <p>Revision Entries</p>
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;
