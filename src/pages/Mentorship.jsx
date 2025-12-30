import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import emailjs from "emailjs-com";

function Mentorship() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // ✅ EMAIL STATE
  const [topic, setTopic] = useState("");
  const [slot, setSlot] = useState("");
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ EMAIL FUNCTION
  function sendConfirmationEmail(data) {
    emailjs
      .send(
        "service_tkcj717",        // ✅ SERVICE ID
        "template_muhu7cm",       // ✅ TEMPLATE ID
        {
          to_email: data.email,
          student_name: data.name,
          topic: data.topic,
          slot: data.slot,
        },
        "SdFztNCiBTk1lxR_l"    // ✅ PUBLIC KEY
      )
      .then(() => {
        console.log("✅ Email sent successfully");
      })
      .catch((err) => {
        console.error("❌ Email error:", err);
      });
  }

  async function demoPayment() {
    setError("");

    // ✅ VALIDATION
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (!topic) {
      setError("Please select a topic");
      return;
    }
    if (!slot) {
      setError("Please select a time slot");
      return;
    }

    try {
      setLoading(true);

      // ✅ SAVE BOOKING
      await addDoc(collection(db, "bookings"), {
        name: name.trim(),
        email: email.trim(),
        topic,
        slot,
        price: 99,
        paymentId: "DEMO_PAYMENT_" + Date.now(),
        status: "PAID",
        createdAt: new Date(),
      });

      // ✅ SEND EMAIL AFTER SUCCESS
      sendConfirmationEmail({
        name,
        email,
        topic,
        slot,
      });

      setPaid(true);
    } catch (err) {
      console.error("Booking error:", err);
      setError("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ✅ SUCCESS PAGE
  if (paid) {
    return (
      <div className="page success-page">
        <div className="success-card">
          <h2>✅ Payment Successful</h2>
          <p>Your mentorship session has been booked successfully!</p>

          <div className="booking-details">
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Topic:</strong> {topic}</p>
            <p><strong>Time:</strong> {slot}</p>
            <p><strong>Amount Paid:</strong> ₹99</p>
          </div>

          <button onClick={() => (window.location.href = "/")}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // ✅ FORM PAGE
  return (
    <div className="page">
      <div className="mentorship-container">
        <h2>📚 1:1 Mentorship Session</h2>
        <p className="subtitle">
          Get personalized guidance from expert mentors
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            demoPayment();
          }}
        >
          <div className="form-group">
            <label>Your Name *</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Select Topic *</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={loading}
            >
              <option value="">Choose a topic</option>
              <option value="DSA">Data Structures & Algorithms</option>
              <option value="System Design">System Design</option>
              <option value="Resume Review">Resume Review</option>
              <option value="Interview Prep">Interview Preparation</option>
            </select>
          </div>

          <div className="form-group">
            <label>Select Time Slot *</label>
            <select
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
              disabled={loading}
            >
              <option value="">Choose a time slot</option>
              <option value="Today 6–7 PM">Today 6–7 PM</option>
              <option value="Today 7–8 PM">Today 7–8 PM</option>
              <option value="Tomorrow 6–7 PM">Tomorrow 6–7 PM</option>
              <option value="Tomorrow 7–8 PM">Tomorrow 7–8 PM</option>
            </select>
          </div>

          {error && <div className="error-message">⚠️ {error}</div>}

          <div className="price-section">
            <h3>Total Amount: ₹99</h3>
            <p className="price-note">One-time session fee</p>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Pay ₹99 (Demo)"}
          </button>

          <p className="disclaimer">
            * This is a demo payment. No real money will be charged.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Mentorship;