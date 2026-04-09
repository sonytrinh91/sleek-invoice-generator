import { clsx } from 'clsx'
import { Check, FileText } from 'lucide-react'
import { useState } from 'react'

const TRY_ACCOUNTING_HREF = 'https://sleek.com/sg/accounting/'

const items = [
  {
    title: 'Professional layout',
    body: 'Clean, structured fields that match how clients and auditors expect invoices to look.',
  },
  {
    title: 'Automatic calculations',
    body: 'Subtotals, taxes, and discounts stay in sync as you edit line items — fewer mistakes.',
  },
  {
    title: 'Branding & clarity',
    body: 'Add your logo and company details so every PDF reinforces your brand.',
  },
  {
    title: 'Instant PDF download',
    body: 'Generate a print-ready PDF in one click, ready to email or archive.',
  },
]

export function SimplicitySection() {
  const [open, setOpen] = useState(0)

  return (
    <section
      className="sleek-simplicity sleek-surface-light-blue shrink-0 border-t border-gray-200/80 bg-ds-highlight px-4 py-14 sm:py-16"
      aria-labelledby="simplicity-heading"
    >
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div>
          <h2
            id="simplicity-heading"
            className="text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Simple invoicing. Stronger accuracy.
          </h2>
          <p className="mt-3 text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
            Everything you need to issue compliant, professional invoices — without
            wrestling with spreadsheets.
          </p>
          <ul className="mt-8 space-y-2">
            {items.map((item, i) => {
              const isOpen = open === i
              return (
                <li key={item.title}>
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    className={clsx(
                      'flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left transition',
                      isOpen
                        ? 'border-ds-primary bg-white shadow-sm'
                        : 'border-transparent bg-white/60 hover:border-gray-200 hover:bg-white',
                    )}
                  >
                    <span
                      className={clsx(
                        'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md text-xs font-bold',
                        isOpen
                          ? 'bg-ds-primary text-white'
                          : 'bg-slate-200 text-slate-700',
                      )}
                    >
                      {isOpen ? (
                        <Check className="size-4" strokeWidth={2.5} aria-hidden />
                      ) : (
                        i + 1
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-slate-900">
                        {item.title}
                      </span>
                      {isOpen ? (
                        <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                          {item.body}
                        </span>
                      ) : null}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
          <a
            href={TRY_ACCOUNTING_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="sleek-ds-btn sleek-ds-btn--primary sleek-ds-btn--comfortable mt-8 inline-flex shadow-sm"
          >
            Try accounting
          </a>
        </div>

        <div
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          aria-hidden
        >
          <div className="rounded-2xl bg-slate-900 p-6 shadow-xl sm:p-8">
            <div className="rounded-xl border border-white/10 bg-white p-4 shadow-lg">
              <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3">
                <FileText className="size-8 text-ds-primary" strokeWidth={1.5} />
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Preview
                </span>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="h-2 w-2/3 rounded bg-slate-200" />
                <div className="h-2 w-1/2 rounded bg-slate-100" />
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="h-16 rounded border border-gray-100 bg-slate-50" />
                  <div className="h-16 rounded border border-gray-100 bg-slate-50" />
                </div>
                <div className="mt-3 h-2 w-full rounded bg-slate-100" />
                <div className="h-2 w-5/6 rounded bg-slate-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
