"use client";

import { useState } from "react";
import QuotaBadge from "@/components/QuotaBadge";
import { mockQuota } from "@/lib/mock";
import type { Plan } from "@/lib/types";

export default function BillingPage() {
  const [plan, setPlan] = useState<Plan>(mockQuota.plan);
  const quota = { ...mockQuota, plan, prdLimit: plan === "pro" ? 999 : plan === "starter" ? 5 : 2 };

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-5">
      <h1 className="text-2xl font-extrabold tracking-tight">Billing</h1>
      <QuotaBadge quota={quota} />
      <div className="rounded-2xl border border-black/10 p-5 text-sm dark:border-white/15">
        <p className="font-bold">Status: {plan === "pro" ? "Pro (unlimited, demo)" : plan === "starter" ? "Starter" : "Free"}</p>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Mode mock — ganti paket di bawah untuk demo unlimited. Checkout asli (QRIS) menyusul di fase backend.
        </p>
      </div>
      <div className="flex gap-2">
        {(["free", "starter", "pro"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPlan(p)}
            className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-semibold capitalize ${
              plan === p ? "border-accent bg-accent/10 text-accent-deep dark:text-accent" : "border-black/10 dark:border-white/15"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
