"use client";

import { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

const PLANS = [
  { name: "Free", monthly: "Rp 0", quarterly: "Rp 0", feats: ["2 PRD / bulan", "20 chat / bulan", "Download Markdown"] },
  { name: "Starter", monthly: "Rp 66rb/bln", quarterly: "Rp 199rb /3 bln", feats: ["5 PRD / bulan", "100 chat / bulan", "Generate spec fitur & task"] },
  { name: "Pro", monthly: "Rp 133rb/bln", quarterly: "Rp 399rb /3 bln", feats: ["Unlimited PRD + chat", "Model AI premium", "Prioritas generate"] },
];

export default function PricingPage() {
  const [period, setPeriod] = useState<"1 Bulan" | "3 Bulan">("3 Bulan");
  const [toast, setToast] = useState("");

  function choose(name: string) {
    setToast(`Paket ${name} (${period}) — checkout menyusul di fase backend. Kamu tetap bisa demo sebagai Pro di /app/billing.`);
    setTimeout(() => setToast(""), 3500);
  }

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-10">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">Pilih paket DEMA DOX kamu</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Upgrade untuk AI premium dan fitur lebih.</p>
        </div>
        <div className="mx-auto flex rounded-full border border-black/10 p-1 text-sm dark:border-white/15">
          {(["1 Bulan", "3 Bulan"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`rounded-full px-5 py-1.5 font-semibold ${period === p ? "bg-ink text-white dark:bg-white dark:text-black" : ""}`}
            >
              {p}
            </button>
          ))}
        </div>
        {toast && <p className="mx-auto max-w-xl rounded-xl bg-amber-500/10 px-4 py-2 text-center text-sm text-amber-700 dark:text-amber-300">{toast}</p>}
        <div className="grid gap-4 sm:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.name} className="flex flex-col gap-3 rounded-2xl border border-black/10 p-6 dark:border-white/15">
              <h2 className="font-bold">{p.name}</h2>
              <p className="text-2xl font-extrabold">{period === "1 Bulan" ? p.monthly : p.quarterly}</p>
              <ul className="flex flex-1 flex-col gap-1 text-sm text-zinc-600 dark:text-zinc-400">
                {p.feats.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <button onClick={() => choose(p.name)} className="rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-ink hover:brightness-95">
                Pilih {p.name}
              </button>
            </div>
          ))}
        </div>
        <p className="text-center text-sm">
          <Link href="/" className="font-semibold text-accent-deep hover:underline dark:text-accent">← Kembali ke beranda</Link>
        </p>
      </main>
    </div>
  );
}
