import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Plus,
  GripVertical,
  Pencil,
  Trash2,
  Video,
  FileDown,
  Layers,
} from "lucide-react";

export default function Lessons() {
  const { id } = useParams();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    if (!id) return;
    api.get(`/lessons/?course=${id}`).then((res) => setLessons(res.data));
  }, [id]);

  const deleteLesson = async (lessonId) => {
    if (!confirm("Delete this lesson?")) return;
    await api.delete(`/lessons/${lessonId}/`);
    setLessons((prev) => prev.filter((l) => l.id !== lessonId));
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const reordered = Array.from(lessons);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setLessons(reordered);

    reordered.forEach(async (lesson, index) => {
      await api.patch(`/lessons/${lesson.id}/`, { order: index + 1 });
    });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 p-8 text-white">
        <div className="max-w-5xl mx-auto">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <Layers className="text-indigo-400" />
              <h1 className="text-3xl font-bold">Course Lessons</h1>
            </div>

            <Link
              to={`/instructor/courses/${id}/lessons/add`}
              className="
                flex items-center gap-2
                px-5 py-2.5
                rounded-xl
                bg-indigo-600 hover:bg-indigo-700
                text-sm font-semibold
                transition
              "
            >
              <Plus size={16} />
              Add Lesson
            </Link>
          </div>

          {/* LIST */}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="lessonList">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {lessons.map((lesson, index) => (
                    <Draggable
                      key={lesson.id}
                      draggableId={lesson.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="
                            bg-white/10 backdrop-blur-xl
                            rounded-2xl border border-white/10
                            p-5
                            hover:bg-white/15 transition
                          "
                        >
                          <div className="flex items-start gap-4">
                            {/* DRAG HANDLE */}
                            <div
                              {...provided.dragHandleProps}
                              className="
                                mt-1 p-2 rounded-lg cursor-grab
                                hover:bg-white/10 text-white/40
                              "
                            >
                              <GripVertical size={18} />
                            </div>

                            {/* CONTENT */}
                            <div className="flex-1">
                              <h2 className="text-lg font-semibold">
                                {lesson.title}
                              </h2>

                              <p className="text-white/60 text-sm mt-1 line-clamp-2">
                                {lesson.content}
                              </p>

                              {/* MEDIA */}
                              <div className="flex flex-wrap gap-3 mt-4">
                                {lesson.video && (
                                  <a
                                    href={lesson.video}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                     flex items-center gap-2
                                    px-3 py-1 rounded-lg
                                     bg-indigo-500/10 text-indigo-300
                                       text-xs hover:underline
                                         "
                                  >
                                    <Video size={14} />
                                    Watch Video
                                  </a>
                                )}

                                {lesson.resource && (
                                  <a
                                    href={lesson.resource}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                      flex items-center gap-2
                                      px-3 py-1 rounded-lg
                                      bg-emerald-500/10 text-emerald-300
                                      text-xs hover:underline
                                    "
                                  >
                                    <FileDown size={14} />
                                    Resource
                                  </a>
                                )}
                              </div>
                            </div>

                            {/* ACTIONS */}
                            <div className="flex gap-2">
                              <Link
                                to={`/instructor/courses/${id}/lessons/${lesson.id}/edit`}
                                className="
                                  p-2 rounded-lg
                                  bg-white/10 hover:bg-indigo-600/20
                                  transition
                                "
                                title="Edit lesson"
                              >
                                <Pencil size={16} />
                              </Link>

                              <button
                                onClick={() => deleteLesson(lesson.id)}
                                className="
                                  p-2 rounded-lg
                                  bg-white/10 hover:bg-red-600/30
                                  transition
                                "
                                title="Delete lesson"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}

                  {lessons.length === 0 && (
                    <div className="text-center text-white/60 py-20">
                      No lessons yet — start by adding your first lesson.
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </>
  );
}
