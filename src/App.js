// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast";

// import Home from "./pages/Home";
// import Courses from "./pages/Courses";
// import CourseDetail from "./pages/CourseDetail";
// import Mentorship from "./pages/Mentorship";
// import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";
// import Profile from "./pages/Profile";

// import Admin from "./pages/Admin";
// import AdminLogin from "./pages/AdminLogin";

// import PrivateRoute from "./components/PrivateRoute";
// import AdminRoute from "./components/AdminRoute";

// function App() {
//   return (
//     <BrowserRouter>
//       <Toaster position="top-right" />

//       <Routes>
//         {/* PUBLIC */}
//         <Route path="/" element={<Home />} />
//         <Route path="/courses" element={<Courses />} />
//         <Route path="/course/:courseId" element={<CourseDetail />} />
//         <Route path="/mentorship" element={<Mentorship />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/admin-login" element={<AdminLogin />} />

//         {/* USER */}
//         <Route
//           path="/profile"
//           element={
//             <PrivateRoute>
//               <Profile />
//             </PrivateRoute>
//           }
//         />

//         {/* ADMIN */}
//         <Route
//           path="/admin"
//           element={
//             <AdminRoute>
//               <Admin />
//             </AdminRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );<Route path="/" element={<Home />} />

// }

// export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AdminMockInterviews from "./pages/AdminMockInterviews";


import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Mentorship from "./pages/Mentorship";
import MockInterview from "./pages/MockInterview";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Forum from "./pages/Forum";

import Profile from "./pages/Profile";

import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:courseId" element={<CourseDetail />} />
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/mock-interview" element={<MockInterview />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/mock-interviews" element={<AdminMockInterviews />} />
        <Route path="/forum/:courseId" element={<Forum />} />



        {/* USER */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
