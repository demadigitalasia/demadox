# PRD — DEMA DOX (MVP)

**Nama produk:** DEMA DOX
**Versi:** 1.0 MVP  
**Tanggal:** 6 Okt 2026  
**Status:** Draft for AI Coding Agent  
**Bahasa produk:** Indonesia (id-ID)  
**Referensi:** https://www.ngodingpakeai.com/

> **Konvensi penamaan:** Produk ini secara konsisten disebut sebagai **DEMA DOX** di seluruh dokumen, kode, UI, dan komunikasi. Jangan gunakan sebutan lain (mis. "aplikasi PRD", "Bikin Plan app") sebagai nama produk. "Bikin Plan" hanya nama fitur di dalam **DEMA DOX**.

---

## 1. Ringkasan Eksekutif

Bangun **DEMA DOX** — aplikasi web **Bikin Plan / PRD Generator** — user memasukkan ide aplikasi (contoh: "dashboard CRM tim sales"), lalu AI multi-model mengubahnya menjadi **PRD terstruktur + breakdown fitur + task teknis** yang siap ditempel ke AI coding agent (Claude Code, Cursor, Windsurf, Antigravity).

**DEMA DOX** meniru alur inti ngodingpakeai.com, **tanpa** Desain Generator, Template Starter Kit, Konsultasi, dan Komunitas di fase awal. Fokus: 1 alur yang bekerja end-to-end, cepat, murah token, dan bisa dimonetisasi langganan.

Target sukses **DEMA DOX** MVP: user bisa daftar → input ide → chat planning → generate PRD → download Markdown → kembali untuk iterasi, dalam < 5 menit.

## 2. Masalah & Peluang

### Masalah user (Indonesia)
1. Punya ide aplikasi tapi bingung menulis spec yang dimengerti AI coding agent → hasil generate ngaco, revisi berulang, boros token.
2. Tutorial AI coding bertebaran (YouTube/Discord) tapi tidak ada tool lokal yang memandu planning dalam Bahasa Indonesia.
3. Tool global mahal / Bahasa Inggris, tidak ada paket lokal Rp 60-130rb/bln.

### Peluang
- ngodingpakeai.com membuktikan traction: ~43K user, ~21K PRD.
- **DEMA DOX** masuk dengan MVP lebih ramping: hanya PRD Generator, multi-model (GPT, Opus, Kimi, DeepSeek via satu gateway), harga lokal.

## 3. Tujuan Produk (MVP)

1. **Fungsional:** Generate PRD + fitur + task dari 1 kalimat ide, dengan chat iterasi.
2. **Bisnis:** Validasi willingness-to-pay via paket Starter/Pro.
3. **Teknis:** Next.js + PostgreSQL, AI via gateway multi-model, siap di-extend ke Desain/Template di Fase 2.

### Non-tujuan MVP (Out of Scope — Fase 2+)
- DesainPakeAI (generate UI/prototipe).
- Template / Starter Kit codebase + CLI sync.
- AndalAI full (multi-model bebas pilih per pesan) — MVP cukup 1 model default + fallback.
- Komunitas Discord, ranking tools, konsultasi, upload gambar/dokumen (hanya Pro Tahunan nanti).

## 4. Target User

**Primer:** Indie hacker, freelancer, mahasiswa SMK/kuliah, karyawan non-engineer di Indonesia yang pakai AI coding agent tapi lemah di planning. Bahasa Indonesia, mobile-first tapi mayoritas pakai desktop saat ngoding.

**Persona contoh:**
- Budi (24), freelancer web di Bandung. Pakai Cursor + Claude. Keluhan: "prompt saya kurang detail, AI salah bikin database." Butuh PRD Bahasa Indonesia yang bisa di-copy ke Cursor.

## 5. User Journey (Happy Path)

1. Buka landing → lihat social proof (X User, Y PRD, promo) → klik "Bikin Plan".
2. Login (Google / email) → masuk dashboard "Mau ngapain hari ini?" → kartu **Bikin Plan**.
3. Input ide bebas: "Buatkan dashboard CRM tim sales" + kategori (Web/Mobile/Internal) + platform target (Next.js/Laravel/dll, opsional).
4. AI bertanya 3-5 pertanyaan klarifikasi via chat (target user, fitur wajib, integrasi, batasan).
5. Klik **Generate PRD** → streaming hasil terstruktur → review per section.
6. Klik **Generate Spec Fitur & Task** → dapat list fitur (P0/P1/P2) + task teknis per fitur (dengan kriteria selesai).
7. **Download Markdown / Copy** untuk ditempel ke AI agent. PRD tersimpan di Riwayat.
8. Free user kena limit → paywall → upgrade Starter/Pro → lanjut unlimited (sesuai paket).

## 6. Scope Fungsional MVP

### F1. Landing Page (publik)
- Header: logo, counter User & PRD (live dari DB), tombol Login, link Pricing.
- Hero: "Mau ngapain hari ini?" + CTA Bikin Plan + contoh prompt 1-klik (CRM, kasir, e-learning).
- Section: Cara kerja 3 langkah, Contoh output PRD, Pricing ringkas, FAQ, Footer (support email + Discord placeholder).
- SEO: title/description OG id-ID, schema.org Organization+WebSite, sitemap.
- Acceptance: LCP < 2.5s, responsif, dark/light mode.

### F2. Auth
- Google OAuth + email+password (NextAuth Auth.js v5).
- Session di PostgreSQL (adapter). Role: `free`, `starter`, `pro`, `admin`.
- Acceptance: user baru otomatis dapat kuota free; logout aman; proteksi route `/app/*`.

### F3. Dashboard / App Shell
- Route `/app`, sapaan "Mau ngapain hari ini?", kartu Bikin Plan (aktif), kartu Desain/Template/Konsultasi (disabled badge "Segera").
- List "PRD Terakhir" + tombol Lanjut / Hapus.
- Counter sisa kuota (mis. "3/5 PRD bulan ini").

### F4. Bikin Plan Wizard + Chat Planning
- Form ide: textarea (min 10 char), select kategori, select stack target (opsional).
- Chat interface streaming: user ↔ AI. AI wajib bertanya klarifikasi sebelum generate (dipaksa via system prompt, max 5 pertanyaan, ada tombol "Lewati, langsung generate").
- Simpan semua pesan ke `messages`. Indikator typing/streaming, retry on error.
- Acceptance: 1 sesi = 1 PRD draft; riwayat chat persisten; refresh tidak hilang.

### F5. Generate PRD (inti)
- Tombol Generate → panggil AI gateway → streaming Markdown terstruktur dengan format baku:

```
# [Nama Aplikasi]
## 1. Ringkasan
## 2. Target User & Persona
## 3. User Journey
## 4. Kebutuhan Fungsional (FR-01...)
## 5. Kebutuhan Non-Fungsional
## 6. Model Data (entitas + relasi)
## 7. Arsitektur & Stack yang disarankan
## 8. Batasan / Out of Scope
## 9. Kriteria Sukses
```

- User bisa edit per section (textarea inline) + Regenerate per section.
- Tombol Simpan otomatis (auto-save draft tiap 10 detik).
- Acceptance: output selalu Bahasa Indonesia, selalu ada FR bernomor, tidak ada placeholder kosong.

### F6. Generate Spec Fitur & Task
- Dari PRD yang tersimpan, generate:
  - Fitur: ID (FIT-01), nama, prioritas P0/P1/P2, estimasi, dependensi.
  - Task per fitur: ID (TSK-01), judul, deskripsi teknis, kriteria selesai (checklist), label (FE/BE/DB/AI).
- Tampilan: tabel/kanban sederhana + tombol Copy per fitur (format siap tempel ke AI agent).
- Acceptance: minimal 5 fitur P0 untuk ide menengah; setiap P0 punya ≥2 task.

### F7. Export & Riwayat
- Download `.md` (PRD penuh + lampiran fitur/task), Copy button dengan toast.
- Halaman `/app/prd` (list, search, hapus) + `/app/prd/[id]` (detail, tab PRD / Fitur & Task / Chat).
- Acceptance: file Markdown valid, nama file slug-tanggal.

### F8. Kuota, Pricing & Subscription (sederhana)
- Paket MVP:
  - **Free:** 2 PRD/bulan, 20 chat/bulan.
  - **Starter Rp 66rb/bln:** 5 PRD/bln, 100 chat/bln.
  - **Pro Rp 133rb/bln:** unlimited PRD + chat.
- Halaman `/pricing` dengan toggle 1/3 bulan (harga coret ala referensi).
- Payment MVP: manual via QRIS / Midtrans/Xendit — cukup buat order + webhook aktivasi. Halaman success/pending.
- Middleware cek kuota sebelum generate; jika habis → modal upgrade.
- Admin: ubah role manual via DB/dashboard sederhana.
- Acceptance: user free ke-3x generate ditolak dengan pesan upgrade; setelah bayar, kuota bertambah.

### F9. Counter & Analitik dasar
- Tabel `stats` / query count users & PRDs untuk landing (cache 5 menit).
- Event: signup, prd_created, prd_exported, subscribed. Cukup via DB + console, tanpa Mixpanel di MVP.

## 7. Kebutuhan Non-Fungsional

| Aspek | Target MVP |
|---|---|
| Stack | Next.js terbaru (15+, App Router, TS), PostgreSQL 16, Prisma/Drizzle, Auth.js v5, Tailwind + shadcn/ui |
| AI gateway | OpenRouter (1 key untuk semua model) — default `deepseek/deepseek-chat` (murah) + opsi `anthropic/claude` / `openai/gpt` untuk Pro. Streaming via Vercel AI SDK |
| Bahasa | Semua UI + prompt + output AI: Bahasa Indonesia |
| Performa | PRD streaming first-token < 5s; halaman < 2.5s LCP |
| Keamanan | Rate limit per user, validasi input (zod), system prompt anti-jailbreak, PII tidak dilatih ulang, secret di env |
| Biaya | Default model murah; max_tokens dibatasi (PRD 4000, chat 1000); cache klarifikasi yang sama |
| Deploy | Vercel (web) + Neon/Supabase Postgres (DB). Alternatif VPS Docker Compose |
| Observabilitas | Log error Sentry (opsional), log AI usage (model, token, latency) ke `ai_usages` |

## 8. Arsitektur & Data Model

### Arsitektur (monolit Next.js)
```
Browser → Next.js App Router (RSC + Route Handlers)
  ├─ / (landing, ISR)
  ├─ /app/* (authed, SSR)
  ├─ /api/chat, /api/prd/generate, /api/specs/generate, /api/export, /api/webhook/payment
  ├─ PostgreSQL via Prisma
  └─ OpenRouter (fetch streaming) + Midtrans/Xendit (payment)
```

### Skema DB (Prisma-style, ringkas)
- `users(id, name, email unique, image, role, createdAt)`
- `accounts, sessions` (Auth.js standard)
- `subscriptions(id, userId, plan[free|starter|pro], status, currentPeriodEnd, createdAt)`
- `quotas(userId, period YYYY-MM, prdCount, chatCount)` — reset tiap bulan via cron/cek lazy
- `prds(id, userId, title, idea, category, stack, status[draft|ready], contentMd, createdAt, updatedAt)`
- `prd_sections(id, prdId, key, title, contentMd, order)`
- `features(id, prdId, code FIT-01, name, priority, estimate, dependsOn)`
- `tasks(id, featureId, code TSK-01, title, detail, acceptance, label)`
- `chats(id, prdId, userId, createdAt)` + `messages(id, chatId, role, content, model, tokens, createdAt)`
- `ai_usages(id, userId, prdId, endpoint, model, promptTokens, completionTokens, latencyMs, createdAt)`
- `orders(id, userId, plan, amount, status, providerRef, createdAt)` untuk payment

### Endpoint API (Route Handlers)
- `POST /api/prd` — buat PRD draft dari ide
- `POST /api/chat` — kirim pesan (streaming, cek kuota chat)
- `POST /api/prd/:id/generate` — generate PRD penuh (cek kuota PRD)
- `PATCH /api/prd/:id/sections` — edit section
- `POST /api/prd/:id/specs` — generate fitur+task
- `GET /api/prd/:id/export` — return Markdown file
- `POST /api/webhook/payment` — aktivasi subscription
- Semua endpoint: auth + zod validate + rate limit (mis. 30 req/menit).

## 9. Prompt AI (baku, disimpan di `lib/prompts.ts`)

- `CLARIFY_SYSTEM`: "Kamu konsultan PRD Bahasa Indonesia. Tanya max 5 pertanyaan singkat bernomor untuk memperjelas ide. Jika info cukup, tulis `SIAP_GENERATE`. Jangan generate PRD di tahap ini."
- `PRD_SYSTEM`: memaksa struktur 9 section di atas, Bahasa Indonesia, FR bernomor, tanpa lorem ipsum. Suhu 0.4.
- `SPEC_SYSTEM`: ubah PRD menjadi fitur P0/P1/P2 + task dengan acceptance checklist. Suhu 0.3.
- Semua prompt versi-controlled, ada tombol admin ganti model default via env tanpa deploy ulang (env `AI_DEFAULT_MODEL`, `AI_PRO_MODEL`).

## 10. UI/UX — Daftar Halaman & Komponen

- `/` landing, `/pricing`, `/login`, `/app` dashboard, `/app/new` wizard ide, `/app/prd/[id]` workspace (3 tab: Chat | PRD | Fitur & Task), `/app/prd` riwayat, `/app/billing` status paket.
- Komponen: `IdeaForm`, `ChatBox` (streaming), `PrdViewer` (markdown + edit inline), `SpecTable`, `QuotaBadge`, `PaywallModal`, `ExportButtons`, `UserPrdCounter`.
- Design: clean light default + dark mode, Bahasa Indonesia, mobile responsif. Contoh prompt 1-klik wajib ada.

## 11. Task Breakdown untuk AI Coding Agent (siap eksekusi)

**Epic 0 — Setup:**
- [ ] T0-1: Scaffold Next.js 15 TS + Tailwind + shadcn, ESLint, env template.
- [ ] T0-2: Setup Prisma + PostgreSQL, migrasi skema §8, seed 1 admin + 3 contoh PRD.
- [ ] T0-3: Setup Auth.js Google+credentials, proteksi `/app/*`, halaman login.

**Epic 1 — Landing + Dashboard:**
- [ ] T1-1: Landing + counter cache + SEO/OG.
- [ ] T1-2: Dashboard `/app` + QuotaBadge + list PRD terakhir.
- [ ] T1-3: Pricing statis + tombol pilih paket (checkout dummy dulu).

**Epic 2 — Bikin Plan (inti):**
- [ ] T2-1: `IdeaForm` + `POST /api/prd` + halaman `/app/new`.
- [ ] T2-2: `ChatBox` streaming + `POST /api/chat` + persist messages + tombol Lewati.
- [ ] T2-3: Generate PRD streaming + `PrdViewer` + auto-save + edit/regenerate per section.
- [ ] T2-4: Generate fitur&task + `SpecTable` + copy per fitur.
- [ ] T2-5: Export Markdown + halaman detail/riwayat.

**Epic 3 — Kuota & Bayar:**
- [ ] T3-1: Middleware kuota + PaywallModal + tabel quotas reset bulanan.
- [ ] T3-2: Integrasi Midtrans/Xendit QRIS + webhook + halaman billing.
- [ ] T3-3: Log `ai_usages` + halaman admin sederhana (user, PRD count, token).

**Epic 4 — Hardening MVP:**
- [ ] T4-1: Rate limit + zod di semua API + error toast Indonesia.
- [ ] T4-2: Test manual happy path + seed demo "CRM tim sales".
- [ ] T4-3: Deploy Vercel + Neon, env docs, README cara ganti model.

Estimasi: 2-3 minggu 1 dev + AI agent (prioritas Epic 2 dulu bisa demo tanpa bayar).

## 12. Kriteria Penerimaan (Definition of Done MVP)

1. User baru bisa daftar dan membuat 2 PRD gratis end-to-end tanpa error.
2. Setiap PRD hasil AI selalu 9 section + minimal 5 FR bernomor dalam Bahasa Indonesia.
3. Setiap PRD bisa di-expand menjadi fitur P0/P1/P2 + task ber-acceptance checklist.
4. Export Markdown valid dan bisa ditempel ke Cursor/Claude menghasilkan scaffold yang masuk akal (uji manual 1x).
5. Kuota free habis → terblokir dengan CTA upgrade; order Pro dummy mengaktifkan unlimited.
6. Landing menampilkan counter real + LCP < 2.5s di desktop.

## 13. Metrik Sukses (30 hari pasca-launch)

- Aktivasi: ≥40% signup membuat PRD pertama.
- Retensi: ≥20% kembali membuat PRD ke-2.
- Konversi: ≥3% free → Starter/Pro.
- Kualitas: ≥70% PRD di-export (proxy puas).
- Biaya: rata-rata cost AI per PRD < Rp 2.000 (via model murah default).

## 14. Risiko & Mitigasi

| Risiko | Mitigasi MVP |
|---|---|
| Cost AI jebol (unlimited Pro) | Default model murah; limit harian tersembunyi (fair use 10 PRD/hari); log token + alert |
| Output AI Bahasa Inggris / ngaco | System prompt ketat + suhu rendah + validasi (cek ada "## " + "FR-") + tombol regenerate |
| Abuse bot bikin PRD massal | Rate limit + captcha di signup + kuota free kecil (2) |
| Payment lokal ribet | Mulai manual QRIS + aktivasi admin, baru otomatis Midtrans |
| Persaingan langsung ngodingpakeai | Beda: fokus 1 alur super simpel + harga sama/murah + positioning stack Next.js/Postgres |

## 15. Pertanyaan Terbuka

1. Payment provider final: Midtrans vs Xendit? (rekomendasi: Xendit QRIS tercepat).
2. Model default: DeepSeek murah vs Kimi K3? Perlu uji kualitas Bahasa Indonesia.
3. Perlu upload gambar/dokumen di MVP? (usulan: tidak, Fase 2).
4. Batas "unlimited" Pro: fair-use berapa per hari?

---

## Lampiran A — Contoh Input → Output (untuk testing)

**Input:** "Buatkan dashboard CRM tim sales"

**Harapan AI:**
- Tanya: siapa user (admin sales/CS?), fitur wajib (pipeline, kontak, laporan?), integrasi (WA/Spreadsheet?), jumlah tim, batasan?
- PRD: FR-01 Kelola Kontak, FR-02 Pipeline Deal, FR-03 Dashboard Target, FR-04 Laporan, FR-05 Roles.
- Task contoh: TSK-01 skema `contacts/deals`, TSK-02 CRUD + filter, dst.

## Lampiran B — Format Copy-to-Agent

```markdown
# Konteks PRD: [Judul]
[Tempel ringkasan + FR P0]

# Task yang dikerjakan: [FIT-01 + TSK]
[Tempel acceptance checklist]

Instruksi: kerjakan 1 task, jangan ubah file di luar scope, tulis test jika ada.
```

---

*PRD **DEMA DOX** ini siap ditempel ke AI coding agent sebagai konteks pembangunan MVP.*
