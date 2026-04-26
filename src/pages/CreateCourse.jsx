import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PlusCircle, ImageIcon, ArrowLeft } from "lucide-react";

export default function CreateCourse() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      await api.post("/courses/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Course created successfully!");
      navigate("/instructor/dashboard");
    } catch {
      toast.error("Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 p-10 text-white">
        <div className="max-w-4xl mx-auto">

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-10">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">

              <div className="flex items-center gap-3">
                <PlusCircle size={28} className="text-indigo-400" />
                <h1 className="text-3xl font-bold">Create New Course</h1>
              </div>

              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm 
                bg-white/10 hover:bg-white/20 rounded-lg transition"
              >
                <ArrowLeft size={16} />
                Back
              </button>

            </div>

            <form onSubmit={handleCreate} className="grid grid-cols-1 gap-6">

              <div>
                <label className="text-sm text-white/60">Course Title</label>
                <input
                  type="text"
                  placeholder="Enter course title"
                  className="mt-1 w-full p-4 rounded-xl bg-white/10 border border-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm text-white/60">Course Description</label>
                <textarea
                  rows={6}
                  placeholder="Describe what students will learn"
                  className="mt-1 w-full p-4 rounded-xl bg-white/10 border border-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <label className="text-sm text-white/60">Category</label>
                  <input
                    type="text"
                    placeholder="Web Development, Design, Business"
                    className="mt-1 w-full p-4 rounded-xl bg-white/10 border border-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm text-white/60">Price (₹)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0 for free course"
                    className="mt-1 w-full p-4 rounded-xl bg-white/10 border border-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

              </div>

              <div>
                <label className="text-sm text-white/60">Thumbnail Image</label>

                <div className="mt-3 flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <ImageIcon size={20} className="text-indigo-400" />
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full text-sm text-white/70"
                    onChange={(e) => setThumbnail(e.target.files[0])}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="
                  mt-6 flex items-center justify-center gap-2
                  py-4 rounded-xl font-semibold text-lg
                  bg-indigo-600 hover:bg-indigo-700 transition
                  disabled:opacity-60
                "
              >
                <PlusCircle size={20} />
                {loading ? "Creating..." : "Create Course"}
              </button>

            </form>

          </div>

        </div>
      </div>
    </>
  );
}
