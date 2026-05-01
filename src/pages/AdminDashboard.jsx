import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Loading from "./Loading";
import {
  Users,
  GraduationCap,
  BookOpen,
  IndianRupee,
  BarChart3,
  TrendingUp,
} from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

useEffect(() => {
  const token = localStorage.getItem("access");

  if (!token) return;

  api.get("/admin/stats/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => setStats(res.data))
    .catch((err) => console.log(err));
}, []);

  if (!stats) return <Loading text="Loading..." />

  const chartData = {
    labels: ["Users", "Students", "Instructors", "Courses", "Enrollments"],
    datasets: [
      {
        label: "Platform Stats",
        data: [
          stats.total_users,
          stats.total_students,
          stats.total_instructors,
          stats.total_courses,
          stats.total_enrollments,
        ],
        backgroundColor: "#6366f1",
      },
    ],
  };

  return (
    <>
     <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white p-8">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="flex items-center gap-3 mb-10">
            <BarChart3 className="w-8 h-8 text-indigo-400" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            <Stat icon={<Users />} title="Total Users" value={stats.total_users} />
            <Stat icon={<GraduationCap />} title="Students" value={stats.total_students} />
            <Stat icon={<Users />} title="Instructors" value={stats.total_instructors} />
            <Stat icon={<BookOpen />} title="Courses" value={stats.total_courses} />
            <Stat icon={<TrendingUp />} title="Enrollments" value={stats.total_enrollments} />
            <Stat icon={<IndianRupee />} title="Revenue" value={`₹${stats.total_revenue}`} />
          </div>

          {/* CHART */}
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 mb-14">
            <h2 className="text-xl font-semibold mb-4">Platform Analytics</h2>
            <Bar data={chartData} />
          </div>

          {/* ACTIVITY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ActivityCard
              title="New Users (7 Days)"
              value={stats.new_users}
            />
            <ActivityCard
              title="New Enrollments (7 Days)"
              value={stats.new_enrollments}
            />
          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-20">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

          <div className="max-w-7xl mx-auto px-6 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-indigo-400">
                  LearnHub Admin
                </h2>
                <p className="text-white/60 mt-3 text-sm">
                  Full control and analytics dashboard for platform administrators.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Platform</h3>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li>Users</li>
                  <li>Courses</li>
                  <li>Payments</li>
                  <li>Reports</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Security</h3>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li>Permissions</li>
                  <li>Roles</li>
                  <li>Logs</li>
                  <li>Access Control</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Support</h3>
                <p className="text-white/60 text-sm">admin@learnhub.com</p>
              </div>
            </div>

            <div className="mt-12 text-center text-white/40 text-sm">
              © {new Date().getFullYear()} LearnHub. Admin Panel.
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}

function Stat({ icon, title, value }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
      <div className="flex items-center gap-3 text-indigo-400 mb-2">
        {icon}
        <p className="text-white/60 text-sm">{title}</p>
      </div>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
}

function ActivityCard({ title, value }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 text-center">
      <p className="text-white/60 mb-2">{title}</p>
      <h2 className="text-4xl font-bold text-indigo-400">{value}</h2>
    </div>
  );
}
