import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

function AdminNotes() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(99);

  const addNote = async () => {
    if (!title || !description) return;

    await addDoc(collection(db, "premiumNotes"), {
      title,
      description,
      price: Number(price),
      createdAt: serverTimestamp(),
    });

    setTitle("");
    setDescription("");
    setPrice(99);
    alert("Note added");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>➕ Add Premium Note</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />

      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />

      <button onClick={addNote} style={{ marginTop: "10px" }}>
        Add Note
      </button>
    </div>
  );
}

export default AdminNotes;
