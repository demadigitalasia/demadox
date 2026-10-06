import type { Prd, Quota } from "./types";

// Angka social proof landing DEMA DOX (nanti diganti query DB, cache 5 menit).
export const mockStats = { users: 43700, prds: 21100 };

// Kuota user demo: paket free, sudah pakai 2 dari 5 PRD.
export const mockQuota: Quota = {
  prdUsed: 2,
  prdLimit: 5,
  chatUsed: 20,
  chatLimit: 100,
  plan: "free",
};

// Pertanyaan klarifikasi baku untuk demo chat planning.
export const mockClarifyQuestions: string[] = [
  "1. Siapa yang pakai dashboard ini — admin, tim sales lapangan, atau CS? Berapa orang?",
  "2. Fitur wajib apa saja? (mis. pipeline deal, data kontak, laporan target)",
  "3. Perlu integrasi ke apa? (mis. WhatsApp, Spreadsheet, email)",
  "4. Perlu peran/hak akses berbeda (admin vs sales)?",
  "5. Batasan apa yang penting? (mis. harus online, budget server kecil)",
];

export const mockPrds: Prd[] = [
  {
    id: "mock-crm-sales",
    title: "Dashboard CRM Tim Sales",
    idea: "Buatkan dashboard CRM tim sales",
    category: "Web Internal",
    stack: "Next.js + PostgreSQL",
    status: "ready",
    createdAt: "2026-10-01",
    updatedAt: "2026-10-05",
    chat: [
      { id: "m1", role: "user", content: "Buatkan dashboard CRM tim sales" },
      {
        id: "m2",
        role: "assistant",
        content:
          "Siap! Biar PRD-nya tepat, jawab 5 pertanyaan singkat ini ya:\n1. Siapa yang pakai — admin, sales lapangan, atau CS? Berapa orang?\n2. Fitur wajib apa saja?\n3. Perlu integrasi ke apa?\n4. Perlu peran/hak akses berbeda?\n5. Batasan apa yang penting?",
      },
      {
        id: "m3",
        role: "user",
        content:
          "Dipakai 1 admin + 8 sales. Wajib: data kontak, pipeline deal, dashboard target. Integrasi WA untuk follow-up. Admin lihat semua, sales hanya datanya sendiri. Harus mobile-friendly, server kecil.",
      },
      { id: "m4", role: "assistant", content: "SIAP_GENERATE — info cukup, saya susun PRD-nya sekarang." },
    ],
    sections: [
      {
        key: "ringkasan",
        title: "Ringkasan",
        order: 1,
        contentMd:
          "Dashboard CRM internal untuk tim sales (1 admin + 8 sales) untuk mengelola kontak, memantau pipeline deal, dan melihat capaian target. Mobile-friendly, dioptimasi untuk server kecil.",
      },
      {
        key: "target-user",
        title: "Target User & Persona",
        order: 2,
        contentMd:
          "- **Admin (Rina):** kelola data master, lihat semua deal, tarik laporan.\n- **Sales (Budi dkk, 8 orang):** input kontak & deal miliknya, update stage, follow-up via WA.",
      },
      {
        key: "user-journey",
        title: "User Journey",
        order: 3,
        contentMd:
          "1. Sales login → lihat ringkasan target hari ini.\n2. Tambah kontak baru dari kenalan pameran.\n3. Buat deal, geser stage (Prospek → Negosiasi → Menang/Kalah).\n4. Klik tombol WA untuk follow-up.\n5. Admin pantau pipeline & unduh laporan mingguan.",
      },
      {
        key: "fungsional",
        title: "Kebutuhan Fungsional",
        order: 4,
        contentMd:
          "- **FR-01 Kelola Kontak:** tambah/ubah/hapus/cari kontak (nama, HP, perusahaan, sumber).\n- **FR-02 Pipeline Deal:** deal terhubung ke kontak, stage bisa digeser (kanban).\n- **FR-03 Dashboard Target:** ringkasan omzet, deal menang, ranking sales.\n- **FR-04 Laporan:** filter periode, unduh CSV.\n- **FR-05 Roles:** admin lihat semua, sales hanya miliknya.\n- **FR-06 Follow-up WA:** tombol deep-link wa.me per kontak.",
      },
      {
        key: "non-fungsional",
        title: "Kebutuhan Non-Fungsional",
        order: 5,
        contentMd:
          "- Mobile-friendly (dipakai dari HP sales).\n- LCP < 2,5 dtk di koneksi 4G.\n- Auth aman (session + hak akses per peran).\n- Bahasa Indonesia di seluruh UI.",
      },
      {
        key: "model-data",
        title: "Model Data",
        order: 6,
        contentMd:
          "- **users**(id, nama, peran[admin|sales])\n- **contacts**(id, ownerId → users, nama, hp, perusahaan, sumber)\n- **deals**(id, contactId → contacts, ownerId → users, judul, nilai, stage[prospek|negosiasi|menang|kalah], updatedAt)",
      },
      {
        key: "arsitektur",
        title: "Arsitektur & Stack yang disarankan",
        order: 7,
        contentMd:
          "Next.js App Router + PostgreSQL (Prisma). Satu aplikasi monolit, deploy di VPS kecil. Tanpa queue/antrean di MVP.",
      },
      {
        key: "batasan",
        title: "Batasan / Out of Scope",
        order: 8,
        contentMd:
          "- Tanpa blast WA otomatis (hanya tombol manual).\n- Tanpa integrasi akuntansi.\n- Tanpa aplikasi mobile native.",
      },
      {
        key: "sukses",
        title: "Kriteria Sukses",
        order: 9,
        contentMd:
          "- 8 sales input deal harian dalam 2 minggu.\n- Admin tarik laporan mingguan tanpa bantuan dev.\n- Waktu follow-up kontak baru < 24 jam.",
      },
    ],
    features: [
      { id: "f1", code: "FIT-01", name: "Kelola Kontak", priority: "P0", estimate: "3 hari" },
      { id: "f2", code: "FIT-02", name: "Pipeline Deal Kanban", priority: "P0", estimate: "4 hari", dependsOn: "FIT-01" },
      { id: "f3", code: "FIT-03", name: "Dashboard Target", priority: "P0", estimate: "2 hari", dependsOn: "FIT-02" },
      { id: "f4", code: "FIT-05", name: "Roles Admin vs Sales", priority: "P0", estimate: "2 hari" },
      { id: "f5", code: "FIT-04", name: "Laporan & Unduh CSV", priority: "P1", estimate: "2 hari", dependsOn: "FIT-02" },
      { id: "f6", code: "FIT-06", name: "Tombol Follow-up WA", priority: "P2", estimate: "0,5 hari", dependsOn: "FIT-01" },
    ],
    tasks: [
      {
        id: "t1", code: "TSK-01", featureCode: "FIT-01", label: "DB",
        title: "Skema contacts + owner",
        detail: "Buat tabel contacts dengan ownerId ke users + index pencarian nama/HP.",
        acceptance: ["Migrasi jalan bersih", "Cari nama sebagian < 300ms di 10rb baris"],
      },
      {
        id: "t2", code: "TSK-02", featureCode: "FIT-01", label: "FE",
        title: "CRUD kontak + filter",
        detail: "Halaman kontak: tabel, cari, filter sumber, validasi no HP Indonesia.",
        acceptance: ["No HP invalid ditolak dengan pesan Indonesia", "Sales hanya lihat kontaknya"],
      },
      {
        id: "t3", code: "TSK-03", featureCode: "FIT-02", label: "DB",
        title: "Skema deals + stage",
        detail: "Tabel deals relasi contacts + owner, enum stage prospek/negosiasi/menang/kalah.",
        acceptance: ["Stage hanya nilai valid", "Ubah stage tercatat updatedAt"],
      },
      {
        id: "t4", code: "TSK-04", featureCode: "FIT-02", label: "FE",
        title: "Kanban geser stage",
        detail: "Kolom per stage, drag-and-drop, optimistis update + rollback saat gagal.",
        acceptance: ["Geser kartu update server", "Gagal → kartu kembali + toast"],
      },
      {
        id: "t5", code: "TSK-05", featureCode: "FIT-03", label: "BE",
        title: "Agregasi dashboard",
        detail: "Endpoint ringkasan: omzet menang, deal per stage, ranking sales bulan berjalan.",
        acceptance: ["Angka cocok dengan query manual", "Response < 500ms"],
      },
      {
        id: "t6", code: "TSK-06", featureCode: "FIT-05", label: "BE",
        title: "Otorisasi peran",
        detail: "Middleware: sales scope ke ownerId, admin bypass. Uji tiap endpoint.",
        acceptance: ["Sales tidak bisa intip deal sales lain (403)", "Admin bisa semua"],
      },
      {
        id: "t7", code: "TSK-07", featureCode: "FIT-04", label: "FE",
        title: "Laporan + unduh CSV",
        detail: "Filter periode + tombol unduh CSV sesuai filter.",
        acceptance: ["CSV terbuka rapi di Spreadsheet", "Filter kosong beri pesan ramah"],
      },
      {
        id: "t8", code: "TSK-08", featureCode: "FIT-06", label: "FE",
        title: "Tombol WA per kontak",
        detail: "Deep-link wa.me dengan nomor + pesan template follow-up.",
        acceptance: ["Nomor 08xx jadi 62xx otomatis", "Chat WA terbuka dengan template"],
      },
    ],
  },
  {
    id: "draft-kasir",
    title: "Aplikasi Kasir Warung",
    idea: "Buatkan aplikasi kasir sederhana untuk warung",
    category: "Web",
    stack: "Otomatis",
    status: "draft",
    createdAt: "2026-10-06",
    updatedAt: "2026-10-06",
    chat: [{ id: "k1", role: "user", content: "Buatkan aplikasi kasir sederhana untuk warung" }],
    sections: [],
    features: [],
    tasks: [],
  },
  {
    id: "draft-belajar",
    title: "E-learning Bahasa Inggris",
    idea: "Platform kursus bahasa Inggris dengan kuis",
    category: "Web",
    stack: "Next.js + PostgreSQL",
    status: "draft",
    createdAt: "2026-10-04",
    updatedAt: "2026-10-04",
    chat: [{ id: "e1", role: "user", content: "Platform kursus bahasa Inggris dengan kuis" }],
    sections: [],
    features: [],
    tasks: [],
  },
];

export function getPrd(id: string): Prd | undefined {
  return mockPrds.find((p) => p.id === id);
}
