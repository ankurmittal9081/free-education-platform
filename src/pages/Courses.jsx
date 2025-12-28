import { Link } from "react-router-dom";
import { useState } from "react";

function Courses() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const courses = [
    {
      id: "dsa",
      title: "Data Structures & Algorithms",
      category: "programming",
      icon: "📊",
      description: "Master DSA with pattern-based learning approach",
      topics: 45,
      duration: "8 weeks",
      level: "Beginner to Advanced",
      students: 5420,
      rating: 4.8,
      isTrending: true,
      features: [
        "100+ Coding Problems",
        "Video Explanations",
        "Practice Tests",
        "Interview Questions"
      ]
    },
    {
      id: "system-design",
      title: "System Design",
      category: "design",
      icon: "🏗️",
      description: "Learn to design scalable and reliable systems",
      topics: 30,
      duration: "6 weeks",
      level: "Intermediate",
      students: 3200,
      rating: 4.9,
      isTrending: true,
      features: [
        "Real-world Case Studies",
        "Architecture Patterns",
        "Scalability Techniques",
        "Design Interviews"
      ]
    },
    {
      id: "os",
      title: "Operating Systems",
      category: "core",
      icon: "💻",
      description: "Deep dive into OS concepts and internals",
      topics: 25,
      duration: "5 weeks",
      level: "Intermediate",
      students: 2800,
      rating: 4.7,
      features: [
        "Process Management",
        "Memory Management",
        "File Systems",
        "Concurrency"
      ]
    },
    {
      id: "dbms",
      title: "Database Management Systems",
      category: "core",
      icon: "💾",
      description: "From SQL basics to database optimization",
      topics: 35,
      duration: "6 weeks",
      level: "Beginner to Advanced",
      students: 4100,
      rating: 4.8,
      features: [
        "SQL Queries",
        "Database Design",
        "Normalization",
        "Query Optimization"
      ]
    },
    {
      id: "networking",
      title: "Computer Networks",
      category: "core",
      icon: "🌐",
      description: "Master networking protocols and concepts",
      topics: 28,
      duration: "5 weeks",
      level: "Intermediate",
      students: 2500,
      rating: 4.6,
      features: [
        "TCP/IP Stack",
        "HTTP/HTTPS",
        "Network Security",
        "API Design"
      ]
    },
    {
      id: "oops",
      title: "Object-Oriented Programming",
      category: "programming",
      icon: "🎯",
      description: "Learn OOP principles with practical examples",
      topics: 20,
      duration: "4 weeks",
      level: "Beginner",
      students: 3800,
      rating: 4.7,
      features: [
        "Classes & Objects",
        "Inheritance",
        "Polymorphism",
        "Design Patterns"
      ]
    }
  ];

  const categories = [
    { id: "all", name: "All Courses", icon: "📚" },
    { id: "programming", name: "Programming", icon: "💻" },
    { id: "design", name: "System Design", icon: "🏗️" },
    { id: "core", name: "Core CS", icon: "🎓" }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="courses-page">
      {/* Header Section */}
      <div className="courses-header">
        <div className="header-content">
          <Link to="/" className="back-link">← Back to Home</Link>
          <h1>Explore Our Courses</h1>
          <p>Learn at your own pace with industry-leading content — 100% Free</p>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="courses-filters">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="results-info">
        <p>Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Courses Grid */}
      <div className="courses-grid-page">
        {filteredCourses.length === 0 ? (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <h3>No courses found</h3>
            <p>Try adjusting your search or filter</p>
          </div>
        ) : (
          filteredCourses.map(course => (
            <div key={course.id} className="course-card-detailed">
              {course.isTrending && (
                <div className="trending-badge">🔥 Trending</div>
              )}
              
              <div className="course-card-header">
                <div className="course-icon-large">{course.icon}</div>
                <div className="course-rating">
                  <span>⭐ {course.rating}</span>
                  <span className="students-count">{course.students.toLocaleString()} students</span>
                </div>
              </div>

              <h3>{course.title}</h3>
              <p className="course-description">{course.description}</p>

              <div className="course-meta">
                <span className="meta-item">
                  <span className="meta-icon">📖</span>
                  {course.topics} Topics
                </span>
                <span className="meta-item">
                  <span className="meta-icon">⏱️</span>
                  {course.duration}
                </span>
                <span className="meta-item">
                  <span className="meta-icon">📊</span>
                  {course.level}
                </span>
              </div>

              <ul className="course-features-list">
                {course.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>

              <Link to={`/course/${course.id}`}>
                <button className="start-course-btn">
                  Start Learning Free →
                </button>
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Mentorship CTA */}
      <div className="mentorship-cta">
        <div className="cta-content-box">
          <h2>Need Personalized Guidance?</h2>
          <p>Book a 1:1 mentorship session with our experts</p>
          <Link to="/mentorship">
            <button className="mentorship-cta-btn">
              Book Mentorship - ₹99 Only
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Courses;