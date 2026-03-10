"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "../../utils/supabase/browser-client";
// Lucid iconlarını buraya ekleyebilirsin

export default function PelisionAuthPage() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setCurrentUser(session?.user ?? null);
      if (event === "SIGNED_IN") {
        router.refresh(); // Server tarafını uyandırıyoruz
        router.push("/dashboard");
      }
    });
    return () => subscription.unsubscribe();
  }, [supabase, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Processing neural link...");
    
    const { error } = mode === "signup" 
      ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) setStatus(error.message);
    else setStatus(mode === "signup" ? "Check your email!" : "Redirecting...");
  };

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-slate-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/[0.02] border border-emerald-500/20 p-10 rounded-[42px] shadow-2xl backdrop-blur-xl">
        <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-8 text-center text-emerald-400">Pelision Auth</h2>
        
        <div className="flex bg-white/5 p-1 rounded-full mb-8">
           <button type="button" onClick={() => setMode("signup")} className={`flex-1 py-2 text-xs font-bold uppercase rounded-full transition ${mode === "signup" ? "bg-emerald-500 text-black" : "text-white/40"}`}>Sign Up</button>
           <button type="button" onClick={() => setMode("signin")} className={`flex-1 py-2 text-xs font-bold uppercase rounded-full transition ${mode === "signin" ? "bg-emerald-500 text-black" : "text-white/40"}`}>Sign In</button>
        </div>

        <div className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 outline-none focus:border-emerald-500/50" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 outline-none focus:border-emerald-500/50" required />
        </div>

        <button type="submit" className="w-full h-14 bg-emerald-500 text-black rounded-2xl mt-8 font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition">
          {mode === "signup" ? "Create Account" : "Access Neural Link"}
        </button>
        {status && <p className="text-[10px] text-center mt-4 text-emerald-400/70 uppercase font-bold tracking-widest">{status}</p>}
      </form>
    </main>
  );
}