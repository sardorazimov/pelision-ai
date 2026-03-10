"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────
const NAV = ["Product", "Features", "Pricing", "Docs"];



// ── Main ──────────────────────────────────────────────────────
export default function Header() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -60]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const u = scrollY.on("change", v => setScrolled(v > 20));
    return u;
  }, [scrollY]);

  return (
    <header>
     
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 h-16 transition-all duration-500 ${scrolled ? "border-b border-white/[0.05]" : ""}`}
        style={{ background: scrolled ? "rgba(4,5,26,0.85)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none" }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)" }}>
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="text-white font-semibold tracking-tight">PelisionAI</span>
        </div>
        <div className="flex items-center gap-8">
          {NAV.map(l => (
            <a key={l} className="text-white/38 hover:text-white text-sm transition-colors duration-200 cursor-pointer">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a className="text-white/40 hover:text-white text-sm transition-colors cursor-pointer">Sign in</a>
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            className="text-white text-sm font-semibold px-5 py-2 rounded-full"
            style={{ background: "linear-gradient(135deg, #9333ea, #6d28d9)", boxShadow: "0 0 24px rgba(139,92,246,0.35)" }}
          >
            Get started
          </motion.button>
        </div>
      </motion.nav>

    </header>
  );
}