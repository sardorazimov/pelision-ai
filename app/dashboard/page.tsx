"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ role: string; content: string }[]>([]);

  const handleSend = async () => {
    if (!message.trim()) return;

    // Kullanıcı mesajını ekrana ekle
    const newUserMsg = { role: "user", content: message };
    setChat((prev) => [...prev, newUserMsg]);
    setMessage("");

    // API'ye gönder
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ prompt: message }),
    });

    const data = await res.json();
    
    // Gemini'nin cevabını ekrana ekle
    setChat((prev) => [...prev, { role: "model", content: data.text }]);
  };

  return (
    <div className="flex h-screen bg-[#0f0f0f] text-gray-200">
      {/* Sol Sidebar (Sohbet Geçmişi) */}
      <div className="w-64 bg-[#1a1a1a] border-r border-zinc-800 p-4 hidden md:flex flex-col">
        <h2 className="text-xl font-bold mb-4 text-white">Sohbetler</h2>
        <div className="flex-1 overflow-y-auto space-y-2">
          <div className="p-2 hover:bg-zinc-800 rounded cursor-pointer text-sm border-l-2 border-blue-500 bg-zinc-800/50">
            Yeni Sohbet #1
          </div>
        </div>
        <div className="pt-4 border-t border-zinc-800">
          <UserButton />
        </div>
      </div>

      {/* Ana Chat Alanı */}
      <div className="flex-1 flex flex-col">
        {/* Üst Bar */}
        <div className="h-16 border-b border-zinc-800 flex items-center px-6 justify-between bg-[#0f0f0f]">
          <span className="font-semibold text-white">Gemini Pro 1.5</span>
        </div>

        {/* Mesaj Listesi */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {chat.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl ${
                msg.role === "user" 
                ? "bg-blue-600 text-white rounded-tr-none" 
                : "bg-zinc-800 text-gray-100 rounded-tl-none"
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Mesaj Input Alanı */}
        <div className="p-4 bg-[#0f0f0f]">
          <div className="max-w-4xl mx-auto relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Bir şeyler yaz..."
              className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-xl py-4 px-6 focus:outline-none focus:border-zinc-600 text-white"
            />
            <button 
              onClick={handleSend}
              className="absolute right-3 top-3 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg transition-colors"
            >
              Gönder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}