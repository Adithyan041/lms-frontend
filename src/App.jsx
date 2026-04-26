import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import Register from "./auth/Register";
import Landing from "./pages/Landing";
import CourseDetail from "./pages/CourseDetail";
import CreateCourse from "./pages/CreateCourse";
import InstructorDashboard from "./pages/InstructorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Lessons from "./pages/Lessons";
import EditCourse from "./pages/EditCourse";
import ManageCourse from "./pages/ManageCourse";
import AddLesson from "./pages/AddLesson";
import EditLesson from "./pages/EditLesson";
import LessonPlayer from "./pages/LessonPlayer";
import MyEnrollments from "./pages/MyEnrollments";
import AdminCourses from "./pages/AdminCourses";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* INSTRUCTOR */}
        <Route
          path="/instructor/dashboard"
          element={
            <ProtectedRoute role="instructor">
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor/create-course"
          element={
            <ProtectedRoute role="instructor">
              <CreateCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor/edit-course/:id"
          element={
            <ProtectedRoute role="instructor">
              <EditCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor/courses/:id"
          element={
            <ProtectedRoute role="instructor">
              <ManageCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor/courses/:id/lessons"
          element={
            <ProtectedRoute role="instructor">
              <Lessons />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor/courses/:id/lessons/add"
          element={
            <ProtectedRoute role="instructor">
              <AddLesson />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor/courses/:courseId/lessons/:lessonId/edit"
          element={
            <ProtectedRoute role="instructor">
              <EditLesson />
            </ProtectedRoute>
          }
        />

        {/* STUDENT */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/lesson/:id"
          element={
            <ProtectedRoute role="student">
              <LessonPlayer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/enrollments"
          element={
            <ProtectedRoute role="student">
              <MyEnrollments />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute role="admin">
              <AdminCourses />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
