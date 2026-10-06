import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="bg-grid-dark mesh-glow flex min-h-full w-full flex-1 flex-col items-center justify-center bg-ink px-4 py-16 text-white">
      <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-3xl bg-paper shadow-[0_16px_40px_-12px_rgb(255_92_32/0.7)]">
        <Image src="/logo.svg" alt="Logo DEMA DOX" width={48} height={48} />
      </span>
      <h1 className="mt-5 font-display text-3xl font-bold tracking-tight">
        Masuk ke DEMA<span className="text-accent">DOX</span>
      </h1>
      <p className="mt-1 text-center font-mono text-xs text-zinc-500">mode mock — tanpa password, langsung gas.</p>
      <div className="mt-6 flex w-full max-w-sm flex-col gap-3">
        <Link href="/app" className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-center font-display text-sm font-bold transition hover:bg-white/10">
          Masuk dengan Google (demo)
        </Link>
        <Link href="/app" className="rounded-2xl bg-accent px-4 py-3 text-center font-display text-sm font-bold text-ink shadow-[0_16px_40px_-12px_rgb(255_92_32/0.9)] transition hover:brightness-95">
          Masuk dengan Email (demo)
        </Link>
      </div>
      <Link href="/" className="mt-5 text-sm text-zinc-500 hover:text-white">← Kembali</Link>
    </main>
  );
}
