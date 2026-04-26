import { Loader2 } from "lucide-react";

export default function Loading({ text = "Loading..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">
      <div className="flex flex-col items-center gap-4 bg-white/10 backdrop-blur-xl px-8 py-10 rounded-2xl border border-white/10">
        <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
        <p className="text-white/70 text-sm tracking-wide">{text}</p>
      </div>
    </div>
  );
}
