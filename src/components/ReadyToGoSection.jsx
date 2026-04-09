const ACCOUNTING_HREF = 'https://sleek.com/sg/accounting-services-singapore/'

export function ReadyToGoSection() {
  return (
    <section
      className="sleek-ready-to-go shrink-0 border-t border-[#E9ECEF] bg-[#FAFAFA] py-20 sm:py-20"
      aria-labelledby="ready-to-go-heading"
    >
      <div className="sleek-page-container flex flex-col items-center text-center">
        <h2
          id="ready-to-go-heading"
          className="mb-3 text-balance text-2xl font-extrabold tracking-tight text-[#040015] sm:text-3xl"
        >
          Start free. Scale with Sleek Accounting.
        </h2>
        <p className="mx-auto mb-8 max-w-[520px] text-pretty text-[0.9375rem] leading-[1.7] text-[#6C757D]">
          Download your first invoice free today. When you&apos;re ready for invoice history,
          email sending, payment tracking, and a dedicated accountant, Sleek Accounting is one
          step away.
        </p>
        <a
          href={ACCOUNTING_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="sleek-ds-btn sleek-ds-btn--primary sleek-ds-btn--comfortable inline-flex text-center shadow-sm"
        >
          View Sleek&apos;s Pricing Plans
        </a>
      </div>
    </section>
  )
}
