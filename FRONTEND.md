# FRONTEND SPEC — DEMA DOX (Frontend-First, Mock)

**Produk:** DEMA DOX — PRD Generator (Bahasa Indonesia)
**Stack frontend:** Next.js 16 (App Router, TypeScript) + Tailwind CSS + shadcn/ui (menyusul)
**Logo:** `public/logo.svg` (ikon), `public/logo-full.svg` (ikon + teks)
**Prinsip:** frontend jalan full-mock tanpa backend/AI. Semua data dari `lib/mock.ts` sesuai tipe di bawah.

---

## 1. Branding DEMA DOX

- Nama konsisten: **DEMA DOX**. "Bikin Plan" = nama fitur, bukan produk.
- Warna:
  - `navy`: #0A1128 (bg logo, teks heading)
  - `accent`: #FF5C20 (lipatan dokumen, badge, CTA)
  - `muted`: #64748B (sub-teks)
  - `bg`: #FFFFFF light / #09090B dark
- Font: Inter / DM Sans, heading 800, tracking-tight.
- Radius: 14px (logo), 10-12px (card), 8px (button).
- Header pakai `logo-full.svg` (light) — teks navy; di dark mode teks jadi putih via CSS (SVG `currentColor` menyusul, untuk sekarang pakai ikon + span teks).

## 2. Route Map (disepakati)

| Route | Status | Isi |
|---|---|---|
| `/` | publik | Hero "Mau ngapain hari ini?", contoh prompt 1-klik, cara kerja, contoh output, pricing ringkas, FAQ, counter User/PRD (mock) |
| `/pricing` | publik | Toggle 1/3 bulan, 3 kartu (Free/Starter/Pro), CTA dummy |
| `/login` | publik | Google + email (dummy, langsung masuk `/app`) |
| `/app` | authed (mock) | Sapaan, kartu Bikin Plan (aktif), Desain/Template/Konsultasi (disabled "Segera"), QuotaBadge, PRD Terakhir |
| `/app/new` | authed (mock) | IdeaForm (textarea + kategori + stack) → buat draft mock → redirect `/app/prd/[id]` |
| `/app/prd` | authed (mock) | List + search + hapus (mock) |
| `/app/prd/[id]` | authed (mock) | Workspace 3 tab: Chat \| PRD \| Fitur & Task |
| `/app/billing` | authed (mock) | Status paket + tombol upgrade dummy |

## 3. Komponen Wajib

- `IdeaForm` — textarea (min 10 char), select kategori (Web/Mobile/Internal/Lainnya), select stack (Next.js/Laravel/Lainnya/Otomatis), contoh 1-klik.
- `ChatBox` — bubble user/AI, streaming simulasi (ketik per 20ms), tombol "Lewati, langsung generate", retry.
- `PrdViewer` — render Markdown (9 section baku), edit inline per section, regenerate per section (mock ganti teks).
- `SpecTable` — tabel fitur (FIT-01, prioritas P0/P1/P2, estimasi) + expand task (TSK-01, checklist), copy per fitur.
- `QuotaBadge` — "3/5 PRD bulan ini", "20/100 chat".
- `PaywallModal` — muncul saat kuota 0 → CTA ke `/pricing` (dummy, selalu bisa ditutup di dev).
- `ExportButtons` — Download `.md` (client-side blob) + Copy (clipboard + toast).
- `UserPrdCounter` — angka User & PRD di header/hero (dari mock stats).

## 4. TypeScript Contract (kunci — backend wajib ikut ini nanti)

```ts
// lib/types.ts — DEMA DOX
export type Plan = 'free' | 'starter' | 'pro';
export type PrdStatus = 'draft' | 'ready';
export type Priority = 'P0' | 'P1' | 'P2';

export interface Quota { prdUsed: number; prdLimit: number; chatUsed: number; chatLimit: number; plan: Plan; }
export interface PrdSection { key: string; title: string; contentMd: string; order: number; }
export interface Feature { id: string; code: string; name: string; priority: Priority; estimate: string; dependsOn?: string; }
export interface TaskItem { id: string; code: string; featureCode: string; title: string; detail: string; acceptance: string[]; label: 'FE' | 'BE' | 'DB' | 'AI'; }
export interface ChatMessage { id: string; role: 'user' | 'assistant'; content: string; }
export interface Prd {
  id: string; title: string; idea: string; category: string; stack: string;
  status: PrdStatus; sections: PrdSection[]; features: Feature[]; tasks: TaskItem[];
  chat: ChatMessage[]; createdAt: string; updatedAt: string;
}
```

## 5. Mock Data (contoh "dashboard CRM tim sales")

Simpan di `lib/mock.ts`:
- `mockQuota: Quota = { prdUsed: 2, prdLimit: 5, chatUsed: 20, chatLimit: 100, plan: 'free' }`
- `mockStats = { users: 43700, prds: 21100 }`
- `mockPrds: Prd[]` — minimal 3 (1 ready lengkap CRM, 2 draft).
- `mockClarifyQuestions: string[]` — 5 pertanyaan baku CRM.
- Format export: `# [Judul]\n...9 section...\n\n---\n## Lampiran Fitur & Task\n...` nama file `dema-dox-[slug]-[YYYY-MM-DD].md`.

## 6. Kuota & Paywall UX (dummy disepakati)

- Generate ke-3 user free (mock `prdUsed >= prdLimit`) → blokir + buka `PaywallModal`.
- Chat tetap bisa 100x (mock), tombol Generate Spec ikut cek kuota PRD.
- Billing dummy: tombol "Pilih Starter/Pro" → toast "Checkout menyusul (Fase backend)" + update `plan` di state lokal agar bisa demo unlimited.

## 7. Aturan UI

- Semua teks Bahasa Indonesia. LCP target < 2.5s, responsif mobile→desktop.
- Dark/light toggle (class `dark`), persist localStorage.
- Toast Indonesia: "PRD tersimpan", "Markdown diunduh", "Kuota habis, upgrade yuk".
- Markdown render aman (tanpa raw HTML).

---

*Spec ini + PRD.md = konteks untuk AI coding agent membangun frontend DEMA DOX secara mock-first.*
