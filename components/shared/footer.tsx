/* eslint-disable react/no-unescaped-entities */
"use client";
import { motion } from "framer-motion";
import { BsArrowUpLeft } from "react-icons/bs";
import { FaDiscord, FaGithub, FaMailBulk } from "react-icons/fa";
import { FaX } from "react-icons/fa6";


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-black border-t border-white/5 pt-24 pb-12 px-6 overflow-hidden">
      {/* ── Arka Plan Parlaması (Subtle Glow) ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* 1. Logo & Vizyon */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-full" />
              </div>
              <span className="font-bold tracking-tighter text-xl text-white">PELISION</span>
            </div>
            <p className="text-sm text-white/30 leading-relaxed font-light max-w-[240px]">
              Building the next generation of neural workspaces for the modern engineer. 
              From Rust to React, we've got you covered.
            </p>
            <div className="flex items-center gap-4">
              <SocialIcon icon={<FaGithub className="w-4 h-4" />} href="#" />
              <SocialIcon icon={<FaX className="w-4 h-4" />} href="#" />
              <SocialIcon icon={<FaDiscord className="w-4 h-4" />} href="#" />
            </div>
          </div>

          {/* 2. Platform */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold tracking-[0.3em] text-white/50 uppercase">Platform</h4>
            <ul className="space-y-4">
              <FooterLink label="Neural Editor" />
              <FooterLink label="Edge Deployment" />
              <FooterLink label="Rust Compiler" />
              <FooterLink label="API Reference" isNew />
            </ul>
          </div>

          {/* 3. Company */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold tracking-[0.3em] text-white/50 uppercase">Company</h4>
            <ul className="space-y-4">
              <FooterLink label="Our Vision" />
              <FooterLink label="Changelog" />
              <FooterLink label="Privacy Policy" />
              <FooterLink label="Terms of Service" />
            </ul>
          </div>

          {/* 4. Newsletter (Modern Input) */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold tracking-[0.3em] text-white/50 uppercase">Stay Synced</h4>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="email@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all"
              />
              <button className="absolute right-2 top-1.5 p-1.5 bg-white text-black rounded-lg hover:bg-blue-400 transition-colors">
                <FaMailBulk className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-white/20 italic">Join 4,000+ engineers worldwide.</p>
          </div>
        </div>

        {/* ── Alt Kısım (Legal & Status) ── */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-[10px] font-bold tracking-widest text-white/20 uppercase">
            <span>© {currentYear} Pelision Labs</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-white/40">All systems operational</span>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <span className="text-[10px] text-white/20 uppercase tracking-tighter">Designed in İzmir</span>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-[10px] text-white/20 uppercase tracking-tighter">Powered by Gemini 2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Yardımcı Bileşenler ──

function FooterLink({ label, isNew }: { label: string; isNew?: boolean }) {
  return (
    <li className="group flex items-center gap-2 cursor-pointer w-fit">
      <span className="text-sm text-white/40 group-hover:text-white transition-colors duration-300 font-light">
        {label}
      </span>
      {isNew && (
        <span className="text-[8px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded-full uppercase font-bold tracking-tighter">
          New
        </span>
      )}
      <BsArrowUpLeft className="w-3 h-3 text-white/0 group-hover:text-white/40 transition-all -translate-y-1" />
    </li>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a 
      href={href}
      className="w-9 h-9 rounded-xl border border-white/5 bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-300"
    >
      {icon}
    </a>
  );
}