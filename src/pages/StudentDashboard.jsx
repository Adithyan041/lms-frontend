import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import Footer from "../components/Footer";
import {
  BookOpen,
  Users,
  GraduationCap,
  ShieldCheck,
  Mail,
  Play,
  Layers,
  TrendingUp,
  Lock,
  Eye,
  CheckCircle,
} from "lucide-react";
import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import hero3 from "../assets/hero3.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function StudentDashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    // 🔹 Fetch enrollments
    api
      .get("/enrollments/")
      .then((res) => {
        const courses = res.data.filter((e) => e.course).map((e) => e.course);
        setEnrolledCourses(courses);
      })
      .catch((err) => console.error("Enrollment error:", err));

    // 🔹 Fetch all courses
    api
      .get("/courses/")
      .then((res) => {
        setAllCourses(res.data);
        setPopularCourses(res.data.slice(0, 6));
      })
      .catch((err) => console.error("Courses error:", err));
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br  from-slate-900 via-indigo-900 to-slate-800 text-white">
        {/* ================= HERO ================= */}
        <div className="max-w-6xl mx-auto pt-8 pb-4 px-6">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 2500 }}
            pagination={{ clickable: true }}
            loop
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            {[hero1, hero2, hero3].map((img, i) => (
              <SwiperSlide key={i} className="relative min-h-[300px]">
                <img
                  src={img}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt="Hero"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ================= TRENDING ================= */}
        <div className="max-w-6xl mx-auto py-8 px-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="text-indigo-400" size={22} />
            Trending Courses
          </h2>

          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            spaceBetween={20}
            autoplay={{ delay: 2000 }}
            loop={popularCourses.length > 4}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {popularCourses.map((course) => (
              <SwiperSlide key={course.id}>
                <CourseCard course={course} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ================= ALL COURSES ================= */}
        <div className="max-w-6xl mx-auto py-8 px-6">
          <h2 className="text-2xl font-semibold mb-4"> All Courses</h2>

          {allCourses.length === 0 ? (
            <p className="text-white/70">No courses available</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCourses.map((course) => {
                const isEnrolled = enrolledCourses.some(
                  (c) => c.id === course.id,
                );

                return (
                  <CourseCard
                    key={course.id}
                    course={course}
                    enrolled={isEnrolled}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* ================= MY ENROLLMENTS ================= */}
        <div className="max-w-6xl mx-auto py-8 px-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="text-indigo-400" size={22} />
            My Enrollments
          </h2>

          {enrolledCourses.length === 0 ? (
            <p className="text-white/70">
              Not enrolled yet — browse courses to begin !
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <CourseCard key={course.id} course={course} enrolled />
              ))}
            </div>
          )}
        </div>
        <footer className="mt-20 text-white relative">
          {/* Soft divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-14" />

          <div className="max-w-7xl mx-auto px-6 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
              {/* BRAND */}
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-indigo-400">LearnHub</h2>
                <p className="text-white/60 mt-3 text-sm leading-relaxed max-w-sm">
                  LearnHub helps students build real-world skills through
                  structured, instructor-led learning experiences.
                </p>

                {/* TRUST POINTS */}
                <div className="mt-6 space-y-3 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-indigo-400" />
                    Verified instructors
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap size={16} className="text-indigo-400" />
                    Career-focused curriculum
                  </div>
                </div>
              </div>

              {/* STUDENT LINKS */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Student</h3>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li>
                    <Link to="/courses" className="hover:text-indigo-300">
                      Browse Courses
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/student/dashboard"
                      className="hover:text-indigo-300"
                    >
                      My Learning
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/student/dashboard"
                      className="hover:text-indigo-300"
                    >
                      My Enrollments
                    </Link>
                  </li>
                </ul>
              </div>

              {/* COMPANY */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Company</h3>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li className="hover:text-indigo-300 cursor-pointer">
                    About Us
                  </li>
                  <li className="hover:text-indigo-300 cursor-pointer">
                    Contact
                  </li>
                  <li className="hover:text-indigo-300 cursor-pointer">
                    Privacy Policy
                  </li>
                </ul>
              </div>

              {/* RIGHT SIDE – STATS + NEWSLETTER */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  LearnHub at a glance
                </h3>

                {/* STATS */}
                <div className="space-y-3 text-sm text-white/60 mb-6">
                  <div className="flex items-center gap-3">
                    <Users size={16} className="text-indigo-400" />
                    5,000+ active learners
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen size={16} className="text-indigo-400" />
                    120+ curated courses
                  </div>
                </div>

                {/* NEWSLETTER */}
                <div className="space-y-2">
                  <p className="text-sm text-white/50">
                    Get updates on new courses
                  </p>

                  <div className="flex items-center bg-white/10 rounded-lg overflow-hidden border border-white/10">
                    <span className="px-3 text-white/50">
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      placeholder="Your email"
                      className="
                    bg-transparent flex-1 px-2 py-2 text-sm
                    text-white placeholder-white/40
                    focus:outline-none
                  "
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM */}
            <div className="mt-14 text-center text-white/40 text-sm">
              © {new Date().getFullYear()} LearnHub. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

/* ================= REUSABLE COURSE CARD ================= */

function CourseCard({ course, enrolled = false }) {
  return (
    <div className="bg-white/10 rounded-xl border border-white/10 overflow-hidden hover:bg-white/20 transition">
      <img
        src={course.thumbnail || "/no-thumb.png"}
        className="w-full h-40 object-cover"
        alt="course"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg">{course.title}</h3>
        <p className="text-white/60 text-sm line-clamp-2">
          {course.description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 backdrop-blur-md">
            {course.price > 0 ? (
              <>
                <Lock size={12} className="text-rose-400" />
                <span className="text-white/80">Paid</span>
              </>
            ) : (
              <>
                <CheckCircle size={12} className="text-emerald-400" />
                <span className="text-white/80">Free</span>
              </>
            )}
          </span>

          <Link
            to={`/courses/${course.id}`}
            className={`
    flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
    backdrop-blur-xl border border-white/10 transition
    hover:scale-[1.04] active:scale-[0.97]
    ${
      enrolled
        ? "bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
        : "bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20"
    }
  `}
          >
            {enrolled ? (
              <>
                <Play size={14} />
                Continue
              </>
            ) : (
              <>
                <Eye size={14} />
                View
              </>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
