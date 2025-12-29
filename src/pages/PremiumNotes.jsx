import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase";

function PremiumNotes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "premiumNotes"), (snap) => {
      setNotes(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const buyNote = async (note) => {
    if (!auth.currentUser) return alert("Login required");

    await addDoc(collection(db, "purchases"), {
      userId: auth.currentUser.uid,
      noteId: note.id,
      title: note.title,
      price: note.price,
      createdAt: serverTimestamp(),
    });

    alert("Purchase successful (demo)");
  };

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <h2>💎 Premium Notes</h2>

      {notes.length === 0 && <p>No notes available</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "16px" }}>
        {notes.map((n) => (
          <div key={n.id} style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "8px" }}>
            <h4>{n.title}</h4>
            <p>{n.description}</p>
            <p>💰 ₹{n.price}</p>
            <button onClick={() => buyNote(n)}>Buy (Demo)</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PremiumNotes;
