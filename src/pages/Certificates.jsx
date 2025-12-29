import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";

function Certificates() {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "certificates"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      setCerts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <h2>🎓 Your Certificates</h2>

      {certs.length === 0 && <p>No certificates yet</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "16px" }}>
        {certs.map((c) => (
          <div key={c.id} style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "10px" }}>
            <h3>{c.courseTitle}</h3>
            <p>👤 {c.userName}</p>
            <p>📅 {new Date(c.createdAt.seconds * 1000).toDateString()}</p>

            <a href={c.fileUrl} target="_blank" rel="noreferrer">
              <button>⬇️ Download</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Certificates;
