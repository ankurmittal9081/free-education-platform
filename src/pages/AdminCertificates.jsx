import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

function AdminCertificates() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const issueCert = async () => {
    if (!userId || !courseTitle || !fileUrl) return;

    await addDoc(collection(db, "certificates"), {
      userId,
      userName,
      courseTitle,
      fileUrl,
      createdAt: serverTimestamp(),
    });

    setUserId("");
    setUserName("");
    setCourseTitle("");
    setFileUrl("");
    alert("Certificate issued");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>🎓 Issue Certificate</h2>

      <input placeholder="User ID" value={userId} onChange={(e)=>setUserId(e.target.value)} />
      <input placeholder="User Name" value={userName} onChange={(e)=>setUserName(e.target.value)} />
      <input placeholder="Course Title" value={courseTitle} onChange={(e)=>setCourseTitle(e.target.value)} />
      <input placeholder="Certificate File URL (PDF/Image)" value={fileUrl} onChange={(e)=>setFileUrl(e.target.value)} />

      <button onClick={issueCert} style={{ marginTop: "10px" }}>
        Issue Certificate
      </button>
    </div>
  );
}

export default AdminCertificates;
