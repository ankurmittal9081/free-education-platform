// import { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// import { useNavigate, Link } from "react-router-dom";
// import toast from 'react-hot-toast';

// function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   async function handleLogin(e) {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       await signInWithEmailAndPassword(auth, formData.email, formData.password);
//       toast.success("Welcome back!");
//       navigate("/courses");
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error("Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="auth-page">
//       <div className="auth-container">
//         <div className="auth-header">
//           <h2>👋 Welcome Back</h2>
//           <p>Continue your learning journey</p>
//         </div>

//         <form onSubmit={handleLogin} className="auth-form">
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               id="email"
//               type="email"
//               placeholder="your.email@example.com"
//               value={formData.email}
//               onChange={(e) => setFormData({...formData, email: e.target.value})}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               id="password"
//               type="password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={(e) => setFormData({...formData, password: e.target.value})}
//               required
//             />
//           </div>

//           <button type="submit" className="auth-button" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <div className="auth-footer">
//           <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
//           <Link to="/" className="back-link-auth">← Back to Home</Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import "../pages/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>👋 Welcome Back</h2>
        <p className="subtitle">Continue your learning journey</p>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don’t have an account?{" "}
            <Link to="/signup">Sign Up</Link>
          </p>
          <Link className="back-home" to="/">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
