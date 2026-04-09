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
import { HeroSection } from './components/HeroSection.jsx'
import { FaqSection } from './components/FaqSection.jsx'
import { ReadyToGoSection } from './components/ReadyToGoSection.jsx'
import { MoreThanInvoicingSection } from './components/MoreThanInvoicingSection.jsx'
import { TrustedBySection } from './components/TrustedBySection.jsx'
import { WhySleekSection } from './components/WhySleekSection.jsx'
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
    <div className="flex w-full flex-col">
      {/*
        Grid + items-start: preview column does not stretch to row height (required for sticky).
        Do not use flex-1 here — it caps height to the viewport and makes the form paint over sections below.
        Scroll container is #sleek-invoice-app (see index.css); preview uses lg:sticky lg:top-6.
      */}
      <div className="sleek-workspace-columns grid w-full grid-cols-1 items-start gap-y-10 lg:grid-cols-12 lg:gap-x-0 lg:gap-y-0">
        <section
          aria-label="Invoice form"
          className="invoice-form-panel w-full border-gray-200 px-6 py-6 lg:col-span-7 lg:border-r lg:pr-8"
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
                  'sleek-download-btn sleek-ds-btn sleek-ds-btn--primary w-full max-w-full cursor-pointer rounded-md px-5 py-3 text-sm font-medium transition',
                  'disabled:cursor-not-allowed disabled:opacity-45',
                )}
              >
                Download
              </button>
            </div>
          </form>
        </section>

        <div className="w-full self-start lg:col-span-5">
          <div className="lg:sticky lg:top-6 lg:z-10">
            <InvoicePreviewPanel
              ref={printRef}
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
      <div className="flex w-full flex-col bg-white font-sans text-neutral-800">
        <HeroSection />
        {/*
          No flex-1 on this wrapper: flex-1 + min-h-0 on ancestors was shrinking the workspace to
          viewport height while the form stayed taller, so fields overlapped Why Sleek / Trusted.
          Scroll lives on #sleek-invoice-app only — avoid nested overflow-y-auto (breaks sticky).
        */}
        <div className="flex w-full flex-col min-h-[min(750px,80dvh)]">
          <InvoiceWorkspace printRef={printRef} />
        </div>
        <WhySleekSection />
        <TrustedBySection />
        <MoreThanInvoicingSection />
        <FaqSection />
        <ReadyToGoSection />
      </div>
    </FormProvider>
  )
}
