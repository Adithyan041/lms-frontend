import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import {
  FileVideo,
  FileText,
  Save,
  ArrowLeft,
} from "lucide-react";

export default function AddLesson() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [order, setOrder] = useState(1);
  const [video, setVideo] = useState(null);
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("order", order);
    formData.append("course", id);

    if (video) formData.append("video", video);
    if (resource) formData.append("resource", resource);

    try {
      await api.post("/lessons/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Lesson added successfully!");
      navigate(`/instructor/courses/${id}/lessons`);
    } catch {
      toast.error("Failed to create lesson");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 p-8 text-white">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Add New Lesson
            </h1>

            <button
              onClick={() =>
                navigate(`/instructor/courses/${id}/lessons`)
              }
              className="inline-flex items-center gap-2 px-4 py-2 text-sm 
              bg-white/10 hover:bg-white/20 rounded-lg transition"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          </div>

          {/* Card */}
          <div
            className="bg-white/10 backdrop-blur-xl border border-white/10 
            rounded-3xl shadow-2xl p-10"
          >
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-6"
            >
              {/* Title */}
              <div>
                <label className="text-sm text-white/60">
                  Lesson Title
                </label>
                <input
                  type="text"
                  placeholder="Enter lesson title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-white/10 
                  border border-white/10 focus:ring-2 
                  focus:ring-indigo-500/40 focus:outline-none"
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label className="text-sm text-white/60">
                  Lesson Content
                </label>
                <textarea
                  placeholder="Enter lesson content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={5}
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-white/10 
                  border border-white/10 focus:ring-2 
                  focus:ring-indigo-500/40 focus:outline-none resize-none"
                  required
                />
              </div>

              {/* Order + Video */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm text-white/60">
                    Lesson Order
                  </label>
                  <input
                    type="number"
                    placeholder="1"
                    value={order}
                    min={1}
                    onChange={(e) => setOrder(e.target.value)}
                    className="mt-2 w-full px-4 py-3 rounded-xl bg-white/10 
                    border border-white/10 focus:ring-2 
                    focus:ring-indigo-500/40 focus:outline-none"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm text-white/60">
                    Lesson Video
                  </label>

                  <label className="mt-2 flex items-center gap-3 px-4 py-3 
                    rounded-xl bg-white/5 border border-white/10 
                    cursor-pointer hover:bg-white/10 transition"
                  >
                    <FileVideo size={18} className="text-indigo-400" />
                    <span className="text-sm text-white/70">
                      {video ? video.name : "Upload lesson video"}
                    </span>
                    <input
                      type="file"
                      accept="video/*"
                      hidden
                      onChange={(e) =>
                        setVideo(e.target.files[0])
                      }
                    />
                  </label>
                </div>
              </div>

              {/* Resource */}
              <div>
                <label className="text-sm text-white/60">
                  Lesson Resource
                </label>

                <label className="mt-2 flex items-center gap-3 px-4 py-3 
                  rounded-xl bg-white/5 border border-white/10 
                  cursor-pointer hover:bg-white/10 transition"
                >
                  <FileText size={18} className="text-indigo-400" />
                  <span className="text-sm text-white/70">
                    {resource
                      ? resource.name
                      : "Upload lesson resource"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.ppt,.zip,.txt,.jpg,.png"
                    hidden
                    onChange={(e) =>
                      setResource(e.target.files[0])
                    }
                  />
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 
                py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 
                font-semibold transition"
              >
                <Save size={18} />
                {loading ? "Saving..." : "Add Lesson"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
