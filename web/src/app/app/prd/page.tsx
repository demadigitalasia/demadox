"use client";

import { useState } from "react";
import Link from "next/link";
import ConfirmDialog from "@/components/ConfirmDialog";
import { mockPrds } from "@/lib/mock";

export default function PrdListPage() {
  const [q, setQ] = useState("");
  // MOCK: salinan lokal agar hapus langsung terlihat; backend nanti via API.
  const [local, setLocal] = useState(mockPrds);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  const items = local.filter(
    (p) => p.title.toLowerCase().includes(q.toLowerCase()) || p.idea.toLowerCase().includes(q.toLowerCase()),
  );
  const pendingTitle = local.find((p) => p.id === pendingDelete)?.title ?? "";

  function confirmDelete() {
    if (!pendingDelete) return;
    setLocal((ls) => ls.filter((p) => p.id !== pendingDelete));
    setPendingDelete(null);
    setToast("PRD dihapus (mock, tersambung API nanti).");
    setTimeout(() => setToast(""), 2500);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold tracking-tight">Riwayat PRD</h1>
        <Link href="/app/new" className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-ink hover:brightness-95">
          + Baru
        </Link>
      </div>
      {toast && <p className="rounded-xl bg-mint/10 px-4 py-2 text-sm text-green-700 dark:text-mint">{toast}</p>}
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Cari PRD…"
        aria-label="Cari PRD"
        className="rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-accent dark:border-white/15"
      />
      <div className="flex flex-col gap-2">
        {items.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-3 rounded-2xl border border-black/10 p-4 dark:border-white/15">
            <Link href={`/app/prd/${p.id}`} className="flex-1">
              <p className="font-bold hover:underline">{p.title}</p>
              <p className="text-xs text-zinc-500">“{p.idea}” • {p.category} • {p.updatedAt} • {p.status}</p>
            </Link>
            <button
              onClick={() => setPendingDelete(p.id)}
              aria-label={`Hapus ${p.title}`}
              className="rounded-lg border border-black/10 px-3 py-1.5 text-xs hover:bg-red-500/10 hover:text-red-600 dark:border-white/15 dark:hover:text-red-400"
            >
              Hapus
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-zinc-500">Tidak ketemu. Coba kata kunci lain.</p>}
      </div>

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Hapus PRD ini?"
        message={`“${pendingTitle}” akan dihapus dari daftar. (Mode mock — backend nanti hapus permanen.)`}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
