// // // import { Link } from "react-router-dom";
// // // import { useState, useEffect } from "react";
// // // import { useAuthState } from "react-firebase-hooks/auth";
// // // import { auth } from "../firebase";
// // // import DarkModeToggle from "../components/DarkModeToggle";

// // // function Home() {
// // //   const [user] = useAuthState(auth);
// // //   const [currentTestimonial, setCurrentTestimonial] = useState(0);

// // //   /* ================= DATA ================= */

// // //   const testimonials = [
// // //     {
// // //       name: "Rahul Sharma",
// // //       role: "SDE at Amazon",
// // //       image: "👨‍💻",
// // //       text:
// // //         "The DSA course helped me crack my dream job at Amazon. Best free resource available!",
// // //       rating: 5,
// // //     },
// // //     {
// // //       name: "Priya Singh",
// // //       role: "Software Engineer at Google",
// // //       image: "👩‍💻",
// // //       text:
// // //         "Mentorship sessions were incredibly valuable. Got personalized guidance.",
// // //       rating: 5,
// // //     },
// // //     {
// // //       name: "Amit Patel",
// // //       role: "Full Stack Developer",
// // //       image: "👨‍💼",
// // //       text:
// // //         "Clear explanations and practical examples. Highly recommended!",
// // //       rating: 5,
// // //     },
// // //   ];

// // //   const stats = [
// // //     { icon: "👥", number: "10,000+", label: "Students" },
// // //     { icon: "📚", number: "50+", label: "Free Courses" },
// // //     { icon: "✅", number: "95%", label: "Success Rate" },
// // //     { icon: "💰", number: "₹99", label: "Mentorship" },
// // //   ];

// // //   const features = [
// // //     {
// // //       icon: "🎯",
// // //       title: "Pattern-Based Learning",
// // //       description: "Master DSA using proven problem-solving patterns",
// // //     },
// // //     {
// // //       icon: "🚀",
// // //       title: "Industry Ready",
// // //       description: "System Design, OS, DBMS & LLD",
// // //     },
// // //     {
// // //       icon: "👨‍🏫",
// // //       title: "Expert Mentorship",
// // //       description: "1:1 mentorship at just ₹99",
// // //     },
// // //     {
// // //       icon: "🏆",
// // //       title: "Interview Focused",
// // //       description: "FAANG-style interview preparation",
// // //     },
// // //   ];

// // //   /* ================= EFFECT ================= */

// // //   useEffect(() => {
// // //     const timer = setInterval(() => {
// // //       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
// // //     }, 5000);

// // //     return () => clearInterval(timer);
// // //   }, [testimonials.length]);

// // //   /* ================= UI ================= */

// // //   return (
// // //     <div className="home-page">
// // //       {/* DARK MODE */}
// // //       <div style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}>
// // //         <DarkModeToggle />
// // //       </div>

// // //       {/* NAVBAR */}
// // //       <nav className="home-navbar">
// // //         <div className="home-navbar-content">
// // //           <Link to="/" className="logo">🎓 BabuaTech</Link>

// // //           <div className="nav-links">
// // //             <Link to="/courses">Courses</Link>
// // //             <Link to="/mentorship">Mentorship</Link>

// // //             {user ? (
// // //               <Link to="/profile">👤 {user.displayName || "Profile"}</Link>
// // //             ) : (
// // //               <>
// // //                 <Link to="/login">Login</Link>
// // //                 <Link to="/signup" className="nav-btn-primary">
// // //                   Sign Up Free
// // //                 </Link>
// // //               </>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </nav>

// // //       {/* HERO */}
// // //       <section className="hero-section">
// // //         <h1>
// // //           Learn Tech Skills <span className="highlight">100% Free</span>
// // //         </h1>
// // //         <p>DSA • System Design • OS • DBMS • LLD</p>

// // //         <div className="hero-buttons">
// // //           <Link to="/courses" className="primary-button">
// // //             🚀 Start Learning
// // //           </Link>
// // //           <Link to="/mentorship" className="secondary-button">
// // //             👨‍🏫 Mentorship ₹99
// // //           </Link>
// // //         </div>
// // //       </section>

// // //       {/* STATS */}
// // //       <section className="stats-section">
// // //         {stats.map((s, i) => (
// // //           <div key={i} className="stat-card">
// // //             <h3>{s.icon} {s.number}</h3>
// // //             <p>{s.label}</p>
// // //           </div>
// // //         ))}
// // //       </section>

// // //       {/* FEATURES */}
// // //       <section className="features-section">
// // //         <h2>Why Choose BabuaTech?</h2>
// // //         <div className="features-grid">
// // //           {features.map((f, i) => (
// // //             <div key={i} className="feature-card">
// // //               <h3>{f.icon} {f.title}</h3>
// // //               <p>{f.description}</p>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </section>

// // //       {/* TESTIMONIAL */}
// // //       <section className="testimonial-section">
// // //         <div className="testimonial-card">
// // //           <div className="testimonial-icon">
// // //             {testimonials[currentTestimonial].image}
// // //           </div>

// // //           <p className="testimonial-text">
// // //             "{testimonials[currentTestimonial].text}"
// // //           </p>

// // //           <h4>{testimonials[currentTestimonial].name}</h4>
// // //           <span>{testimonials[currentTestimonial].role}</span>

// // //           <div className="stars">
// // //             {"⭐".repeat(testimonials[currentTestimonial].rating)}
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* CTA */}
// // //       <section className="cta-section">
// // //         <h2>Ready to Start?</h2>
// // //         <p>Join 10,000+ students learning for free</p>

// // //         <Link to={user ? "/courses" : "/signup"}>
// // //           <button className="cta-btn">
// // //             {user ? "Go to Dashboard" : "Sign Up Free"}
// // //           </button>
// // //         </Link>
// // //       </section>

// // //       {/* FOOTER */}
// // //       <footer className="footer">
// // //         <p>© 2025 BabuaTech • Free Tech Education</p>
// // //         <Link to="/admin-login">Admin</Link>
// // //       </footer>
// // //     </div>
// // //   );
// // // }

// // // export default Home;
// // import { Link } from "react-router-dom";
// // import { useState, useEffect } from "react";
// // import { useAuthState } from "react-firebase-hooks/auth";
// // import { auth } from "../firebase";
// // import DarkModeToggle from "../components/DarkModeToggle";
// // import "../index.css"; // ✅ CSS import

// // function Home() {
// //   const [user] = useAuthState(auth);
// //   const [currentTestimonial, setCurrentTestimonial] = useState(0);
// //   const [scrolled, setScrolled] = useState(false);

// //   /* ================= DATA ================= */

// //   const testimonials = [
// //     {
// //       name: "Rahul Sharma",
// //       role: "SDE at Amazon",
// //       image: "👨‍💻",
// //       text: "The DSA course helped me crack my dream job at Amazon. Best free resource available!",
// //       rating: 5,
// //       package: "45 LPA",
// //     },
// //     {
// //       name: "Priya Singh",
// //       role: "Software Engineer at Google",
// //       image: "👩‍💻",
// //       text: "Mentorship sessions were incredibly valuable. Got personalized guidance.",
// //       rating: 5,
// //       package: "52 LPA",
// //     },
// //     {
// //       name: "Amit Patel",
// //       role: "Full Stack Developer at Microsoft",
// //       image: "👨‍💼",
// //       text: "Clear explanations and practical examples. Highly recommended!",
// //       rating: 5,
// //       package: "38 LPA",
// //     },
// //   ];

// //   const stats = [
// //     { icon: "👥", number: "10,000+", label: "Active Students" },
// //     { icon: "📚", number: "50+", label: "Free Courses" },
// //     { icon: "✅", number: "95%", label: "Success Rate" },
// //     { icon: "💰", number: "₹99", label: "Mentorship" },
// //   ];

// //   const features = [
// //     { icon: "🎯", title: "Pattern-Based Learning", description: "Master DSA using proven problem-solving patterns" },
// //     { icon: "🚀", title: "Industry Ready", description: "System Design, OS, DBMS & LLD" },
// //     { icon: "👨‍🏫", title: "Expert Mentorship", description: "1:1 mentorship at just ₹99" },
// //     { icon: "🏆", title: "Interview Focused", description: "FAANG-style interview preparation" },
// //   ];

// //   const courses = [
// //     { name: "DSA Mastery", students: "5000+", rating: 4.9, level: "Beginner to Advanced", icon: "💻" },
// //     { name: "System Design", students: "3000+", rating: 4.8, level: "Intermediate", icon: "🏗️" },
// //     { name: "Operating Systems", students: "2500+", rating: 4.7, level: "Intermediate", icon: "⚙️" },
// //     { name: "DBMS Complete", students: "2000+", rating: 4.9, level: "Beginner", icon: "🗄️" },
// //     { name: "LLD Patterns", students: "1800+", rating: 4.8, level: "Advanced", icon: "🎨" },
// //     { name: "React Development", students: "4000+", rating: 4.9, level: "Beginner", icon: "⚛️" },
// //   ];

// //   const companies = [
// //     { name: "Google", logo: "🔍" },
// //     { name: "Amazon", logo: "📦" },
// //     { name: "Microsoft", logo: "🪟" },
// //     { name: "Meta", logo: "📘" },
// //     { name: "Netflix", logo: "🎬" },
// //     { name: "Apple", logo: "🍎" },
// //   ];

// //   /* ================= EFFECTS ================= */

// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
// //     }, 5000);
// //     return () => clearInterval(timer);
// //   }, [testimonials.length]);

// //   useEffect(() => {
// //     const handleScroll = () => setScrolled(window.scrollY > 50);
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   /* ================= UI ================= */

// //   return (
// //     <div className="home-page">
// //       <div className="dark-toggle">
// //         <DarkModeToggle />
// //       </div>

// //       {/* NAVBAR */}
// //       <nav className={`home-navbar ${scrolled ? "scrolled" : ""}`}>
// //         <div className="home-navbar-content">
// //           <Link to="/" className="logo">🎓 BabuaTech</Link>
// //           <div className="nav-links">
// //             <Link to="/courses">Courses</Link>
// //             <Link to="/mentorship">Mentorship</Link>
// //             {user ? (
// //               <Link to="/profile">👤 {user.displayName || "Profile"}</Link>
// //             ) : (
// //               <>
// //                 <Link to="/login">Login</Link>
// //                 <Link to="/signup" className="nav-btn-primary">Sign Up Free</Link>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </nav>

// //       {/* HERO */}
// //       <section className="hero-section">
// //         <h1>Learn Tech Skills <span className="highlight">100% Free</span></h1>
// //         <p>DSA • System Design • OS • DBMS • LLD</p>
// //         <div className="hero-buttons">
// //           <Link to="/courses" className="primary-button">🚀 Start Learning</Link>
// //           <Link to="/mentorship" className="secondary-button">👨‍🏫 Get Mentorship ₹99</Link>
// //         </div>
// //       </section>

// //       {/* STATS */}
// //       <section className="stats-section">
// //         {stats.map((s, i) => (
// //           <div key={i} className="stat-card">
// //             <h3>{s.icon} {s.number}</h3>
// //             <p>{s.label}</p>
// //           </div>
// //         ))}
// //       </section>

// //       {/* COMPANIES */}
// //       <section className="companies-section">
// //         <h3>Our Students Work At</h3>
// //         <div className="companies-grid">
// //           {companies.map((c, i) => (
// //             <div key={i} className="company-logo">{c.logo}</div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* FEATURES */}
// //       <section className="features-section">
// //         <h2>Why Choose BabuaTech?</h2>
// //         <div className="features-grid">
// //           {features.map((f, i) => (
// //             <div key={i} className="feature-card">
// //               <h3>{f.icon} {f.title}</h3>
// //               <p>{f.description}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* COURSES */}
// //       <section className="courses-section">
// //         <h2>Popular Courses</h2>
// //         <div className="courses-grid">
// //           {courses.map((c, i) => (
// //             <div key={i} className="course-card">
// //               <span className="course-icon">{c.icon}</span>
// //               <h3>{c.name}</h3>
// //               <div className="course-meta">
// //                 <span>👥 {c.students}</span>
// //                 <span>⭐ {c.rating}</span>
// //                 <span>📊 {c.level}</span>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* TESTIMONIAL */}
// //       <section className="testimonial-section">
// //         <div className="testimonial-card">
// //           <div className="testimonial-icon">{testimonials[currentTestimonial].image}</div>
// //           <p>"{testimonials[currentTestimonial].text}"</p>
// //           <h4>{testimonials[currentTestimonial].name}</h4>
// //           <span>{testimonials[currentTestimonial].role}</span>
// //           <div className="testimonial-package">💰 {testimonials[currentTestimonial].package}</div>
// //         </div>
// //       </section>

// //       {/* CTA */}
// //       <section className="cta-section">
// //         <h2>Ready to Start Your Journey?</h2>
// //         <p>Join 10,000+ students learning for free</p>
// //         <Link to={user ? "/courses" : "/signup"}>
// //           <button className="cta-btn">
// //             {user ? "Go to Dashboard →" : "Sign Up Free →"}
// //           </button>
// //         </Link>
// //       </section>

// //       {/* FOOTER */}
// //       <footer className="footer">
// //         <p>© 2025 BabuaTech</p>
// //         <Link to="/admin-login">Admin Portal</Link>
// //       </footer>
// //     </div>
// //   );
// // }

// // export default Home;
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../firebase";
// import DarkModeToggle from "../components/DarkModeToggle";
// import "../index.css"; // Create this CSS file with the styles below

// function Home() {
//   const [user] = useAuthState(auth);
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const [scrolled, setScrolled] = useState(false);

//   /* ================= DATA ================= */

//   const testimonials = [
//     {
//       name: "Rahul Sharma",
//       role: "SDE at Amazon",
//       image: "👨‍💻",
//       text: "The DSA course helped me crack my dream job at Amazon. Best free resource available!",
//       rating: 5,
//       package: "45 LPA"
//     },
//     {
//       name: "Priya Singh",
//       role: "Software Engineer at Google",
//       image: "👩‍💻",
//       text: "Mentorship sessions were incredibly valuable. Got personalized guidance.",
//       rating: 5,
//       package: "52 LPA"
//     },
//     {
//       name: "Amit Patel",
//       role: "Full Stack Developer at Microsoft",
//       image: "👨‍💼",
//       text: "Clear explanations and practical examples. Highly recommended!",
//       rating: 5,
//       package: "38 LPA"
//     },
//   ];

//   const stats = [
//     { icon: "👥", number: "10,000+", label: "Active Students" },
//     { icon: "📚", number: "50+", label: "Free Courses" },
//     { icon: "✅", number: "95%", label: "Success Rate" },
//     { icon: "💰", number: "₹99", label: "Mentorship" },
//   ];

//   const features = [
//     {
//       icon: "🎯",
//       title: "Pattern-Based Learning",
//       description: "Master DSA using proven problem-solving patterns"
//     },
//     {
//       icon: "🚀",
//       title: "Industry Ready",
//       description: "System Design, OS, DBMS & LLD"
//     },
//     {
//       icon: "👨‍🏫",
//       title: "Expert Mentorship",
//       description: "1:1 mentorship at just ₹99"
//     },
//     {
//       icon: "🏆",
//       title: "Interview Focused",
//       description: "FAANG-style interview preparation"
//     },
//   ];

//   const courses = [
//     { name: "DSA Mastery", students: "5000+", rating: 4.9, level: "Beginner to Advanced", icon: "💻" },
//     { name: "System Design", students: "3000+", rating: 4.8, level: "Intermediate", icon: "🏗️" },
//     { name: "Operating Systems", students: "2500+", rating: 4.7, level: "Intermediate", icon: "⚙️" },
//     { name: "DBMS Complete", students: "2000+", rating: 4.9, level: "Beginner", icon: "🗄️" },
//     { name: "LLD Patterns", students: "1800+", rating: 4.8, level: "Advanced", icon: "🎨" },
//     { name: "React Development", students: "4000+", rating: 4.9, level: "Beginner", icon: "⚛️" },
//   ];

//   const companies = [
//     { name: "Google", logo: "🔍" },
//     { name: "Amazon", logo: "📦" },
//     { name: "Microsoft", logo: "🪟" },
//     { name: "Meta", logo: "📘" },
//     { name: "Netflix", logo: "🎬" },
//     { name: "Apple", logo: "🍎" },
//   ];

//   /* ================= EFFECTS ================= */

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [testimonials.length]);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   /* ================= UI ================= */

//   return (
//     <div className="home-page">
//       {/* DARK MODE */}
//       <div style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}>
//         <DarkModeToggle />
//       </div>

//       {/* NAVBAR */}
//       <nav className={`home-navbar ${scrolled ? 'scrolled' : ''}`}>
//         <div className="home-navbar-content">
//           <Link to="/" className="logo">🎓 BabuaTech</Link>

//           <div className="nav-links">
//             <Link to="/courses">Courses</Link>
//             <Link to="/mentorship">Mentorship</Link>

//             {user ? (
//               <Link to="/profile">👤 {user.displayName || "Profile"}</Link>
//             ) : (
//               <>
//                 <Link to="/login">Login</Link>
//                 <Link to="/signup" className="nav-btn-primary">
//                   Sign Up Free
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* HERO */}
//       <section className="hero-section">
//         <h1>
//           Learn Tech Skills <span className="highlight">100% Free</span>
//         </h1>
//         <p>DSA • System Design • OS • DBMS • LLD</p>

//         <div className="hero-buttons">
//           <Link to="/courses" className="primary-button">
//             🚀 Start Learning
//           </Link>
//           <Link to="/mentorship" className="secondary-button">
//             👨‍🏫 Get Mentorship ₹99
//           </Link>
//         </div>
//       </section>

//       {/* STATS */}
//       <section className="stats-section">
//         {stats.map((s, i) => (
//           <div key={i} className="stat-card" style={{ animationDelay: `${i * 0.1}s` }}>
//             <h3>{s.icon} {s.number}</h3>
//             <p>{s.label}</p>
//           </div>
//         ))}
//       </section>

//       {/* COMPANIES */}
//       <section className="companies-section">
//         <h3>Our Students Work At</h3>
//         <div className="companies-grid">
//           {companies.map((c, i) => (
//             <div key={i} className="company-logo" title={c.name}>
//               {c.logo}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* FEATURES */}
//       <section className="features-section">
//         <h2>Why Choose BabuaTech?</h2>
//         <div className="features-grid">
//           {features.map((f, i) => (
//             <div key={i} className="feature-card">
//               <h3>{f.icon} {f.title}</h3>
//               <p>{f.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* COURSES */}
//       <section className="courses-section">
//         <h2>Popular Courses</h2>
//         <div className="courses-grid">
//           {courses.map((c, i) => (
//             <div key={i} className="course-card">
//               <div className="course-header">
//                 <span className="course-icon">{c.icon}</span>
//                 <div>
//                   <h3>{c.name}</h3>
//                 </div>
//               </div>
//               <div className="course-meta">
//                 <span>👥 {c.students}</span>
//                 <span>⭐ {c.rating}</span>
//                 <span>📊 {c.level}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* TESTIMONIAL */}
//       <section className="testimonial-section">
//         <div className="testimonial-card" key={currentTestimonial}>
//           <div className="testimonial-icon">
//             {testimonials[currentTestimonial].image}
//           </div>

//           <p className="testimonial-text">
//             "{testimonials[currentTestimonial].text}"
//           </p>

//           <h4>{testimonials[currentTestimonial].name}</h4>
//           <span>{testimonials[currentTestimonial].role}</span>
          
//           <div className="testimonial-package">
//             💰 Package: {testimonials[currentTestimonial].package}
//           </div>

//           <div className="stars">
//             {"⭐".repeat(testimonials[currentTestimonial].rating)}
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="cta-section">
//         <h2>Ready to Start Your Journey?</h2>
//         <p>Join 10,000+ students learning for free</p>

//         <Link to={user ? "/courses" : "/signup"}>
//           <button className="cta-btn">
//             {user ? "Go to Dashboard →" : "Sign Up Free →"}
//           </button>
//         </Link>
//       </section>

//       {/* FOOTER */}
//       <footer className="footer">
//         <p>© 2025 BabuaTech • Free Tech Education for Everyone</p>
//         <Link to="/admin-login">Admin Portal</Link>
//       </footer>
//     </div>
//   );
// }

// export default Home;
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import "../index.css";

function Home() {
  const [user] = useAuthState(auth);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  /* ================= DATA ================= */

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "SDE at Amazon",
      image: "👨‍💻",
      text: "Mock interviews helped me crack Amazon. Best investment!",
      rating: 5,
    },
    {
      name: "Priya Singh",
      role: "Software Engineer at Google",
      image: "👩‍💻",
      text: "Mentorship sessions were incredibly valuable.",
      rating: 5,
    },
    {
      name: "Amit Patel",
      role: "Full Stack Developer",
      image: "👨‍💼",
      text: "Clear explanations and practical examples.",
      rating: 5,
    },
  ];

  const services = [
    {
      icon: "👨‍🏫",
      title: "1:1 Mentorship",
      price: "₹99",
      duration: "30 mins",
      features: ["Resume Review", "Career Guidance", "Doubt Solving"],
      link: "/mentorship",
    },
    {
      icon: "🎯",
      title: "Mock Interview",
      price: "₹199",
      duration: "45 mins",
      features: ["DSA Round", "System Design", "Detailed Feedback"],
      link: "/mock-interview",
    },
  ];

  const stats = [
    { icon: "👥", number: "10,000+", label: "Students" },
    { icon: "📚", number: "50+", label: "Free Courses" },
    { icon: "✅", number: "95%", label: "Success Rate" },
    { icon: "🎯", number: "500+", label: "Mock Interviews" },
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
      {/* NAVBAR */}
      <nav className="home-navbar scrolled">
        <div className="home-navbar-content">
          <Link to="/" className="logo">🎓 BabuaTech</Link>
          <div className="nav-links">
            <Link to="/courses">Courses</Link>
            <Link to="/mentorship">Mentorship</Link>
            <Link to="/mock-interview">Mock Interview</Link>

            {user ? (
              <Link to="/profile">👤 {user.displayName || "Profile"}</Link>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup" className="nav-btn-primary">Sign Up Free</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section">
        <h1>
          Master Tech Skills <span className="highlight">100% Free</span>
        </h1>
        <p>DSA • System Design • LLD • OS • DBMS</p>

        <div className="hero-buttons">
  <Link to={user ? "/courses" : "/signup"} className="primary-button">
    🚀 Start Learning
  </Link>

  <Link to="/mentorship" className="secondary-button">
    👨‍🏫 Get Mentorship
  </Link>

  <Link to="/mock-interview" className="secondary-button">
    🎯 Mock Interview
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

      {/* SERVICES */}
      <section className="features-section">
        <h2>Premium Services</h2>
        <div className="features-grid">
          {services.map((s, i) => (
            <div key={i} className="feature-card">
              <h3>{s.icon} {s.title}</h3>
              <p><strong>{s.price}</strong> / {s.duration}</p>
              <ul>
                {s.features.map((f, idx) => (
                  <li key={idx}>✓ {f}</li>
                ))}
              </ul>
              <Link to={s.link} className="primary-button">Book Now →</Link>
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
        <h2>Ready to Transform Your Career?</h2>
        <p>Join 10,000+ students learning tech for free</p>
        <Link to={user ? "/courses" : "/signup"}>
          <button className="cta-btn">
            {user ? "Go to Dashboard →" : "Sign Up Free →"}
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
