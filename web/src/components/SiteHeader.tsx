import Image from "next/image";
import Link from "next/link";
import { mockStats } from "@/lib/mock";

const fmt = (n: number) => `${(n / 1000).toLocaleString("id-ID", { maximumFractionDigits: 1 })}K`;

export default function SiteHeader() {
  return (
    <div className="sticky top-3 z-20 mx-auto w-full max-w-5xl px-4">
      <header className="flex h-14 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-ink/85 py-2 pl-4 pr-2 text-white shadow-[0_16px_50px_-20px_rgb(0_0_0/0.7)] backdrop-blur-xl dark:border-white/10">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-paper">
            <Image src="/logo.svg" alt="Logo DEMA DOX" width={30} height={30} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            DEMA<span className="text-accent">DOX</span>
          </span>
        </Link>
        <div className="hidden items-center gap-2 text-xs md:flex">
          <span className="rounded-full border border-mint/30 bg-mint/10 px-3 py-1 font-semibold text-mint">
            ● {fmt(mockStats.users)} User
          </span>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-semibold text-zinc-300">
            {fmt(mockStats.prds)} PRD jadi
          </span>
        </div>
        <nav className="flex items-center gap-1 text-sm">
          <Link href="/pricing" className="hidden rounded-xl px-3 py-2 text-zinc-300 hover:bg-white/10 hover:text-white sm:block">
            Harga
          </Link>
          <Link
            href="/app/new"
            className="rounded-xl bg-accent px-4 py-2 font-display font-bold text-ink shadow-[0_8px_24px_-8px_rgb(255_92_32/0.8)] transition hover:brightness-95"
          >
            Bikin Plan →
          </Link>
        </nav>
      </header>
    </div>
  );
}
