import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import {
  BookOpen,
  Users,
  IndianRupee,
  LayoutDashboard,
  TrendingUp,
  Award,
} from "lucide-react";
import Loading from "./Loading";

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [courseRes, statsRes] = await Promise.all([
        api.get("/courses/"),
        api.get("/instructor/stats/"),
      ]);

      setCourses(courseRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
     <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto p-8">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-8 h-8 text-indigo-400" />
              <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
            </div>

            <Link
              to="/instructor/create-course"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-semibold"
            >
              + Create Course
            </Link>
          </div>

          {/* STATS */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-14">
              <StatCard
                icon={<BookOpen />}
                title="Total Courses"
                value={stats.total_courses}
              />
              <StatCard
                icon={<Users />}
                title="Total Students"
                value={stats.total_students}
              />
              <StatCard
                icon={<IndianRupee />}
                title="Total Revenue"
                value={`₹ ${stats.total_revenue.toLocaleString()}`}
              />
              <StatCard
                icon={<TrendingUp />}
                title="New Students (30d)"
                value={stats.new_students || 0}
              />
            </div>
          )}

          {/* COURSES */}
          <h2 className="text-2xl font-semibold mb-5">My Courses</h2>

          {loading ? (
            <Loading text="Loading lesson..." />
          ) : courses.length === 0 ? (
            <p className="text-white/60">
              You haven't created any courses yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {courses.map((course) => {
                const analytics = stats?.courses.find(
                  (c) => c.id === course.id,
                );

                  const topCourse =
  stats?.courses?.reduce((prev, current) =>
    prev.revenue > current.revenue ? prev : current,
  );

                return (
                  <div
                    key={course.id}
                    className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:scale-[1.02] transition"
                  >

                    {topCourse?.id === course.id && (
  <span className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400/20 text-yellow-300 border border-yellow-300/30">
    Top Performing Course
  </span>
)}
                    <h3 className="text-xl font-semibold mb-1">
                      {course.title}
                    </h3>

                    <p className="text-white/60 text-sm line-clamp-2">
                      {course.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
                      <div className="bg-white/5 p-3 rounded-xl text-center">
                        <p className="text-white/60">Students</p>
                        <p className="font-bold text-lg">
                          {analytics?.students || 0}
                        </p>
                      </div>

                      <div className="bg-white/5 p-3 rounded-xl text-center">
                        <p className="text-white/60">Revenue</p>
                        <p className="font-bold text-lg">
                          ₹ {Number(analytics?.revenue || 0).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <Link
                      to={`/instructor/courses/${course.id}`}
                      className="inline-block w-full text-center mt-5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold"
                    >
                      Manage Course
                    </Link>
                  </div>
                );
              })}
            </div>
          )}

          {/* RECENT ENROLLMENTS */}
          {stats && (
            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
              <h2 className="text-xl font-semibold mb-4">Recent Enrollments</h2>

              {stats.latest_enrollments.length === 0 ? (
                <p className="text-white/60">No enrollments yet.</p>
              ) : (
                <div className="divide-y divide-white/10">
                  {stats.latest_enrollments.map((e, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3"
                    >
                      <div>
                        <p className="font-semibold">{e.student}</p>
                        <p className="text-xs text-white/50">{e.course}</p>
                      </div>
                      <span className="text-xs text-white/50">{e.date}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <footer className="mt-20">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

          <div className="max-w-7xl mx-auto px-6 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-indigo-400">LearnHub</h2>
                <p className="text-white/60 mt-3 text-sm leading-relaxed">
                  Build, manage and scale your online courses with LearnHub’s
                  modern LMS platform.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Instructor</h3>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li>Dashboard</li>
                  <li>Create Course</li>
                  <li>Manage Courses</li>
                  <li>Analytics</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Platform</h3>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li>About</li>
                  <li>Support</li>
                  <li>Privacy Policy</li>
                  <li>Terms</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Contact</h3>
                <p className="text-white/60 text-sm">support@learnhub.com</p>
                <p className="text-white/60 text-sm mt-2">India</p>
              </div>
            </div>

            <div className="mt-12 text-center text-white/40 text-sm">
              © {new Date().getFullYear()} LearnHub. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

/* STATS CARD */
function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:scale-[1.03] transition">
      <div className="flex items-center gap-3 mb-2 text-indigo-400">
        {icon}
        <p className="text-white/60 text-sm">{title}</p>
      </div>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
}
