const LOGO_SRC =
  'https://sleek.com/sg/wp-content/uploads/sites/3/2022/06/Sleek-Logo-01-ORIGINAL.png'

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

function ComparisonCell({ cell, highlight }) {
  if (cell.type === 'check') {
    return (
      <td
        className={
          highlight
            ? 'comparison-cell comparison-cell--highlight'
            : 'comparison-cell'
        }
      >
        <span className="comparison-check" aria-hidden>
          &#10004;
        </span>
      </td>
    )
  }
  return (
    <td
      className={
        highlight
          ? 'comparison-cell comparison-cell--muted comparison-cell--highlight'
          : 'comparison-cell comparison-cell--muted'
      }
    >
      {cell.text}
    </td>
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
          <p className="mt-2.5 text-pretty text-[0.9375rem] leading-relaxed text-[#040015]">
            Why businesses switch from Excel and Word to Sleek&apos;s free invoice software -
            the faster, smarter online invoice template.
          </p>
        </div>
        <div className="comparison-table-wrapper">
          <div className="comparison-table comparison-table--framed">
            <table>
              <thead>
                <tr className="logo-row">
                  <th aria-hidden />
                  <th>
                    <img
                      src={LOGO_SRC}
                      alt="Sleek"
                      className="header-logo"
                      width={120}
                      height={40}
                    />
                  </th>
                  <th aria-hidden />
                  <th aria-hidden />
                </tr>
                <tr className="comparison-header-titles">
                  <th scope="col">{columns[0]}</th>
                  <th scope="col">{columns[1]}</th>
                  <th scope="col">{columns[2]}</th>
                  <th scope="col">{columns[3]}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={
                      i === rows.length - 1 ? 'last-row' : undefined
                    }
                  >
                    <th scope="row" className="comparison-feature">
                      <strong>{row.feature}</strong>
                    </th>
                    <ComparisonCell cell={row.sleek} highlight />
                    <ComparisonCell cell={row.excel} highlight={false} />
                    <ComparisonCell cell={row.other} highlight={false} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
