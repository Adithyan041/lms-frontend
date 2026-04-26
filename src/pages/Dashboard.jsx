import Navbar from "../components/Navbar";
import { getUser } from "../auth/useAuth";
import StudentDashboard from "./StudentDashboard";
import InstructorDashboard from "./InstructorDashboard";
import AdminDashboard from "./AdminDashboard";

export default function Dashboard() {
  const user = getUser();
  if (!user) return null;

  return (
    <>


      {user.role === "admin" && <AdminDashboard />}
      {user.role === "instructor" && <InstructorDashboard />}
      {user.role === "student" && <StudentDashboard />}

    </>
  );
}
