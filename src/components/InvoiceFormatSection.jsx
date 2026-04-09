import { Hash, Layers, MapPin, Percent, Receipt, Sigma, StickyNote, Wallet } from 'lucide-react'

const blocks = [
  {
    icon: Receipt,
    title: 'Header & branding',
    desc: 'Logo, company name, and registration details at the top.',
  },
  {
    icon: Hash,
    title: 'Invoice number & dates',
    desc: 'Issue date, due date, and a clear invoice reference.',
  },
  {
    icon: MapPin,
    title: 'Bill to',
    desc: 'Customer name, email, and address blocks.',
  },
  {
    icon: Layers,
    title: 'Line items',
    desc: 'Description, quantity, rate, and line totals.',
  },
  {
    icon: Percent,
    title: 'Taxes & discounts',
    desc: 'GST/VAT, discounts, and shipping where applicable.',
  },
  {
    icon: Sigma,
    title: 'Totals',
    desc: 'Subtotal, tax, and amount due — always calculated for you.',
  },
  {
    icon: Wallet,
    title: 'Payment details',
    desc: 'Bank transfer or payment instructions your client needs.',
  },
  {
    icon: StickyNote,
    title: 'Notes & terms',
    desc: 'Optional footer notes and legal wording.',
  },
]

export function InvoiceFormatSection() {
  return (
    <section
      className="sleek-invoice-format shrink-0 border-t border-gray-200/80 bg-white py-14 sm:py-16"
      aria-labelledby="invoice-format-heading"
    >
      <div className="sleek-page-container">
        <h2
          id="invoice-format-heading"
          className="text-center text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          Invoice format explained
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-pretty text-base text-slate-600 sm:text-lg">
          Every section of your invoice, explained — so you know exactly what
          clients and auditors see.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {blocks.map((b, i) => {
            const Icon = b.icon
            return (
              <article
                key={b.title}
                className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow-md"
              >
                <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-ds-highlight text-ds-primary">
                  <Icon className="size-5 shrink-0" strokeWidth={1.75} aria-hidden />
                </div>
                <p className="text-xs font-semibold text-slate-400">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-1 text-sm font-bold text-slate-900">{b.title}</h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {b.desc}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
