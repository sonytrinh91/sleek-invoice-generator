import { clsx } from 'clsx'
import { useMemo, useRef } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useReactToPrint } from 'react-to-print'
import { format, isValid } from 'date-fns'
import { AddressSection } from './components/invoice/AddressSection.jsx'
import { CompanySection } from './components/invoice/CompanySection.jsx'
import { BankDetailsSection } from './components/invoice/BankDetailsSection.jsx'
import { CustomerSection } from './components/invoice/CustomerSection.jsx'
import { DocumentSection } from './components/invoice/DocumentSection.jsx'
import { InvoicePaymentSection } from './components/invoice/InvoicePaymentSection.jsx'
import { InvoicePreviewPanel } from './components/invoice/InvoicePreviewPanel.jsx'
import { ItemsSection } from './components/invoice/ItemsSection.jsx'
import { NotesSection } from './components/invoice/NotesSection.jsx'
import { SubtotalSection } from './components/invoice/SubtotalSection.jsx'
import { DISPLAY_DATE_FORMAT } from './invoice/constants.js'
import { computeInvoiceTotals } from './invoice/invoiceTotals.js'
import { invoiceFormSchema } from './invoice/invoiceSchema.js'
import { isInvoiceDownloadReady } from './invoice/validation.js'
import {
  computeDueDate,
  initialForm,
  lineAmount,
  parseIssueDate,
} from './invoice/utils.js'

function InvoiceWorkspace({ printRef }) {
  const form = useWatch()

  const issueDateParsed = useMemo(
    () => parseIssueDate(form.issueDate),
    [form.issueDate],
  )
  const dueDate = useMemo(
    () =>
      isValid(issueDateParsed)
        ? computeDueDate(form.issueDate, form.paymentTerms)
        : null,
    [form.issueDate, form.paymentTerms, issueDateParsed],
  )

  const lineAmounts = (form.items ?? []).map((it) =>
    lineAmount(it.qty, it.unitPrice),
  )
  const subtotal = lineAmounts.reduce((a, b) => a + b, 0)

  const totals = useMemo(
    () => computeInvoiceTotals(form, subtotal),
    [form, subtotal],
  )

  const canDownload = useMemo(
    () => isInvoiceDownloadReady(form),
    [form],
  )

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: () => `Invoice-${form.invoiceNumber}`,
    pageStyle: `
      @page { margin: 12mm; size: auto; }
      @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
    `,
  })

  const issueDisplay = isValid(issueDateParsed)
    ? format(issueDateParsed, DISPLAY_DATE_FORMAT)
    : '—'
  const dueDisplay = dueDate
    ? format(dueDate, DISPLAY_DATE_FORMAT)
    : '—'

  const billTo =
    [form.customerName, form.customerEmail].filter(Boolean).join(', ') ||
    'Customer Name, customer@email.com'

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-white font-sans text-neutral-800">
      {/*
        Master–detail: only the left column scrolls. The right preview stays in view (no window-level sticky).
      */}
      <div className="sleek-workspace-columns relative isolate min-h-0 w-full flex-1 overflow-hidden">
        <section
          aria-label="Invoice form"
          className="invoice-form-panel absolute inset-y-0 left-0 right-1/2 z-0 flex min-h-0 flex-col overflow-y-auto border-r border-gray-200 px-6 py-6"
        >
          <form
            noValidate
            className="contents"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="mx-auto max-w-2xl space-y-5">
              <DocumentSection />
              <CompanySection />
              <CustomerSection />
              <InvoicePaymentSection />
              <AddressSection />
              <ItemsSection />
              <NotesSection />
              <SubtotalSection />
              <BankDetailsSection />
              <button
                type="button"
                disabled={!canDownload}
                onClick={() => handlePrint()}
                className={clsx(
                  'sleek-download-btn w-full max-w-full cursor-pointer rounded-md px-5 py-3 text-sm font-medium text-white transition',
                  'bg-accent hover:bg-accent-hover',
                  'disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-accent',
                )}
              >
                Download
              </button>
            </div>
          </form>
        </section>

        <InvoicePreviewPanel
          ref={printRef}
          className="absolute inset-y-0 left-1/2 right-0 z-0"
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
  )
}

export default function App() {
  const printRef = useRef(null)
  const methods = useForm({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: initialForm(),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  return (
    <FormProvider {...methods}>
      <InvoiceWorkspace printRef={printRef} />
    </FormProvider>
  )
}
