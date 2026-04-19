import { clsx } from "clsx";
import { useMemo, useRef } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReactToPrint } from "react-to-print";
import { format, isValid } from "date-fns";
import { AddressSection } from "./components/invoice/AddressSection.jsx";
import { CompanySection } from "./components/invoice/CompanySection.jsx";
import { BankDetailsSection } from "./components/invoice/BankDetailsSection.jsx";
import { CustomerSection } from "./components/invoice/CustomerSection.jsx";
import { DocumentSection } from "./components/invoice/DocumentSection.jsx";
import { InvoicePaymentSection } from "./components/invoice/InvoicePaymentSection.jsx";
import { InvoicePreviewPanel } from "./components/invoice/InvoicePreviewPanel.jsx";
import { ItemsSection } from "./components/invoice/ItemsSection.jsx";
import { NotesSection } from "./components/invoice/NotesSection.jsx";
import { SubtotalSection } from "./components/invoice/SubtotalSection.jsx";
import {
  DEMO_CUSTOMER_EMAIL,
  DEMO_CUSTOMER_NAME,
  DISPLAY_DATE_FORMAT,
} from "./invoice/constants.js";
import { computeInvoiceTotals } from "./invoice/invoiceTotals.js";
import { invoiceFormSchema } from "./invoice/invoiceSchema.js";
import { submitZapierDownloadLead } from "./integrations/zapierDownloadWebhook.js";
import { isInvoiceDownloadReady } from "./invoice/validation.js";
import {
  computeDueDate,
  initialForm,
  lineAmount,
  parseIssueDate,
} from "./invoice/utils.js";

function InvoiceWorkspace({ printRef }) {
  const form = useWatch();

  const issueDateParsed = useMemo(
    () => parseIssueDate(form.issueDate),
    [form.issueDate],
  );
  const dueDate = useMemo(
    () =>
      isValid(issueDateParsed)
        ? computeDueDate(form.issueDate, form.paymentTerms)
        : null,
    [form.issueDate, form.paymentTerms, issueDateParsed],
  );

  const lineAmounts = (form.items ?? []).map((it) =>
    lineAmount(it.qty, it.unitPrice),
  );
  const subtotal = lineAmounts.reduce((a, b) => a + b, 0);

  const totals = useMemo(
    () => computeInvoiceTotals(form, subtotal),
    [form, subtotal],
  );

  const canDownload = useMemo(() => isInvoiceDownloadReady(form), [form]);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: () => "",
    pageStyle: `
      @page { margin: 12mm; size: auto; }
      @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
    `,
  });

  const issueDisplay = isValid(issueDateParsed)
    ? format(issueDateParsed, DISPLAY_DATE_FORMAT)
    : "—";
  const dueDisplay = dueDate ? format(dueDate, DISPLAY_DATE_FORMAT) : "—";

  /** Invoice preview only: demo placeholders when fields empty (not form defaults). */
  const billTo = [
    form.customerName?.trim() || DEMO_CUSTOMER_NAME,
    form.customerEmail?.trim() || DEMO_CUSTOMER_EMAIL,
  ].join("\n");

  return (
    <div className="flex w-full flex-col relative p-4">
      <div className="sleek-workspace-columns grid w-full grid-cols-1 items-start gap-y-10 lg:grid-cols-12 lg:items-start lg:gap-x-0 lg:gap-y-0">
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
                    submitZapierDownloadLead(form);
                  }
                  handlePrint();
                }}
                className={clsx(
                  "sleek-download-btn sleek-ds-btn sleek-ds-btn--primary w-full max-w-full cursor-pointer rounded-md px-5 py-3 text-sm font-medium transition",
                  "disabled:cursor-not-allowed disabled:opacity-45",
                )}
              >
                Download
              </button>
            </div>
          </form>
        </section>

        <div className="w-full lg:col-span-6 lg:sticky lg:top-10 self-start overflow-y-auto hidden-scrollbar">
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
  );
}

export default function App() {
  const printRef = useRef(null);
  const methods = useForm({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: initialForm(),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <div className="flex w-full flex-col bg-white font-sans">
        <InvoiceWorkspace printRef={printRef} />
      </div>
    </FormProvider>
  );
}
