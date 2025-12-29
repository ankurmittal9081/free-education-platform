import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from 'react-hot-toast';

function Navbar() {
  const [user] = useAuthState(auth);

  async function handleLogout() {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          🎓 Babua Tech
        </Link>

        <div className="navbar-links">
          <Link to="/courses">Courses</Link>
          <Link to="/mentorship">Mentorship</Link>
          
          {user ? (
            <>
              <Link to="/profile" className="profile-btn">
                👤 {user.displayName || 'Profile'}
              </Link>
              <button onClick={handleLogout} className="logout-nav-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-nav-btn">Login</Link>
              <Link to="/signup" className="signup-nav-btn">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;