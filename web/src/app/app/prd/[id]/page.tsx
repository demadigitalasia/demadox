"use client";

import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import ChatBox from "@/components/ChatBox";
import PrdViewer from "@/components/PrdViewer";
import SpecTable from "@/components/SpecTable";
import ExportButtons from "@/components/ExportButtons";
import PaywallModal from "@/components/PaywallModal";
import { getPrd, mockQuota } from "@/lib/mock";

const TABS = ["Chat", "PRD", "Fitur & Task"] as const;

export default function PrdWorkspacePage() {
  const { id } = useParams<{ id: string }>();
  const prd = getPrd(id);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Chat");
  const [paywall, setPaywall] = useState(false);

  if (!prd) notFound();

  const quotaHabis = mockQuota.prdUsed >= mockQuota.prdLimit;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs text-zinc-500">Ide: “{prd.idea}” • {prd.category} • {prd.stack}</p>
        <h1 className="text-2xl font-extrabold tracking-tight">{prd.title}</h1>
      </div>

      <div className="flex gap-1 rounded-full border border-black/10 p-1 text-sm dark:border-white/15">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-full px-4 py-1.5 font-display font-bold ${tab === t ? "bg-accent text-white shadow-[0_8px_24px_-8px_rgb(255_92_32/0.8)]" : "text-zinc-500"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Chat" && (
        <div className="flex flex-col gap-3">
          <ChatBox initial={prd.chat} />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => (quotaHabis ? setPaywall(true) : setTab("PRD"))}
              className="rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-ink hover:brightness-95"
            >
              Lewati, langsung generate PRD →
            </button>
            <button
              onClick={() => setPaywall(true)}
              className="rounded-xl border border-black/10 px-4 py-2.5 text-sm hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
              title="Demo paywall walau kuota masih ada"
            >
              Demo paywall
            </button>
          </div>
        </div>
      )}

      {tab === "PRD" && (
        <div className="flex flex-col gap-4">
          <ExportButtons prd={prd} />
          <PrdViewer initial={prd.sections} />
        </div>
      )}

      {tab === "Fitur & Task" && (
        <div className="flex flex-col gap-4">
          <SpecTable features={prd.features} tasks={prd.tasks} />
        </div>
      )}

      <PaywallModal open={paywall} onClose={() => setPaywall(false)} />
    </div>
  );
}
