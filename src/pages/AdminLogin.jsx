// // // // import { useState, useEffect } from "react";
// // // // import { signInWithEmailAndPassword } from "firebase/auth";
// // // // import { auth } from "../firebase";
// // // // import { useNavigate, Link } from "react-router-dom";

// // // // function AdminLogin() {
// // // //   const [email, setEmail] = useState("");
// // // //   const [password, setPassword] = useState("");
// // // //   const [loading, setLoading] = useState(false);
// // // //   const navigate = useNavigate();

// // // //   // ✅ STEP 1: Already logged-in admin → direct dashboard
// // // //   useEffect(() => {
// // // //     if (auth.currentUser) {
// // // //       navigate("/admin");
// // // //     }
// // // //   }, [navigate]);

// // // //   // ✅ STEP 2: Login handler
// // // //   async function handleLogin(e) {
// // // //     e.preventDefault();
// // // //     try {
// // // //       setLoading(true);
// // // //       await signInWithEmailAndPassword(auth, email, password);
// // // //       navigate("/admin"); // AdminRoute check karega
// // // //     } catch (error) {
// // // //       alert("❌ Invalid credentials");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }

// // // //   return (
// // // //     <div className="admin-login-page">
// // // //       <h2>🔐 Admin Login</h2>

// // // //       <form onSubmit={handleLogin}>
// // // //         <input
// // // //           type="email"
// // // //           placeholder="Admin Email"
// // // //           value={email}
// // // //           onChange={(e) => setEmail(e.target.value)}
// // // //           required
// // // //         />

// // // //         <input
// // // //           type="password"
// // // //           placeholder="Password"
// // // //           value={password}
// // // //           onChange={(e) => setPassword(e.target.value)}
// // // //           required
// // // //         />

// // // //         <button disabled={loading}>
// // // //           {loading ? "Logging in..." : "Login"}
// // // //         </button>
// // // //       </form>

// // // //       <Link to="/">← Back to Home</Link>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default AdminLogin;
// // // import { useState } from "react";
// // // import { signInWithEmailAndPassword } from "firebase/auth";
// // // import { auth } from "../firebase";
// // // import { useNavigate, Link } from "react-router-dom";

// // // function AdminLogin() {
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const navigate = useNavigate();

// // //   async function handleLogin(e) {
// // //     e.preventDefault();
// // //     try {
// // //       await signInWithEmailAndPassword(auth, email, password);
// // //       navigate("/admin"); // AdminRoute decide karega
// // //     } catch (err) {
// // //       alert("Invalid credentials");
// // //     }
// // //   }

// // //   return (
// // //     <div>
// // //       <h2>Admin Login</h2>

// // //       <form onSubmit={handleLogin}>
// // //         <input
// // //           type="email"
// // //           placeholder="Admin email"
// // //           value={email}
// // //           onChange={(e) => setEmail(e.target.value)}
// // //         />

// // //         <input
// // //           type="password"
// // //           placeholder="Password"
// // //           value={password}
// // //           onChange={(e) => setPassword(e.target.value)}
// // //         />

// // //         <button>Login</button>
// // //       </form>

// // //       <Link to="/">← Back</Link>
// // //     </div>
// // //   );
// // // }

// // // export default AdminLogin;
// // import { useState } from "react";
// // import { signInWithEmailAndPassword } from "firebase/auth";
// // import { auth } from "../firebase";
// // import { useNavigate, Link } from "react-router-dom";

// // function AdminLogin() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const navigate = useNavigate();

// //   async function handleLogin(e) {
// //     e.preventDefault();
// //     try {
// //       await signInWithEmailAndPassword(auth, email, password);
// //       navigate("/admin");
// //     } catch (err) {
// //       alert("Invalid credentials");
// //     }
// //   }

// //   return (
// //     <div>
// //       <h2>Admin Login</h2>

// //       <form onSubmit={handleLogin}>
// //         <input
// //           type="email"
// //           placeholder="Admin Email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //         />

// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //         />

// //         <button>Login</button>
// //       </form>

// //       <Link to="/">← Back</Link>
// //     </div>
// //   );
// // }

// // export default AdminLogin;
// import { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// import { useNavigate, Link } from "react-router-dom";

// function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   async function handleLogin(e) {
//     e.preventDefault();

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate("/admin"); // बस इतना
//     } catch (err) {
//       alert("Invalid credentials");
//     }
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Admin Login</h2>

//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Admin Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <br /><br />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <br /><br />

//         <button type="submit">Login</button>
//       </form>

//       <br />
//       <Link to="/">← Back</Link>
//     </div>
//   );
// }

// export default AdminLogin;
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);

      // ✅ Login success → Admin dashboard
      navigate("/admin");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h2>🔐 Admin Login</h2>
        <p className="subtitle">Access Admin Dashboard</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && <div className="error-msg">⚠️ {error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="back-link" onClick={() => navigate("/")}>
          ← Back to Home
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
