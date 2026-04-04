import { formatInvoiceAddress, formatMoney } from '../../invoice/utils.js'

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
    <>
      <h3 className="mb-8 text-2xl font-bold text-neutral-900">Invoice</h3>
      <div className="mb-8 grid gap-6 text-sm sm:grid-cols-[1fr_1fr_auto]">
        <div className="space-y-1 text-neutral-600">
          <p>
            <span className="text-neutral-500">Invoice number: </span>
            {form.invoiceNumber || '—'}
          </p>
          <p>
            <span className="text-neutral-500">Issue date: </span>
            {issueDisplay}
          </p>
          <p>
            <span className="text-neutral-500">Due date: </span>
            {dueDisplay}
          </p>
        </div>
        <div className="space-y-2 text-neutral-600">
          <p>
            <span className="font-medium text-neutral-800">Bill to: </span>
            {billTo}
          </p>
          <p>
            <span className="font-medium text-neutral-800">From: </span>
            {form.companyName}
          </p>
          {addressBlock ? (
            <p className="whitespace-pre-line text-neutral-500">
              {addressBlock}
            </p>
          ) : null}
        </div>
        <div
          className="flex size-16 shrink-0 items-center justify-center rounded border border-dashed border-neutral-300 bg-neutral-50 text-[10px] text-neutral-400"
          aria-hidden
        >
          Logo
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-neutral-100 text-left text-neutral-700">
              <th className="border-b border-neutral-200 px-3 py-2 font-medium">
                Description
              </th>
              <th className="w-16 border-b border-neutral-200 px-3 py-2 font-medium">
                Qty
              </th>
              <th className="border-b border-neutral-200 px-3 py-2 font-medium">
                Unit price
              </th>
              <th className="border-b border-neutral-200 px-3 py-2 text-right font-medium">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {form.items.map((item, i) => (
              <tr key={item.id} className="text-neutral-700">
                <td className="border-b border-neutral-100 px-3 py-3">
                  {item.description.trim() || 'Item description'}
                </td>
                <td className="border-b border-neutral-100 px-3 py-3 tabular-nums">
                  {item.qty || '0'}
                </td>
                <td className="border-b border-neutral-100 px-3 py-3 tabular-nums">
                  {formatMoney(parseFloat(item.unitPrice) || 0, form.currency)}
                </td>
                <td className="border-b border-neutral-100 px-3 py-3 text-right tabular-nums">
                  {formatMoney(lineAmounts[i], form.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-right text-sm font-semibold text-neutral-900">
        Total: {formatMoney(subtotal, form.currency)}
      </p>

      {form.notes.trim() ? (
        <div className="mt-8 text-sm text-neutral-600">
          <p className="mb-1 font-medium text-neutral-800">Notes</p>
          <p className="whitespace-pre-line">{form.notes}</p>
        </div>
      ) : null}

      {form.bankDetailsText.trim() ? (
        <div className="mt-8 text-sm text-neutral-600">
          <p className="mb-2 font-medium text-neutral-800">Bank details</p>
          <p className="whitespace-pre-line">{form.bankDetailsText}</p>
        </div>
      ) : null}
    </>
  )
}
