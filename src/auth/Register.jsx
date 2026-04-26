import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/register/", {
        username,
        email,
        password,
        role,
      });

      toast.success("Registration successful 🎉", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      const data = err.response?.data;

      if (data?.username) {
        toast.error(data.username[0]);
      } else if (data?.email) {
        toast.error(data.email[0]);
      } else if (data?.password) {
        toast.error(data.password[0]);
      } else {
        toast.error("Registration failed ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer theme="light" />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 px-4">
        <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20">

          <h2 className="text-2xl font-semibold text-white text-center mb-6">
            Create Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">

            {/* Username */}
            <input
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60
                         outline-none border border-white/20
                         focus:ring-2 focus:ring-indigo-400/60 focus:border-indigo-400"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            {/* Email */}
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60
                         outline-none border border-white/20
                         focus:ring-2 focus:ring-indigo-400/60 focus:border-indigo-400"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-white/20 text-white placeholder-white/60
                           outline-none border border-white/20
                           focus:ring-2 focus:ring-indigo-400/60 focus:border-indigo-400"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 10.5a3 3 0 104.243 4.243" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.228 6.228C3.91 7.91 2.458 12 2.458 12c1.274 4.057 5.064 7 9.542 7" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Custom Role Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl
                           bg-white/20 text-white border border-white/20
                           focus:ring-2 focus:ring-indigo-400/60"
              >
                <span className="capitalize">{role}</span>
                <svg className="h-4 w-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {open && (
                <div className="absolute z-10 mt-2 w-full rounded-xl bg-slate-800 border border-white/20 shadow-xl overflow-hidden">
                  {["student", "instructor"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setRole(item);
                        setOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-white transition
                        hover:bg-indigo-600
                        ${role === item ? "bg-indigo-500/80" : ""}`}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white
                         bg-gradient-to-r from-indigo-500 to-indigo-700
                         hover:from-indigo-600 hover:to-indigo-800
                         transition disabled:opacity-60 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="h-5 w-5 border-2 border-white/60 border-t-white rounded-full animate-spin"></span>
              )}
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <p className="text-center text-white/70 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/Login" className="font-semibold text-indigo-300 hover:text-indigo-200">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
