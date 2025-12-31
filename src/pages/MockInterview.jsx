// // // import { useState } from "react";
// // // import { collection, addDoc } from "firebase/firestore";
// // // import { db, auth } from "../firebase";
// // // import { useAuthState } from "react-firebase-hooks/auth";
// // // import { Link, useNavigate } from "react-router-dom";
// // // import toast from 'react-hot-toast';

// // // function MockInterview() {
// // //   const [user] = useAuthState(auth);
// // //   const navigate = useNavigate();
// // //   const [formData, setFormData] = useState({
// // //     name: "",
// // //     email: "",
// // //     phone: "",
// // //     interviewType: "",
// // //     experience: "",
// // //     preferredDate: "",
// // //     preferredTime: ""
// // //   });
// // //   const [loading, setLoading] = useState(false);
// // //   const [booked, setBooked] = useState(false);

// // //   const interviewTypes = [
// // //     { value: "dsa", label: "DSA Interview", icon: "💻", price: 199 },
// // //     { value: "system-design", label: "System Design", icon: "🏗️", price: 199 },
// // //     { value: "frontend", label: "Frontend Interview", icon: "🎨", price: 199 },
// // //     { value: "backend", label: "Backend Interview", icon: "⚙️", price: 199 },
// // //     { value: "full-stack", label: "Full Stack Interview", icon: "🚀", price: 299 }
// // //   ];

// // //   const timeSlots = [
// // //     "10:00 AM - 11:00 AM",
// // //     "11:00 AM - 12:00 PM",
// // //     "2:00 PM - 3:00 PM",
// // //     "3:00 PM - 4:00 PM",
// // //     "5:00 PM - 6:00 PM",
// // //     "6:00 PM - 7:00 PM"
// // //   ];

// // //   async function handleSubmit(e) {
// // //     e.preventDefault();

// // //     if (!user) {
// // //       toast.error("Please login to book mock interview");
// // //       navigate("/login");
// // //       return;
// // //     }

// // //     if (!formData.name || !formData.email || !formData.interviewType || !formData.preferredDate || !formData.preferredTime) {
// // //       toast.error("Please fill all required fields");
// // //       return;
// // //     }

// // //     try {
// // //       setLoading(true);

// // //       const selectedType = interviewTypes.find(t => t.value === formData.interviewType);

// // //       await addDoc(collection(db, "mockInterviews"), {
// // //         userId: user.uid,
// // //         ...formData,
// // //         price: selectedType.price,
// // //         interviewLabel: selectedType.label,
// // //         status: "CONFIRMED",
// // //         paymentId: "DEMO_PAYMENT_" + Date.now(),
// // //         bookedAt: new Date()
// // //       });

// // //       setBooked(true);
// // //       toast.success("Mock interview booked successfully!");
// // //     } catch (error) {
// // //       console.error("Booking error:", error);
// // //       toast.error("Failed to book interview. Please try again.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }

// // //   if (booked) {
// // //     return (
// // //       <div className="page-container">
// // //         <div className="success-container">
// // //           <div className="success-icon">✅</div>
// // //           <h2>Interview Booked Successfully!</h2>
// // //           <div className="booking-summary">
// // //             <p><strong>Name:</strong> {formData.name}</p>
// // //             <p><strong>Interview Type:</strong> {interviewTypes.find(t => t.value === formData.interviewType)?.label}</p>
// // //             <p><strong>Date:</strong> {formData.preferredDate}</p>
// // //             <p><strong>Time:</strong> {formData.preferredTime}</p>
// // //             <p><strong>Amount:</strong> ₹{interviewTypes.find(t => t.value === formData.interviewType)?.price}</p>
// // //           </div>
// // //           <p className="success-note">You'll receive a confirmation email shortly with the meeting link.</p>
// // //           <Link to="/" className="btn-primary">Back to Home</Link>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="page-container">
// // //       <div className="page-header">
// // //         <Link to="/" className="back-link">← Back to Home</Link>
// // //         <h1>🎯 Book Mock Interview</h1>
// // //         <p>Practice with industry experts and ace your interviews</p>
// // //       </div>

// // //       <div className="mock-container">
// // //         <div className="mock-info">
// // //           <h2>What You'll Get</h2>
// // //           <ul className="benefits-list">
// // //             <li>
// // //               <span className="benefit-icon">⏱️</span>
// // //               <div>
// // //                 <h4>45-Minute Session</h4>
// // //                 <p>Comprehensive interview simulation</p>
// // //               </div>
// // //             </li>
// // //             <li>
// // //               <span className="benefit-icon">👨‍💼</span>
// // //               <div>
// // //                 <h4>Expert Interviewer</h4>
// // //                 <p>Industry professionals from FAANG companies</p>
// // //               </div>
// // //             </li>
// // //             <li>
// // //               <span className="benefit-icon">📊</span>
// // //               <div>
// // //                 <h4>Detailed Feedback</h4>
// // //                 <p>Written report with improvement areas</p>
// // //               </div>
// // //             </li>
// // //             <li>
// // //               <span className="benefit-icon">🎥</span>
// // //               <div>
// // //                 <h4>Recording Available</h4>
// // //                 <p>Review your performance anytime</p>
// // //               </div>
// // //             </li>
// // //           </ul>

// // //           <div className="pricing-card">
// // //             <h3>Special Pricing</h3>
// // //             <div className="price-tag">
// // //               <span className="old-price">₹499</span>
// // //               <span className="new-price">₹199</span>
// // //             </div>
// // //             <p className="discount-note">60% OFF - Limited Time Offer!</p>
// // //           </div>
// // //         </div>

// // //         <div className="mock-form-container">
// // //           <form onSubmit={handleSubmit} className="mock-form">
// // //             <h3>Booking Details</h3>

// // //             <div className="form-group">
// // //               <label>Full Name *</label>
// // //               <input
// // //                 type="text"
// // //                 placeholder="Enter your full name"
// // //                 value={formData.name}
// // //                 onChange={(e) => setFormData({...formData, name: e.target.value})}
// // //                 required
// // //               />
// // //             </div>

// // //             <div className="form-group">
// // //               <label>Email *</label>
// // //               <input
// // //                 type="email"
// // //                 placeholder="your.email@example.com"
// // //                 value={formData.email}
// // //                 onChange={(e) => setFormData({...formData, email: e.target.value})}
// // //                 required
// // //               />
// // //             </div>

// // //             <div className="form-group">
// // //               <label>Phone Number</label>
// // //               <input
// // //                 type="tel"
// // //                 placeholder="+91 XXXXX XXXXX"
// // //                 value={formData.phone}
// // //                 onChange={(e) => setFormData({...formData, phone: e.target.value})}
// // //               />
// // //             </div>

// // //             <div className="form-group">
// // //               <label>Interview Type *</label>
// // //               <div className="interview-types">
// // //                 {interviewTypes.map(type => (
// // //                   <div
// // //                     key={type.value}
// // //                     className={`interview-type-card ${formData.interviewType === type.value ? 'selected' : ''}`}
// // //                     onClick={() => setFormData({...formData, interviewType: type.value})}
// // //                   >
// // //                     <span className="type-icon">{type.icon}</span>
// // //                     <span className="type-label">{type.label}</span>
// // //                     <span className="type-price">₹{type.price}</span>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>

// // //             <div className="form-group">
// // //               <label>Experience Level *</label>
// // //               <select
// // //                 value={formData.experience}
// // //                 onChange={(e) => setFormData({...formData, experience: e.target.value})}
// // //                 required
// // //               >
// // //                 <option value="">Select experience</option>
// // //                 <option value="fresher">Fresher (0-1 years)</option>
// // //                 <option value="junior">Junior (1-3 years)</option>
// // //                 <option value="mid">Mid-Level (3-5 years)</option>
// // //                 <option value="senior">Senior (5+ years)</option>
// // //               </select>
// // //             </div>

// // //             <div className="form-row">
// // //               <div className="form-group">
// // //                 <label>Preferred Date *</label>
// // //                 <input
// // //                   type="date"
// // //                   value={formData.preferredDate}
// // //                   onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
// // //                   min={new Date().toISOString().split('T')[0]}
// // //                   required
// // //                 />
// // //               </div>

// // //               <div className="form-group">
// // //                 <label>Preferred Time *</label>
// // //                 <select
// // //                   value={formData.preferredTime}
// // //                   onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
// // //                   required
// // //                 >
// // //                   <option value="">Select time slot</option>
// // //                   {timeSlots.map(slot => (
// // //                     <option key={slot} value={slot}>{slot}</option>
// // //                   ))}
// // //                 </select>
// // //               </div>
// // //             </div>

// // //             <button type="submit" className="btn-book" disabled={loading}>
// // //               {loading ? "Processing..." : "Book Interview - ₹199"}
// // //             </button>

// // //             <p className="demo-note">* This is a demo payment. No actual money will be charged.</p>
// // //           </form>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default MockInterview;
// // import { useState } from "react";
// // import { collection, addDoc } from "firebase/firestore";
// // import { db, auth } from "../firebase";
// // import { useAuthState } from "react-firebase-hooks/auth";
// // import { Link, useNavigate } from "react-router-dom";
// // import toast from "react-hot-toast";

// // function MockInterview() {
// //   const [user] = useAuthState(auth);
// //   const navigate = useNavigate();

// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     interviewType: "",
// //     experience: "",
// //     preferredDate: "",
// //     preferredTime: "",
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [booked, setBooked] = useState(false);

// //   const interviewTypes = [
// //     { value: "dsa", label: "DSA Interview", icon: "💻", price: 199 },
// //     { value: "system-design", label: "System Design", icon: "🏗️", price: 199 },
// //     { value: "frontend", label: "Frontend Interview", icon: "🎨", price: 199 },
// //     { value: "backend", label: "Backend Interview", icon: "⚙️", price: 199 },
// //     { value: "full-stack", label: "Full Stack Interview", icon: "🚀", price: 299 },
// //   ];

// //   const timeSlots = [
// //     "10:00 AM - 11:00 AM",
// //     "11:00 AM - 12:00 PM",
// //     "2:00 PM - 3:00 PM",
// //     "3:00 PM - 4:00 PM",
// //     "5:00 PM - 6:00 PM",
// //     "6:00 PM - 7:00 PM",
// //   ];

// //   async function handleSubmit(e) {
// //     e.preventDefault();

// //     if (!user) {
// //       toast.error("Please login to book mock interview");
// //       navigate("/login");
// //       return;
// //     }

// //     if (
// //       !formData.name ||
// //       !formData.email ||
// //       !formData.interviewType ||
// //       !formData.preferredDate ||
// //       !formData.preferredTime
// //     ) {
// //       toast.error("Please fill all required fields");
// //       return;
// //     }

// //     try {
// //       setLoading(true);

// //       const selectedType = interviewTypes.find(
// //         (t) => t.value === formData.interviewType
// //       );

// //       await addDoc(collection(db, "mockInterviews"), {
// //         userId: user.uid,
// //         ...formData,
// //         price: selectedType.price,
// //         interviewLabel: selectedType.label,
// //         status: "CONFIRMED",
// //         paymentId: "DEMO_" + Date.now(),
// //         bookedAt: new Date(),
// //       });

// //       toast.success("Mock interview booked successfully!");
// //       setBooked(true);
// //     } catch (err) {
// //       console.error(err);
// //       toast.error("Booking failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   if (booked) {
// //     return (
// //       <div className="page-container">
// //         <h2>✅ Interview Booked Successfully</h2>
// //         <Link to="/" className="btn-primary">Back to Home</Link>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="page-container">
// //       <Link to="/">← Back</Link>

// //       <form onSubmit={handleSubmit} className="mock-form">
// //         <h2>🎯 Book Mock Interview</h2>

// //         <input
// //           placeholder="Full Name"
// //           value={formData.name}
// //           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //         />

// //         <input
// //           placeholder="Email"
// //           value={formData.email}
// //           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// //         />

// //         <select
// //           value={formData.interviewType}
// //           onChange={(e) =>
// //             setFormData({ ...formData, interviewType: e.target.value })
// //           }
// //         >
// //           <option value="">Select Interview Type</option>
// //           {interviewTypes.map((t) => (
// //             <option key={t.value} value={t.value}>
// //               {t.label} - ₹{t.price}
// //             </option>
// //           ))}
// //         </select>

// //         <input
// //           type="date"
// //           min={new Date().toISOString().split("T")[0]}
// //           value={formData.preferredDate}
// //           onChange={(e) =>
// //             setFormData({ ...formData, preferredDate: e.target.value })
// //           }
// //         />

// //         <select
// //           value={formData.preferredTime}
// //           onChange={(e) =>
// //             setFormData({ ...formData, preferredTime: e.target.value })
// //           }
// //         >
// //           <option value="">Select Time</option>
// //           {timeSlots.map((slot) => (
// //             <option key={slot}>{slot}</option>
// //           ))}
// //         </select>

// //         <button disabled={loading}>
// //           {loading ? "Processing..." : "Book Interview"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default MockInterview;
// import { useState } from "react";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { db, auth } from "../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import "./MockInterview.css";

// function MockInterview() {
//   const [user] = useAuthState(auth);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     interviewType: "",
//     preferredDate: "",
//     preferredTime: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const interviewTypes = [
//     { value: "DSA", price: 199 },
//     { value: "System Design", price: 199 },
//     { value: "Frontend", price: 199 },
//     { value: "Backend", price: 199 },
//     { value: "Full Stack", price: 299 },
//   ];

//   const timeSlots = [
//     "10:00 AM - 11:00 AM",
//     "11:00 AM - 12:00 PM",
//     "4:00 PM - 5:00 PM",
//     "5:00 PM - 6:00 PM",
//     "6:00 PM - 7:00 PM",
//   ];

//   async function handleSubmit(e) {
//     e.preventDefault();

//     if (!user) {
//       toast.error("Please login first");
//       navigate("/login");
//       return;
//     }

//     if (
//       !formData.name ||
//       !formData.email ||
//       !formData.interviewType ||
//       !formData.preferredDate ||
//       !formData.preferredTime
//     ) {
//       toast.error("Fill all required fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const selected = interviewTypes.find(
//         (i) => i.value === formData.interviewType
//       );

//       await addDoc(collection(db, "mockInterviews"), {
//         userId: user.uid,
//         ...formData,
//         price: selected.price,
//         createdAt: serverTimestamp(),
//       });

//       toast.success("Mock Interview Booked!");
//       setSuccess(true);
//     } catch (err) {
//       console.error(err);
//       toast.error("Booking failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (success) {
//     return (
//       <div className="mock-success">
//         <h2>✅ Interview Booked Successfully</h2>
//         <p>Our expert will contact you soon.</p>
//         <Link to="/" className="btn">Back to Home</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="mock-page">
//       <Link to="/" className="back">← Back to Home</Link>

//       <form className="mock-card" onSubmit={handleSubmit}>
//         <h2>🎯 Book Mock Interview</h2>

//         <input
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={(e) =>
//             setFormData({ ...formData, name: e.target.value })
//           }
//         />

//         <input
//           placeholder="Email"
//           value={formData.email}
//           onChange={(e) =>
//             setFormData({ ...formData, email: e.target.value })
//           }
//         />

//         <select
//           value={formData.interviewType}
//           onChange={(e) =>
//             setFormData({ ...formData, interviewType: e.target.value })
//           }
//         >
//           <option value="">Select Interview Type</option>
//           {interviewTypes.map((i) => (
//             <option key={i.value} value={i.value}>
//               {i.value} – ₹{i.price}
//             </option>
//           ))}
//         </select>

//         <input
//           type="date"
//           min={new Date().toISOString().split("T")[0]}
//           value={formData.preferredDate}
//           onChange={(e) =>
//             setFormData({ ...formData, preferredDate: e.target.value })
//           }
//         />

//         <select
//           value={formData.preferredTime}
//           onChange={(e) =>
//             setFormData({ ...formData, preferredTime: e.target.value })
//           }
//         >
//           <option value="">Select Time Slot</option>
//           {timeSlots.map((t) => (
//             <option key={t}>{t}</option>
//           ))}
//         </select>

//         <button disabled={loading}>
//           {loading ? "Processing..." : "Book Interview"}
//         </button>

//         <p className="note">* Demo booking – no real payment</p>
//       </form>
//     </div>
//   );
// }

// export default MockInterview;
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./MockInterview.css";

function MockInterview() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interviewType: "",
    experience: "",
    preferredDate: "",
    preferredTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const interviewTypes = [
    { 
      value: "DSA", 
      label: "DSA Interview",
      icon: "💻", 
      price: 199,
      duration: "45 min",
      description: "Data Structures & Algorithms"
    },
    { 
      value: "System Design", 
      label: "System Design",
      icon: "🏗️", 
      price: 199,
      duration: "60 min",
      description: "Architecture & Scalability"
    },
    { 
      value: "Frontend", 
      label: "Frontend Interview",
      icon: "🎨", 
      price: 199,
      duration: "45 min",
      description: "React, CSS, JavaScript"
    },
    { 
      value: "Backend", 
      label: "Backend Interview",
      icon: "⚙️", 
      price: 199,
      duration: "45 min",
      description: "APIs, Databases, Server"
    },
    { 
      value: "Full Stack", 
      label: "Full Stack Interview",
      icon: "🚀", 
      price: 299,
      duration: "75 min",
      description: "Complete Tech Stack"
    },
  ];

  const experienceLevels = [
    { value: "fresher", label: "Fresher (0-1 years)" },
    { value: "junior", label: "Junior (1-3 years)" },
    { value: "mid", label: "Mid-Level (3-5 years)" },
    { value: "senior", label: "Senior (5+ years)" },
  ];

  const timeSlots = [
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
    "6:00 PM - 7:00 PM",
  ];

  const benefits = [
    { icon: "👨‍💼", title: "Expert Interviewers", desc: "Industry professionals from top companies" },
    { icon: "📊", title: "Detailed Feedback", desc: "Comprehensive performance report" },
    { icon: "🎥", title: "Session Recording", desc: "Review your interview anytime" },
    { icon: "📝", title: "Resume Review", desc: "Get tips to improve your profile" },
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to book mock interview");
      navigate("/login");
      return;
    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.interviewType ||
      !formData.experience ||
      !formData.preferredDate ||
      !formData.preferredTime
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const selected = interviewTypes.find(
        (i) => i.value === formData.interviewType
      );

      await addDoc(collection(db, "mockInterviews"), {
        userId: user.uid,
        userEmail: user.email,
        ...formData,
        interviewLabel: selected.label,
        price: selected.price,
        duration: selected.duration,
        status: "CONFIRMED",
        paymentId: "DEMO_" + Date.now(),
        createdAt: serverTimestamp(),
      });

      toast.success("Mock Interview Booked Successfully!");
      setSuccess(true);
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    const selectedType = interviewTypes.find(i => i.value === formData.interviewType);
    
    return (
      <div className="mock-container">
        <div className="success-wrapper">
          <div className="success-card">
            <div className="success-icon-wrapper">
              <div className="success-icon">✓</div>
            </div>
            
            <h2 className="success-title">Booking Confirmed!</h2>
            <p className="success-subtitle">Your mock interview has been scheduled successfully</p>
            
            <div className="booking-details">
              <div className="detail-row">
                <span className="detail-label">Interview Type</span>
                <span className="detail-value">{selectedType?.icon} {formData.interviewType}</span>
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
                <span className="detail-label">Date</span>
                <span className="detail-value">{new Date(formData.preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Time</span>
                <span className="detail-value">{formData.preferredTime}</span>
              </div>
              <div className="detail-row highlight">
                <span className="detail-label">Amount Paid</span>
                <span className="detail-value">₹{selectedType?.price}</span>
              </div>
            </div>

            <div className="next-steps">
              <h3>What's Next?</h3>
              <ul>
                <li>✉️ Check your email for confirmation details</li>
                <li>📅 Meeting link will be sent 24 hours before</li>
                <li>📝 Prepare your resume and portfolio</li>
                <li>🎯 Review key concepts for your interview type</li>
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
    <div className="mock-container">
      {/* Header */}
      <div className="mock-header">
        <Link to="/" className="back-link">
          <span>←</span> Back
        </Link>
      </div>

      <div className="mock-content">
        {/* Left Section - Info */}
        <div className="info-section">
          <div className="info-card">
            <h1 className="main-title">
              <span className="title-icon">🎯</span>
              Book Mock Interview
            </h1>
            <p className="main-subtitle">
              Practice with industry experts and ace your next interview
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
                <h3>Special Offer</h3>
                <div className="discount-badge">60% OFF</div>
              </div>
              <div className="price-display">
                <span className="old-price">₹499</span>
                <span className="new-price">₹199</span>
                <span className="price-label">only</span>
              </div>
              <p className="price-note">Limited time offer for early users!</p>
            </div>

            <div className="trust-indicators">
              <div className="trust-item">
                <strong>500+</strong>
                <span>Interviews Conducted</span>
              </div>
              <div className="trust-item">
                <strong>4.9/5</strong>
                <span>Average Rating</span>
              </div>
              <div className="trust-item">
                <strong>95%</strong>
                <span>Success Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="form-section">
          <div className="form-card">
            <h2 className="form-title">Booking Details</h2>
            <p className="form-subtitle">Fill in your information to schedule your interview</p>

            <form onSubmit={handleSubmit} className="booking-form">
              {/* Name */}
              <div className="form-group">
                <label>Full Name <span className="required">*</span></label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                  required
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label>Email Address <span className="required">*</span></label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input"
                />
              </div>

              {/* Interview Type */}
              <div className="form-group">
                <label>Interview Type <span className="required">*</span></label>
                <div className="interview-grid">
                  {interviewTypes.map((type) => (
                    <div
                      key={type.value}
                      className={`interview-card ${formData.interviewType === type.value ? 'selected' : ''}`}
                      onClick={() => setFormData({ ...formData, interviewType: type.value })}
                    >
                      <div className="interview-icon">{type.icon}</div>
                      <div className="interview-info">
                        <h4>{type.label}</h4>
                        <p>{type.description}</p>
                        <div className="interview-meta">
                          <span className="duration">{type.duration}</span>
                          <span className="price">₹{type.price}</span>
                        </div>
                      </div>
                      {formData.interviewType === type.value && (
                        <div className="selected-indicator">✓</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div className="form-group">
                <label>Experience Level <span className="required">*</span></label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
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

              {/* Date and Time */}
              <div className="form-row">
                <div className="form-group">
                  <label>Preferred Date <span className="required">*</span></label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Preferred Time <span className="required">*</span></label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="form-select"
                    required
                  >
                    <option value="">Select time slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
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
                    <span>Book Interview</span>
                    {formData.interviewType && (
                      <span className="btn-price">
                        ₹{interviewTypes.find(i => i.value === formData.interviewType)?.price}
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

export default MockInterview;