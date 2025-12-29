import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import DarkModeToggle from "../components/DarkModeToggle";

function Home() {
  const [user] = useAuthState(auth);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "SDE at Amazon",
      text: "The DSA course helped me crack my dream job. Best free resource available!",
      rating: 5,
    },
    {
      name: "Priya Singh",
      role: "Software Engineer at Google",
      text: "Mentorship sessions were incredibly valuable. Got personalized guidance.",
      rating: 5,
    },
    {
      name: "Amit Patel",
      role: "Full Stack Developer",
      text: "Clear explanations and practical examples. Highly recommended!",
      rating: 5,
    },
  ];

  const features = [
    {
      icon: "📚",
      title: "Free Courses",
      description: "Learn DSA, System Design, OS, DBMS completely free",
    },
    {
      icon: "🎯",
      title: "Pattern-Based Learning",
      description: "Master concepts through proven problem-solving patterns",
    },
    {
      icon: "👨‍🏫",
      title: "Expert Mentorship",
      description: "Get 1:1 guidance from industry professionals at just ₹99",
    },
    {
      icon: "💼",
      title: "Interview Ready",
      description: "Practical knowledge that prepares you for real interviews",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Students" },
    { number: "50+", label: "Free Courses" },
    { number: "95%", label: "Success Rate" },
    { number: "₹99", label: "Mentorship" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="home-page">
      {/* 🌙 Dark Mode */}
      <div style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}>
        <DarkModeToggle />
      </div>

      {/* 🔝 Navbar */}
      <nav className="home-navbar">
        <div className="home-navbar-content">
          <div className="logo">🎓 Babua Tech</div>

          <div className="nav-links">
            {user ? (
              <>
                <Link to="/profile" className="nav-link">
                  👤 {user.displayName?.split(" ")[0] || "Profile"}
                </Link>

                <Link to="/courses" className="nav-btn-primary">
                  My Courses
                </Link>

                <Link to="/revision" className="nav-btn-primary">
                  📚 Revision
                </Link>

                <Link to="/notes" className="nav-btn-primary">
                  💎 Premium Notes
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/signup" className="nav-btn-primary">
                  Sign Up Free
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* 🚀 Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Free Tech Education for <span className="highlight">Everyone</span>
          </h1>
          <p>Master DSA, System Design, OS & DBMS — 100% Free</p>

          <div className="hero-buttons">
            <Link to="/courses">
              <button className="primary-button">🚀 Start Learning</button>
            </Link>
            <Link to="/mentorship">
              <button className="secondary-button">👨‍🏫 Mentorship ₹99</button>
            </Link>
          </div>
        </div>
      </section>

      {/* 📊 Stats */}
      <section className="stats-section">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <h3>{s.number}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </section>

      {/* ⭐ Features */}
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 💬 Testimonials */}
      <section className="testimonials-section">
        <div className="testimonial-card">
          <div>{"⭐".repeat(testimonials[currentTestimonial].rating)}</div>
          <p>"{testimonials[currentTestimonial].text}"</p>
          <strong>{testimonials[currentTestimonial].name}</strong>
          <span>{testimonials[currentTestimonial].role}</span>
        </div>
      </section>

      {/* 🔐 Admin */}
      <div className="admin-access">
        <Link to="/admin-login">
          <button className="admin-button">🔐 Admin</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
