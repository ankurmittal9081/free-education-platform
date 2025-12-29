import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Mentorship from "./pages/Mentorship";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

import Revision from "./pages/Revision";
import PremiumNotes from "./pages/PremiumNotes";
import Certificates from "./pages/Certificates";

import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminNotes from "./pages/AdminNotes";
import AdminCertificates from "./pages/AdminCertificates";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:courseId" element={<CourseDetail />} />
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/notes" element={<PremiumNotes />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* USER PROTECTED */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/revision"
          element={
            <PrivateRoute>
              <Revision />
            </PrivateRoute>
          }
        />

        <Route
          path="/certificates"
          element={
            <PrivateRoute>
              <Certificates />
            </PrivateRoute>
          }
        />

        {/* ADMIN PROTECTED */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <PrivateRoute>
              <AdminAnalytics />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/notes"
          element={
            <PrivateRoute>
              <AdminNotes />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/certificates"
          element={
            <PrivateRoute>
              <AdminCertificates />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
