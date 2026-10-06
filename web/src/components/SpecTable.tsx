"use client";

import { useState } from "react";
import type { Feature, TaskItem } from "@/lib/types";

const prioStyle: Record<Feature["priority"], string> = {
  P0: "bg-red-500/10 text-red-600 dark:text-red-400",
  P1: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  P2: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400",
};

/** Tabel fitur + task expandable + copy per fitur (format siap tempel ke AI agent). */
export default function SpecTable({ features, tasks }: { features: Feature[]; tasks: TaskItem[] }) {
  const [open, setOpen] = useState<string | null>(features[0]?.code ?? null);
  const [copied, setCopied] = useState("");

  function copyFeature(f: Feature) {
    const ts = tasks.filter((t) => t.featureCode === f.code);
    const text = [
      `# Konteks PRD (DEMA DOX): ${f.code} — ${f.name} (${f.priority}, estimasi ${f.estimate})`,
      ...ts.map((t) => `# Task: ${t.code} [${t.label}] ${t.title}\n${t.detail}\nChecklist:\n${t.acceptance.map((a) => `- ${a}`).join("\n")}`),
      `Instruksi: kerjakan 1 task, jangan ubah file di luar scope, tulis test jika ada.`,
    ].join("\n\n");
    navigator.clipboard?.writeText(text).catch(() => undefined);
    setCopied(f.code);
    setTimeout(() => setCopied(""), 2000);
  }

  if (features.length === 0) {
    return <p className="rounded-2xl border border-dashed border-black/15 p-6 text-sm text-zinc-500">Belum ada spec — generate dari PRD di backend nanti (mode mock).</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {copied && <p className="rounded-xl bg-green-500/10 px-4 py-2 text-sm text-green-700 dark:text-green-300">{copied} tersalin, tempel ke AI agent! 📋</p>}
      {features.map((f) => {
        const ts = tasks.filter((t) => t.featureCode === f.code);
        const isOpen = open === f.code;
        return (
          <div key={f.id} className="rounded-2xl border border-black/10 dark:border-white/15">
            <button onClick={() => setOpen(isOpen ? null : f.code)} className="flex w-full items-center gap-3 p-4 text-left">
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${prioStyle[f.priority]}`}>{f.priority}</span>
              <span className="flex-1 text-sm font-bold">
                {f.code} — {f.name}
              </span>
              <span className="hidden text-xs text-zinc-500 sm:inline">{f.estimate}</span>
              <span className="text-zinc-400">{isOpen ? "▾" : "▸"}</span>
            </button>
            {isOpen && (
              <div className="border-t border-black/10 p-4 dark:border-white/10">
                {f.dependsOn && <p className="mb-2 text-xs text-zinc-500">Tergantung: {f.dependsOn}</p>}
                <ul className="flex flex-col gap-2">
                  {ts.map((t) => (
                    <li key={t.id} className="rounded-xl bg-black/[.03] p-3 text-sm dark:bg-white/5">
                      <p className="font-semibold">
                        {t.code} [{t.label}] {t.title}
                      </p>
                      <p className="mt-1 text-zinc-600 dark:text-zinc-400">{t.detail}</p>
                      <ul className="mt-1 list-disc pl-5 text-xs text-zinc-500">
                        {t.acceptance.map((a) => (
                          <li key={a}>{a}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => copyFeature(f)}
                  className="mt-3 rounded-xl border border-black/10 px-4 py-2 text-xs font-semibold hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                >
                  Copy {f.code} untuk AI agent
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
