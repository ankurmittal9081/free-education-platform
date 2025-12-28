import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DarkModeToggle from "../components/DarkModeToggle";

function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "SDE at Amazon",
      text: "The DSA course helped me crack my dream job. Best free resource available!",
      rating: 5
    },
    {
      name: "Priya Singh",
      role: "Software Engineer at Google",
      text: "Mentorship sessions were incredibly valuable. Got personalized guidance.",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Full Stack Developer",
      text: "Clear explanations and practical examples. Highly recommended!",
      rating: 5
    }
  ];

  const features = [
    {
      icon: "📚",
      title: "Free Courses",
      description: "Learn DSA, System Design, OS, DBMS completely free"
    },
    {
      icon: "🎯",
      title: "Pattern-Based Learning",
      description: "Master concepts through proven problem-solving patterns"
    },
    {
      icon: "👨‍🏫",
      title: "Expert Mentorship",
      description: "Get 1:1 guidance from industry professionals at just ₹99"
    },
    {
      icon: "💼",
      title: "Interview Ready",
      description: "Practical knowledge that prepares you for real interviews"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Students" },
    { number: "50+", label: "Free Courses" },
    { number: "95%", label: "Success Rate" },
    { number: "₹99", label: "Mentorship" }
  ];

  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="home-page">

      {/* Dark Mode Toggle (Top Right) */}
      <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1000 }}>
        <DarkModeToggle />
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Free Tech Education for <span className="highlight">Everyone</span>
          </h1>
          <p className="hero-subtitle">
            Master Data Structures, Algorithms, System Design, Operating Systems & Databases — 100% Free
          </p>

          <div className="hero-buttons">
            <Link to="/courses">
              <button className="primary-button">
                🚀 Start Learning (Free)
              </button>
            </Link>

            <Link to="/mentorship">
              <button className="secondary-button">
                👨‍🏫 Get Mentorship ₹99
              </button>
            </Link>
          </div>

          <p className="hero-note">
            ✨ No credit card required • No hidden fees • Learn at your own pace
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h3 className="stat-number">{stat.number}</h3>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <p className="section-subtitle">Everything you need to succeed in tech</p>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2 className="section-title">What Our Students Say</h2>

        <div className="testimonial-card">
          <div className="testimonial-rating">
            {"⭐".repeat(testimonials[currentTestimonial].rating)}
          </div>
          <p className="testimonial-text">
            "{testimonials[currentTestimonial].text}"
          </p>
          <div className="testimonial-author">
            <strong>{testimonials[currentTestimonial].name}</strong>
            <span>{testimonials[currentTestimonial].role}</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Start Your Journey?</h2>
        <p>Join thousands of students learning tech for free</p>

        <Link to="/courses">
          <button className="cta-button">
            Get Started Now - It's Free!
          </button>
        </Link>
      </section>

      {/* Admin Access */}
      <div className="admin-access">
        <Link to="/admin-login">
          <button className="admin-button">🔐 Admin</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
