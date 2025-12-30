import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const ADMIN_EMAIL = "ankurmittal9081@gmail.com"; // ✅ your admin email

function AdminRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  // 🔄 still checking auth
  if (loading) {
    return null; // or loader
  }

  // ❌ not logged in
  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  // ❌ logged in but NOT admin
  if (user.email !== ADMIN_EMAIL) {
    return <Navigate to="/" replace />;
  }

  // ✅ admin verified
  return children;
}

export default AdminRoute;
