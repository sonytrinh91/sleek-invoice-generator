import { useMemo, useRef } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useReactToPrint } from 'react-to-print'
import { format, isValid } from 'date-fns'
import { AddressSection } from './components/invoice/AddressSection.jsx'
import { CompanySection } from './components/invoice/CompanySection.jsx'
import { BankDetailsSection } from './components/invoice/BankDetailsSection.jsx'
import { CreateInvoiceHeader } from './components/invoice/CreateInvoiceHeader.jsx'
import { CurrencySection } from './components/invoice/CurrencySection.jsx'
import { CustomerSection } from './components/invoice/CustomerSection.jsx'
import { InvoiceDetailsSection } from './components/invoice/InvoiceDetailsSection.jsx'
import { InvoiceFooter } from './components/invoice/InvoiceFooter.jsx'
import { InvoicePreviewPanel } from './components/invoice/InvoicePreviewPanel.jsx'
import { ItemsSection } from './components/invoice/ItemsSection.jsx'
import { NotesSection } from './components/invoice/NotesSection.jsx'
import { PaymentTermsSection } from './components/invoice/PaymentTermsSection.jsx'
import { DISPLAY_DATE_FORMAT } from './invoice/constants.js'
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
    <div className="flex h-dvh flex-col overflow-hidden bg-white font-sans text-neutral-800">
      <CreateInvoiceHeader />

      <div className="flex min-h-0 flex-1 flex-row">
        <section
          aria-label="Invoice form"
          className="w-1/2 min-w-0 overflow-y-auto border-r border-gray-200 px-6 py-6"
        >
          <form
            noValidate
            className="contents"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="mx-auto max-w-2xl space-y-5">
              <CompanySection />
              <CustomerSection />
              <AddressSection />
              <InvoiceDetailsSection />
              <CurrencySection />
              <ItemsSection />
              <NotesSection />
              <BankDetailsSection />
              <PaymentTermsSection />
            </div>
          </form>
        </section>

        <InvoicePreviewPanel
          ref={printRef}
          form={form}
          billTo={billTo}
          issueDisplay={issueDisplay}
          dueDisplay={dueDisplay}
          lineAmounts={lineAmounts}
          subtotal={subtotal}
        />
      </div>

      <InvoiceFooter
        onDownload={() => handlePrint()}
        downloadDisabled={!canDownload}
      />
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
