// // // import { useState } from "react";
// // // import { collection, addDoc } from "firebase/firestore";
// // // import { db } from "../firebase";
// // // import emailjs from "emailjs-com";

// // // function Mentorship() {
// // //   const [name, setName] = useState("");
// // //   const [email, setEmail] = useState(""); // ✅ EMAIL STATE
// // //   const [topic, setTopic] = useState("");
// // //   const [slot, setSlot] = useState("");
// // //   const [paid, setPaid] = useState(false);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState("");

// // //   // ✅ EMAIL FUNCTION
// // //   function sendConfirmationEmail(data) {
// // //     emailjs
// // //       .send(
// // //         "service_tkcj717",        // ✅ SERVICE ID
// // //         "template_muhu7cm",       // ✅ TEMPLATE ID
// // //         {
// // //           to_email: data.email,
// // //           student_name: data.name,
// // //           topic: data.topic,
// // //           slot: data.slot,
// // //         },
// // //         "SdFztNCiBTk1lxR_l"    // ✅ PUBLIC KEY
// // //       )
// // //       .then(() => {
// // //         console.log("✅ Email sent successfully");
// // //       })
// // //       .catch((err) => {
// // //         console.error("❌ Email error:", err);
// // //       });
// // //   }

// // //   async function demoPayment() {
// // //     setError("");

// // //     // ✅ VALIDATION
// // //     if (!name.trim()) {
// // //       setError("Please enter your name");
// // //       return;
// // //     }
// // //     if (!email.trim()) {
// // //       setError("Please enter your email");
// // //       return;
// // //     }
// // //     if (!topic) {
// // //       setError("Please select a topic");
// // //       return;
// // //     }
// // //     if (!slot) {
// // //       setError("Please select a time slot");
// // //       return;
// // //     }

// // //     try {
// // //       setLoading(true);

// // //       // ✅ SAVE BOOKING
// // //       await addDoc(collection(db, "bookings"), {
// // //         name: name.trim(),
// // //         email: email.trim(),
// // //         topic,
// // //         slot,
// // //         price: 99,
// // //         paymentId: "DEMO_PAYMENT_" + Date.now(),
// // //         status: "PAID",
// // //         createdAt: new Date(),
// // //       });

// // //       // ✅ SEND EMAIL AFTER SUCCESS
// // //       sendConfirmationEmail({
// // //         name,
// // //         email,
// // //         topic,
// // //         slot,
// // //       });

// // //       setPaid(true);
// // //     } catch (err) {
// // //       console.error("Booking error:", err);
// // //       setError("Booking failed. Please try again.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }

// // //   // ✅ SUCCESS PAGE
// // //   if (paid) {
// // //     return (
// // //       <div className="page success-page">
// // //         <div className="success-card">
// // //           <h2>✅ Payment Successful</h2>
// // //           <p>Your mentorship session has been booked successfully!</p>

// // //           <div className="booking-details">
// // //             <p><strong>Name:</strong> {name}</p>
// // //             <p><strong>Email:</strong> {email}</p>
// // //             <p><strong>Topic:</strong> {topic}</p>
// // //             <p><strong>Time:</strong> {slot}</p>
// // //             <p><strong>Amount Paid:</strong> ₹99</p>
// // //           </div>

// // //           <button onClick={() => (window.location.href = "/")}>
// // //             Back to Home
// // //           </button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // ✅ FORM PAGE
// // //   return (
// // //     <div className="page">
// // //       <div className="mentorship-container">
// // //         <h2>📚 1:1 Mentorship Session</h2>
// // //         <p className="subtitle">
// // //           Get personalized guidance from expert mentors
// // //         </p>

// // //         <form
// // //           onSubmit={(e) => {
// // //             e.preventDefault();
// // //             demoPayment();
// // //           }}
// // //         >
// // //           <div className="form-group">
// // //             <label>Your Name *</label>
// // //             <input
// // //               type="text"
// // //               placeholder="Enter your full name"
// // //               value={name}
// // //               onChange={(e) => setName(e.target.value)}
// // //               disabled={loading}
// // //             />
// // //           </div>

// // //           <div className="form-group">
// // //             <label>Email *</label>
// // //             <input
// // //               type="email"
// // //               placeholder="Enter your email"
// // //               value={email}
// // //               onChange={(e) => setEmail(e.target.value)}
// // //               disabled={loading}
// // //             />
// // //           </div>

// // //           <div className="form-group">
// // //             <label>Select Topic *</label>
// // //             <select
// // //               value={topic}
// // //               onChange={(e) => setTopic(e.target.value)}
// // //               disabled={loading}
// // //             >
// // //               <option value="">Choose a topic</option>
// // //               <option value="DSA">Data Structures & Algorithms</option>
// // //               <option value="System Design">System Design</option>
// // //               <option value="Resume Review">Resume Review</option>
// // //               <option value="Interview Prep">Interview Preparation</option>
// // //             </select>
// // //           </div>

// // //           <div className="form-group">
// // //             <label>Select Time Slot *</label>
// // //             <select
// // //               value={slot}
// // //               onChange={(e) => setSlot(e.target.value)}
// // //               disabled={loading}
// // //             >
// // //               <option value="">Choose a time slot</option>
// // //               <option value="Today 6–7 PM">Today 6–7 PM</option>
// // //               <option value="Today 7–8 PM">Today 7–8 PM</option>
// // //               <option value="Tomorrow 6–7 PM">Tomorrow 6–7 PM</option>
// // //               <option value="Tomorrow 7–8 PM">Tomorrow 7–8 PM</option>
// // //             </select>
// // //           </div>

// // //           {error && <div className="error-message">⚠️ {error}</div>}

// // //           <div className="price-section">
// // //             <h3>Total Amount: ₹99</h3>
// // //             <p className="price-note">One-time session fee</p>
// // //           </div>

// // //           <button type="submit" disabled={loading}>
// // //             {loading ? "Processing..." : "Pay ₹99 (Demo)"}
// // //           </button>

// // //           <p className="disclaimer">
// // //             * This is a demo payment. No real money will be charged.
// // //           </p>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default Mentorship;
// // import { useState } from "react";
// // import { collection, addDoc } from "firebase/firestore";
// // import { db } from "../firebase";
// // import emailjs from "emailjs-com";

// // function Mentorship() {
// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState(""); // ✅ EMAIL STATE
// //   const [topic, setTopic] = useState("");
// //   const [slot, setSlot] = useState("");
// //   const [paid, setPaid] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   // ✅ EMAIL FUNCTION
// //   function sendConfirmationEmail(data) {
// //     emailjs
// //       .send(
// //         "service_tkcj717",        // ✅ SERVICE ID
// //         "template_muhu7cm",       // ✅ TEMPLATE ID
// //         {
// //           to_email: data.email,
// //           student_name: data.name,
// //           topic: data.topic,
// //           slot: data.slot,
// //         },
// //         "SdFztNCiBTk1lxR_l"    // ✅ PUBLIC KEY
// //       )
// //       .then(() => {
// //         console.log("✅ Email sent successfully");
// //       })
// //       .catch((err) => {
// //         console.error("❌ Email error:", err);
// //       });
// //   }

// //   async function demoPayment() {
// //     setError("");

// //     // ✅ VALIDATION
// //     if (!name.trim()) {
// //       setError("Please enter your name");
// //       return;
// //     }
// //     if (!email.trim()) {
// //       setError("Please enter your email");
// //       return;
// //     }
// //     if (!topic) {
// //       setError("Please select a topic");
// //       return;
// //     }
// //     if (!slot) {
// //       setError("Please select a time slot");
// //       return;
// //     }

// //     try {
// //       setLoading(true);

// //       // ✅ SAVE BOOKING
// //       await addDoc(collection(db, "bookings"), {
// //         name: name.trim(),
// //         email: email.trim(),
// //         topic,
// //         slot,
// //         price: 99,
// //         paymentId: "DEMO_PAYMENT_" + Date.now(),
// //         status: "PAID",
// //         createdAt: new Date(),
// //       });

// //       // ✅ SEND EMAIL AFTER SUCCESS
// //       sendConfirmationEmail({
// //         name,
// //         email,
// //         topic,
// //         slot,
// //       });

// //       setPaid(true);
// //     } catch (err) {
// //       console.error("Booking error:", err);
// //       setError("Booking failed. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   // ✅ SUCCESS PAGE
// //   if (paid) {
// //     return (
// //       <div className="page success-page">
// //         <div className="success-card">
// //           <h2>✅ Payment Successful</h2>
// //           <p>Your mentorship session has been booked successfully!</p>

// //           <div className="booking-details">
// //             <p><strong>Name:</strong> {name}</p>
// //             <p><strong>Email:</strong> {email}</p>
// //             <p><strong>Topic:</strong> {topic}</p>
// //             <p><strong>Time:</strong> {slot}</p>
// //             <p><strong>Amount Paid:</strong> ₹99</p>
// //           </div>

// //           <button onClick={() => (window.location.href = "/")}>
// //             Back to Home
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ✅ FORM PAGE
// //   return (
// //     <div className="page">
// //       <div className="mentorship-container">
// //         <h2>📚 1:1 Mentorship Session</h2>
// //         <p className="subtitle">
// //           Get personalized guidance from expert mentors
// //         </p>

// //         <form
// //           onSubmit={(e) => {
// //             e.preventDefault();
// //             demoPayment();
// //           }}
// //         >
// //           <div className="form-group">
// //             <label>Your Name *</label>
// //             <input
// //               type="text"
// //               placeholder="Enter your full name"
// //               value={name}
// //               onChange={(e) => setName(e.target.value)}
// //               disabled={loading}
// //             />
// //           </div>

// //           <div className="form-group">
// //             <label>Email *</label>
// //             <input
// //               type="email"
// //               placeholder="Enter your email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               disabled={loading}
// //             />
// //           </div>

// //           <div className="form-group">
// //             <label>Select Topic *</label>
// //             <select
// //               value={topic}
// //               onChange={(e) => setTopic(e.target.value)}
// //               disabled={loading}
// //             >
// //               <option value="">Choose a topic</option>
// //               <option value="DSA">Data Structures & Algorithms</option>
// //               <option value="System Design">System Design</option>
// //               <option value="Resume Review">Resume Review</option>
// //               <option value="Interview Prep">Interview Preparation</option>
// //             </select>
// //           </div>

// //           <div className="form-group">
// //             <label>Select Time Slot *</label>
// //             <select
// //               value={slot}
// //               onChange={(e) => setSlot(e.target.value)}
// //               disabled={loading}
// //             >
// //               <option value="">Choose a time slot</option>
// //               <option value="Today 6–7 PM">Today 6–7 PM</option>
// //               <option value="Today 7–8 PM">Today 7–8 PM</option>
// //               <option value="Tomorrow 6–7 PM">Tomorrow 6–7 PM</option>
// //               <option value="Tomorrow 7–8 PM">Tomorrow 7–8 PM</option>
// //             </select>
// //           </div>

// //           {error && <div className="error-message">⚠️ {error}</div>}

// //           <div className="price-section">
// //             <h3>Total Amount: ₹99</h3>
// //             <p className="price-note">One-time session fee</p>
// //           </div>

// //           <button type="submit" disabled={loading}>
// //             {loading ? "Processing..." : "Pay ₹99 (Demo)"}
// //           </button>

// //           <p className="disclaimer">
// //             * This is a demo payment. No real money will be charged.
// //           </p>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Mentorship;
// import { useState } from "react";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { db, auth } from "../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import emailjs from "emailjs-com";
// import "./Mentorship.css";

// function Mentorship() {
//   const [user] = useAuthState(auth);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     topic: "",
//     experience: "",
//     slot: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const topics = [
//     {
//       value: "DSA",
//       label: "Data Structures & Algorithms",
//       icon: "💻",
//       price: 99,
//       duration: "60 min",
//       description: "Master DSA concepts and problem-solving",
//     },
//     {
//       value: "System Design",
//       label: "System Design",
//       icon: "🏗️",
//       price: 149,
//       duration: "75 min",
//       description: "Learn to design scalable systems",
//     },
//     {
//       value: "Resume Review",
//       label: "Resume Review",
//       icon: "📄",
//       price: 49,
//       duration: "30 min",
//       description: "Get expert feedback on your resume",
//     },
//     {
//       value: "Interview Prep",
//       label: "Interview Preparation",
//       icon: "🎯",
//       price: 99,
//       duration: "60 min",
//       description: "Ace your technical interviews",
//     },
//     {
//       value: "Career Guidance",
//       label: "Career Guidance",
//       icon: "🚀",
//       price: 99,
//       duration: "60 min",
//       description: "Plan your tech career path",
//     },
//   ];

//   const experienceLevels = [
//     { value: "student", label: "Student / Fresher" },
//     { value: "0-2", label: "0-2 years experience" },
//     { value: "2-5", label: "2-5 years experience" },
//     { value: "5+", label: "5+ years experience" },
//   ];

//   const timeSlots = [
//     "Today 6:00 PM - 7:00 PM",
//     "Today 7:00 PM - 8:00 PM",
//     "Today 8:00 PM - 9:00 PM",
//     "Tomorrow 6:00 PM - 7:00 PM",
//     "Tomorrow 7:00 PM - 8:00 PM",
//     "Tomorrow 8:00 PM - 9:00 PM",
//     "This Weekend - Saturday",
//     "This Weekend - Sunday",
//   ];

//   const benefits = [
//     {
//       icon: "👨‍🏫",
//       title: "Expert Mentors",
//       desc: "Learn from industry professionals with 10+ years experience",
//     },
//     {
//       icon: "🎯",
//       title: "Personalized Guidance",
//       desc: "One-on-one sessions tailored to your needs",
//     },
//     {
//       icon: "📚",
//       title: "Resources Included",
//       desc: "Get study materials and practice problems",
//     },
//     {
//       icon: "💬",
//       title: "Lifetime Support",
//       desc: "Ask questions anytime via email/chat",
//     },
//   ];

//   // Send confirmation email
//   function sendConfirmationEmail(data) {
//     emailjs
//       .send(
//         "service_tkcj717",
//         "template_muhu7cm",
//         {
//           to_email: data.email,
//           student_name: data.name,
//           topic: data.topic,
//           slot: data.slot,
//         },
//         "SdFztNCiBTk1lxR_l"
//       )
//       .then(() => {
//         console.log("✅ Email sent successfully");
//       })
//       .catch((err) => {
//         console.error("❌ Email error:", err);
//       });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();

//     // Validation
//     if (!formData.name.trim()) {
//       toast.error("Please enter your name");
//       return;
//     }
//     if (!formData.email.trim()) {
//       toast.error("Please enter your email");
//       return;
//     }
//     if (!formData.topic) {
//       toast.error("Please select a topic");
//       return;
//     }
//     if (!formData.experience) {
//       toast.error("Please select your experience level");
//       return;
//     }
//     if (!formData.slot) {
//       toast.error("Please select a time slot");
//       return;
//     }

//     try {
//       setLoading(true);

//       const selectedTopic = topics.find((t) => t.value === formData.topic);

//       // Save to Firestore
//       await addDoc(collection(db, "mentorships"), {
//         userId: user?.uid || "guest",
//         userEmail: user?.email || formData.email,
//         ...formData,
//         topicLabel: selectedTopic.label,
//         price: selectedTopic.price,
//         duration: selectedTopic.duration,
//         status: "CONFIRMED",
//         paymentId: "DEMO_PAYMENT_" + Date.now(),
//         createdAt: serverTimestamp(),
//       });

//       // Send confirmation email
//       sendConfirmationEmail({
//         name: formData.name,
//         email: formData.email,
//         topic: selectedTopic.label,
//         slot: formData.slot,
//       });

//       toast.success("Mentorship session booked successfully!");
//       setSuccess(true);
//     } catch (err) {
//       console.error("Booking error:", err);
//       toast.error("Booking failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (success) {
//     const selectedTopic = topics.find((t) => t.value === formData.topic);

//     return (
//       <div className="mentorship-container">
//         <div className="success-wrapper">
//           <div className="success-card">
//             <div className="success-icon-wrapper">
//               <div className="success-icon">✓</div>
//             </div>

//             <h2 className="success-title">Session Booked!</h2>
//             <p className="success-subtitle">
//               Your mentorship session has been confirmed
//             </p>

//             <div className="booking-details">
//               <div className="detail-row">
//                 <span className="detail-label">Topic</span>
//                 <span className="detail-value">
//                   {selectedTopic?.icon} {selectedTopic?.label}
//                 </span>
//               </div>
//               <div className="detail-row">
//                 <span className="detail-label">Name</span>
//                 <span className="detail-value">{formData.name}</span>
//               </div>
//               <div className="detail-row">
//                 <span className="detail-label">Email</span>
//                 <span className="detail-value">{formData.email}</span>
//               </div>
//               <div className="detail-row">
//                 <span className="detail-label">Time Slot</span>
//                 <span className="detail-value">{formData.slot}</span>
//               </div>
//               <div className="detail-row">
//                 <span className="detail-label">Duration</span>
//                 <span className="detail-value">{selectedTopic?.duration}</span>
//               </div>
//               <div className="detail-row highlight">
//                 <span className="detail-label">Amount Paid</span>
//                 <span className="detail-value">₹{selectedTopic?.price}</span>
//               </div>
//             </div>

//             <div className="next-steps">
//               <h3>What's Next?</h3>
//               <ul>
//                 <li>✉️ Confirmation email sent to {formData.email}</li>
//                 <li>📅 Meeting link will be shared 1 hour before</li>
//                 <li>
//                   📝 Prepare your questions and topics to discuss
//                 </li>
//                 <li>🎯 Join 5 minutes early to test audio/video</li>
//               </ul>
//             </div>

//             <Link to="/" className="btn-home">
//               <span>←</span> Back to Home
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mentorship-container">
//       {/* Header */}
//       <div className="mentorship-header">
//         <Link to="/" className="back-link">
//           <span>←</span> Back
//         </Link>
//       </div>

//       <div className="mentorship-content">
//         {/* Left Section - Info */}
//         <div className="info-section">
//           <div className="info-card">
//             <h1 className="main-title">
//               <span className="title-icon">📚</span>
//               1:1 Mentorship Session
//             </h1>
//             <p className="main-subtitle">
//               Get personalized guidance from experienced tech professionals
//             </p>

//             <div className="benefits-grid">
//               {benefits.map((benefit, index) => (
//                 <div key={index} className="benefit-item">
//                   <div className="benefit-icon">{benefit.icon}</div>
//                   <div className="benefit-content">
//                     <h4>{benefit.title}</h4>
//                     <p>{benefit.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="pricing-highlight">
//               <div className="price-header">
//                 <h3>Affordable Pricing</h3>
//                 <div className="discount-badge">Best Value</div>
//               </div>
//               <div className="price-display">
//                 <span className="price-range">Starting at</span>
//                 <span className="new-price">₹49</span>
//                 <span className="price-label">per session</span>
//               </div>
//               <p className="price-note">
//                 Choose from various topics and durations
//               </p>
//             </div>

//             <div className="trust-indicators">
//               <div className="trust-item">
//                 <strong>1000+</strong>
//                 <span>Sessions Completed</span>
//               </div>
//               <div className="trust-item">
//                 <strong>4.8/5</strong>
//                 <span>Average Rating</span>
//               </div>
//               <div className="trust-item">
//                 <strong>98%</strong>
//                 <span>Satisfaction Rate</span>
//               </div>
//             </div>

//             <div className="mentor-profiles">
//               <h3>Our Mentors</h3>
//               <div className="mentor-list">
//                 <div className="mentor-tag">Google</div>
//                 <div className="mentor-tag">Microsoft</div>
//                 <div className="mentor-tag">Amazon</div>
//                 <div className="mentor-tag">Meta</div>
//                 <div className="mentor-tag">Netflix</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Form */}
//         <div className="form-section">
//           <div className="form-card">
//             <h2 className="form-title">Book Your Session</h2>
//             <p className="form-subtitle">
//               Fill in your details and choose your preferred topic
//             </p>

//             <form onSubmit={handleSubmit} className="booking-form">
//               {/* Name */}
//               <div className="form-group">
//                 <label>
//                   Full Name <span className="required">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter your full name"
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   className="form-input"
//                   required
//                 />
//               </div>

//               {/* Email */}
//               <div className="form-group">
//                 <label>
//                   Email Address <span className="required">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="your.email@example.com"
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                   className="form-input"
//                   required
//                 />
//               </div>

//               {/* Phone */}
//               <div className="form-group">
//                 <label>Phone Number</label>
//                 <input
//                   type="tel"
//                   placeholder="+91 XXXXX XXXXX"
//                   value={formData.phone}
//                   onChange={(e) =>
//                     setFormData({ ...formData, phone: e.target.value })
//                   }
//                   className="form-input"
//                 />
//               </div>

//               {/* Topic Selection */}
//               <div className="form-group">
//                 <label>
//                   Select Topic <span className="required">*</span>
//                 </label>
//                 <div className="topic-grid">
//                   {topics.map((topic) => (
//                     <div
//                       key={topic.value}
//                       className={`topic-card ${
//                         formData.topic === topic.value ? "selected" : ""
//                       }`}
//                       onClick={() =>
//                         setFormData({ ...formData, topic: topic.value })
//                       }
//                     >
//                       <div className="topic-icon">{topic.icon}</div>
//                       <div className="topic-info">
//                         <h4>{topic.label}</h4>
//                         <p>{topic.description}</p>
//                         <div className="topic-meta">
//                           <span className="duration">{topic.duration}</span>
//                           <span className="price">₹{topic.price}</span>
//                         </div>
//                       </div>
//                       {formData.topic === topic.value && (
//                         <div className="selected-indicator">✓</div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Experience Level */}
//               <div className="form-group">
//                 <label>
//                   Experience Level <span className="required">*</span>
//                 </label>
//                 <select
//                   value={formData.experience}
//                   onChange={(e) =>
//                     setFormData({ ...formData, experience: e.target.value })
//                   }
//                   className="form-select"
//                   required
//                 >
//                   <option value="">Select your experience level</option>
//                   {experienceLevels.map((level) => (
//                     <option key={level.value} value={level.value}>
//                       {level.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Time Slot */}
//               <div className="form-group">
//                 <label>
//                   Preferred Time Slot <span className="required">*</span>
//                 </label>
//                 <select
//                   value={formData.slot}
//                   onChange={(e) =>
//                     setFormData({ ...formData, slot: e.target.value })
//                   }
//                   className="form-select"
//                   required
//                 >
//                   <option value="">Choose a time slot</option>
//                   {timeSlots.map((slot) => (
//                     <option key={slot} value={slot}>
//                       {slot}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Additional Message */}
//               <div className="form-group">
//                 <label>Additional Notes (Optional)</label>
//                 <textarea
//                   placeholder="Any specific topics or questions you'd like to discuss?"
//                   value={formData.message}
//                   onChange={(e) =>
//                     setFormData({ ...formData, message: e.target.value })
//                   }
//                   className="form-textarea"
//                   rows="3"
//                 />
//               </div>

//               {/* Submit Button */}
//               <button type="submit" className="btn-submit" disabled={loading}>
//                 {loading ? (
//                   <>
//                     <span className="spinner"></span>
//                     Processing...
//                   </>
//                 ) : (
//                   <>
//                     <span>Book Session</span>
//                     {formData.topic && (
//                       <span className="btn-price">
//                         ₹{topics.find((t) => t.value === formData.topic)?.price}
//                       </span>
//                     )}
//                   </>
//                 )}
//               </button>

//               <p className="form-note">
//                 <span className="note-icon">ℹ️</span>
//                 This is a demo booking. No actual payment will be processed.
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Mentorship;
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import emailjs from "emailjs-com";
import "./Mentorship.css";

function Mentorship() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    experience: "",
    slot: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const topics = [
    {
      value: "DSA",
      label: "Data Structures & Algorithms",
      icon: "💻",
      price: 99,
      duration: "60 min",
      description: "Master DSA concepts and problem-solving",
    },
    {
      value: "System Design",
      label: "System Design",
      icon: "🏗️",
      price: 149,
      duration: "75 min",
      description: "Learn to design scalable systems",
    },
    {
      value: "Resume Review",
      label: "Resume Review",
      icon: "📄",
      price: 49,
      duration: "30 min",
      description: "Get expert feedback on your resume",
    },
    {
      value: "Interview Prep",
      label: "Interview Preparation",
      icon: "🎯",
      price: 99,
      duration: "60 min",
      description: "Ace your technical interviews",
    },
    {
      value: "Career Guidance",
      label: "Career Guidance",
      icon: "🚀",
      price: 99,
      duration: "60 min",
      description: "Plan your tech career path",
    },
  ];

  const experienceLevels = [
    { value: "student", label: "Student / Fresher" },
    { value: "0-2", label: "0-2 years experience" },
    { value: "2-5", label: "2-5 years experience" },
    { value: "5+", label: "5+ years experience" },
  ];

  const timeSlots = [
    "Today 6:00 PM - 7:00 PM",
    "Today 7:00 PM - 8:00 PM",
    "Today 8:00 PM - 9:00 PM",
    "Tomorrow 6:00 PM - 7:00 PM",
    "Tomorrow 7:00 PM - 8:00 PM",
    "Tomorrow 8:00 PM - 9:00 PM",
    "This Weekend - Saturday",
    "This Weekend - Sunday",
  ];

  const benefits = [
    {
      icon: "👨‍🏫",
      title: "Expert Mentors",
      desc: "Learn from industry professionals with 10+ years experience",
    },
    {
      icon: "🎯",
      title: "Personalized Guidance",
      desc: "One-on-one sessions tailored to your needs",
    },
    {
      icon: "📚",
      title: "Resources Included",
      desc: "Get study materials and practice problems",
    },
    {
      icon: "💬",
      title: "Lifetime Support",
      desc: "Ask questions anytime via email/chat",
    },
  ];

  // Send confirmation email
  function sendConfirmationEmail(data) {
    emailjs
      .send(
        "service_tkcj717",
        "template_muhu7cm",
        {
          to_email: data.email,
          student_name: data.name,
          topic: data.topic,
          slot: data.slot,
        },
        "SdFztNCiBTk1lxR_l"
      )
      .then(() => {
        console.log("✅ Email sent successfully");
      })
      .catch((err) => {
        console.error("❌ Email error:", err);
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!formData.topic) {
      toast.error("Please select a topic");
      return;
    }
    if (!formData.experience) {
      toast.error("Please select your experience level");
      return;
    }
    if (!formData.slot) {
      toast.error("Please select a time slot");
      return;
    }

    try {
      setLoading(true);

      const selectedTopic = topics.find((t) => t.value === formData.topic);

      if (!selectedTopic) {
        toast.error("Invalid topic selected");
        setLoading(false);
        return;
      }

      // Save to Firestore
      const docRef = await addDoc(collection(db, "mentorships"), {
        userId: user?.uid || "guest",
        userEmail: user?.email || formData.email,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        topic: formData.topic,
        experience: formData.experience,
        slot: formData.slot,
        message: formData.message.trim(),
        topicLabel: selectedTopic.label,
        price: selectedTopic.price,
        duration: selectedTopic.duration,
        status: "CONFIRMED",
        paymentId: "DEMO_PAYMENT_" + Date.now(),
        createdAt: new Date().toISOString(),
      });

      console.log("Document written with ID: ", docRef.id);

      // Send confirmation email
      try {
        sendConfirmationEmail({
          name: formData.name,
          email: formData.email,
          topic: selectedTopic.label,
          slot: formData.slot,
        });
      } catch (emailError) {
        console.error("Email error (non-blocking):", emailError);
      }

      toast.success("Mentorship session booked successfully!");
      setSuccess(true);
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Booking failed: " + (err.message || "Please try again"));
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    const selectedTopic = topics.find((t) => t.value === formData.topic);

    return (
      <div className="mentorship-container">
        <div className="success-wrapper">
          <div className="success-card">
            <div className="success-icon-wrapper">
              <div className="success-icon">✓</div>
            </div>

            <h2 className="success-title">Session Booked!</h2>
            <p className="success-subtitle">
              Your mentorship session has been confirmed
            </p>

            <div className="booking-details">
              <div className="detail-row">
                <span className="detail-label">Topic</span>
                <span className="detail-value">
                  {selectedTopic?.icon} {selectedTopic?.label}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Name</span>
                <span className="detail-value">{formData.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email</span>
                <span className="detail-value">{formData.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Time Slot</span>
                <span className="detail-value">{formData.slot}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Duration</span>
                <span className="detail-value">{selectedTopic?.duration}</span>
              </div>
              <div className="detail-row highlight">
                <span className="detail-label">Amount Paid</span>
                <span className="detail-value">₹{selectedTopic?.price}</span>
              </div>
            </div>

            <div className="next-steps">
              <h3>What's Next?</h3>
              <ul>
                <li>✉️ Confirmation email sent to {formData.email}</li>
                <li>📅 Meeting link will be shared 1 hour before</li>
                <li>
                  📝 Prepare your questions and topics to discuss
                </li>
                <li>🎯 Join 5 minutes early to test audio/video</li>
              </ul>
            </div>

            <Link to="/" className="btn-home">
              <span>←</span> Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mentorship-container">
      {/* Header */}
      <div className="mentorship-header">
        <Link to="/" className="back-link">
          <span>←</span> Back
        </Link>
      </div>

      <div className="mentorship-content">
        {/* Left Section - Info */}
        <div className="info-section">
          <div className="info-card">
            <h1 className="main-title">
              <span className="title-icon">📚</span>
              1:1 Mentorship Session
            </h1>
            <p className="main-subtitle">
              Get personalized guidance from experienced tech professionals
            </p>

            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <div className="benefit-icon">{benefit.icon}</div>
                  <div className="benefit-content">
                    <h4>{benefit.title}</h4>
                    <p>{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pricing-highlight">
              <div className="price-header">
                <h3>Affordable Pricing</h3>
                <div className="discount-badge">Best Value</div>
              </div>
              <div className="price-display">
                <span className="price-range">Starting at</span>
                <span className="new-price">₹49</span>
                <span className="price-label">per session</span>
              </div>
              <p className="price-note">
                Choose from various topics and durations
              </p>
            </div>

            <div className="trust-indicators">
              <div className="trust-item">
                <strong>1000+</strong>
                <span>Sessions Completed</span>
              </div>
              <div className="trust-item">
                <strong>4.8/5</strong>
                <span>Average Rating</span>
              </div>
              <div className="trust-item">
                <strong>98%</strong>
                <span>Satisfaction Rate</span>
              </div>
            </div>

            <div className="mentor-profiles">
              <h3>Our Mentors</h3>
              <div className="mentor-list">
                <div className="mentor-tag">Google</div>
                <div className="mentor-tag">Microsoft</div>
                <div className="mentor-tag">Amazon</div>
                <div className="mentor-tag">Meta</div>
                <div className="mentor-tag">Netflix</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="form-section">
          <div className="form-card">
            <h2 className="form-title">Book Your Session</h2>
            <p className="form-subtitle">
              Fill in your details and choose your preferred topic
            </p>

            <form onSubmit={handleSubmit} className="booking-form">
              {/* Name */}
              <div className="form-group">
                <label>
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="form-input"
                  required
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label>
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="form-input"
                  required
                />
              </div>

              {/* Phone */}
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="form-input"
                />
              </div>

              {/* Topic Selection */}
              <div className="form-group">
                <label>
                  Select Topic <span className="required">*</span>
                </label>
                <div className="topic-grid">
                  {topics.map((topic) => (
                    <div
                      key={topic.value}
                      className={`topic-card ${
                        formData.topic === topic.value ? "selected" : ""
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, topic: topic.value })
                      }
                    >
                      <div className="topic-icon">{topic.icon}</div>
                      <div className="topic-info">
                        <h4>{topic.label}</h4>
                        <p>{topic.description}</p>
                        <div className="topic-meta">
                          <span className="duration">{topic.duration}</span>
                          <span className="price">₹{topic.price}</span>
                        </div>
                      </div>
                      {formData.topic === topic.value && (
                        <div className="selected-indicator">✓</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div className="form-group">
                <label>
                  Experience Level <span className="required">*</span>
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                  className="form-select"
                  required
                >
                  <option value="">Select your experience level</option>
                  {experienceLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Slot */}
              <div className="form-group">
                <label>
                  Preferred Time Slot <span className="required">*</span>
                </label>
                <select
                  value={formData.slot}
                  onChange={(e) =>
                    setFormData({ ...formData, slot: e.target.value })
                  }
                  className="form-select"
                  required
                >
                  <option value="">Choose a time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              {/* Additional Message */}
              <div className="form-group">
                <label>Additional Notes (Optional)</label>
                <textarea
                  placeholder="Any specific topics or questions you'd like to discuss?"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="form-textarea"
                  rows="3"
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span>Book Session</span>
                    {formData.topic && (
                      <span className="btn-price">
                        ₹{topics.find((t) => t.value === formData.topic)?.price}
                      </span>
                    )}
                  </>
                )}
              </button>

              <p className="form-note">
                <span className="note-icon">ℹ️</span>
                This is a demo booking. No actual payment will be processed.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mentorship;