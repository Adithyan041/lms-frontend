import { Link } from "react-router-dom";
import learningImage from "../assets/learning.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">LearnHub</h1>
        <div className="flex gap-4">
          <Link
            to="/register"
            className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 px-6 text-center lg:text-left">
        <div className="max-w-lg">
          <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow">
            Learn Anything
            <br /> Anytime, Anywhere
          </h2>

          <p className="text-white/70 text-lg mb-6">
            Join our platform to access courses taught by real instructors.
            Learn at your own pace and build your future.
          </p>

          <Link
            to="/register"
            className="inline-block px-6 py-3 text-lg rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition"
          >
            Get Started
          </Link>
        </div>

        {/* Illustration */}
        <img
        src={learningImage}
          alt="Learning"
          className="w-72 md:w-180  lg:w-196 drop-shadow-xl animate-fadeIn"
        />
      </main>
    </div>
  );
}
