import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { mockStats } from "@/lib/mock";

const MARQUEE = [
  "dashboard CRM tim sales",
  "kasir warung",
  "kursus bahasa Inggris",
  "absensi karyawan",
  "booking lapangan",
  "inventori toko",
  "landing SaaS",
  "helpdesk CS",
];

const STEPS = [
  {
    n: "01",
    t: "Lempar ide mentah",
    d: "Satu kalimat cukup. AI DEMA DOX menginterogasimu dengan 3–5 pertanyaan tajam sampai idemu bocor semua.",
    tag: "CHAT PLANNING",
  },
  {
    n: "02",
    t: "Terima PRD perang",
    d: "9 section Bahasa Indonesia: persona, journey, FR bernomor, model data, batasan. Bukan template kosong.",
    tag: "9 SECTION BAKU",
  },
  {
    n: "03",
    t: "Gas ke AI agent",
    d: "Tiap fitur P0/P1/P2 dipecah jadi task ber-checklist. Satu klik copy, tempel ke Cursor / Claude Code.",
    tag: "COPY → PASTE → JADI",
  },
];

const FAQS = [
  { q: "DEMA DOX itu aplikasi apa?", a: "Generator PRD Bahasa Indonesia. Dari ide mentah jadi dokumen + task siap tempel ke AI coding agent (Cursor, Claude Code, Windsurf)." },
  { q: "Gratisnya seberapa?", a: "Paket Free: 2 PRD + 20 chat per bulan. Cukup untuk validasi 2 ide. Butuh lebih? Starter 5 PRD Rp66rb, Pro unlimited Rp133rb." },
  { q: "Bedanya dengan nanya langsung ke ChatGPT?", a: "DEMA DOX memaksa struktur: klarifikasi dulu, FR bernomor, task ber-acceptance checklist, format copy-to-agent. Hasilnya konsisten, bukan esai." },
  { q: "Model AI-nya apa?", a: "Multi-model via satu gateway — opsi hemat untuk draft, model premium (GPT/Opus/Kimi) untuk paket Pro." },
];

function PrdVisual() {
  return (
    <div className="relative">
      {/* kartu PRD utama */}
      <div className="card-ring overflow-hidden rounded-2xl bg-[#12121c]">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 rounded-md bg-white/5 px-2.5 py-1 font-mono text-[11px] text-zinc-400">
            dema-dox-dashboard-crm-2026-10-05.md
          </span>
        </div>
        <div className="flex flex-col gap-2.5 p-5 font-mono text-[12.5px] leading-relaxed">
          <p className="font-display text-base font-bold text-white"># Dashboard CRM Tim Sales</p>
          {[
            ["FR-01", "Kelola Kontak + validasi HP Indonesia", "P0"],
            ["FR-02", "Pipeline kanban, geser stage", "P0"],
            ["FR-03", "Dashboard target + ranking sales", "P0"],
            ["FR-05", "Roles: admin vs sales (403 aman)", "P0"],
            ["TSK-04", "Kanban gagal → rollback + toast", "FE"],
          ].map(([code, desc, badge]) => (
            <div key={code} className="flex items-center gap-2.5 rounded-lg bg-white/[.04] px-3 py-2">
              <span className="text-mint">✓</span>
              <span className="font-bold text-accent">{code}</span>
              <span className="flex-1 truncate text-zinc-300">{desc}</span>
              <span className="rounded-full border border-violet/40 bg-violet/15 px-2 py-0.5 text-[10px] font-bold text-violet">
                {badge}
              </span>
            </div>
          ))}
          <p className="text-zinc-500">
            <span className="text-accent">▸</span> instruksi agent: kerjakan 1 task, jangan ubah file lain… <span className="animate-blink text-mint">▌</span>
          </p>
        </div>
      </div>
      {/* badge melayang */}
      <div className="animate-float absolute -right-3 -top-5 rounded-2xl border border-mint/30 bg-ink px-4 py-2.5 shadow-xl sm:-right-6">
        <p className="font-display text-sm font-bold text-mint">SIAP_GENERATE ⚡</p>
        <p className="text-[11px] text-zinc-400">9 section • 6 fitur • 8 task</p>
      </div>
      <div className="animate-float-slow absolute -bottom-5 -left-3 rounded-2xl border border-white/10 bg-ink px-4 py-2.5 shadow-xl sm:-left-6">
        <p className="font-display text-sm font-bold text-white">📋 Tersalin!</p>
        <p className="text-[11px] text-zinc-400">FIT-02 → Cursor, gas.</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-ink text-white">
      {/* HERO */}
      <div className="mesh-glow bg-grid-dark">
        <SiteHeader />
        <main className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pb-20 pt-12 lg:grid-cols-2 lg:pt-16">
          <div className="flex flex-col items-start gap-6">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold">
              <span className="rounded-full bg-accent px-3 py-1 text-white">PROMO s.d. 51%</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-zinc-300">
                {mockStats.users.toLocaleString("id-ID")} user • {mockStats.prds.toLocaleString("id-ID")} PRD jadi
              </span>
            </div>
            <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
              Ide mentah.
              <br />
              PRD <span className="text-gradient">siap tempur.</span>
            </h1>
            <p className="max-w-md text-[15px] leading-relaxed text-zinc-400">
              DEMA DOX menginterogasi idemu, menyusun PRD 9 section Bahasa Indonesia, lalu memecahnya jadi task
              ber-checklist — siap ditempel ke AI coding agent favoritmu. Beres &lt; 5 menit.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/app/new"
                className="rounded-2xl bg-accent px-7 py-3.5 font-display font-bold text-ink shadow-[0_16px_40px_-12px_rgb(255_92_32/0.9)] transition hover:brightness-95"
              >
                Bikin Plan gratis →
              </Link>
              <Link
                href="/app/prd/mock-crm-sales"
                className="rounded-2xl border border-white/15 bg-white/5 px-7 py-3.5 font-display font-bold text-white transition hover:bg-white/10"
              >
                Intip contoh PRD
              </Link>
            </div>
            <p className="text-xs text-zinc-500">Gratis 2 PRD/bulan • Tanpa kartu kredit • Bahasa Indonesia</p>
          </div>
          <PrdVisual />
        </main>
        {/* marquee */}
        <div className="overflow-hidden border-y border-white/10 bg-black/30 py-3">
          <div className="animate-marquee flex w-max gap-3" aria-hidden="false">
            {MARQUEE.map((m, i) => (
              <span key={i} className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs text-zinc-300">
                “{m}” →
              </span>
            ))}
            {MARQUEE.map((m, i) => (
              <span key={`dup-${i}`} aria-hidden="true" className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs text-zinc-300">
                “{m}” →
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CARA KERJA */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <p className="font-mono text-xs font-bold tracking-[0.25em] text-accent">◆ CARA KERJA</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Dari <span className="text-gradient">ngide</span> sampai nge-gas.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="group rounded-3xl border border-white/10 bg-white/[.03] p-6 transition hover:border-accent/50 hover:bg-white/[.05]"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-5xl font-bold text-white/10 transition group-hover:text-accent/40">{s.n}</span>
                <span className="rounded-full border border-violet/40 bg-violet/10 px-2.5 py-1 font-mono text-[10px] font-bold text-violet">{s.tag}</span>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OUTPUT PANEL */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <div className="mesh-glow overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="font-mono text-xs font-bold tracking-[0.25em] text-mint">◆ CONTOH NYATA</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">Lihat bedanya PRD ngasal vs PRD DEMA DOX.</h2>
              <ul className="mt-5 flex flex-col gap-2.5 text-sm">
                {[
                  "FR bernomor — AI tidak nebak-nebak scope",
                  "Model data + relasi ditulis eksplisit",
                  "Tiap P0 punya task + acceptance checklist",
                  "Tombol copy per fitur, format copy-to-agent",
                ].map((t) => (
                  <li key={t} className="flex gap-2.5 text-zinc-300">
                    <span className="text-mint">✓</span> {t}
                  </li>
                ))}
              </ul>
              <Link
                href="/app/prd/mock-crm-sales"
                className="mt-6 inline-block rounded-2xl bg-white px-6 py-3 font-display font-bold text-ink transition hover:bg-zinc-200"
              >
                Buka workspace contoh →
              </Link>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5 font-mono text-xs leading-loose">
              <p className="text-zinc-500">$ prompt ngasal:</p>
              <p className="text-zinc-400">“buatin crm dong” → <span className="text-red-400">hasil random, revisi 12x, token jebol.</span></p>
              <p className="mt-4 text-zinc-500">$ prompt DEMA DOX:</p>
              <p className="text-zinc-200">FIT-02 Pipeline Kanban (P0, 4 hari)</p>
              <p className="text-zinc-400">TSK-04 [FE] drag-and-drop + rollback…</p>
              <p className="text-mint">→ scaffold benar di percobaan pertama ✓</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <p className="text-center font-mono text-xs font-bold tracking-[0.25em] text-accent">◆ HARGA LOKAL</p>
        <h2 className="mt-2 text-center font-display text-3xl font-bold tracking-tight sm:text-4xl">Lebih murah dari sekali ngopi.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { name: "Free", price: "Rp 0", sub: "buat validasi ide", feats: ["2 PRD / bulan", "20 chat / bulan", "Download Markdown"], hot: false },
            { name: "Starter", price: "Rp 66rb", sub: "/bulan — buat yang mulai serius", feats: ["5 PRD / bulan", "100 chat / bulan", "Generate spec fitur & task"], hot: false },
            { name: "Pro", price: "Rp 133rb", sub: "/bulan — unlimited, semua akses", feats: ["Unlimited PRD + chat", "Model AI premium", "Chat langsung founder"], hot: true },
          ].map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl p-6 ${
                p.hot
                  ? "border-2 border-accent bg-gradient-to-b from-accent/15 to-transparent shadow-[0_20px_60px_-20px_rgb(255_92_32/0.6)]"
                  : "border border-white/10 bg-white/[.03]"
              }`}
            >
              {p.hot && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-bold text-white">
                  PALING WORTH
                </span>
              )}
              <h3 className="font-display text-lg font-bold">{p.name}</h3>
              <p className="mt-1 font-display text-3xl font-bold">{p.price}</p>
              <p className="text-xs text-zinc-500">{p.sub}</p>
              <ul className="mt-4 flex flex-col gap-1.5 text-sm text-zinc-300">
                {p.feats.map((f) => (
                  <li key={f} className="flex gap-2"><span className="text-mint">✓</span> {f}</li>
                ))}
              </ul>
              <Link
                href="/pricing"
                className={`mt-5 block rounded-2xl py-2.5 text-center font-display text-sm font-bold ${
                  p.hot ? "bg-accent text-ink hover:brightness-95" : "border border-white/15 text-white hover:bg-white/10"
                }`}
              >
                Pilih {p.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-3xl px-4 pb-16">
        <h2 className="text-center font-display text-2xl font-bold tracking-tight">Masih mikir? Wajar.</h2>
        <div className="mt-6 flex flex-col gap-3">
          {FAQS.map((f) => (
            <details key={f.q} className="rounded-2xl border border-white/10 bg-white/[.03] p-4 open:border-accent/40">
              <summary className="cursor-pointer font-display text-sm font-bold">{f.q}</summary>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA PENUTUP */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-20">
        <div className="mesh-glow rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/20 via-transparent to-violet/20 p-10 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Stop prompt ngasal. <span className="text-gradient">Mulai DEMA DOX.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-zinc-400">2 PRD gratis tiap bulan. Habis? Ya berarti idemu banyak — upgrade.</p>
          <Link
            href="/app/new"
            className="mt-6 inline-block rounded-2xl bg-accent px-8 py-3.5 font-display font-bold text-ink shadow-[0_16px_40px_-12px_rgb(255_92_32/0.9)] transition hover:brightness-95"
          >
            Bikin Plan pertamaku →
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 text-xs text-zinc-500 sm:flex-row">
          <p className="font-display font-bold text-white">DEMA<span className="text-accent">DOX</span> — Bikin PRD untuk AI Coding</p>
          <p>support: halo@dema-dox.id (mock) • dibuat dengan ☕ di Indonesia</p>
        </div>
      </footer>
    </div>
  );
}
