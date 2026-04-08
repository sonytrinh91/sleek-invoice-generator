import { clsx } from 'clsx'
import { forwardRef } from 'react'
import { InvoiceSheet } from './InvoiceSheet.jsx'

export const InvoicePreviewPanel = forwardRef(function InvoicePreviewPanel(
  { form, billTo, issueDisplay, dueDisplay, lineAmounts, subtotal, totals, className },
  ref,
) {
  return (
    <aside
      aria-label="Invoice preview"
      className={clsx(
        'invoice-preview-panel flex min-h-0 min-w-0 flex-col overflow-y-auto bg-transparent px-6 py-6',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-xl">
        <h2 className="mb-3 text-base font-semibold text-gray-900">
          Invoice Preview
        </h2>
        <div
          ref={ref}
          className="rounded border border-neutral-200/90 bg-white p-9 print:border-0 print:p-8 print:shadow-none md:p-10"
        >
          <InvoiceSheet
            form={form}
            billTo={billTo}
            issueDisplay={issueDisplay}
            dueDisplay={dueDisplay}
            lineAmounts={lineAmounts}
            subtotal={subtotal}
            totals={totals}
          />
        </div>
      </div>
    </aside>
  )
})

InvoicePreviewPanel.displayName = 'InvoicePreviewPanel'
