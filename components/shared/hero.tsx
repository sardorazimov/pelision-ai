"use client";
import { useState, useEffect } from "react";

export default function Hero() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#04051a] flex items-center justify-center overflow-hidden">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&display=swap');
        * { font-family: 'Space Grotesk', sans-serif; }

        @keyframes beam-pulse {
          0%, 100% { opacity: 0.7; transform: scaleX(1); }
          50% { opacity: 1; transform: scaleX(1.15); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.5; filter: blur(40px); }
          50% { opacity: 0.9; filter: blur(55px); }
        }
        @keyframes card-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        @keyframes circuit-flow {
          0% { stroke-dashoffset: 200; opacity: 0.3; }
          50% { opacity: 0.8; }
          100% { stroke-dashoffset: 0; opacity: 0.3; }
        }
        @keyframes logo-shimmer {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.35; }
        }
        @keyframes beam-flicker {
          0%, 95%, 100% { opacity: 1; }
          96% { opacity: 0.6; }
          97% { opacity: 1; }
          98% { opacity: 0.7; }
        }

        .beam-v { animation: beam-pulse 3s ease-in-out infinite, beam-flicker 8s ease-in-out infinite; }
        .glow-center { animation: glow-pulse 3s ease-in-out infinite; }
        .card-float { animation: card-float 6s ease-in-out infinite; }
        .logo-anim { animation: logo-shimmer 4s ease-in-out infinite; }
        .circuit-line { 
          stroke-dasharray: 200;
          animation: circuit-flow 4s ease-in-out infinite;
        }
        .circuit-line-2 { 
          stroke-dasharray: 200;
          animation: circuit-flow 4s ease-in-out infinite 1s;
        }
        .circuit-line-3 { 
          stroke-dasharray: 200;
          animation: circuit-flow 4s ease-in-out infinite 2s;
        }
        .star { animation: star-twinkle var(--dur, 3s) ease-in-out infinite var(--delay, 0s); }
      `}</style>

      {/* Stars */}
      {[
        [12,18,'2.5s','0.2s'], [88,12,'3.1s','0.8s'], [25,75,'2.8s','1.2s'],
        [72,68,'3.4s','0.4s'], [45,22,'2.2s','1.6s'], [8,55,'3.7s','0.6s'],
        [93,42,'2.6s','1.0s'], [60,88,'3.2s','0.3s'], [33,10,'2.9s','1.4s'],
        [80,30,'2.4s','0.9s'], [18,85,'3.5s','0.1s'], [55,50,'2.7s','1.8s'],
      ].map(([x, y, dur, delay], i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[2px] rounded-full bg-white star"
          style={{ left: `${x}%`, top: `${y}%`, '--dur': dur, '--delay': delay }}
        />
      ))}

      {/* Deep background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#1a0a4a] blur-[120px] opacity-60" />
      </div>

      {/* Vertical energy beam — TOP */}
      <div className="beam-v absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ width: 1, height: '38%' }}>
        {/* Core beam */}
        <div className="w-[2px] h-full bg-gradient-to-b from-transparent via-[#b67aff] to-[#c084fc]" />
        {/* Bloom layers */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[6px] h-full bg-gradient-to-b from-transparent via-[#a855f7]/40 to-[#c084fc]/60 blur-[3px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[16px] h-full bg-gradient-to-b from-transparent via-[#7c3aed]/20 to-[#a855f7]/35 blur-[8px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40px] h-full bg-gradient-to-b from-transparent via-[#6d28d9]/10 to-[#8b5cf6]/20 blur-[20px]" />
      </div>

      {/* Vertical energy beam — BOTTOM */}
      <div className="beam-v absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ width: 1, height: '38%' }}>
        <div className="w-[2px] h-full bg-gradient-to-t from-transparent via-[#b67aff] to-[#c084fc]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[6px] h-full bg-gradient-to-t from-transparent via-[#a855f7]/40 to-[#c084fc]/60 blur-[3px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[16px] h-full bg-gradient-to-t from-transparent via-[#7c3aed]/20 to-[#a855f7]/35 blur-[8px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40px] h-full bg-gradient-to-t from-transparent via-[#6d28d9]/10 to-[#8b5cf6]/20 blur-[20px]" />
      </div>

      {/* Center glow burst */}
      <div className="glow-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-[#a855f7] blur-[60px] opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] rounded-full bg-white blur-[20px] opacity-20 pointer-events-none" />

      {/* Circuit lines — LEFT SVG */}
      <svg className="absolute left-0 top-1/2 -translate-y-1/2" width="38%" height="200" viewBox="0 0 400 200" fill="none" style={{ overflow: 'visible' }}>
        {/* Main horizontal line */}
        <line x1="400" y1="100" x2="60" y2="100" stroke="#4338ca" strokeWidth="1" className="circuit-line" />
        {/* Branch up */}
        <polyline points="200,100 200,60 80,60" stroke="#4338ca" strokeWidth="0.8" fill="none" className="circuit-line-2" />
        {/* Branch down */}
        <polyline points="280,100 280,140 100,140" stroke="#4338ca" strokeWidth="0.8" fill="none" className="circuit-line-3" />
        {/* Dots at junctions */}
        <circle cx="200" cy="100" r="2.5" fill="#6366f1" opacity="0.6" />
        <circle cx="280" cy="100" r="2.5" fill="#6366f1" opacity="0.6" />
        <circle cx="200" cy="60" r="2" fill="#6366f1" opacity="0.4" />
        <circle cx="280" cy="140" r="2" fill="#6366f1" opacity="0.4" />
        {/* Small corner brackets */}
        <polyline points="60,85 40,85 40,100" stroke="#3730a3" strokeWidth="0.7" fill="none" opacity="0.5" />
        <polyline points="80,50 60,50 60,60" stroke="#3730a3" strokeWidth="0.7" fill="none" opacity="0.5" />
        <polyline points="100,130 80,130 80,140" stroke="#3730a3" strokeWidth="0.7" fill="none" opacity="0.5" />
      </svg>

      {/* Circuit lines — RIGHT SVG */}
      <svg className="absolute right-0 top-1/2 -translate-y-1/2" width="38%" height="200" viewBox="0 0 400 200" fill="none" style={{ overflow: 'visible' }}>
        <line x1="0" y1="100" x2="340" y2="100" stroke="#4338ca" strokeWidth="1" className="circuit-line" />
        <polyline points="200,100 200,60 320,60" stroke="#4338ca" strokeWidth="0.8" fill="none" className="circuit-line-2" />
        <polyline points="120,100 120,140 300,140" stroke="#4338ca" strokeWidth="0.8" fill="none" className="circuit-line-3" />
        <circle cx="200" cy="100" r="2.5" fill="#6366f1" opacity="0.6" />
        <circle cx="120" cy="100" r="2.5" fill="#6366f1" opacity="0.6" />
        <circle cx="200" cy="60" r="2" fill="#6366f1" opacity="0.4" />
        <circle cx="120" cy="140" r="2" fill="#6366f1" opacity="0.4" />
        <polyline points="340,85 360,85 360,100" stroke="#3730a3" strokeWidth="0.7" fill="none" opacity="0.5" />
        <polyline points="320,50 340,50 340,60" stroke="#3730a3" strokeWidth="0.7" fill="none" opacity="0.5" />
        <polyline points="300,130 320,130 320,140" stroke="#3730a3" strokeWidth="0.7" fill="none" opacity="0.5" />
      </svg>

      {/* MAIN CARD */}
      <div className="card-float relative z-10 w-[420px] h-[420px]">
        
        {/* Outer glow ring */}
        <div className="absolute -inset-[2px] rounded-[44px] bg-gradient-to-b from-white/30 via-[#a855f7]/20 to-white/10 blur-[1px]" />

        {/* Card body */}
        <div className="relative w-full h-full rounded-[42px] overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #2d1f7a 0%, #1e1560 40%, #170f4f 70%, #0f0a35 100%)',
            boxShadow: '0 0 80px rgba(139,92,246,0.3), 0 0 160px rgba(109,40,217,0.15), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.3)',
          }}
        >
          {/* Diagonal texture overlay */}
          <div className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 12px)',
            }}
          />

          {/* Top edge highlight */}
          <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          {/* Inner gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20" />

          {/* Logo — top right */}
          <div className="logo-anim absolute top-8 right-8">
            <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
              {/* Huobi-style flame logo made of diagonal lines */}
              <g opacity="0.9">
                {/* Left flame stroke */}
                <path d="M20 80 L45 20 L50 30 L28 80Z" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" fill="none" />
                <path d="M24 80 L48 25 L53 35 L32 80Z" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" fill="none" />
                <path d="M28 80 L51 30 L56 40 L36 80Z" stroke="rgba(255,255,255,0.25)" strokeWidth="0.7" fill="none" />
                {/* Right flame stroke */}
                <path d="M38 80 L58 30 L62 42 L44 80Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" fill="none" />
                <path d="M42 80 L61 35 L65 47 L48 80Z" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="none" />
                <path d="M46 80 L64 40 L68 52 L52 80Z" stroke="rgba(255,255,255,0.18)" strokeWidth="0.7" fill="none" />
              </g>
            </svg>
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-10 left-9 right-9">
            <p className="text-white/40 text-[11px] tracking-[0.15em] uppercase mb-2 font-light">01</p>
            <h2 className="text-white text-[28px] font-semibold leading-tight mb-3 tracking-tight">
              Quick—fire<br />transactions
            </h2>
            <p className="text-white/45 text-[13px] leading-relaxed font-light max-w-[240px]">
              Use Huobi for secure and efficient cryptocurrency transactions, ensuring your transactions are conducted safely and swiftly.
            </p>
          </div>

          {/* Bottom edge subtle glow inside */}
          <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-t from-[#0a0630]/60 to-transparent" />
        </div>

        {/* Top beam connection glow on card */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[60px] h-[40px] bg-[#c084fc] blur-[15px] opacity-80" />
        {/* Bottom beam connection glow on card */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[60px] h-[40px] bg-[#c084fc] blur-[15px] opacity-80" />
        {/* Left edge connection */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-[20px] h-[60px] bg-[#6d28d9] blur-[12px] opacity-50" />
        {/* Right edge connection */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-[20px] h-[60px] bg-[#6d28d9] blur-[12px] opacity-50" />
      </div>
    </div>
  );
}