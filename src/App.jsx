import { clsx } from "clsx";
import { Loader2 } from "lucide-react";
import { useMemo, useRef, useState } from "react";
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
import { submitInvoiceEmailToZapier } from "./integrations/zapierInvoiceEmailWebhook.js";
import { buildInvoiceZapierEmailPayload } from "./invoice/invoiceNotificationEmail.js";
import { isInvoiceDownloadReady } from "./invoice/validation.js";
import {
  computeDueDate,
  initialForm,
  lineAmount,
  parseIssueDate,
} from "./invoice/utils.js";

function InvoiceWorkspace({ printRef }) {
  const form = useWatch();
  const [emailSending, setEmailSending] = useState(false);

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
    /** Injected into the print iframe <head> (along with cloned app styles). Fonts + color accuracy. */
    pageStyle: `
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
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
  const dueDisplayLong = dueDate ? format(dueDate, "MMMM d, yyyy") : "—";

  /** Invoice preview only: demo placeholders when fields empty (not form defaults). */
  const billTo = [
    form.customerName?.trim() || DEMO_CUSTOMER_NAME,
    form.customerEmail?.trim() || DEMO_CUSTOMER_EMAIL,
  ].join("\n");

  async function handleSendInvoiceEmailClick() {
    if (!canDownload) return;
    setEmailSending(true);
    try {
      const base = buildInvoiceZapierEmailPayload(
        form,
        lineAmounts,
        totals,
        dueDisplayLong,
      );
      const res = await submitInvoiceEmailToZapier(base);
      if (res && !res.ok) {
        throw new Error(`Webhook HTTP ${res.status}`);
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Send invoice email failed:", err);
      }
    } finally {
      setEmailSending(false);
    }
  }

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
              <div className="flex w-full max-w-full flex-col gap-3 sm:flex-row sm:items-stretch">
                <button
                  id="send-invoice-email-button"
                  type="button"
                  disabled={!canDownload || emailSending}
                  aria-busy={emailSending}
                  aria-label={emailSending ? "Sending email" : undefined}
                  onClick={() => void handleSendInvoiceEmailClick()}
                  className={clsx(
                    "sleek-ds-btn sleek-ds-btn--outline w-full min-w-0 flex-1 cursor-pointer rounded-md px-5 py-3 text-sm font-medium transition",
                    "inline-flex min-h-11 items-center justify-center gap-2",
                    "disabled:cursor-not-allowed disabled:opacity-45",
                  )}
                >
                  {emailSending ? (
                    <Loader2
                      className="size-5 shrink-0 animate-spin text-current"
                      aria-hidden
                    />
                  ) : (
                    "Send email"
                  )}
                </button>
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
                    "sleek-download-btn sleek-ds-btn sleek-ds-btn--primary w-full min-w-0 flex-1 cursor-pointer rounded-md px-5 py-3 text-sm font-medium transition",
                    "disabled:cursor-not-allowed disabled:opacity-45",
                  )}
                >
                  Download
                </button>
              </div>
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
