import { forwardRef } from 'react'
import { InvoiceSheet } from './InvoiceSheet.jsx'

export const InvoicePreviewPanel = forwardRef(function InvoicePreviewPanel(
  { form, billTo, issueDisplay, dueDisplay, lineAmounts, subtotal },
  ref,
) {
  return (
    <aside className="w-full max-w-md shrink-0 lg:sticky lg:top-20 lg:self-start">
      <h2 className="mb-4 text-base font-semibold text-neutral-800">
        Invoice Preview
      </h2>
      <div
        ref={ref}
        className="rounded-lg border border-neutral-200 bg-white p-8 shadow-sm print:border-0 print:shadow-none"
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
    </aside>
  )
})

InvoicePreviewPanel.displayName = 'InvoicePreviewPanel'
