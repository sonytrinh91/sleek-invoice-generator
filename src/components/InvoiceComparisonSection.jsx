import { Check, X } from 'lucide-react'

const rows = [
  {
    label: 'Professional PDF layout',
    sleek: true,
    excel: false,
    word: false,
  },
  {
    label: 'Automatic tax & totals',
    sleek: true,
    excel: 'depends',
    word: 'depends',
  },
  {
    label: 'Country-specific labels (GST, VAT, …)',
    sleek: true,
    excel: false,
    word: false,
  },
  {
    label: 'Works in the browser — no install',
    sleek: true,
    excel: false,
    word: false,
  },
  {
    label: 'Ready in under 2 minutes',
    sleek: true,
    excel: 'depends',
    word: 'depends',
  },
]

function Cell({ value }) {
  if (value === true) {
    return (
      <td className="px-3 py-3 text-center">
        <Check
          className="mx-auto size-5 text-ds-primary"
          strokeWidth={2.5}
          aria-label="Yes"
        />
      </td>
    )
  }
  if (value === false) {
    return (
      <td className="px-3 py-3 text-center text-slate-300">
        <X className="mx-auto size-5" strokeWidth={2} aria-label="No" />
      </td>
    )
  }
  return (
    <td className="px-3 py-3 text-center text-xs text-slate-500 sm:text-sm">
      Depends on setup
    </td>
  )
}

export function InvoiceComparisonSection() {
  return (
    <section
      className="sleek-comparison shrink-0 border-t border-gray-200/80 bg-white px-4 py-14 sm:py-16"
      aria-labelledby="comparison-heading"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id="comparison-heading"
          className="text-center text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          Free invoice generator vs Excel vs Word
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-pretty text-base text-slate-600 sm:text-lg">
          See why teams pick a purpose-built tool over generic documents.
        </p>
        <div className="mt-10 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="px-4 py-3 font-semibold sm:px-5">Feature</th>
                <th className="bg-ds-primary px-4 py-3 text-center font-semibold sm:px-5">
                  Sleek
                </th>
                <th className="px-4 py-3 text-center font-semibold sm:px-5">
                  Excel
                </th>
                <th className="px-4 py-3 text-center font-semibold sm:px-5">
                  Word
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {rows.map((row, idx) => (
                <tr
                  key={row.label}
                  className={idx % 2 === 1 ? 'bg-slate-50/80' : ''}
                >
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-slate-800 sm:px-5"
                  >
                    {row.label}
                  </th>
                  <Cell value={row.sleek} />
                  <Cell value={row.excel} />
                  <Cell value={row.word} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
