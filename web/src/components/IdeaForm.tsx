"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EXAMPLES = ["Buatkan dashboard CRM tim sales", "Buatkan aplikasi kasir warung", "Buatkan platform kursus bahasa Inggris"];

export default function IdeaForm() {
  const router = useRouter();
  const [idea, setIdea] = useState("");
  const [category, setCategory] = useState("Web");
  const [stack, setStack] = useState("Otomatis");
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (idea.trim().length < 10) {
      setError("Ceritakan idemu minimal 10 karakter ya.");
      return;
    }
    // Mode mock: arahkan ke workspace contoh.
    router.push("/app/prd/mock-crm-sales");
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4 rounded-2xl border border-black/10 p-5 dark:border-white/15">
      <label className="flex flex-col gap-2 text-sm font-medium">
        Ide aplikasi kamu
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          rows={4}
          placeholder='Contoh: "Buatkan dashboard CRM tim sales"'
          className="rounded-xl border border-black/10 bg-transparent p-3 text-sm outline-none focus:border-accent dark:border-white/15"
        />
      </label>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium">
          Kategori
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-black/10 bg-transparent p-2.5 text-sm dark:border-white/15"
          >
            <option>Web</option>
            <option>Mobile</option>
            <option>Web Internal</option>
            <option>Lainnya</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium">
          Stack target
          <select
            value={stack}
            onChange={(e) => setStack(e.target.value)}
            className="rounded-xl border border-black/10 bg-transparent p-2.5 text-sm dark:border-white/15"
          >
            <option>Otomatis</option>
            <option>Next.js + PostgreSQL</option>
            <option>Laravel + MySQL</option>
            <option>Lainnya</option>
          </select>
        </label>
      </div>
      <button type="submit" className="rounded-xl bg-accent px-4 py-3 font-semibold text-ink hover:brightness-95">
        Mulai Planning →
      </button>
      <div className="flex flex-wrap gap-2 text-xs">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => setIdea(ex)}
            className="rounded-full border border-black/10 px-3 py-1.5 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
          >
            {ex}
          </button>
        ))}
      </div>
    </form>
  );
}
