import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Profile() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchUserData();
  }, [user]);

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              {user?.displayName?.charAt(0).toUpperCase() || '👤'}
            </div>
            <h1>{user?.displayName || 'Student'}</h1>
            <p>{user?.email}</p>
          </div>

          <div className="profile-stats">
            <div className="stat-box">
              <div className="stat-icon">🔥</div>
              <div className="stat-info">
                <h3>{userData?.streak || 0}</h3>
                <p>Day Streak</p>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon">📚</div>
              <div className="stat-info">
                <h3>{userData?.enrolledCourses?.length || 0}</h3>
                <p>Courses Enrolled</p>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <h3>{userData?.completedLessons?.length || 0}</h3>
                <p>Lessons Completed</p>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>📖 Your Learning Journey</h2>
            {userData?.enrolledCourses?.length > 0 ? (
              <div className="enrolled-courses">
                {userData.enrolledCourses.map((courseId, index) => (
                  <Link to={`/course/${courseId}`} key={index} className="enrolled-course-card">
                    <h3>{courseId.toUpperCase()}</h3>
                    <p>Continue learning →</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No courses enrolled yet</p>
                <Link to="/courses">
                  <button className="primary-button">Browse Courses</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;