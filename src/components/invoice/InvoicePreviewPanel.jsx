import { forwardRef } from 'react'
import { InvoiceSheet } from './InvoiceSheet.jsx'

export const InvoicePreviewPanel = forwardRef(function InvoicePreviewPanel(
  { form, billTo, issueDisplay, dueDisplay, lineAmounts, subtotal },
  ref,
) {
  return (
    <aside
      aria-label="Invoice preview"
      className="w-1/2 min-w-0 overflow-y-auto bg-neutral-50 px-6 py-6"
    >
      <div className="mx-auto max-w-xl">
        <h2 className="mb-3 text-base font-semibold text-gray-900">
          Invoice Preview
        </h2>
        <div
          ref={ref}
          className="rounded-lg border border-neutral-200/90 bg-white p-9 shadow-sm print:border-0 print:p-8 print:shadow-none md:p-10"
        >
          <InvoiceSheet
            form={form}
            billTo={billTo}
            issueDisplay={issueDisplay}
            dueDisplay={dueDisplay}
            lineAmounts={lineAmounts}
            subtotal={subtotal}
          />
        </div>
      </div>
    </aside>
  )
})

InvoicePreviewPanel.displayName = 'InvoicePreviewPanel'
