"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Coffee, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "bot";
  content: string;
}

function isPashto(text: string) {
  return /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMsg }),
      });

      if (!response.ok) throw new Error("Backend error");

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "bot", content: data.response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "بښنه غواړم، د یوې تخنیکي ستونزې له امله ځواب نشم درکولی. بیا هڅه وکړئ." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    { label: "د پیښور تاریخ", prompt: "د پیښور تاریخ راته ووایه" },
    { label: "Pashtunwali", prompt: "Tell me about Pashtunwali" },
    { label: "پښتو ژبه", prompt: "پښتو ژبه د چا ده؟" },
  ];

  return (
    <div className="flex flex-col h-screen bg-white text-gray-900 font-sans selection:bg-emerald-100">

      {/* ─── Header ─── */}
      <header className="shrink-0 border-b border-gray-200 bg-white px-4 py-3 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2.5 rounded-xl shadow-md">
              <Coffee className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-gray-900">
                Qehwa
              </h1>
              <p className="text-[12px] text-gray-400 font-medium" dir="rtl" style={{ fontFamily: "'Bahij Badiya', 'Noto Naskh Arabic', Tahoma, sans-serif" }}>
                د پښتو لومړنی ژبنۍ موډل
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] text-emerald-600 font-semibold">آنلاین</span>
          </div>
        </div>
      </header>

      {/* ─── Chat Area ─── */}
      <div className="flex-1 overflow-y-auto px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto py-6 space-y-5">

          {/* Empty State */}
          {messages.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center pt-24 pb-8 text-center"
            >
              <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl mb-6">
                <Sparkles className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1" dir="rtl" style={{ fontFamily: "'Bahij Badiya', 'Noto Naskh Arabic', Tahoma, sans-serif" }}>
                ☕ Qehwa ته ښه راغلاست
              </h2>
              <p className="text-sm text-gray-400 mb-1">
                Designed by <a href="https://hasnainayaz.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">hasnainayaz.com</a>
              </p>
              <p className="text-gray-500 mb-8 max-w-md text-xl" dir="rtl" style={{ fontFamily: "'Bahij Badiya', 'Noto Naskh Arabic', Tahoma, sans-serif" }}>
                د پښتو، انګریزي، یا اردو ژبو کې خپله پوښتنه وکړئ
              </p>

              {/* Quick Prompts */}
              <div className="flex flex-wrap gap-2 justify-center">
                {quickPrompts.map((qp, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(qp.prompt)}
                    className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 hover:border-emerald-300 rounded-xl text-base text-gray-600 hover:text-emerald-700 transition-all duration-200 shadow-sm"
                    style={{ fontFamily: "'Bahij Badiya', 'Noto Naskh Arabic', Tahoma, sans-serif" }}
                  >
                    {qp.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Messages */}
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => {
              const pashtoText = isPashto(msg.content);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-2.5 max-w-[80%] ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                        msg.role === "user"
                          ? "bg-gray-200"
                          : "bg-emerald-600 shadow-md"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <User className="w-3.5 h-3.5 text-gray-600" />
                      ) : (
                        <Bot className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        msg.role === "user"
                          ? "bg-emerald-600 text-white shadow-md rounded-tr-sm"
                          : "bg-white border border-gray-200 text-gray-800 shadow-sm rounded-tl-sm"
                      } ${pashtoText ? "text-xl leading-[1.9]" : "text-[15px] leading-relaxed"} break-words`}
                      style={pashtoText ? { fontFamily: "'Bahij Badiya', 'Noto Naskh Arabic', Tahoma, sans-serif" } : undefined}
                      dir={pashtoText ? "rtl" : "ltr"}
                    >
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Loading Indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex gap-2.5">
                <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center mt-1 shadow-md">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2 shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                  <span className="text-sm text-gray-500" dir="rtl" style={{ fontFamily: "'Bahij Badiya', 'Noto Naskh Arabic', Tahoma, sans-serif" }}>ځواب چمتو کېږي...</span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* ─── Input Area ─── */}
      <div className="shrink-0 border-t border-gray-200 bg-white px-4 py-4 shadow-[0_-2px_10px_rgba(0,0,0,0.03)]">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="دلته خپله پوښتنه ولیکئ..."
              className="flex-1 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 h-12 px-5 rounded-xl focus-visible:ring-emerald-500/30 focus-visible:border-emerald-400 transition-all text-lg"
              style={{ fontFamily: "'Bahij Badiya', 'Noto Naskh Arabic', Tahoma, sans-serif" }}
              dir="rtl"
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              size="icon"
              className="h-12 w-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md active:scale-95 disabled:opacity-40 disabled:active:scale-100 cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">
              Powered by Qwen2 7B · Metal GPU
            </p>
            <a
              href="https://hasnainayaz.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-gray-400 hover:text-emerald-600 font-semibold tracking-wide uppercase transition-colors"
            >
              Designed by hasnainayaz.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
