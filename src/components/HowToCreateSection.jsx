const steps = [
  {
    title: 'Enter your business details',
    body: 'Add your company name, address, and business registration number. Upload your logo to make the invoice look professional. Select your country and currency - Sleek adjusts the tax fields automatically.',
  },
  {
    title: "Add your client's information",
    body: 'Enter the name and address of the client you are billing. With a Sleek Accounting subscription, saved client details auto-fill so you never type the same information twice.',
  },
  {
    title: 'List your products or services',
    body: 'Add line items with a description, quantity, and unit price. Sleek automatically calculates subtotals, tax, discounts, and the total amount due - no spreadsheet needed.',
  },
  {
    title: 'Add payment details',
    body: 'Include your bank account details or a local payment method (PayNow, PayID, BACS) so your client knows exactly how to pay you.',
  },
  {
    title: 'Download or send',
    body: 'Download the invoice as a PDF instantly - no account needed. With a Sleek Accounting subscription, you can also send invoices by email, get notified when your client opens them, and track every invoice status from your dashboard.',
  },
]

export function HowToCreateSection() {
  return (
    <section
      className="sleek-how-to shrink-0 border-t border-[#E9ECEF] bg-[#F8F9FA] py-20 sm:py-20"
      aria-labelledby="how-to-heading"
    >
      <div className="sleek-page-container">
        <div className="mb-4 text-center">
          <h2
            id="how-to-heading"
            className="text-balance text-2xl font-extrabold tracking-tight text-[#040015] sm:text-3xl"
          >
            How to create an invoice online
          </h2>
          <p className="mt-2.5 text-pretty text-[0.9375rem] leading-relaxed text-[#6C757D]">
            Create and send a professional invoice in under 2 minutes using Sleek&apos;s free
            invoice generator - the easiest free invoice software and online invoice template
            for small businesses and freelancers.
          </p>
        </div>
        <ol className="mt-10">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="flex gap-5 border-b border-[#E9ECEF] py-6 last:border-b-0"
            >
              <span
                className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#0F6DFA] text-base font-extrabold text-white"
                aria-hidden
              >
                {i + 1}
              </span>
              <div className="min-w-0 pt-0.5">
                <h3>{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#6C757D] sm:text-[0.9375rem]">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
