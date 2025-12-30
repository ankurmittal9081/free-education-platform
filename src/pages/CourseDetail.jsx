// import { Link, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
// import { db, auth } from "../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";

// function CourseDetail() {
//   const { courseId } = useParams();
//   const [user] = useAuthState(auth);

//   const [course, setCourse] = useState(null);
//   const [sections, setSections] = useState([]);
//   const [activePlaylist, setActivePlaylist] = useState(null);
//   const [loading, setLoading] = useState(true);

//   /* ===== LOAD COURSE ===== */
//   useEffect(() => {
//     async function loadCourse() {
//       const snap = await getDoc(doc(db, "courses", courseId));
//       if (!snap.exists()) {
//         setLoading(false);
//         return;
//       }

//       const data = snap.data();
//       const sectionArray = Array.isArray(data.sections)
//         ? data.sections
//         : Object.values(data.sections || {});

//       setCourse(data);
//       setSections(sectionArray);
//       setLoading(false);
//     }

//     loadCourse();
//   }, [courseId]);

//   /* ===== LOAD PROGRESS ===== */
//   useEffect(() => {
//     if (!user) return;

//     async function loadProgress() {
//       const ref = doc(db, "courseProgress", `${user.uid}_${courseId}`);
//       const snap = await getDoc(ref);
//       if (snap.exists()) {
//         setActivePlaylist(snap.data().lastPlaylist);
//       }
//     }

//     loadProgress();
//   }, [user, courseId]);

//   if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
//   if (!course) return <p>Course not found</p>;

//   const total = sections.length;
//   const watchedIndex = sections.findIndex(
//     (s) => s.playlistIds?.[0] === activePlaylist
//   );
//   const progress =
//     watchedIndex === -1 ? 0 : Math.round(((watchedIndex + 1) / total) * 100);

//   return (
//     <div className="course-detail-page">
//       {/* HEADER */}
//       <div className="course-detail-header">
//         <Link to="/courses">← Back to Courses</Link>
//         <h1>{course.title}</h1>
//         <p>{course.description}</p>
//         <p>
//           ⭐ {course.rating} | 👥 {course.students}+ | ⏱ {course.duration}
//         </p>
//       </div>

//       {/* VIDEO */}
//       {activePlaylist && (
//         <iframe
//           width="100%"
//           height="450"
//           src={`https://www.youtube.com/embed/videoseries?list=${activePlaylist}`}
//           title="Course Player"
//           allowFullScreen
//         />
//       )}

//       <p style={{ margin: "12px 0" }}>
//         📈 Progress: <strong>{progress}%</strong>
//       </p>

//       {/* SECTIONS */}
//       <div className="course-curriculum">
//         {sections.map((section, index) => {
//           const playlistId = section.playlistIds?.[0];
//           return (
//             <div
//               key={index}
//               className="curriculum-section"
//               onClick={async () => {
//                 if (!playlistId) return;
//                 setActivePlaylist(playlistId);

//                 if (!user) return;

//                 await setDoc(
//                   doc(db, "courseProgress", `${user.uid}_${courseId}`),
//                   {
//                     userId: user.uid,
//                     courseId,
//                     lastPlaylist: playlistId,
//                     progress,
//                     updatedAt: serverTimestamp(),
//                   },
//                   { merge: true }
//                 );
//               }}
//             >
//               🎥 {section.title}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default CourseDetail;
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function CourseDetail() {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourse() {
      const snap = await getDoc(doc(db, "courses", courseId));
      if (!snap.exists()) {
        setLoading(false);
        return;
      }

      const data = snap.data();

      // ✅ FORCE sections into ARRAY
      const sectionArray = Array.isArray(data.sections)
        ? data.sections
        : Object.values(data.sections || {});

      setCourse(data);
      setSections(sectionArray);

      // ✅ AUTO LOAD FIRST PLAYLIST
      if (
        sectionArray.length > 0 &&
        Array.isArray(sectionArray[0].playlistIds) &&
        sectionArray[0].playlistIds.length > 0
      ) {
        setActivePlaylist(sectionArray[0].playlistIds[0]);
      }

      setLoading(false);
    }

    loadCourse();
  }, [courseId]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!course) return <p>Course not found</p>;

  return (
    <div className="course-detail-page">
      <Link to="/courses">← Back to Courses</Link>

      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <p>
        ⭐ {course.rating} | 👥 {course.students}+ | ⏱ {course.duration}
      </p>

      {/* 🎥 VIDEO PLAYER */}
      {activePlaylist && (
        <iframe
          width="100%"
          height="450"
          src={`https://www.youtube.com/embed/videoseries?list=${activePlaylist}`}
          title="Course Playlist"
          allowFullScreen
        />
      )}

      <h3 style={{ marginTop: "20px" }}>📚 Course Content</h3>

      {sections.map((section, index) => {
        const playlistId =
          Array.isArray(section.playlistIds) && section.playlistIds.length > 0
            ? section.playlistIds[0]
            : null;

        return (
          <div
            key={index}
            className="curriculum-section"
            style={{
              cursor: "pointer",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
            onClick={() => playlistId && setActivePlaylist(playlistId)}
          >
            🎥 {section.title}
          </div>
        );
      })}
    </div>
  );
}

export default CourseDetail;
