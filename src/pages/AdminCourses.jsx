import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = () => {
    api.get("/courses/").then((res) => setCourses(res.data));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (id) => {
     toast(
    (t) => (
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm text-white">
          Delete this course permanently?
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 text-xs rounded-md bg-white/10 hover:bg-white/20"
          >
            Cancel
          </button>

          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await api.delete(`/courses/${id}/`);
                fetchCourses();
                toast.success("Course deleted");
              } catch {
                toast.error("Delete failed");
              }
            }}
            className="px-3 py-1 text-xs rounded-md bg-red-600 hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    ),
    {
      style: {
        background: "#393A70",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.1)",
      },
      duration: 4000,
    }
  );
};
  return (
    <>
      <Navbar />
      <Toaster />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-10">
            Course Management
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white/10 p-6 rounded-xl border border-white/10 relative"
              >
                <button
                  onClick={() => deleteCourse(course.id)}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-red-600 hover:bg-red-700"
                >
                  <Trash2 size={16} />
                </button>

                <h3 className="text-xl font-semibold">
                  {course.title}
                </h3>

                <p className="text-white/60 text-sm mt-2 line-clamp-3">
                  {course.description}
                </p>

                <p className="mt-3 text-indigo-300 font-semibold">
                  ₹{course.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
