const EXPLORE_SOLUTIONS_HREF = 'https://sleek.com/sg/'

const tags = [
  'Incorporation',
  'Accounting',
  'GST Filing',
  'Corporate Secretary',
  'Payroll',
  'Banking',
]

export function MoreThanInvoicingSection() {
  return (
    <section
      className="sleek-more-than-invoicing sleek-surface-on-dark shrink-0 bg-linear-to-b from-slate-950 via-[#0c1929] to-slate-950 px-4 py-16 sm:py-20"
      aria-labelledby="more-than-invoicing-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          id="more-than-invoicing-heading"
          className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          More than invoicing.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-gray-300 sm:text-lg">
          Sleek handles your company incorporation, accounting, GST filing,
          payroll, corporate secretary, and tax — all in one platform. Start
          with a free invoice. End with a business that runs itself.
        </p>

        <ul
          className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
          aria-label="Sleek services"
        >
          {tags.map((label) => (
            <li key={label}>
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white sm:text-sm">
                {label}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <a
            href={EXPLORE_SOLUTIONS_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="sleek-ds-btn sleek-ds-btn--inverse sleek-ds-btn--comfortable inline-flex"
          >
            Explore our solutions
          </a>
        </div>
      </div>
    </section>
  )
}
