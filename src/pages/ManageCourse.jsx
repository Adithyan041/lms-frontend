import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import {
  Pencil,
  Trash2,
  Layers,
  IndianRupee,
  Tag,
} from "lucide-react";
import Loading from "./Loading";
export default function ManageCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  const fetchCourse = async () => {
    try {
      const res = await api.get(`/courses/${id}/`);
      setCourse(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCourse = async () => {
    if (!confirm("Delete this course?")) return;
    try {
      await api.delete(`/courses/${id}/`);
      navigate("/instructor/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  if (!course)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
      <Loading text="Loading..." />
      </div>
    );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white p-8">
        <div className="max-w-5xl mx-auto">

          {/* HEADER */}
          <div className="flex items-center gap-3 mb-8">
            <Layers className="text-indigo-400" />
            <h1 className="text-3xl font-bold tracking-tight">
              Manage Course
            </h1>
          </div>

          {/* MAIN CARD */}
          <div
            className="
              bg-white/10 backdrop-blur-xl
              rounded-2xl border border-white/10
              overflow-hidden
            "
          >
            {/* IMAGE */}
            <div className="relative">
              <img
                src={course.thumbnail || "/no-thumb.png"}
                className="w-full h-60 object-cover"
                alt="course"
              />
            </div>

            {/* CONTENT */}
            <div className="p-8">

              <h2 className="text-2xl font-semibold mb-2">
                {course.title}
              </h2>

              <p className="text-white/70 leading-relaxed">
                {course.description}
              </p>

              {/* META */}
              <div className="flex flex-wrap gap-6 mt-6 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <IndianRupee size={16} className="text-indigo-400" />
                  <span className="font-semibold text-white">
                    {course.price}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-indigo-400" />
                  <span className="capitalize">
                    {course.category || "General"}
                  </span>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-4 mt-10">
                <Link
                  to={`/instructor/edit-course/${course.id}`}
                  className="
                    flex items-center gap-2
                    px-5 py-2.5
                    rounded-xl
                    bg-indigo-600 hover:bg-indigo-700
                    font-semibold text-sm
                    transition
                  "
                >
                  <Pencil size={16} />
                  Edit Course
                </Link>

                <Link
                  to={`/instructor/courses/${id}/lessons`}
                  className="
                    flex items-center gap-2
                    px-5 py-2.5
                    rounded-xl
                    bg-emerald-600 hover:bg-emerald-700
                    font-semibold text-sm
                    transition
                  "
                >
                  <Layers size={16} />
                  Manage Lessons
                </Link>

                <button
                  onClick={deleteCourse}
                  className="
                    flex items-center gap-2
                    px-5 py-2.5
                    rounded-xl
                    bg-red-600/90 hover:bg-red-600
                    font-semibold text-sm
                    transition
                  "
                >
                  <Trash2 size={16} />
                  Delete Course
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
