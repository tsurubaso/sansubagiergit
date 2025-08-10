export default function RulePage() {
  return (
    <div className="min-h-screen p-8 bg-[var(--background)] text-[var(--foreground)]">
      <div
        className="max-w-3xl mx-auto rounded-2xl p-6"
        style={{
          backgroundColor: "var(--card-background)",
          border: "1px solid var(--border-color)",
        }}
      >
        <header className="mb-4">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <span aria-hidden>📖</span>
            Rulebook — Naming & Organization
          </h1>
        </header>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Naming Rules</h2>
          <ol className="list-decimal list-inside space-y-4">
            <li>
              <strong>Series name first</strong> — The series title appears at
              the beginning of the story title. After the series name comes the
              story rank, expressed as a letter (A, B, C...) instead of a
              number.
            </li>

            <li>
              <strong>Missing letters are allowed</strong> — Some ranks may be
              intentionally omitted (gaps in the alphabet are expected).
            </li>

            <li>
              <strong>Shared universe</strong> — All stories take place within
              the same fictional universe, even when they feel independent.
            </li>

            <li>
              <strong>Loose relations</strong> — Connections between stories are
              loose: characters/locations/themes may reappear but continuity is
              not strictly enforced.
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Story Distributions</h2>
          <ul className="list-disc list-inside space-y-3">
            <li>
              <strong>Drafts 📝</strong> — Freshly added stories without much
              rewriting or rereading. Most are generated through speech-to-text
              software, so orthographic mistakes and misspellings are frequent.
              This section is primarily the writer’s workspace.
            </li>
            <li>
              <strong>Fragments ✂️</strong> — Incomplete story pieces or
              excerpts. Sometimes fragments are staged here before being moved
              to the <em>story</em> section — the “read enough” corner.
            </li>
            <li>
              <strong>Stories 📚</strong> —THe finsihed work, or what I want to
              be so.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
