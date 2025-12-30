// // import { useState } from "react";
// // import { collection, addDoc } from "firebase/firestore";
// // import { db, auth } from "../firebase";
// // import { useAuthState } from "react-firebase-hooks/auth";
// // import { Link, useNavigate } from "react-router-dom";
// // import toast from 'react-hot-toast';

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
// //     preferredTime: ""
// //   });
// //   const [loading, setLoading] = useState(false);
// //   const [booked, setBooked] = useState(false);

// //   const interviewTypes = [
// //     { value: "dsa", label: "DSA Interview", icon: "💻", price: 199 },
// //     { value: "system-design", label: "System Design", icon: "🏗️", price: 199 },
// //     { value: "frontend", label: "Frontend Interview", icon: "🎨", price: 199 },
// //     { value: "backend", label: "Backend Interview", icon: "⚙️", price: 199 },
// //     { value: "full-stack", label: "Full Stack Interview", icon: "🚀", price: 299 }
// //   ];

// //   const timeSlots = [
// //     "10:00 AM - 11:00 AM",
// //     "11:00 AM - 12:00 PM",
// //     "2:00 PM - 3:00 PM",
// //     "3:00 PM - 4:00 PM",
// //     "5:00 PM - 6:00 PM",
// //     "6:00 PM - 7:00 PM"
// //   ];

// //   async function handleSubmit(e) {
// //     e.preventDefault();

// //     if (!user) {
// //       toast.error("Please login to book mock interview");
// //       navigate("/login");
// //       return;
// //     }

// //     if (!formData.name || !formData.email || !formData.interviewType || !formData.preferredDate || !formData.preferredTime) {
// //       toast.error("Please fill all required fields");
// //       return;
// //     }

// //     try {
// //       setLoading(true);

// //       const selectedType = interviewTypes.find(t => t.value === formData.interviewType);

// //       await addDoc(collection(db, "mockInterviews"), {
// //         userId: user.uid,
// //         ...formData,
// //         price: selectedType.price,
// //         interviewLabel: selectedType.label,
// //         status: "CONFIRMED",
// //         paymentId: "DEMO_PAYMENT_" + Date.now(),
// //         bookedAt: new Date()
// //       });

// //       setBooked(true);
// //       toast.success("Mock interview booked successfully!");
// //     } catch (error) {
// //       console.error("Booking error:", error);
// //       toast.error("Failed to book interview. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   if (booked) {
// //     return (
// //       <div className="page-container">
// //         <div className="success-container">
// //           <div className="success-icon">✅</div>
// //           <h2>Interview Booked Successfully!</h2>
// //           <div className="booking-summary">
// //             <p><strong>Name:</strong> {formData.name}</p>
// //             <p><strong>Interview Type:</strong> {interviewTypes.find(t => t.value === formData.interviewType)?.label}</p>
// //             <p><strong>Date:</strong> {formData.preferredDate}</p>
// //             <p><strong>Time:</strong> {formData.preferredTime}</p>
// //             <p><strong>Amount:</strong> ₹{interviewTypes.find(t => t.value === formData.interviewType)?.price}</p>
// //           </div>
// //           <p className="success-note">You'll receive a confirmation email shortly with the meeting link.</p>
// //           <Link to="/" className="btn-primary">Back to Home</Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="page-container">
// //       <div className="page-header">
// //         <Link to="/" className="back-link">← Back to Home</Link>
// //         <h1>🎯 Book Mock Interview</h1>
// //         <p>Practice with industry experts and ace your interviews</p>
// //       </div>

// //       <div className="mock-container">
// //         <div className="mock-info">
// //           <h2>What You'll Get</h2>
// //           <ul className="benefits-list">
// //             <li>
// //               <span className="benefit-icon">⏱️</span>
// //               <div>
// //                 <h4>45-Minute Session</h4>
// //                 <p>Comprehensive interview simulation</p>
// //               </div>
// //             </li>
// //             <li>
// //               <span className="benefit-icon">👨‍💼</span>
// //               <div>
// //                 <h4>Expert Interviewer</h4>
// //                 <p>Industry professionals from FAANG companies</p>
// //               </div>
// //             </li>
// //             <li>
// //               <span className="benefit-icon">📊</span>
// //               <div>
// //                 <h4>Detailed Feedback</h4>
// //                 <p>Written report with improvement areas</p>
// //               </div>
// //             </li>
// //             <li>
// //               <span className="benefit-icon">🎥</span>
// //               <div>
// //                 <h4>Recording Available</h4>
// //                 <p>Review your performance anytime</p>
// //               </div>
// //             </li>
// //           </ul>

// //           <div className="pricing-card">
// //             <h3>Special Pricing</h3>
// //             <div className="price-tag">
// //               <span className="old-price">₹499</span>
// //               <span className="new-price">₹199</span>
// //             </div>
// //             <p className="discount-note">60% OFF - Limited Time Offer!</p>
// //           </div>
// //         </div>

// //         <div className="mock-form-container">
// //           <form onSubmit={handleSubmit} className="mock-form">
// //             <h3>Booking Details</h3>

// //             <div className="form-group">
// //               <label>Full Name *</label>
// //               <input
// //                 type="text"
// //                 placeholder="Enter your full name"
// //                 value={formData.name}
// //                 onChange={(e) => setFormData({...formData, name: e.target.value})}
// //                 required
// //               />
// //             </div>

// //             <div className="form-group">
// //               <label>Email *</label>
// //               <input
// //                 type="email"
// //                 placeholder="your.email@example.com"
// //                 value={formData.email}
// //                 onChange={(e) => setFormData({...formData, email: e.target.value})}
// //                 required
// //               />
// //             </div>

// //             <div className="form-group">
// //               <label>Phone Number</label>
// //               <input
// //                 type="tel"
// //                 placeholder="+91 XXXXX XXXXX"
// //                 value={formData.phone}
// //                 onChange={(e) => setFormData({...formData, phone: e.target.value})}
// //               />
// //             </div>

// //             <div className="form-group">
// //               <label>Interview Type *</label>
// //               <div className="interview-types">
// //                 {interviewTypes.map(type => (
// //                   <div
// //                     key={type.value}
// //                     className={`interview-type-card ${formData.interviewType === type.value ? 'selected' : ''}`}
// //                     onClick={() => setFormData({...formData, interviewType: type.value})}
// //                   >
// //                     <span className="type-icon">{type.icon}</span>
// //                     <span className="type-label">{type.label}</span>
// //                     <span className="type-price">₹{type.price}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             <div className="form-group">
// //               <label>Experience Level *</label>
// //               <select
// //                 value={formData.experience}
// //                 onChange={(e) => setFormData({...formData, experience: e.target.value})}
// //                 required
// //               >
// //                 <option value="">Select experience</option>
// //                 <option value="fresher">Fresher (0-1 years)</option>
// //                 <option value="junior">Junior (1-3 years)</option>
// //                 <option value="mid">Mid-Level (3-5 years)</option>
// //                 <option value="senior">Senior (5+ years)</option>
// //               </select>
// //             </div>

// //             <div className="form-row">
// //               <div className="form-group">
// //                 <label>Preferred Date *</label>
// //                 <input
// //                   type="date"
// //                   value={formData.preferredDate}
// //                   onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
// //                   min={new Date().toISOString().split('T')[0]}
// //                   required
// //                 />
// //               </div>

// //               <div className="form-group">
// //                 <label>Preferred Time *</label>
// //                 <select
// //                   value={formData.preferredTime}
// //                   onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
// //                   required
// //                 >
// //                   <option value="">Select time slot</option>
// //                   {timeSlots.map(slot => (
// //                     <option key={slot} value={slot}>{slot}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //             </div>

// //             <button type="submit" className="btn-book" disabled={loading}>
// //               {loading ? "Processing..." : "Book Interview - ₹199"}
// //             </button>

// //             <p className="demo-note">* This is a demo payment. No actual money will be charged.</p>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default MockInterview;
// import { useState } from "react";
// import { collection, addDoc } from "firebase/firestore";
// import { db, auth } from "../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// function MockInterview() {
//   const [user] = useAuthState(auth);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     interviewType: "",
//     experience: "",
//     preferredDate: "",
//     preferredTime: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [booked, setBooked] = useState(false);

//   const interviewTypes = [
//     { value: "dsa", label: "DSA Interview", icon: "💻", price: 199 },
//     { value: "system-design", label: "System Design", icon: "🏗️", price: 199 },
//     { value: "frontend", label: "Frontend Interview", icon: "🎨", price: 199 },
//     { value: "backend", label: "Backend Interview", icon: "⚙️", price: 199 },
//     { value: "full-stack", label: "Full Stack Interview", icon: "🚀", price: 299 },
//   ];

//   const timeSlots = [
//     "10:00 AM - 11:00 AM",
//     "11:00 AM - 12:00 PM",
//     "2:00 PM - 3:00 PM",
//     "3:00 PM - 4:00 PM",
//     "5:00 PM - 6:00 PM",
//     "6:00 PM - 7:00 PM",
//   ];

//   async function handleSubmit(e) {
//     e.preventDefault();

//     if (!user) {
//       toast.error("Please login to book mock interview");
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
//       toast.error("Please fill all required fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const selectedType = interviewTypes.find(
//         (t) => t.value === formData.interviewType
//       );

//       await addDoc(collection(db, "mockInterviews"), {
//         userId: user.uid,
//         ...formData,
//         price: selectedType.price,
//         interviewLabel: selectedType.label,
//         status: "CONFIRMED",
//         paymentId: "DEMO_" + Date.now(),
//         bookedAt: new Date(),
//       });

//       toast.success("Mock interview booked successfully!");
//       setBooked(true);
//     } catch (err) {
//       console.error(err);
//       toast.error("Booking failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (booked) {
//     return (
//       <div className="page-container">
//         <h2>✅ Interview Booked Successfully</h2>
//         <Link to="/" className="btn-primary">Back to Home</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="page-container">
//       <Link to="/">← Back</Link>

//       <form onSubmit={handleSubmit} className="mock-form">
//         <h2>🎯 Book Mock Interview</h2>

//         <input
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//         />

//         <input
//           placeholder="Email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//         />

//         <select
//           value={formData.interviewType}
//           onChange={(e) =>
//             setFormData({ ...formData, interviewType: e.target.value })
//           }
//         >
//           <option value="">Select Interview Type</option>
//           {interviewTypes.map((t) => (
//             <option key={t.value} value={t.value}>
//               {t.label} - ₹{t.price}
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
//           <option value="">Select Time</option>
//           {timeSlots.map((slot) => (
//             <option key={slot}>{slot}</option>
//           ))}
//         </select>

//         <button disabled={loading}>
//           {loading ? "Processing..." : "Book Interview"}
//         </button>
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
    interviewType: "",
    preferredDate: "",
    preferredTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const interviewTypes = [
    { value: "DSA", price: 199 },
    { value: "System Design", price: 199 },
    { value: "Frontend", price: 199 },
    { value: "Backend", price: 199 },
    { value: "Full Stack", price: 299 },
  ];

  const timeSlots = [
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
    "6:00 PM - 7:00 PM",
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.interviewType ||
      !formData.preferredDate ||
      !formData.preferredTime
    ) {
      toast.error("Fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const selected = interviewTypes.find(
        (i) => i.value === formData.interviewType
      );

      await addDoc(collection(db, "mockInterviews"), {
        userId: user.uid,
        ...formData,
        price: selected.price,
        createdAt: serverTimestamp(),
      });

      toast.success("Mock Interview Booked!");
      setSuccess(true);
    } catch (err) {
      console.error(err);
      toast.error("Booking failed");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="mock-success">
        <h2>✅ Interview Booked Successfully</h2>
        <p>Our expert will contact you soon.</p>
        <Link to="/" className="btn">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="mock-page">
      <Link to="/" className="back">← Back to Home</Link>

      <form className="mock-card" onSubmit={handleSubmit}>
        <h2>🎯 Book Mock Interview</h2>

        <input
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        <select
          value={formData.interviewType}
          onChange={(e) =>
            setFormData({ ...formData, interviewType: e.target.value })
          }
        >
          <option value="">Select Interview Type</option>
          {interviewTypes.map((i) => (
            <option key={i.value} value={i.value}>
              {i.value} – ₹{i.price}
            </option>
          ))}
        </select>

        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={formData.preferredDate}
          onChange={(e) =>
            setFormData({ ...formData, preferredDate: e.target.value })
          }
        />

        <select
          value={formData.preferredTime}
          onChange={(e) =>
            setFormData({ ...formData, preferredTime: e.target.value })
          }
        >
          <option value="">Select Time Slot</option>
          {timeSlots.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <button disabled={loading}>
          {loading ? "Processing..." : "Book Interview"}
        </button>

        <p className="note">* Demo booking – no real payment</p>
      </form>
    </div>
  );
}

export default MockInterview;
