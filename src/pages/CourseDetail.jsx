import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { PlayCircle, Lock, CheckCircle, BookOpen } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

export default function CourseDetail() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const [loadingEnroll, setLoadingEnroll] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [courseRes, lessonRes, progressRes, enrollRes] =
          await Promise.all([
            api.get(`/courses/${id}/`),
            api.get(`/lessons/?course=${id}`),
            api.get(`/progress/`),
            api.get(`/enrollments/`),
          ]);

        setCourse(courseRes.data);
        setLessons(lessonRes.data);

        // FIXED PROGRESS CALCULATION
        const completed = progressRes.data.filter(
          (p) =>
            p.completed &&
            lessonRes.data.some((l) => l.id === p.lesson)
        );

        setCompletedLessons(completed.map((p) => p.lesson));

        const ids = enrollRes.data
          .filter((e) => e.course)
          .map((e) => e.course.id);

        setEnrolled(ids.includes(Number(id)));
      } catch (err) {
        console.error(err);
        toast.error("Failed to load course data");
      }
    };

    loadData();
  }, [id]);

  const handleEnroll = async () => {
    setLoadingEnroll(true);
    try {
      await api.post("/enrollments/", { course_id: id });
      toast.success("🎉 Enrolled Successfully!");
      setEnrolled(true);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Enrollment failed");
    } finally {
      setLoadingEnroll(false);
    }
  };

  const handlePayment = async () => {
    try {
      const res = await api.post("/payments/create-order/", {
        course_id: course.id,
      });

      const { order_id, amount, key, course: title } = res.data;

      const options = {
        key,
        amount,
        currency: "INR",
        name: "LearnHub",
        description: title,
        order_id,
        handler: async function (response) {
          await api.post("/payments/verify-payment/", {
            ...response,
            course_id: course.id,
          });
          toast.success("🎉 Payment Successful!");
          setEnrolled(true);
        },
        theme: { color: "#6366f1" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch {
      toast.error("Payment failed");
    }
  };

  if (!course) return <p className="text-white p-8">Loading...</p>;

  const total = lessons.length;
  const done = completedLessons.length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <>
      <ToastContainer />
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 p-8 text-white">
        <div className="max-w-6xl mx-auto space-y-10">

          {/* COURSE HEADER */}
          <div className="grid md:grid-cols-3 gap-8 items-start bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <img
              src={course.thumbnail || "/no-thumb.png"}
              className="w-full h-52 object-cover rounded-xl border border-white/10"
              alt="thumbnail"
            />

            <div className="md:col-span-2 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {course.title}
                </h1>

                <p className="text-white/70 mt-2">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-4 mt-4 text-sm">
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">
                    Category: {course.category}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">
                    {course.price > 0 ? `₹${course.price}` : "FREE"}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                {!enrolled ? (
                  course.price > 0 ? (
                    <button
                      onClick={handlePayment}
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-semibold transition"
                    >
                      Buy Now
                    </button>
                  ) : (
                    <button
                      onClick={handleEnroll}
                      disabled={loadingEnroll}
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-semibold transition"
                    >
                      {loadingEnroll ? "Processing..." : "Enroll Free 🚀"}
                    </button>
                  )
                ) : (
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600/80 font-semibold">
                    <CheckCircle size={18} />
                    Enrolled
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* PROGRESS */}
          {enrolled && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col items-center">
              <div
                className="relative flex items-center justify-center"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  background: `conic-gradient(#4ade80 ${percent}%, #1e293b ${percent}% 100%)`,
                }}
              >
                <span className="absolute text-2xl font-bold">
                  {percent}%
                </span>
              </div>

              <p className="mt-3 text-white/70 text-sm">
                {done} of {total} lessons completed
              </p>
            </div>
          )}

          {/* LESSON LIST */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <h2 className="text-2xl font-semibold mb-7 flex items-center gap-2">
              <BookOpen size={22} /> Course Lessons
            </h2>

            {lessons.length === 0 ? (
              <p className="text-white/60">
                No lessons added yet.
              </p>
            ) : (
              <div className="space-y-3">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex justify-between items-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-5 py-4 transition"
                  >
                    <div>
                      <h3 className="font-semibold">
                        {lesson.title}
                      </h3>
                      <p className="text-white/60 text-sm line-clamp-1">
                        {lesson.content}
                      </p>
                    </div>

                    {enrolled ? (
                      <Link
                        to={`/student/lesson/${lesson.id}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 hover:text-indigo-200"
                      >
                        <PlayCircle size={18} />
                        Start
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm text-red-300">
                        <Lock size={16} />
                        Locked
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
