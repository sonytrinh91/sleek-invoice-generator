import { User } from 'lucide-react'
import { formatInvoiceAddress, formatMoney } from '../../invoice/utils.js'

const labelClass = 'text-[13px] font-normal leading-tight text-fg-muted'
const valueClass =
  'mt-1.5 text-[15px] font-normal leading-snug text-fg'

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
}) {
  const addressBlock = formatInvoiceAddress(form)

  return (
    <div className="text-[15px] leading-relaxed text-fg antialiased">
      <h3 className="mb-10 text-[28px] font-bold leading-tight tracking-tight text-fg-strong">
        Invoice
      </h3>

      <div className="mb-12 grid grid-cols-1 items-start gap-10 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_auto] sm:gap-x-10 sm:gap-y-0">
        <div className="flex flex-col gap-7">
          <MetaBlock label="Invoice number">
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

        {form.logoDataUrl ? (
          <div className="flex size-[72px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-white sm:justify-self-end">
            <img
              src={form.logoDataUrl}
              alt=""
              className="max-h-[72px] max-w-[72px] object-contain"
            />
          </div>
        ) : (
          <div
            className="flex size-[72px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-neutral-200 to-neutral-300 text-neutral-500 sm:justify-self-end"
            aria-hidden
          >
            <User className="size-9 stroke-[1.25]" aria-hidden />
          </div>
        )}
      </div>

      <div className="mb-10 overflow-hidden rounded-lg border border-neutral-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[14px]">
            <thead>
              <tr className="bg-neutral-100">
                <th className="border-b border-neutral-200/90 px-4 py-3 text-left text-[13px] font-bold text-fg-strong">
                  Description
                </th>
                <th className="w-[4.5rem] border-b border-neutral-200/90 px-4 py-3 text-right text-[13px] font-bold text-fg-strong">
                  Qty
                </th>
                <th className="border-b border-neutral-200/90 px-4 py-3 text-right text-[13px] font-bold text-fg-strong">
                  Unit price
                </th>
                <th className="border-b border-neutral-200/90 px-4 py-3 text-right text-[13px] font-bold text-fg-strong">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {form.items.map((item, i) => (
                <tr key={item.id}>
                  <td className="border-b border-neutral-100 px-4 py-3.5 text-fg-body">
                    {item.description.trim() || 'Item description'}
                  </td>
                  <td className="border-b border-neutral-100 px-4 py-3.5 text-right tabular-nums text-fg-body">
                    {item.qty || '0'}
                  </td>
                  <td className="border-b border-neutral-100 px-4 py-3.5 text-right tabular-nums text-fg-body">
                    {formatMoney(parseFloat(item.unitPrice) || 0, form.currency)}
                  </td>
                  <td className="border-b border-neutral-100 px-4 py-3.5 text-right tabular-nums text-fg-body">
                    {formatMoney(lineAmounts[i], form.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-end gap-6 border-t border-neutral-200 bg-white px-4 py-3.5">
          <span className="text-[15px] font-bold text-fg-strong">Total</span>
          <span className="text-[15px] font-bold tabular-nums text-fg-strong">
            {formatMoney(subtotal, form.currency)}
          </span>
        </div>
      </div>

      {form.notes.trim() ? (
        <div className="mb-10">
          <h4 className="mb-3 text-[15px] font-bold text-fg-strong">Notes</h4>
          <p className="whitespace-pre-line text-[14px] leading-relaxed text-fg-secondary">
            {form.notes}
          </p>
        </div>
      ) : null}

      {form.bankDetailsText.trim() ? (
        <div className="mt-2">
          <h4 className="mb-3 text-[15px] font-bold text-fg-strong">
            Bank details
          </h4>
          <div className="space-y-1.5 text-[14px] leading-relaxed text-fg-secondary">
            {form.bankDetailsText.split('\n').map((line, idx) => (
              <p key={idx}>{line || '\u00a0'}</p>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
