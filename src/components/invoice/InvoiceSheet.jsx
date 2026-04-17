import { User } from 'lucide-react'
import { formatInvoiceAddress, formatMoney } from '../../invoice/utils.js'

const labelClass = 'text-xs font-semibold leading-tight text-fg-muted'
const valueClass =
  'mt-1.5 text-sm font-normal leading-snug text-fg'

function MetaBlock({ label, children }) {
  return (
    <div>
      <div className={labelClass}>{label}</div>
      <div className={valueClass}>{children}</div>
    </div>
  )
}

export function InvoiceSheet({
  form,
  billTo,
  issueDisplay,
  dueDisplay,
  lineAmounts,
  subtotal,
  totals,
}) {
  const addressBlock = formatInvoiceAddress(form)
  const t = totals ?? {
    itemsSubtotal: subtotal,
    taxAmount: 0,
    discountAmount: 0,
    grandTotal: subtotal,
  }
  const cur = form.currency

  const logoBlock = form.logoDataUrl ? (
    <div className="invoice-sheet__logo flex size-[72px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-white">
      <img
        src={form.logoDataUrl}
        alt=""
        className="max-h-[72px] max-w-[72px] object-contain"
      />
    </div>
  ) : (
    <div
      className="invoice-sheet__logo flex size-[72px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-neutral-200 to-neutral-300 text-neutral-500"
      aria-hidden
    >
      <User className="size-9 stroke-[1.25]" aria-hidden />
    </div>
  )

  return (
    <div className="invoice-sheet text-base font-normal leading-normal text-fg antialiased">
      <div className="invoice-sheet__header mb-10 flex items-start justify-between gap-4">
        <h3 className="min-w-0 flex-1 text-[1.375rem] font-semibold leading-snug tracking-tight text-fg-strong">
          Invoice
        </h3>
        {logoBlock}
      </div>

      <div className="invoice-sheet__meta mb-12 grid grid-cols-1 items-start gap-10 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] sm:gap-x-10 sm:gap-y-0">
        <div className="flex flex-col gap-7">
          <MetaBlock label="Number">
            {form.invoiceNumber || '—'}
          </MetaBlock>
          <MetaBlock label="Issue date">{issueDisplay}</MetaBlock>
          <MetaBlock label="Due date">{dueDisplay}</MetaBlock>
        </div>

        <div className="flex flex-col gap-7">
          <MetaBlock label="Bill to">
            <span className="whitespace-pre-line">{billTo}</span>
          </MetaBlock>
          <MetaBlock label="From">
            <span className="whitespace-pre-line">
              {form.companyName?.trim() || '—'}
            </span>
          </MetaBlock>
          {addressBlock ? (
            <div>
              <div className={labelClass}>Address</div>
              <div className={`${valueClass} whitespace-pre-line text-fg-secondary`}>
                {addressBlock}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="invoice-sheet__table-card mb-10 overflow-hidden rounded-lg border border-neutral-200 bg-white">
        <div className="invoice-sheet__table-scroll overflow-x-auto">
          <table className="sleek-invoice-sheet-table w-full border-collapse text-[14px]">
            <thead>
              <tr className="bg-neutral-100">
                <th className="px-4 py-3 text-left text-xs font-bold text-fg-strong">
                  Description
                </th>
                <th className="w-[4.5rem] px-4 py-3 text-right text-xs font-bold text-fg-strong">
                  Qty
                </th>
                <th className="px-4 py-3 text-right text-xs font-bold text-fg-strong">
                  Unit price
                </th>
                <th className="px-4 py-3 text-right text-xs font-bold text-fg-strong">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {form.items.map((item, i) => (
                <tr key={item.id}>
                  <td className="px-4 py-3.5 text-fg-body">
                    {item.description.trim() || 'Item description'}
                  </td>
                  <td className="px-4 py-3.5 text-right tabular-nums text-fg-body">
                    {item.qty || '0'}
                  </td>
                  <td className="px-4 py-3.5 text-right tabular-nums text-fg-body">
                    {formatMoney(parseFloat(item.unitPrice) || 0, cur)}
                  </td>
                  <td className="px-4 py-3.5 text-right tabular-nums text-fg-body">
                    {formatMoney(lineAmounts[i], cur)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* No border-t here: last table row already has a bottom rule; avoids a doubled line with themes. */}
        <div className="invoice-sheet__totals space-y-1 bg-white px-4 py-3.5 text-[14px]">
          <div className="invoice-sheet__total-row flex items-center justify-between gap-4">
            <span className="text-xs font-medium uppercase tracking-wide text-fg-muted">
              Subtotal
            </span>
            <span className="tabular-nums font-medium text-fg-body">
              {formatMoney(t.itemsSubtotal, cur)}
            </span>
          </div>
          {form.taxEnabled ? (
            <div className="invoice-sheet__total-row flex items-center justify-between gap-4">
              <span className="text-xs font-medium uppercase tracking-wide text-fg-muted">
                GST
              </span>
              <span className="tabular-nums font-medium text-fg-body">
                {formatMoney(t.taxAmount, cur)}
              </span>
            </div>
          ) : null}
          {t.discountAmount > 1e-9 ? (
            <div className="invoice-sheet__total-row flex items-center justify-between gap-4">
              <span className="text-xs font-medium uppercase tracking-wide text-fg-muted">
                Discount
              </span>
              <span className="tabular-nums font-medium text-fg-body">
                {formatMoney(-t.discountAmount, cur)}
              </span>
            </div>
          ) : null}
          <div className="my-2 border-t border-neutral-200/90" />
          <div className="invoice-sheet__total-row invoice-sheet__total-row--grand flex items-center justify-between gap-4 pt-0.5">
            <span className="text-sm font-bold text-fg-strong">Total</span>
            <span className="text-sm font-bold tabular-nums text-accent">
              {formatMoney(t.grandTotal, cur)}
            </span>
          </div>
        </div>
      </div>

      {form.notes.trim() ? (
        <div className="mb-10">
          <h4 className="mb-3 text-xs font-semibold text-fg-strong">Notes</h4>
          <p className="whitespace-pre-line text-[14px] leading-relaxed text-fg-secondary">
            {form.notes}
          </p>
        </div>
      ) : null}

      {form.bankDetailsText.trim() ? (
        <div className="mt-2">
          <h4 className="mb-3 text-xs font-semibold text-fg-strong">
            Bank details
          </h4>
          <div className="space-y-1.5 text-sm leading-relaxed text-fg-secondary">
            {form.bankDetailsText.split('\n').map((line, idx) => (
              <p key={idx}>{line || '\u00a0'}</p>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
