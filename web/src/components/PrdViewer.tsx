"use client";

import { useState } from "react";
import type { PrdSection } from "@/lib/types";

/** Tampilkan 9 section PRD + edit inline + regenerate (mock). */
export default function PrdViewer({ initial }: { initial: PrdSection[] }) {
  const [sections, setSections] = useState<PrdSection[]>([...initial].sort((a, b) => a.order - b.order));
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [toast, setToast] = useState("");

  function flash(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  }

  function startEdit(s: PrdSection) {
    setEditing(s.key);
    setDraft(s.contentMd);
  }

  function saveEdit() {
    if (!editing) return;
    setSections((ss) => ss.map((s) => (s.key === editing ? { ...s, contentMd: draft } : s)));
    setEditing(null);
    flash("Section tersimpan (mock, auto-save tiap 10 dtk di backend nanti).");
  }

  function regenerate(s: PrdSection) {
    // Mock: tambahkan penanda revisi agar terlihat berubah.
    setSections((ss) =>
      ss.map((x) =>
        x.key === s.key ? { ...x, contentMd: `${x.contentMd.trim()}\n\n_Revisi mock: disempurnakan berdasarkan chat terakhir._` } : x,
      ),
    );
    flash(`Section "${s.title}" diregenerasi (mock).`);
  }

  if (sections.length === 0) {
    return <p className="rounded-2xl border border-dashed border-black/15 p-6 text-sm text-zinc-500">PRD masih draft — klik Generate di backend nanti. Mode mock menampilkan PRD contoh di workspace CRM.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {toast && <p className="rounded-xl bg-green-500/10 px-4 py-2 text-sm text-green-700 dark:text-green-300">{toast}</p>}
      {sections.map((s) => (
        <section key={s.key} className="rounded-2xl border border-black/10 p-4 dark:border-white/15">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="font-bold">
              {s.order}. {s.title}
            </h3>
            <div className="flex gap-2 text-xs">
              <button onClick={() => startEdit(s)} className="rounded-lg border border-black/10 px-2.5 py-1 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10">
                Edit
              </button>
              <button onClick={() => regenerate(s)} className="rounded-lg border border-black/10 px-2.5 py-1 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10">
                Regenerate
              </button>
            </div>
          </div>
          {editing === s.key ? (
            <div className="flex flex-col gap-2">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={6}
                className="rounded-xl border border-black/10 bg-transparent p-3 text-sm outline-none focus:border-accent dark:border-white/15"
              />
              <div className="flex gap-2 text-xs">
                <button onClick={saveEdit} className="rounded-lg bg-ink px-3 py-1.5 font-semibold text-white dark:bg-white dark:text-black">
                  Simpan
                </button>
                <button onClick={() => setEditing(null)} className="rounded-lg border border-black/10 px-3 py-1.5 dark:border-white/15">
                  Batal
                </button>
              </div>
            </div>
          ) : (
            <p className="whitespace-pre-line text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{s.contentMd}</p>
          )}
        </section>
      ))}
    </div>
  );
}
