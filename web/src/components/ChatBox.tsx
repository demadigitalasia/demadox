"use client";

import { useState } from "react";
import type { ChatMessage } from "@/lib/types";
import { mockClarifyQuestions } from "@/lib/mock";

let n = 100;

/** Chat planning mock: jawab user dengan pertanyaan klarifikasi bergiliran (simulasi streaming). */
export default function ChatBox({ initial }: { initial: ChatMessage[] }) {
  const [messages, setMessages] = useState<ChatMessage[]>(initial);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [qIndex, setQIndex] = useState(0);

  function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { id: `u${n++}`, role: "user", content: text }]);
    setInput("");
    setTyping(true);
    const reply =
      qIndex < mockClarifyQuestions.length
        ? mockClarifyQuestions[qIndex]
        : "SIAP_GENERATE — info cukup, klik tab PRD untuk melihat hasilnya. (mode mock)";
    setQIndex((i) => i + 1);
    // Simulasi jeda streaming AI.
    setTimeout(() => {
      setMessages((m) => [...m, { id: `a${n++}`, role: "assistant", content: reply }]);
      setTyping(false);
    }, 700);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex min-h-64 flex-col gap-3 rounded-2xl border border-black/10 p-4 dark:border-white/15">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm ${
              m.role === "user"
                ? "self-end bg-ink text-white dark:bg-white dark:text-black"
                : "self-start bg-black/5 dark:bg-white/10"
            }`}
          >
            {m.content}
          </div>
        ))}
        {typing && (
          <div className="self-start rounded-2xl bg-black/5 px-4 py-2.5 text-sm dark:bg-white/10">mengetik…</div>
        )}
      </div>
      <form onSubmit={send} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Jawab pertanyaan AI di sini…"
          className="flex-1 rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-accent dark:border-white/15"
        />
        <button type="submit" className="rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-black">
          Kirim
        </button>
      </form>
      <p className="text-xs text-zinc-500">Mode mock — jawaban AI memakai skrip klarifikasi baku.</p>
    </div>
  );
}
