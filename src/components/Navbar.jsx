import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Menu, X, LogOut } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("access");

  let user = null;
  if (token) {
    try {
      user = jwtDecode(token);
    } catch {
      user = null;
    }
  }

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="w-full sticky top-0 z-50 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* BRAND */}
        <Link
          to={
            !user
              ? "/"
              : user.role === "admin"
                ? "/admin/dashboard"
                : "/dashboard"
          }
          className="text-xl font-bold tracking-wide text-white hover:text-indigo-300 transition"
        >
          LearnHub
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          {/* Instructor */}
          {user?.role === "instructor" && (
            <NavGroup>
              <NavItem to="/instructor/dashboard">Dashboard</NavItem>
              <NavItem to="/instructor/create-course">Create Course</NavItem>
            </NavGroup>
          )}

          {/* Admin */}
          {user?.role === "admin" && (
            <NavGroup>
              <NavItem to="/admin/dashboard">Dashboard</NavItem>
              <NavItem to="/admin/users">Users</NavItem>
              <NavItem to="/admin/courses">Courses</NavItem>
            </NavGroup>
          )}

          {/* Student */}
          {user?.role === "student" && (
            <NavGroup>
              <NavItem to="/courses">Browse</NavItem>
              <NavItem to="/student/dashboard">My Learning</NavItem>
              <NavItem to="/student/enrollments">Enrollments</NavItem>
            </NavGroup>
          )}

          {/* Auth */}
          {!user && (
            <NavGroup>
              <NavItem to="/login">Login</NavItem>
              <NavItem to="/register">Register</NavItem>
            </NavGroup>
          )}

          {/* USER */}
          {user && (
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
              <div className="text-right leading-tight">
                <p className="text-sm font-medium text-white">
                  {user.username}
                </p>
                <p className="text-xs text-white/50 capitalize">{user.role}</p>
              </div>

              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white/10 border border-white/10 hover:bg-red-500/20 hover:text-red-400 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-6 py-6 border-t border-white/10 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">
          <div className="grid grid-cols-2 gap-4">
            {/* Instructor */}
            {user?.role === "instructor" && (
              <>
                <MobileItem
                  to="/instructor/dashboard"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </MobileItem>
                <MobileItem
                  to="/instructor/create-course"
                  onClick={() => setMenuOpen(false)}
                >
                  Create Course
                </MobileItem>
              </>
            )}

            {/* Admin */}
            {user?.role === "admin" && (
              <>
                <MobileItem
                  to="/admin/dashboard"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </MobileItem>
                <MobileItem
                  to="/admin/users"
                  onClick={() => setMenuOpen(false)}
                >
                  Users
                </MobileItem>
                <MobileItem
                  to="/admin/courses"
                  onClick={() => setMenuOpen(false)}
                >
                  Courses
                </MobileItem>
              </>
            )}

            {/* Student */}
            {user?.role === "student" && (
              <>
                <MobileItem to="/courses" onClick={() => setMenuOpen(false)}>
                  Browse
                </MobileItem>
                <MobileItem
                  to="/student/dashboard"
                  onClick={() => setMenuOpen(false)}
                >
                  My Learning
                </MobileItem>
                <MobileItem
                  to="/student/enrollments"
                  onClick={() => setMenuOpen(false)}
                >
                  Enrollments
                </MobileItem>
              </>
            )}

            {/* Guest */}
            {!user && (
              <>
                <MobileItem to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </MobileItem>
                <MobileItem to="/register" onClick={() => setMenuOpen(false)}>
                  Register
                </MobileItem>
              </>
            )}
          </div>

          {/* LOGOUT */}
          {user && (
            <button
              onClick={logout}
              className="w-full mt-6 py-3 rounded-xl bg-red-500/20 border border-red-500/20 text-red-300 font-semibold hover:bg-red-500/30 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

/* ============ UI HELPERS ============ */

function NavGroup({ children }) {
  return <div className="flex items-center gap-6">{children}</div>;
}

function NavItem({ to, children }) {
  return (
    <Link
      to={to}
      className="relative text-sm font-medium text-white/80 hover:text-indigo-300 transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-indigo-400 after:transition-all hover:after:w-full"
    >
      {children}
    </Link>
  );
}

function MobileItem({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="
        flex items-center justify-center
        h-12
        rounded-xl
        bg-white/10
        border border-white/10
        text-sm font-semibold text-white/90
        hover:bg-white/20
        transition
      "
    >
      {children}
    </Link>
  );
}

