import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Save, Trash2, ImageIcon } from "lucide-react";
import Loading from "./Loading";
export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [existingThumb, setExistingThumb] = useState(null);
  const [thumbFile, setThumbFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get(`/courses/${id}/`)
      .then((res) => {
        setCourse(res.data);
        setExistingThumb(res.data.thumbnail);
      })
      .catch(() => toast.error("Failed to load course"));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", course.title);
    formData.append("description", course.description);
    formData.append("category", course.category);
    formData.append("price", course.price);

    if (thumbFile instanceof File) {
      formData.append("thumbnail", thumbFile);
    }

    try {
      await api.put(`/courses/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Course updated successfully");
      navigate("/instructor/dashboard");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      await api.delete(`/courses/${id}/`);
      toast.success("Course deleted");
      navigate("/instructor/dashboard");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (!course) return <Loading text="Loading..." />

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 p-10 text-white">
        <div className="max-w-4xl mx-auto">

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-10">

            <h1 className="text-3xl font-bold mb-8">
              Edit Course
            </h1>

            <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-6">

              <div>
                <label className="text-sm text-white/60">Course Title</label>
                <input
                  type="text"
                  value={course.title}
                  onChange={(e) =>
                    setCourse({ ...course, title: e.target.value })
                  }
                  className="mt-1 w-full p-4 rounded-xl bg-white/10 border border-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-white/60">Course Description</label>
                <textarea
                  rows={6}
                  value={course.description}
                  onChange={(e) =>
                    setCourse({ ...course, description: e.target.value })
                  }
                  className="mt-1 w-full p-4 rounded-xl bg-white/10 border border-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <label className="text-sm text-white/60">Category</label>
                  <input
                    type="text"
                    value={course.category}
                    onChange={(e) =>
                      setCourse({ ...course, category: e.target.value })
                    }
                    className="mt-1 w-full p-4 rounded-xl bg-white/10 border border-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm text-white/60">Price (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={course.price}
                    onChange={(e) =>
                      setCourse({ ...course, price: e.target.value })
                    }
                    className="mt-1 w-full p-4 rounded-xl bg-white/10 border border-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required
                  />
                </div>

              </div>

              <div>
                <label className="text-sm text-white/60">Course Thumbnail</label>

                {existingThumb && (
                  <div className="flex items-center gap-4 mt-3">
                    <img
                      src={existingThumb}
                      alt="thumbnail"
                      className="w-28 h-20 object-cover rounded-xl border border-white/10"
                    />
                    <p className="text-white/50 text-sm">
                      Current thumbnail
                    </p>
                  </div>
                )}

                <div className="mt-4 flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <ImageIcon size={20} className="text-indigo-400" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setThumbFile(e.target.files[0])}
                    className="w-full text-sm text-white/70"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    flex-1 inline-flex items-center justify-center gap-2
                    py-4 rounded-xl font-semibold
                    bg-indigo-600 hover:bg-indigo-700 transition
                  "
                >
                  <Save size={18} />
                  {loading ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="
                    flex-1 inline-flex items-center justify-center gap-2
                    py-4 rounded-xl font-semibold
                    bg-red-600/80 hover:bg-red-600 transition
                  "
                >
                  <Trash2 size={18} />
                  Delete Course
                </button>

              </div>

            </form>

          </div>
        </div>
      </div>
    </>
  );
}
