import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative text-white">
      
      {/* 🌫️ GRADIENT FADE FROM BODY INTO FOOTER */}
      <div className="
        absolute -top-24 left-0 w-full h-24
        bg-gradient-to-b from-transparent to-slate-900
        pointer-events-none
      " />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-400">LearnHub</h2>
            <p className="text-white/60 mt-3 text-sm">
              LearnHub helps students build real-world skills with
              instructor-led courses.
            </p>
          </div>

          {/* STUDENT */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Student</h3>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><Link to="/courses" className="hover:text-indigo-300">Browse Courses</Link></li>
              <li><Link to="/student/dashboard" className="hover:text-indigo-300">My Learning</Link></li>
              <li><Link to="/student/dashboard" className="hover:text-indigo-300">My Enrollments</Link></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-white/60 text-sm">
              <li className="hover:text-indigo-300 cursor-pointer">About</li>
              <li className="hover:text-indigo-300 cursor-pointer">Contact</li>
              <li className="hover:text-indigo-300 cursor-pointer">Privacy</li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Connect</h3>
            <div className="flex gap-4">
              <span className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-indigo-600 transition">🌐</span>
              <span className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-indigo-600 transition">💼</span>
              <span className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-indigo-600 transition">📘</span>
            </div>
          </div>
        </div>

        <div className="mt-14 text-center text-white/40 text-sm">
          © {new Date().getFullYear()} LearnHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
