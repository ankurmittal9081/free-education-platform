// // // // // import { Navigate } from "react-router-dom";
// // // // // import { useAuthState } from "react-firebase-hooks/auth";
// // // // // import { auth } from "../firebase";

// // // // // const ADMIN_EMAIL = "ankurmittal9081@gmail.com"; // ✅ your admin email

// // // // // function AdminRoute({ children }) {
// // // // //   const [user, loading] = useAuthState(auth);

// // // // //   // 🔄 still checking auth
// // // // //   if (loading) {
// // // // //     return null; // or loader
// // // // //   }

// // // // //   // ❌ not logged in
// // // // //   if (!user) {
// // // // //     return <Navigate to="/admin-login" replace />;
// // // // //   }

// // // // //   // ❌ logged in but NOT admin
// // // // //   if (user.email !== ADMIN_EMAIL) {
// // // // //     return <Navigate to="/" replace />;
// // // // //   }

// // // // //   // ✅ admin verified
// // // // //   return children;
// // // // // }

// // // // // export default AdminRoute;
// // // // import { Navigate } from "react-router-dom";
// // // // import { useAuthState } from "react-firebase-hooks/auth";
// // // // import { auth, db } from "../firebase";
// // // // import { doc, getDoc } from "firebase/firestore";
// // // // import { useEffect, useState } from "react";

// // // // function AdminRoute({ children }) {
// // // //   const [user, loading] = useAuthState(auth);
// // // //   const [isAdmin, setIsAdmin] = useState(null);

// // // //   useEffect(() => {
// // // //     async function checkAdmin() {
// // // //       if (!user) {
// // // //         setIsAdmin(false);
// // // //         return;
// // // //       }

// // // //       const ref = doc(db, "users", user.uid);
// // // //       const snap = await getDoc(ref);

// // // //       if (snap.exists() && snap.data().role === "admin") {
// // // //         setIsAdmin(true);
// // // //       } else {
// // // //         setIsAdmin(false);
// // // //       }
// // // //     }

// // // //     checkAdmin();
// // // //   }, [user]);

// // // //   if (loading || isAdmin === null) {
// // // //     return <h2>Checking admin...</h2>;
// // // //   }

// // // //   if (!user || !isAdmin) {
// // // //     return <Navigate to="/" />;
// // // //   }

// // // //   return children;
// // // // }

// // // // export default AdminRoute;
// // // import { Navigate } from "react-router-dom";
// // // import { useAuthState } from "react-firebase-hooks/auth";
// // // import { auth, db } from "../firebase";
// // // import { doc, getDoc } from "firebase/firestore";
// // // import { useEffect, useState } from "react";

// // // function AdminRoute({ children }) {
// // //   const [user, loading] = useAuthState(auth);
// // //   const [isAdmin, setIsAdmin] = useState(null);

// // //   useEffect(() => {
// // //     async function checkAdmin() {
// // //       if (!user) {
// // //         setIsAdmin(false);
// // //         return;
// // //       }

// // //       const ref = doc(db, "users", user.uid);
// // //       const snap = await getDoc(ref);

// // //       setIsAdmin(snap.exists() && snap.data().role === "admin");
// // //     }

// // //     checkAdmin();
// // //   }, [user]);

// // //   if (loading || isAdmin === null) {
// // //     return <h2>Checking admin access...</h2>;
// // //   }

// // //   if (!user || !isAdmin) {
// // //     return <Navigate to="/admin-login" replace />;
// // //   }

// // //   return children;
// // // }

// // // export default AdminRoute;
// // import { Navigate } from "react-router-dom";
// // import { useAuthState } from "react-firebase-hooks/auth";
// // import { auth, db } from "../firebase";
// // import { doc, getDoc } from "firebase/firestore";
// // import { useEffect, useState } from "react";

// // function AdminRoute({ children }) {
// //   const [user, loading] = useAuthState(auth);
// //   const [isAdmin, setIsAdmin] = useState(false);
// //   const [checking, setChecking] = useState(true);

// //   useEffect(() => {
// //     async function checkAdmin() {
// //       if (!user) {
// //         setChecking(false);
// //         return;
// //       }

// //       try {
// //         const ref = doc(db, "users", user.uid);
// //         const snap = await getDoc(ref);

// //         setIsAdmin(
// //           snap.exists() && snap.data().role === "admin"
// //         );
// //       } catch (err) {
// //         console.error("Admin check error:", err);
// //         setIsAdmin(false);
// //       } finally {
// //         setChecking(false);
// //       }
// //     }

// //     checkAdmin();
// //   }, [user]);

// //   if (loading || checking) {
// //     return <h2>Checking admin access...</h2>;
// //   }

// //   if (!user || !isAdmin) {
// //     return <Navigate to="/admin-login" replace />;
// //   }

// //   return children;
// // }

// // export default AdminRoute;
// import { Navigate } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, db } from "../firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { useEffect, useState } from "react";

// function AdminRoute({ children }) {
//   const [user, loading] = useAuthState(auth);
//   const [isAdmin, setIsAdmin] = useState(null);

//   useEffect(() => {
//     async function checkAdmin() {
//       if (!user) {
//         setIsAdmin(false);
//         return;
//       }

//       const ref = doc(db, "users", user.uid);
//       const snap = await getDoc(ref);

//       if (snap.exists() && snap.data().role === "admin") {
//         setIsAdmin(true);
//       } else {
//         setIsAdmin(false);
//       }
//     }

//     checkAdmin();
//   }, [user]);

//   if (loading || isAdmin === null) {
//     return <h2>Checking admin...</h2>;
//   }

//   if (!user || !isAdmin) {
//     return <Navigate to="/admin-login" replace />;
//   }

//   return children;
// }

// export default AdminRoute;
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const ADMIN_EMAIL = "ankurmittal9081@gmail.com";

function AdminRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  // not logged in
  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  // logged in but not admin
  if (user.email !== ADMIN_EMAIL) {
    return <Navigate to="/" replace />;
  }

  // admin verified
  return children;
}

export default AdminRoute;
