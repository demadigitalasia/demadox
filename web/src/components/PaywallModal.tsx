"use client";

import Link from "next/link";

export default function PaywallModal({
  open,
  onClose,
  reason = "Kuota PRD gratis kamu habis bulan ini.",
}: {
  open: boolean;
  onClose: () => void;
  reason?: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 dark:bg-zinc-900">
        <h2 className="text-lg font-bold">Kuota habis, upgrade yuk 🚀</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{reason}</p>
        <div className="mt-4 flex flex-col gap-2">
          <Link
            href="/pricing"
            className="rounded-xl bg-accent px-4 py-2.5 text-center font-semibold text-ink hover:brightness-95"
          >
            Lihat Paket Starter/Pro
          </Link>
          <button
            onClick={onClose}
            className="rounded-xl border border-black/10 px-4 py-2.5 text-sm hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
          >
            Nanti saja (mode demo)
          </button>
        </div>
      </div>
    </div>
  );
}
