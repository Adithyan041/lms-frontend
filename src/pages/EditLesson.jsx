import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import { FileVideo, FileText, Trash2, Save } from "lucide-react";

export default function EditLesson() {
  const { lessonId, courseId } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState({
    title: "",
    content: "",
    order: 1,
    video: null,
    resource: null,
  });

  const [existingVideo, setExistingVideo] = useState(null);
  const [existingResource, setExistingResource] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get(`/lessons/${lessonId}/`)
      .then((res) => {
        setLesson({
          title: res.data.title,
          content: res.data.content,
          order: res.data.order,
          video: null,
          resource: null,
        });
        setExistingVideo(res.data.video);
        setExistingResource(res.data.resource);
      })
      .catch(() => toast.error("Failed to load lesson"));
  }, [lessonId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", lesson.title);
    formData.append("content", lesson.content);
    formData.append("order", lesson.order);

    if (lesson.video instanceof File) formData.append("video", lesson.video);
    if (lesson.resource instanceof File) formData.append("resource", lesson.resource);

    try {
      await api.patch(`/lessons/${lessonId}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Lesson updated successfully");
      navigate(`/instructor/courses/${courseId}/lessons`);
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this lesson?")) return;

    try {
      await api.delete(`/lessons/${lessonId}/`);
      toast.success("Lesson deleted");
      navigate(`/instructor/courses/${courseId}/lessons`);
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 p-10 text-white">
        <div className="max-w-4xl mx-auto">

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-10">

            <h1 className="text-3xl font-bold mb-8">
              Edit Lesson
            </h1>

            <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-6">

              <div>
                <label className="text-sm text-white/60">Lesson Title</label>
                <input
                  type="text"
                  value={lesson.title}
                  onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
                  className="mt-1 w-full p-4 rounded-xl bg-white/10 border border-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-white/60">Lesson Content</label>
                <textarea
                  value={lesson.content}
                  onChange={(e) => setLesson({ ...lesson, content: e.target.value })}
                  rows={6}
                  className="mt-1 w-full p-4 rounded-xl bg-white/10 border border-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div>
                  <label className="text-sm text-white/60">Lesson Order</label>
                  <input
                    type="number"
                    value={lesson.order}
                    min={1}
                    onChange={(e) => setLesson({ ...lesson, order: e.target.value })}
                    className="mt-1 w-full p-4 rounded-xl bg-white/10 border border-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm text-white/60">Lesson Video</label>

                  {existingVideo && (
                    <div className="flex items-center gap-3 mt-2 text-sm text-indigo-300">
                      <FileVideo size={18} />
                      <a href={existingVideo} target="_blank" className="underline">
                        View current video
                      </a>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) =>
                      setLesson({ ...lesson, video: e.target.files[0] })
                    }
                    className="mt-3 w-full p-4 rounded-xl bg-white/10 border border-white/10"
                  />
                </div>

              </div>

              <div>
                <label className="text-sm text-white/60">Lesson Resource</label>

                {existingResource && (
                  <div className="flex items-center gap-3 mt-2 text-sm text-indigo-300">
                    <FileText size={18} />
                    <a href={existingResource} target="_blank" className="underline">
                      Download current resource
                    </a>
                  </div>
                )}

                <input
                  type="file"
                  accept=".pdf,.doc,.ppt,.zip,.txt,.jpg,.png"
                  onChange={(e) =>
                    setLesson({ ...lesson, resource: e.target.files[0] })
                  }
                  className="mt-3 w-full p-4 rounded-xl bg-white/10 border border-white/10"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">

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
                  Delete Lesson
                </button>

              </div>

            </form>

          </div>
        </div>
      </div>
    </>
  );
}
