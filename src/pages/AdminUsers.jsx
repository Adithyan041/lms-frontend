import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function AdminUsers() {
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    api.get("/admin/users/").then((res) => {
      setStudents(res.data.students);
      setInstructors(res.data.instructors);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white p-8">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-3xl font-bold mb-10">User Management</h1>

          {/* INSTRUCTORS */}
          <h2 className="text-xl font-semibold mb-4">Instructors</h2>
          <Table data={instructors} />

          {/* STUDENTS */}
          <h2 className="text-xl font-semibold mt-10 mb-4">Students</h2>
          <Table data={students} />

        </div>
      </div>
    </>
  );
}

function Table({ data }) {
  return (
    <div className="overflow-x-auto bg-white/10 rounded-xl border border-white/10">
      <table className="w-full text-sm">
        <thead className="bg-white/5 text-white/70">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Username</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Joined</th>
          </tr>
        </thead>
        <tbody>
          {data.map((u) => (
            <tr key={u.id} className="border-t border-white/10 hover:bg-white/5">
              <td className="p-3">{u.id}</td>
              <td className="p-3 font-semibold">{u.username}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">
                {new Date(u.date_joined).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
