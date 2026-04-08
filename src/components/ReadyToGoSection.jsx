const GET_STARTED_HREF = 'https://sleek.com'
const TALK_EXPERT_HREF = 'https://sleek.com'

export function ReadyToGoSection() {
  return (
    <section
      className="sleek-ready-to-go shrink-0 border-t border-gray-100 bg-gray-100 px-4 py-16 sm:py-20"
      aria-labelledby="ready-to-go-heading"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2
          id="ready-to-go-heading"
          className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
        >
          Ready to go beyond invoicing?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-500 sm:text-lg">
          Let Sleek handle your accounting, compliance, and tax — so you can
          focus on growing your business.
        </p>
        <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-4 sm:mt-10 sm:w-auto sm:flex-row sm:items-center">
          <a
            href={GET_STARTED_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="sleek-ready-to-go-primary inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-accent-hover"
          >
            Get started — free
          </a>
          <a
            href={TALK_EXPERT_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="sleek-ready-to-go-secondary inline-flex min-h-11 items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-gray-50"
          >
            Talk to an expert
          </a>
        </div>
      </div>
    </section>
  )
}
