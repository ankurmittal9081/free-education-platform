// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db, auth } from "../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import toast from "react-hot-toast";
// import { enrollCourse } from "../utils/enrollCourse";
// import "./Courses.css";

// function Courses() {
//   const navigate = useNavigate();
//   const [user] = useAuthState(auth);
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchCourses() {
//       const snap = await getDocs(collection(db, "courses"));
//       setCourses(snap.docs.map(d => ({ id: d.id, ...d.data() })));
//       setLoading(false);
//     }
//     fetchCourses();
//   }, []);

//   async function handleEnroll(courseId) {
//     if (!user) {
//       toast.error("Please login first");
//       return;
//     }
//     await enrollCourse(user, courseId);
//     toast.success("Course added!");
//     navigate(`/course/${courseId}`);
//   }

//   if (loading) {
//     return (
//       <div className="loading-container">
//         Loading courses...
//       </div>
//     );
//   }

//   return (
//     <div className="courses-page">
//       <h1>Explore Courses</h1>

//       {courses.map(course => (
//         <div key={course.id} className="course-card">
//           <h3>{course.title}</h3>
//           <p>{course.description}</p>

//           <div className="course-meta">
//             <span>⭐ {course.rating}</span>
//             <span>👥 {course.students}+ students</span>
//           </div>

//           <button onClick={() => handleEnroll(course.id)}>
//             Start Learning
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Courses;
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { enrollCourse } from "../utils/enrollCourse";
import "./Courses.css";

function Courses() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  /* ================= FETCH COURSES ================= */
  useEffect(() => {
    async function fetchCourses() {
      try {
        const snap = await getDocs(collection(db, "courses"));
        const coursesData = snap.docs.map(d => ({ 
          id: d.id, 
          ...d.data() 
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to load courses");
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  /* ================= ENROLL IN COURSE ================= */
  async function handleEnroll(courseId, courseTitle) {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    
    try {
      await enrollCourse(user, courseId);
      toast.success(`Enrolled in ${courseTitle}!`);
      navigate(`/course/${courseId}`);
    } catch (error) {
      console.error("Enrollment error:", error);
      toast.error("Failed to enroll. Please try again.");
    }
  }

  /* ================= FILTER COURSES ================= */
  const categories = ["All", "DSA", "System Design", "Web Development", "AI/ML"];
  
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || 
                           course.category === selectedCategory ||
                           course.title?.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div className="courses-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading amazing courses...</p>
        </div>
      </div>
    );
  }

  /* ================= EMPTY STATE ================= */
  if (courses.length === 0) {
    return (
      <div className="courses-page">
        <div className="empty-courses">
          <h2>📚 No Courses Available</h2>
          <p>Check back soon for exciting new courses!</p>
          <button 
            onClick={() => navigate("/")}
            style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '30px',
              fontWeight: '700',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-page">
      {/* ============ PAGE HEADER ============ */}
      <div className="courses-page-header">
        <h1>🎓 Explore Courses</h1>
        <p className="courses-subtitle">
          Master new skills with our comprehensive courses
        </p>
      </div>

      {/* ============ SEARCH & FILTERS ============ */}
      <div className="courses-controls">
        {/* Search Bar */}
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div className="course-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`course-filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* ============ COURSES GRID ============ */}
      {filteredCourses.length === 0 ? (
        <div className="no-results">
          <h3>😕 No courses found</h3>
          <p>Try adjusting your search or filters</p>
          <button 
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="reset-btn"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="courses-grid">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-card">
              {/* Course Header */}
              <div className="course-card-header">
                <h3>{course.title}</h3>
                {course.category && (
                  <span className="course-badge">{course.category}</span>
                )}
              </div>

              {/* Course Description */}
              <p className="course-description">{course.description}</p>

              {/* Course Meta */}
              <div className="course-meta">
                <span className="meta-item">
                  ⭐ {course.rating || "4.5"}
                </span>
                <span className="meta-item">
                  👥 {course.students || "1000"}+ students
                </span>
                <span className="meta-item">
                  ⏱ {course.duration || "8 weeks"}
                </span>
              </div>

              {/* Course Price (if applicable) */}
              {course.price && (
                <div className="course-price">
                  {course.price === "Free" ? (
                    <span className="price-free">🎉 Free</span>
                  ) : (
                    <span className="price-paid">💰 ₹{course.price}</span>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="course-actions">
                <button 
                  className="btn-enroll"
                  onClick={() => handleEnroll(course.id, course.title)}
                >
                  🚀 Start Learning
                </button>
                <button 
                  className="btn-preview"
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  👁️ Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ============ BACK TO HOME ============ */}
      <div className="courses-footer">
        <Link to="/" className="back-home-link">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Courses;