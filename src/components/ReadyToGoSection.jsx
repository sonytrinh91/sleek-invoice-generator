const GET_STARTED_HREF = 'https://sleek.com'
const TALK_EXPERT_HREF = 'https://sleek.com'

export function ReadyToGoSection() {
  return (
    <section
      className="sleek-ready-to-go shrink-0 border-t border-gray-200/80 bg-white px-4 py-16 sm:py-20"
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
            className="sleek-ds-btn sleek-ds-btn--primary sleek-ds-btn--comfortable inline-flex text-center shadow-sm"
          >
            Get started for free
          </a>
          <a
            href={TALK_EXPERT_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="sleek-ds-btn sleek-ds-btn--outline sleek-ds-btn--comfortable inline-flex text-center"
          >
            Talk to an expert
          </a>
        </div>
      </div>
    </section>
  )
}
