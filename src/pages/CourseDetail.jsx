import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function CourseDetail() {
  const { courseId } = useParams();
  const [user] = useAuthState(auth);

  const [activePlaylist, setActivePlaylist] = useState(null);

  // 🔥 COURSE DATA
  const courseData = {
    dsa: {
      title: "Data Structures & Algorithms",
      icon: "📊",
      description: "Learn DSA with complete YouTube playlists",
      instructor: "Expert Instructor",
      rating: 4.8,
      students: 6500,
      duration: "10 weeks",
      lastUpdated: "2025",
      sections: [
        {
          title: "Array & String Playlist",
          playlistIds: ["PLVItHqpXY_DB7iHw9Qc5CgCOrlkdDpy_u"],
        },
        {
          title: "Complete DSA Playlist",
          playlistIds: "PLVItHqpXY_DD8Vyz2eC-yem_Mbu4Peuin",
        },
        {
          title: "Linked List Playlist",
          playlistIds: "PLVItHqpXY_DC3UTWNaskA1Q-1Gv-uAAb0",
        },
        {
          title: "Sliding Window Playlist",
          playlistIds: "PLVItHqpXY_DCmslWMuL616DUap5I1vc5G",
        },
      ],
    },
  };

  const course = courseData[courseId] || courseData.dsa;

  // 🔥 LOAD LAST WATCHED PLAYLIST
  useEffect(() => {
    if (!user) return;

    const loadProgress = async () => {
      const ref = doc(db, "courseProgress", `${user.uid}_${courseId}`);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setActivePlaylist(snap.data().lastPlaylist);
      }
    };

    loadProgress();
  }, [user, courseId]);

  // 🔥 PROGRESS CALCULATION
  const totalPlaylists = course.sections.length;
  const watchedIndex = course.sections.findIndex((s) => {
    const id = Array.isArray(s.playlistIds)
      ? s.playlistIds[0]
      : s.playlistIds;
    return id === activePlaylist;
  });

  const progressPercent =
    watchedIndex === -1
      ? 0
      : Math.round(((watchedIndex + 1) / totalPlaylists) * 100);

  return (
    <div className="course-detail-page">
      {/* HEADER */}
      <div className="course-detail-header">
        <Link to="/courses" className="back-link-white">
          ← Back to Courses
        </Link>

        <div className="course-header-content">
          <span className="course-icon-header">{course.icon}</span>
          <h1>{course.title}</h1>
          <p>{course.description}</p>

          <div className="course-stats">
            <span>⭐ {course.rating}</span>
            <span>👥 {course.students}+ students</span>
            <span>⏱️ {course.duration}</span>
            <span>🔄 Updated {course.lastUpdated}</span>
          </div>

          <p>
            👨‍🏫 Instructor: <strong>{course.instructor}</strong>
          </p>
        </div>
      </div>

      {/* 🎥 VIDEO PLAYER */}
      {activePlaylist && (
        <div className="video-player-section" style={{ marginTop: "20px" }}>
          <iframe
            width="100%"
            height="450"
            src={`https://www.youtube.com/embed/videoseries?list=${activePlaylist}`}
            title="Course Playlist"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="course-content-layout">
        {/* SIDEBAR */}
        <div className="course-sidebar">
          <div className="sidebar-section mentorship-box">
            <h3>Need Help?</h3>
            <Link to="/mentorship">
              <button className="sidebar-mentor-btn">
                Book Mentor – ₹99
              </button>
            </Link>
          </div>
        </div>

        {/* CURRICULUM */}
        <div className="course-curriculum">
          {/* 📈 PROGRESS BAR */}
          <div
            style={{
              marginBottom: "16px",
              padding: "12px",
              background: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            📈 Progress: <strong>{progressPercent}%</strong>
            <div
              style={{
                marginTop: "6px",
                height: "10px",
                background: "#e5e7eb",
                borderRadius: "6px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progressPercent}%`,
                  background: "#22c55e",
                  borderRadius: "6px",
                  transition: "0.3s",
                }}
              ></div>
            </div>
          </div>

          <h2>📚 Course Curriculum</h2>

          {course.sections.map((section, index) => {
            const playlistId = Array.isArray(section.playlistIds)
              ? section.playlistIds[0]
              : section.playlistIds;

            return (
              <div
                key={index}
                className="curriculum-section"
                style={{ cursor: "pointer" }}
                onClick={async () => {
                  setActivePlaylist(playlistId);

                  if (!user) return;

                  await setDoc(
                    doc(db, "courseProgress", `${user.uid}_${courseId}`),
                    {
                      userId: user.uid,
                      courseId,
                      lastPlaylist: playlistId,
                      updatedAt: serverTimestamp(),
                    },
                    { merge: true }
                  );
                }}
              >
                <div className="section-header">
                  <h3>🎥 {section.title}</h3>
                  <span>▶ Play Playlist</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
