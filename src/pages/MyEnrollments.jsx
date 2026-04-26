import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { PlayCircle, Layers } from "lucide-react";

export default function MyEnrollments() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api
      .get("/enrollments/")
      .then((res) => {
        const enrolled = res.data
          .filter((e) => e.course)
          .map((e) => e.course);
        setCourses(enrolled);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white p-8">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="flex items-center gap-3 mb-8">
            <Layers className="text-indigo-400" />
            <h1 className="text-3xl font-bold tracking-tight">
              My Enrollments
            </h1>
          </div>

          {courses.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
              <p className="text-white/60 text-lg">
                You haven’t enrolled in any courses yet.
              </p>
              <Link
                to="/courses"
                className="inline-block mt-6 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-semibold"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="
                    group
                    bg-white/10 backdrop-blur-xl
                    rounded-2xl border border-white/10
                    overflow-hidden
                    hover:scale-[1.02]
                    transition
                  "
                >
                  {/* IMAGE */}
                  <div className="relative">
                    <img
                      src={course.thumbnail || "/no-thumb.png"}
                      className="w-full h-44 object-cover"
                      alt="course"
                    />

                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold">
                      Enrolled
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold line-clamp-1">
                      {course.title}
                    </h3>

                    <p className="text-white/60 text-sm capitalize mt-1">
                      {course.category || "General"}
                    </p>

                    <Link
                      to={`/courses/${course.id}`}
                      className="
                        mt-5
                        flex items-center justify-center gap-2
                        w-full
                        py-2.5
                        rounded-xl
                        bg-indigo-600/90 hover:bg-indigo-600
                        font-semibold text-sm
                        transition
                      "
                    >
                      <PlayCircle size={18} />
                      Continue Learning
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
