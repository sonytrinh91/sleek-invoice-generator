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
// import { HeroSection } from './components/HeroSection.jsx'
// import { FaqSection } from './components/FaqSection.jsx'
// import { ReadyToGoSection } from './components/ReadyToGoSection.jsx'
// import { MoreThanInvoicingSection } from './components/MoreThanInvoicingSection.jsx'
// import { TrustedBySection } from './components/TrustedBySection.jsx'
// import { WhySleekSection } from './components/WhySleekSection.jsx'
// import { SimplicitySection } from './components/SimplicitySection.jsx'
// import { HowToCreateSection } from './components/HowToCreateSection.jsx'
// import { InvoiceComparisonSection } from './components/InvoiceComparisonSection.jsx'
import { SubtotalSection } from './components/invoice/SubtotalSection.jsx'
import { DISPLAY_DATE_FORMAT } from './invoice/constants.js'
import { computeInvoiceTotals } from './invoice/invoiceTotals.js'
import { invoiceFormSchema } from './invoice/invoiceSchema.js'
import { submitZapierDownloadLead } from './integrations/zapierDownloadWebhook.js'
import { fireHostEvent } from './invoice/hostFireEvent.js'
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
    documentTitle: () => '',
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
      <div className="sleek-workspace-columns grid w-full grid-cols-1 items-start gap-y-10 lg:grid-cols-12 lg:items-stretch lg:gap-x-0 lg:gap-y-0">
        <section
          aria-label="Invoice form"
          className="invoice-form-panel w-full border-gray-200 px-0 lg:col-span-6 lg:pr-4 pb-4"
        >
          <form
            noValidate
            className="contents"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="w-full space-y-5">
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
                id="download-invoice-pdf-button"
                type="button"
                disabled={!canDownload}
                onClick={() => {
                  if (canDownload) {
                    fireHostEvent('SG_CTA_Tool_Invoice_Generator_Active_Download_1')
                    submitZapierDownloadLead(form)
                  }
                  handlePrint()
                }}
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

        <div className="flex w-full min-h-0 flex-col lg:col-span-6">
          <div className="w-full">
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
      <div className="flex w-full flex-col bg-white font-sans text-neutral-800 py-5">
        {/* <HeroSection /> */}
        <div className="flex w-full flex-col bg-white">
          {/* <div className="sleek-tool-intro sleek-page-container pb-2 pt-11">
            <h2>Create an Invoice Online in Seconds</h2>
            <p className="mb-7 mt-1.5 max-w-3xl text-[0.9375rem] leading-relaxed ">
              Fill in the form below and get a professional online invoice template ready to
              download as PDF instantly - free, no account needed.
            </p>
          </div> */}
          <div className="flex w-full flex-col">
            <div className="sleek-page-container">
              <InvoiceWorkspace printRef={printRef} />
            </div>
          </div>
        </div>
        {/* <WhySleekSection />
        <TrustedBySection />
        <SimplicitySection />
        <HowToCreateSection />
        <InvoiceComparisonSection />
        <MoreThanInvoicingSection />
        <FaqSection />
        <ReadyToGoSection /> */}
      </div>
    </FormProvider>
  )
}
