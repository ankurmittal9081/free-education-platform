import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Mentorship from "./pages/Mentorship";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      {/* 🔔 Toast container (ONLY ONCE in whole app) */}
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />

        {/* Dynamic course route */}
        <Route path="/course/:courseId" element={<CourseDetail />} />

        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
