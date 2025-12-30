import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const ADMIN_EMAIL = "ankurmittal9081@gmail.com";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await signInWithEmailAndPassword(auth, email, password);

      // 🔐 Admin check
      if (res.user.email !== ADMIN_EMAIL) {
        alert("❌ You are not an admin");
        return;
      }

      // ✅ SUCCESS
      navigate("/admin");
    } catch (error) {
      alert("❌ Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h2>🔐 Admin Login</h2>
        <p className="subtitle">Access the admin dashboard</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button className="primary-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login to Dashboard"}
          </button>
        </form>

        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    </div>
  );
}

export default AdminLogin;
