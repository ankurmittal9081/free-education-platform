import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { enrollCourse } from "../utils/enrollCourse";

function Courses() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      const snap = await getDocs(collection(db, "courses"));
      setCourses(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }
    fetchCourses();
  }, []);

  async function handleEnroll(courseId) {
    if (!user) {
      toast.error("Please login first");
      return;
    }
    await enrollCourse(user, courseId);
    toast.success("Course added!");
    navigate(`/course/${courseId}`);
  }

  if (loading) {
    return (
      <div className="loading-container">
        Loading courses...
      </div>
    );
  }

  return (
    <div className="courses-page">
      <h1>Explore Courses</h1>

      {courses.map(course => (
        <div key={course.id} className="course-card">
          <h3>{course.title}</h3>
          <p>{course.description}</p>

          <div className="course-meta">
            <span>⭐ {course.rating}</span>
            <span>👥 {course.students}+ students</span>
          </div>

          <button onClick={() => handleEnroll(course.id)}>
            Start Learning
          </button>
        </div>
      ))}
    </div>
  );
}

export default Courses;
