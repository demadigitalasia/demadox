import IdeaForm from "@/components/IdeaForm";

export default function NewPrdPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Bikin Plan baru</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Ceritakan idemu dalam 1 kalimat. AI akan bertanya klarifikasi sebelum menyusun PRD.
        </p>
      </div>
      <IdeaForm />
      <ol className="list-decimal pl-5 text-sm text-zinc-500">
        <li>Isi ide → otomatis dibuat draft PRD.</li>
        <li>Jawab 3–5 pertanyaan klarifikasi di tab Chat.</li>
        <li>Review PRD → generate spec → download Markdown.</li>
      </ol>
    </div>
  );
}
