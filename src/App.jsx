import { useMemo, useRef, useState, useCallback } from 'react'
import { useReactToPrint } from 'react-to-print'
import { format, isValid } from 'date-fns'
import { AddressSection } from './components/invoice/AddressSection.jsx'
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
import { isEmailFieldValid } from './invoice/validation.js'
import {
  bankDetailsFor,
  computeDueDate,
  initialForm,
  lineAmount,
  newLineItem,
  parseIssueDate,
} from './invoice/utils.js'

export default function App() {
  const [form, setForm] = useState(initialForm)
  const [showCustomerErrors, setShowCustomerErrors] = useState(false)
  const printRef = useRef(null)

  const setPatch = useCallback((patch) => {
    setForm((f) => ({ ...f, ...patch }))
  }, [])

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

  const { subtotal, lineAmounts } = useMemo(() => {
    const amounts = form.items.map((it) =>
      lineAmount(it.qty, it.unitPrice),
    )
    return {
      lineAmounts: amounts,
      subtotal: amounts.reduce((a, b) => a + b, 0),
    }
  }, [form.items])

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

  const updateItem = (id, patch) => {
    setForm((f) => ({
      ...f,
      items: f.items.map((it) => (it.id === id ? { ...it, ...patch } : it)),
    }))
  }

  const addLineItem = () => {
    setForm((f) => ({ ...f, items: [...f.items, newLineItem()] }))
  }

  const removeLineItem = (id) => {
    setForm((f) => {
      if (f.items.length <= 1) return f
      return { ...f, items: f.items.filter((it) => it.id !== id) }
    })
  }

  const onBankChange = (e) => {
    const id = e.target.value
    setForm((f) => ({
      ...f,
      selectedBankId: id,
      bankDetailsText: bankDetailsFor(id),
    }))
  }

  const issueDisplay = isValid(issueDateParsed)
    ? format(issueDateParsed, 'dd-MM-yyyy')
    : '—'
  const dueDisplay = dueDate ? format(dueDate, 'dd-MM-yyyy') : '—'

  const billTo =
    [form.customerName, form.customerEmail].filter(Boolean).join(', ') ||
    'Customer Name, customer@email.com'

  const handleSend = () => {
    if (!isEmailFieldValid(form.customerEmail)) {
      setShowCustomerErrors(true)
      return
    }
    window.alert(`Invoice would be sent to ${form.customerEmail}`)
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-white font-sans text-neutral-800">
      <CreateInvoiceHeader />

      <div className="flex min-h-0 flex-1 flex-row">
        <section
          aria-label="Invoice form"
          className="w-1/2 min-w-0 overflow-y-auto border-r border-gray-200 px-6 py-6"
        >
          <div className="mx-auto max-w-2xl space-y-5">
            <CustomerSection
              customerName={form.customerName}
              customerEmail={form.customerEmail}
              onChange={setPatch}
              showCustomerErrors={showCustomerErrors}
            />
            <AddressSection
              addressVisible={form.addressVisible}
              addressLine1={form.addressLine1}
              addressLine2={form.addressLine2}
              postalCode={form.postalCode}
              country={form.country}
              onChange={setPatch}
            />
            <InvoiceDetailsSection
              invoiceNumber={form.invoiceNumber}
              issueDate={form.issueDate}
              onChange={setPatch}
            />
            <CurrencySection currency={form.currency} onChange={setPatch} />
            <ItemsSection
              items={form.items}
              currency={form.currency}
              lineAmounts={lineAmounts}
              subtotal={subtotal}
              onUpdateItem={updateItem}
              onAddItem={addLineItem}
              onRemoveItem={removeLineItem}
            />
            <NotesSection notes={form.notes} onChange={setPatch} />
            <BankDetailsSection
              selectedBankId={form.selectedBankId}
              bankDetailsText={form.bankDetailsText}
              onBankChange={onBankChange}
              onChange={setPatch}
            />
            <PaymentTermsSection
              paymentTerms={form.paymentTerms}
              onChange={setPatch}
            />
          </div>
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
        onSend={handleSend}
      />
    </div>
  )
}
