import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { CheckCircle, FileDown, PlayCircle } from "lucide-react";
import Loading from "./Loading";
export default function LessonPlayer() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [progressId, setProgressId] = useState(null);

  useEffect(() => {
    api
      .get(`/lessons/${id}/`)
      .then((res) => setLesson(res.data))
      .catch(() => toast.error("Failed to load lesson"));

    api.get(`/progress/?lesson=${id}`).then((res) => {
      if (res.data.length > 0) {
        setCompleted(res.data[0].completed);
        setProgressId(res.data[0].id);
      }
    });
  }, [id]);

  const markComplete = async () => {
    try {
      if (progressId) {
        await api.patch(`/progress/${progressId}/`, { completed: true });
      } else {
        const res = await api.post("/progress/", {
          lesson: id,
        });
        setProgressId(res.data.id);
      }

      setCompleted(true);
      toast.success("Lesson marked as complete!");
    } catch (err) {
      toast.error("Failed to save progress");
      console.error(err);
    }
  };

  if (!lesson) {
    return <Loading text="Loading lesson..." />
  }

  return (
    <>
      <ToastContainer />
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* VIDEO + CONTENT */}
          <div className="lg:col-span-4">

            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              {lesson.video ? (
                <video
                  controls
                  className="w-full max-h-[520px] object-contain bg-black"
                >
                  <source src={lesson.video} type="video/mp4" />
                </video>
              ) : (
                <div className="h-[400px] flex items-center justify-center text-white/50">
                  <PlayCircle size={64} />
                </div>
              )}
            </div>

            <div className="mt-6">
              <h1 className="text-3xl font-bold">{lesson.title}</h1>

              <p className="mt-4 text-white/80 leading-relaxed whitespace-pre-line">
                {lesson.content}
              </p>

              {lesson.resource && (
                <a
                  href={lesson.resource}
                  download
                  className="
                    inline-flex items-center gap-2 mt-5
                    px-4 py-2 rounded-xl
                    bg-white/10 hover:bg-white/20
                    border border-white/10
                    text-sm font-semibold
                    transition
                  "
                >
                  <FileDown size={16} />
                  Download Resource
                </a>
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <div
              className="
                sticky top-24
                bg-white/10 backdrop-blur-xl
                rounded-2xl border border-white/10
                p-6 shadow-xl
              "
            >
              <h3 className="text-lg font-semibold mb-4">
                Lesson Progress
              </h3>

              <div className="space-y-4">
                <div
                  className={`
                    flex items-center gap-3 p-3 rounded-xl border
                    ${completed
                      ? "bg-green-500/10 border-green-500/20 text-green-300"
                      : "bg-white/5 border-white/10 text-white/70"}
                  `}
                >
                  <CheckCircle size={20} />
                  {completed ? "Completed" : "Not completed"}
                </div>

                <button
                  onClick={markComplete}
                  disabled={completed}
                  className={`
                    w-full py-3 rounded-xl font-semibold
                    transition
                    ${completed
                      ? "bg-green-600/30 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"}
                  `}
                >
                  {completed ? "Lesson Completed" : "Mark as Complete"}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
