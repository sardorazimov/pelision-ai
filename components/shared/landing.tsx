"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function PelantiumHero() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden selection:bg-blue-500/30">
      
      {/* ========================================== */}
      {/* ## 1. CANLI SVG ANIMASYON KATMANI (ARKA PLAN) */}
      {/* ========================================== */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        
        {/* Dev Gezegen (Statik Derinlik) */}
        <div className="absolute w-[1200px] h-[1200px] rounded-full bg-gradient-to-b from-white/[0.02] to-transparent mt-[60vh] border-t border-white/5" />

        {/* --- ANA SVG MOTORU --- */}
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <defs>
            {/* 1. Akan Lazer Işığı Gradienti */}
            <linearGradient id="beamGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="white">
                <animate 
                  attributeName="offset" 
                  values="-1; 2" 
                  dur="3s" 
                  repeatCount="indefinite" 
                />
              </stop>
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            {/* 2. Etrafa Yayılan Mavi Parıltı Maskesi */}
            <radialGradient id="glowGradient">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* DİKEY LAZER HATTI (SVG PATH) */}
          <line 
            x1="500" y1="0" x2="500" y2="1000" 
            stroke="url(#beamGradient)" 
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* PARLAYAN NOKTALAR (SVG CIRCLES) */}
          <circle cx="500" cy="500" r="100" fill="url(#glowGradient)">
            <animate 
              attributeName="r" 
              values="80; 120; 80" 
              dur="4s" 
              repeatCount="indefinite" 
            />
            <animate 
              attributeName="opacity" 
              values="0.3; 0.6; 0.3" 
              dur="4s" 
              repeatCount="indefinite" 
            />
          </circle>
        </svg>
      </div>

      {/* ========================================== */}
      {/* ## 2. FLOATING DATA NODES (RESİMDEKİ NOKTALAR) */}
      {/* ========================================== */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Node label="Cortex" val="20.945" top="30%" left="18%" delay={0.2} />
        <Node label="Quant" val="2.945" top="20%" left="38%" delay={0.4} />
        <Node label="Meeton" val="440" top="25%" right="35%" delay={0.6} />
        <Node label="Aelf" val="19.346" top="35%" right="15%" delay={0.8} />
      </div>

      {/* ========================================== */}
      {/* ## 3. İÇERİK (PELANTIUM ODYSSEY) */}
      {/* ========================================== */}
      <section className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center space-y-2"
        >
          <h1 className="text-6xl md:text-8xl font-medium tracking-tighter text-white">
            Pelantium Odyssey
          </h1>
          <h2 className="text-4xl md:text-6xl font-extralight tracking-tighter text-white/30 italic">
            Sailing The Seas Of Crypto
          </h2>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 max-w-lg text-center text-[12px] md:text-sm text-white/20 tracking-[0.2em] font-light leading-relaxed"
        >
          HIGH-QUALITY VISUALS RELATED TO CRYPTOCURRENCIES,<br/> 
          BLOCKCHAIN, OR FINANCIAL TECHNOLOGY.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="mt-16"
        >
          <Button className="bg-white text-black hover:bg-gray-100 px-12 py-7 rounded-full text-[11px] font-bold uppercase tracking-[0.3em] transition-all hover:letter-spacing-wider">
            Discover Those Worlds
          </Button>
        </motion.div>
      </section>

      {/* Zemin Parıltısı */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-blue-600/5 to-transparent z-0" />

    </main>
  );
}

// ## SVG NODE BİLEŞENİ
function Node({ label, val, top, left, right, delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
      style={{ top, left, right }}
      className="absolute flex flex-col items-start gap-1"
    >
      <div className="flex items-center gap-2">
        <div className="relative flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_white]" />
          <div className="absolute w-4 h-4 bg-white/20 blur-sm rounded-full animate-ping" />
        </div>
        <span className="text-[10px] font-bold text-white/70 uppercase tracking-tighter">{label}</span>
      </div>
      <span className="text-[9px] text-white/20 ml-4 font-mono">{val}</span>
    </motion.div>
  );
}