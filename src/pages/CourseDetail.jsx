import { Link, useParams } from "react-router-dom";
import { useState } from "react";

function CourseDetail() {
  const { courseId } = useParams();
  const [activeSection, setActiveSection] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);

  const courseData = {
    dsa: {
      title: "Data Structures & Algorithms",
      icon: "📊",
      description: "Master DSA through pattern-based learning with practical coding exercises",
      instructor: "Rahul Kumar",
      rating: 4.8,
      students: 5420,
      duration: "8 weeks",
      lastUpdated: "December 2024",
      sections: [
        {
          title: "Arrays & Strings",
          lessons: [
            { id: 1, title: "Introduction to Arrays", duration: "15 min", type: "video" },
            { id: 2, title: "Two Pointer Technique", duration: "20 min", type: "video" },
            { id: 3, title: "Sliding Window Problems", duration: "25 min", type: "video" },
            { id: 4, title: "Practice Problems", duration: "30 min", type: "practice" }
          ]
        },
        {
          title: "Linked Lists",
          lessons: [
            { id: 5, title: "Linked List Basics", duration: "18 min", type: "video" },
            { id: 6, title: "Reverse a Linked List", duration: "22 min", type: "video" },
            { id: 7, title: "Detect Cycle in Linked List", duration: "20 min", type: "video" },
            { id: 8, title: "Practice Problems", duration: "35 min", type: "practice" }
          ]
        },
        {
          title: "Trees & Graphs",
          lessons: [
            { id: 9, title: "Binary Trees Introduction", duration: "20 min", type: "video" },
            { id: 10, title: "Tree Traversals", duration: "25 min", type: "video" },
            { id: 11, title: "Graph Representations", duration: "18 min", type: "video" },
            { id: 12, title: "BFS and DFS", duration: "30 min", type: "video" }
          ]
        }
      ],
      whatYouLearn: [
        "Master fundamental data structures",
        "Learn problem-solving patterns",
        "Solve 100+ coding problems",
        "Prepare for technical interviews",
        "Understand time & space complexity",
        "Build strong algorithmic thinking"
      ],
      prerequisites: [
        "Basic programming knowledge",
        "Understanding of any programming language",
        "Problem-solving mindset"
      ]
    },
    "system-design": {
      title: "System Design",
      icon: "🏗️",
      description: "Learn to design scalable, reliable, and efficient systems",
      instructor: "Priya Singh",
      rating: 4.9,
      students: 3200,
      duration: "6 weeks",
      lastUpdated: "December 2024",
      sections: [
        {
          title: "Fundamentals",
          lessons: [
            { id: 1, title: "System Design Basics", duration: "20 min", type: "video" },
            { id: 2, title: "Scalability Principles", duration: "25 min", type: "video" },
            { id: 3, title: "Load Balancing", duration: "22 min", type: "video" }
          ]
        },
        {
          title: "Database Design",
          lessons: [
            { id: 4, title: "SQL vs NoSQL", duration: "18 min", type: "video" },
            { id: 5, title: "Database Sharding", duration: "23 min", type: "video" },
            { id: 6, title: "Caching Strategies", duration: "20 min", type: "video" }
          ]
        }
      ],
      whatYouLearn: [
        "Design scalable systems",
        "Master system design patterns",
        "Learn about distributed systems",
        "Understand trade-offs in design",
        "Prepare for design interviews"
      ],
      prerequisites: [
        "Basic understanding of databases",
        "Knowledge of web applications",
        "Networking basics"
      ]
    }
  };

  const course = courseData[courseId] || courseData.dsa;

  const totalLessons = course.sections.reduce((sum, section) => sum + section.lessons.length, 0);
  const progress = (completedLessons.length / totalLessons) * 100;

  const toggleLessonComplete = (lessonId) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(completedLessons.filter(id => id !== lessonId));
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  return (
    <div className="course-detail-page">
      {/* Course Header */}
      <div className="course-detail-header">
        <div className="header-overlay">
          <Link to="/courses" className="back-link-white">← Back to Courses</Link>
          
          <div className="course-header-content">
            <div className="course-title-section">
              <span className="course-icon-header">{course.icon}</span>
              <h1>{course.title}</h1>
              <p>{course.description}</p>

              <div className="course-stats">
                <span className="stat">⭐ {course.rating}</span>
                <span className="stat">👥 {course.students.toLocaleString()} students</span>
                <span className="stat">⏱️ {course.duration}</span>
                <span className="stat">🔄 Updated {course.lastUpdated}</span>
              </div>

              <div className="instructor-info">
                <span>👨‍🏫 Instructor: <strong>{course.instructor}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-section">
        <div className="progress-container">
          <div className="progress-info">
            <span>Your Progress</span>
            <span>{completedLessons.length}/{totalLessons} lessons completed</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="course-content-layout">
        {/* Left Sidebar - Course Info */}
        <div className="course-sidebar">
          <div className="sidebar-section">
            <h3>What You'll Learn</h3>
            <ul className="learn-list">
              {course.whatYouLearn.map((item, index) => (
                <li key={index}>
                  <span className="check-icon">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>Prerequisites</h3>
            <ul className="prerequisites-list">
              {course.prerequisites.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section mentorship-box">
            <h3>Need Help?</h3>
            <p>Get personalized mentorship</p>
            <Link to="/mentorship">
              <button className="sidebar-mentor-btn">
                Book Mentor - ₹99
              </button>
            </Link>
          </div>
        </div>

        {/* Center - Course Curriculum */}
        <div className="course-curriculum">
          <h2>Course Curriculum</h2>
          
          {course.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="curriculum-section">
              <div 
                className="section-header"
                onClick={() => setActiveSection(activeSection === sectionIndex ? -1 : sectionIndex)}
              >
                <h3>
                  <span className="section-number">{sectionIndex + 1}.</span>
                  {section.title}
                </h3>
                <span className="section-toggle">
                  {activeSection === sectionIndex ? '−' : '+'}
                </span>
              </div>

              {activeSection === sectionIndex && (
                <div className="section-lessons">
                  {section.lessons.map((lesson) => (
                    <div 
                      key={lesson.id} 
                      className={`lesson-item ${completedLessons.includes(lesson.id) ? 'completed' : ''}`}
                    >
                      <div className="lesson-info">
                        <input
                          type="checkbox"
                          checked={completedLessons.includes(lesson.id)}
                          onChange={() => toggleLessonComplete(lesson.id)}
                          className="lesson-checkbox"
                        />
                        <span className="lesson-type-icon">
                          {lesson.type === 'video' ? '▶️' : '📝'}
                        </span>
                        <span className="lesson-title">{lesson.title}</span>
                      </div>
                      <span className="lesson-duration">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;