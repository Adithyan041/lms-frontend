import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { Search, Filter } from "lucide-react";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    api.get("/courses/")
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  const categories = [...new Set(courses.map(c => c.category).filter(Boolean))];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase()) &&
    (category ? course.category === category : true)
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white px-6 py-10">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight">Explore Courses</h1>
            <p className="text-white/60 mt-1">
              Learn new skills from industry experts
            </p>
          </div>

          {/* SEARCH + FILTER */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">

            <div className="flex-1 flex items-center gap-2 bg-white/10 border border-white/10 rounded-xl px-4 py-3">
              <Search size={18} className="text-white/50" />
              <input
                type="text"
                placeholder="Search for courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent flex-1 outline-none text-sm placeholder-white/40"
              />
            </div>
<div className="relative w-full md:w-72">
  <button
    onClick={() => setOpenFilter(!openFilter)}
    className="
      w-full flex items-center justify-between gap-3 
      px-4 py-3 rounded-xl bg-white/10 border border-white/10 
      hover:bg-white/15 transition
    "
  >
    <div className="flex items-center gap-2">
      <Filter size={18} className="text-white/50" />
      <span className="text-sm">
        {category || "All Categories"}
      </span>
    </div>

    <span className="text-white/40 text-xs">▼</span>
  </button>

  {openFilter && (
    <div
      className="
        absolute z-50 mt-2 w-full 
        bg-slate-900 border border-white/10 
        rounded-xl shadow-xl overflow-hidden
        animate-in fade-in slide-in-from-top-2
      "
    >
      <button
        onClick={() => {
          setCategory("");
          setOpenFilter(false);
        }}
        className="
          w-full text-left px-4 py-3 text-sm 
          hover:bg-white/10 transition
        "
      >
        All Categories
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => {
            setCategory(cat);
            setOpenFilter(false);
          }}
          className={`
            w-full text-left px-4 py-3 text-sm 
            hover:bg-indigo-600/20 transition
            ${category === cat ? "bg-indigo-600/30" : ""}
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  )}
</div>
</div>

          {/* COURSES GRID */}
          {filteredCourses.length === 0 ? (
            <div className="text-center py-20 text-white/60">
              No courses found
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {filteredCourses.map(course => (
                <div
                  key={course.id}
                  className="group bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.02] hover:shadow-xl transition"
                >
                  <div className="relative">
                    <img
                      src={course.thumbnail || "/no-thumb.png"}
                      className="w-full h-44 object-cover"
                      alt="thumbnail"
                    />

                    {/* PRICE BADGE */}
                    <span
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur ${
                        course.price > 0
                          ? "bg-black/40 text-white"
                          : "bg-green-500/20 text-green-300"
                      }`}
                    >
                      {course.price > 0 ? `₹${course.price}` : "Free"}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col justify-between h-[185px]">

                    <div>
                      <h3 className="text-lg font-semibold line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-white/60 text-sm mt-1 line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    <Link
                      to={`/courses/${course.id}`}
                      className="mt-4 inline-flex justify-center items-center gap-2 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 transition font-semibold text-sm"
                    >
                      View Course →
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
