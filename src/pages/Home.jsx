import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import DarkModeToggle from "../components/DarkModeToggle";

function Home() {
  const [user] = useAuthState(auth);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  /* ================= DATA ================= */

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "SDE at Amazon",
      image: "👨‍💻",
      text:
        "The DSA course helped me crack my dream job at Amazon. Best free resource available!",
      rating: 5,
    },
    {
      name: "Priya Singh",
      role: "Software Engineer at Google",
      image: "👩‍💻",
      text:
        "Mentorship sessions were incredibly valuable. Got personalized guidance.",
      rating: 5,
    },
    {
      name: "Amit Patel",
      role: "Full Stack Developer",
      image: "👨‍💼",
      text:
        "Clear explanations and practical examples. Highly recommended!",
      rating: 5,
    },
  ];

  const stats = [
    { icon: "👥", number: "10,000+", label: "Students" },
    { icon: "📚", number: "50+", label: "Free Courses" },
    { icon: "✅", number: "95%", label: "Success Rate" },
    { icon: "💰", number: "₹99", label: "Mentorship" },
  ];

  const features = [
    {
      icon: "🎯",
      title: "Pattern-Based Learning",
      description: "Master DSA using proven problem-solving patterns",
    },
    {
      icon: "🚀",
      title: "Industry Ready",
      description: "System Design, OS, DBMS & LLD",
    },
    {
      icon: "👨‍🏫",
      title: "Expert Mentorship",
      description: "1:1 mentorship at just ₹99",
    },
    {
      icon: "🏆",
      title: "Interview Focused",
      description: "FAANG-style interview preparation",
    },
  ];

  /* ================= EFFECT ================= */

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  /* ================= UI ================= */

  return (
    <div className="home-page">
      {/* DARK MODE */}
      <div style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}>
        <DarkModeToggle />
      </div>

      {/* NAVBAR */}
      <nav className="home-navbar">
        <div className="home-navbar-content">
          <Link to="/" className="logo">🎓 BabuaTech</Link>

          <div className="nav-links">
            <Link to="/courses">Courses</Link>
            <Link to="/mentorship">Mentorship</Link>

            {user ? (
              <Link to="/profile">👤 {user.displayName || "Profile"}</Link>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup" className="nav-btn-primary">
                  Sign Up Free
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section">
        <h1>
          Learn Tech Skills <span className="highlight">100% Free</span>
        </h1>
        <p>DSA • System Design • OS • DBMS • LLD</p>

        <div className="hero-buttons">
          <Link to="/courses" className="primary-button">
            🚀 Start Learning
          </Link>
          <Link to="/mentorship" className="secondary-button">
            👨‍🏫 Mentorship ₹99
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <h3>{s.icon} {s.number}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <h2>Why Choose BabuaTech?</h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <h3>{f.icon} {f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="testimonial-section">
        <div className="testimonial-card">
          <div className="testimonial-icon">
            {testimonials[currentTestimonial].image}
          </div>

          <p className="testimonial-text">
            "{testimonials[currentTestimonial].text}"
          </p>

          <h4>{testimonials[currentTestimonial].name}</h4>
          <span>{testimonials[currentTestimonial].role}</span>

          <div className="stars">
            {"⭐".repeat(testimonials[currentTestimonial].rating)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to Start?</h2>
        <p>Join 10,000+ students learning for free</p>

        <Link to={user ? "/courses" : "/signup"}>
          <button className="cta-btn">
            {user ? "Go to Dashboard" : "Sign Up Free"}
          </button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 BabuaTech • Free Tech Education</p>
        <Link to="/admin-login">Admin</Link>
      </footer>
    </div>
  );
}

export default Home;
