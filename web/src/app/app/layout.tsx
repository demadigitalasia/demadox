import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-black/10 dark:border-white/10">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
          <Link href="/app" className="font-display font-bold tracking-tight">
            DEMA<span className="text-accent">DOX</span> <span className="font-mono font-normal text-zinc-400">/ app</span>
          </Link>
          <nav className="flex gap-1 text-sm">
            {[
              ["/app", "Dashboard"],
              ["/app/new", "Baru"],
              ["/app/prd", "Riwayat"],
              ["/app/billing", "Billing"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="rounded-lg px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</main>
    </div>
  );
}
