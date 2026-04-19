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
        'invoice-preview-panel flex min-h-0 min-w-0 flex-col overflow-y-auto bg-transparent px-0 pb-4 lg:pl-6',
        className,
      )}
    >
      <div className="w-full">
        <h2 className="mb-2 font-semibold text-[#040015]">
          Invoice preview
        </h2>
        <div className="w-full print:block print:scale-100">
          <div className="w-full min-w-0 origin-top print:scale-100">
            <div
              ref={ref}
              className="sleek-invoice-print-root w-full max-w-none rounded border border-neutral-200/90 bg-white p-5 shadow-sm print:w-full print:border-0 print:p-8 print:shadow-none sm:p-6 md:p-7"
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
        </div>
      </div>
    </aside>
  )
})

InvoicePreviewPanel.displayName = 'InvoicePreviewPanel'
