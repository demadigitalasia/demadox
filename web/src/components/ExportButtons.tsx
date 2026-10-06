"use client";

import { useState } from "react";
import type { Prd } from "@/lib/types";
import { buildExportMarkdown, exportFileName } from "@/lib/export";

export default function ExportButtons({ prd }: { prd: Prd }) {
  const [toast, setToast] = useState("");

  function flash(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  }

  function download() {
    const blob = new Blob([buildExportMarkdown(prd)], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = exportFileName(prd.title);
    a.click();
    URL.revokeObjectURL(url);
    flash("Markdown diunduh 📥");
  }

  function copy() {
    navigator.clipboard?.writeText(buildExportMarkdown(prd)).catch(() => undefined);
    flash("PRD tersalin 📋");
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button onClick={download} className="rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-black">
        Download .md
      </button>
      <button onClick={copy} className="rounded-xl border border-black/10 px-4 py-2 text-sm font-semibold hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10">
        Copy PRD
      </button>
      {toast && <span className="text-sm text-green-600 dark:text-green-400">{toast}</span>}
    </div>
  );
}
