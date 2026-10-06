import type { Prd } from "./types";

/** Susun Markdown export DEMA DOX dari 1 PRD. */
export function buildExportMarkdown(prd: Prd): string {
  const lines: string[] = [
    `# ${prd.title}`,
    ``,
    `> Dibuat dengan DEMA DOX — Ide awal: "${prd.idea}"`,
    `> Kategori: ${prd.category} | Stack: ${prd.stack} | Tanggal: ${prd.createdAt}`,
    ``,
  ];
  for (const s of [...prd.sections].sort((a, b) => a.order - b.order)) {
    lines.push(`## ${s.order}. ${s.title}`, ``, s.contentMd.trim(), ``);
  }
  if (prd.features.length > 0) {
    lines.push(`---`, ``, `## Lampiran: Fitur & Task`, ``);
    for (const f of prd.features) {
      lines.push(
        `### ${f.code} — ${f.name} (${f.priority}, estimasi ${f.estimate})${f.dependsOn ? ` — tergantung ${f.dependsOn}` : ``}`,
        ``,
      );
      for (const t of prd.tasks.filter((t) => t.featureCode === f.code)) {
        lines.push(`- [ ] **${t.code} [${t.label}] ${t.title}** — ${t.detail}`);
        for (const a of t.acceptance) lines.push(`  - Kriteria: ${a}`);
      }
      lines.push(``);
    }
    lines.push(`Instruksi untuk AI coding agent: kerjakan 1 task, jangan ubah file di luar scope, tulis test jika ada.`, ``);
  }
  return lines.join("\n");
}

/** Nama file export: dema-dox-[slug]-[YYYY-MM-DD].md */
export function exportFileName(title: string, date = new Date()): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40);
  const d = date.toISOString().slice(0, 10);
  return `dema-dox-${slug || "prd"}-${d}.md`;
}
