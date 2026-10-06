import Link from "next/link";
import QuotaBadge from "@/components/QuotaBadge";
import { mockPrds, mockQuota } from "@/lib/mock";

const COMING = [
  ["DesainPakeAI", "Rancang tampilan bareng AI sampai prototipe."],
  ["Template", "Kerangka codebase hemat token, siap production."],
  ["Konsultasi", "Automasi & fitur AI untuk bisnismu."],
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="mesh-glow rounded-3xl border border-white/10 bg-ink p-6 text-white sm:p-8">
        <p className="font-mono text-[11px] font-bold tracking-[0.25em] text-mint">◆ DASHBOARD</p>
        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Mau ngapain <span className="text-gradient">hari ini?</span>
        </h1>
        <div className="mt-4 [&_span]:!border-white/15 [&_span]:!bg-white/5 [&_span]:!text-zinc-200">
          <QuotaBadge quota={mockQuota} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/app/new"
          className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent via-accent-deep to-violet p-[1.5px]"
        >
          <div className="flex h-full flex-col gap-2 rounded-3xl bg-ink p-5 text-white">
            <p className="font-mono text-[10px] font-bold tracking-[0.2em] text-accent">UPDATE BARU • AKTIF ⚡</p>
            <h2 className="font-display text-2xl font-bold transition group-hover:text-accent">Bikin Plan →</h2>
            <p className="text-sm text-zinc-400">
              Dari ide jadi PRD, spec fitur dan task yang siap dipakai AI coding agent.
            </p>
          </div>
        </Link>
        {COMING.map(([t, d]) => (
          <div key={t} className="rounded-3xl border border-black/10 p-5 opacity-60 dark:border-white/10">
            <p className="font-mono text-[10px] font-bold tracking-[0.2em] text-zinc-400">SEGERA</p>
            <h2 className="mt-1 font-display text-xl font-bold">{t}</h2>
            <p className="mt-1 text-sm text-zinc-500">{d}</p>
          </div>
        ))}
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">PRD Terakhir</h2>
          <Link href="/app/prd" className="text-sm font-bold text-accent-deep hover:underline dark:text-accent">
            Lihat semua →
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          {mockPrds.map((p) => (
            <Link
              key={p.id}
              href={`/app/prd/${p.id}`}
              className="flex items-center justify-between gap-3 rounded-2xl border border-black/10 p-4 transition hover:border-accent/50 dark:border-white/10"
            >
              <div>
                <p className="font-display font-bold">{p.title}</p>
                <p className="font-mono text-xs text-zinc-500">“{p.idea}” • {p.updatedAt}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 font-mono text-[11px] font-bold ${
                  p.status === "ready"
                    ? "border border-mint/30 bg-mint/10 text-mint"
                    : "border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                }`}
              >
                {p.status === "ready" ? "● SIAP" : "○ DRAFT"}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
