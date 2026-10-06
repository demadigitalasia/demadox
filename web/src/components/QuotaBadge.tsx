import type { Quota } from "@/lib/types";

const planLabel: Record<Quota["plan"], string> = {
  free: "Free",
  starter: "Starter",
  pro: "Pro",
};

export default function QuotaBadge({ quota }: { quota: Quota }) {
  const prdLeft = Math.max(0, quota.prdLimit - quota.prdUsed);
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="rounded-full bg-black/5 px-3 py-1 font-semibold dark:bg-white/10">
        Paket {planLabel[quota.plan]}
      </span>
      <span className="rounded-full border border-black/10 px-3 py-1 dark:border-white/15">
        Sisa {quota.prdLimit === 0 ? "∞" : `${prdLeft}/${quota.prdLimit}`} PRD bulan ini
      </span>
      <span className="rounded-full border border-black/10 px-3 py-1 dark:border-white/15">
        {quota.chatUsed}/{quota.chatLimit} chat
      </span>
    </div>
  );
}
