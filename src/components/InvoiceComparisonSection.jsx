const columns = [
  'Feature',
  'Sleek Free Invoice Generator',
  'Excel / Word Template',
  'Other Paid Tools',
]

const rows = [
  {
    feature: 'Create invoice online, no software to install',
    sleek: { type: 'check' },
    excel: { type: 'muted', text: 'Desktop app required' },
    other: { type: 'check' },
  },
  {
    feature: 'Auto-calculated totals and tax',
    sleek: { type: 'check' },
    excel: { type: 'muted', text: 'Manual formulas' },
    other: { type: 'check' },
  },
  {
    feature: 'Professional PDF in one click',
    sleek: { type: 'check' },
    excel: { type: 'muted', text: 'Export required' },
    other: { type: 'check' },
  },
  {
    feature: 'No account or credit card required',
    sleek: { type: 'check' },
    excel: { type: 'check' },
    other: { type: 'muted', text: 'Usually no' },
  },
  {
    feature: 'Completely free to use',
    sleek: { type: 'check' },
    excel: { type: 'check' },
    other: { type: 'muted', text: 'Paid subscription' },
  },
  {
    feature: "Upgrades to full accounting when you're ready",
    sleek: { type: 'check' },
    excel: { type: 'muted', text: 'No' },
    other: { type: 'muted', text: 'No' },
  },
]

function DataCell({ cell, highlight }) {
  const base =
    'border-b border-[#F1F3F5] px-5 py-3 text-center text-sm text-[#495057]'
  const hl = `${base} bg-[#F0F5FF] font-semibold text-[#040015]`

  if (cell.type === 'check') {
    return (
      <td className={highlight ? hl : base}>
        <span className="font-bold text-[#00C853]">✓</span>
      </td>
    )
  }
  return (
    <td className={`${base} text-[#DEE2E6]`}>{cell.text}</td>
  )
}

export function InvoiceComparisonSection() {
  return (
    <section
      className="sleek-comparison shrink-0 border-t border-[#E9ECEF] bg-white py-20 sm:py-20"
      aria-labelledby="comparison-heading"
    >
      <div className="sleek-page-container">
        <div className="mb-4 text-center">
          <h2
            id="comparison-heading"
            className="text-balance text-2xl font-extrabold tracking-tight text-[#040015] sm:text-3xl"
          >
            Free invoice generator vs Excel vs Word
          </h2>
          <p className="mt-2.5 text-pretty text-[0.9375rem] leading-relaxed text-[#6C757D]">
            Why businesses switch from Excel and Word to Sleek&apos;s free invoice software -
            the faster, smarter online invoice template.
          </p>
        </div>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr>
                <th className="rounded-tl-xl bg-[#1A2E5A] px-5 py-3.5 text-sm font-bold text-white">
                  {columns[0]}
                </th>
                <th className="bg-[#0F6DFA] px-5 py-3.5 text-center text-sm font-bold text-white">
                  {columns[1]}
                </th>
                <th className="bg-[#1A2E5A] px-5 py-3.5 text-center text-sm font-bold text-white">
                  {columns[2]}
                </th>
                <th className="rounded-tr-xl bg-[#1A2E5A] px-5 py-3.5 text-center text-sm font-bold text-white">
                  {columns[3]}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.feature} className="last:[&>th]:border-b-0 last:[&>td]:border-b-0">
                  <th
                    scope="row"
                    className="border-b border-[#F1F3F5] px-5 py-3 text-left text-sm font-normal text-[#495057]"
                  >
                    {row.feature}
                  </th>
                  <DataCell cell={row.sleek} highlight />
                  <DataCell cell={row.excel} highlight={false} />
                  <DataCell cell={row.other} highlight={false} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
