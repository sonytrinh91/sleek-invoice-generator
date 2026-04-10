const ACCOUNTING_HREF = 'https://sleek.com/sg/accounting-services-singapore/'

const tags = [
  'Incorporation',
  'Accounting',
  'Tax Filing',
  'Corporate Secretary',
  'Payroll',
  'Banking',
]

export function MoreThanInvoicingSection() {
  return (
    <section
      className="sleek-more-than-invoicing shrink-0 bg-[#1A2E5A] py-20 sm:py-20"
      aria-labelledby="more-than-invoicing-heading"
    >
      <div className="sleek-page-container text-center">
        <h2
          id="more-than-invoicing-heading"
          className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
        >
          More than invoicing.
        </h2>
        <p className="mx-auto mt-4 max-w-[600px] text-pretty text-base leading-[1.7] text-white/55 sm:text-lg">
          Start with a free invoice. Subscribe to Sleek Accounting to send invoices, track
          payments, and get a dedicated accountant handling your tax filing, compliance, and
          annual returns - all in one platform.
        </p>

        <ul
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
          aria-label="Sleek services"
        >
          {tags.map((label) => (
            <li key={label}>
              <span className="inline-flex rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-sm font-medium text-white/80">
                {label}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <a
            href={ACCOUNTING_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-[10px] bg-white px-8 py-3.5 text-md font-semibold leading-snug text-[#040015] shadow-sm transition hover:bg-neutral-100"
          >
            View Sleek&apos;s Pricing Plans →
          </a>
        </div>
      </div>
    </section>
  )
}
