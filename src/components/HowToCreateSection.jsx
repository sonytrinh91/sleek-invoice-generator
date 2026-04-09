const steps = [
  {
    title: 'Enter your business details',
    body: 'Company name, address, tax ID, and logo so invoices look official.',
  },
  {
    title: 'Add your customer',
    body: 'Bill-to name, email, and address — pulled into the PDF automatically.',
  },
  {
    title: 'Add line items',
    body: 'Describe what you sold, quantity, and price. Taxes and totals update live.',
  },
  {
    title: 'Set dates & payment terms',
    body: 'Issue date, due date, and currency — matched to your country.',
  },
  {
    title: 'Download your PDF',
    body: 'One click to a clean PDF you can email or store for compliance.',
  },
]

export function HowToCreateSection() {
  return (
    <section
      className="sleek-how-to shrink-0 border-t border-gray-200/80 bg-[#F8F9FA] px-4 py-14 sm:py-16"
      aria-labelledby="how-to-heading"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="how-to-heading"
          className="text-center text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          How to create an invoice online
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-pretty text-base text-slate-600 sm:text-lg">
          Five quick steps from blank form to professional PDF.
        </p>
        <ol className="mt-10 space-y-6">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ds-primary text-sm font-bold text-white"
                aria-hidden
              >
                {i + 1}
              </span>
              <div className="min-w-0 pt-0.5">
                <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 sm:text-base">
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
