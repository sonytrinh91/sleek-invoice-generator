import { clsx } from 'clsx'
import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'

const faqsMain = [
  {
    question: 'Is this invoice generator really free?',
    answer:
      "Yes - completely free to create and download invoices as PDF. No account, no credit card required. To send invoices by email, track opens, accept online payments, and access your invoice history, you'll need a Sleek Accounting subscription.",
  },
  {
    question: 'Does this online invoice template work outside Singapore?',
    answer:
      "Yes. Sleek's free invoice software supports businesses in Singapore, Australia, the United Kingdom, the United States, Hong Kong, and more. Whether you need a Singapore invoice with GST and UEN, or a VAT invoice for the UK, the online invoice template adjusts automatically to match local requirements.",
  },
  {
    question: 'Can I send the invoice directly to my client?',
    answer:
      'You can download the PDF and email it yourself at no cost. With a Sleek Accounting subscription, you can send invoices directly from the platform and get notified the moment your client opens it - so you always know where you stand.',
  },
  {
    question: 'What happens to my invoice data?',
    answer:
      'Without an account, nothing is saved - your data stays in your browser only. With a Sleek Accounting subscription, your invoices are securely stored and accessible from any device at any time.',
  },
]

const faqsMore = [
  {
    question: 'What payment options are supported?',
    answer:
      'You can add your bank account details or a local payment method (PayNow in Singapore, PayID in Australia, BACS in the UK) directly on the invoice. Stripe payment links are coming soon to Sleek Accounting.',
  },
  {
    question: 'How does this help with my accounting?',
    answer:
      'Every invoice you create in Sleek is automatically synced with your accounting records when you subscribe to Sleek Accounting. Your invoicing history, tax records, and client data are already there - no manual data entry, no reconciliation headaches.',
  },
  {
    question: 'Can I track overdue or unpaid invoices?',
    answer:
      'Yes. With a Sleek Accounting subscription, your dashboard shows the live status of every invoice - Sent, Viewed, Paid, or Overdue. You can see at a glance which clients still owe you and follow up directly from the platform.',
  },
]

export function FaqSection() {
  const baseId = useId()
  const [openKey, setOpenKey] = useState(null)

  function renderItem(item, index, variant) {
    const isOpen = openKey === `${variant}-${index}`
    const panelId = `${baseId}-${variant}-panel-${index}`
    const buttonId = `${baseId}-${variant}-trigger-${index}`

    return (
      <div
        key={item.question}
        className={clsx(
          'overflow-hidden rounded-xl border transition-colors',
          variant === 'pink'
            ? clsx(
                'sleek-faq-item--pink border-[#F8BBD9] bg-[#FFF0F6]',
                isOpen && 'border-[#E91E8C]',
              )
            : clsx(
                'border-[#E9ECEF] bg-white',
                isOpen && 'border-[#0F6DFA]',
              ),
        )}
      >
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="sleek-faq-trigger flex w-full cursor-pointer flex-row flex-nowrap items-center justify-between gap-4 px-5 py-4 text-left sm:px-5 sm:py-[18px]"
          onClick={() =>
            setOpenKey((prev) =>
              prev === `${variant}-${index}` ? null : `${variant}-${index}`,
            )
          }
        >
          <span className="text-[0.9375rem] font-semibold leading-snug text-[#040015]">
            {item.question}
          </span>
          <ChevronDown
            className={clsx(
              'size-4 shrink-0 text-[#ADB5BD] transition-transform duration-200',
              isOpen && 'rotate-180 text-[#0F6DFA]',
            )}
            aria-hidden
          />
        </button>
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className={clsx(
            'grid transition-[grid-template-rows] duration-200 ease-out',
            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <div className="min-h-0 overflow-hidden" aria-hidden={!isOpen}>
            <p
              className={clsx(
                'border-t border-[#F1F3F5] px-5 pb-[18px] pt-3.5 text-sm leading-[1.7] text-[#6C757D]',
                isOpen && 'block',
              )}
            >
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section
      className="sleek-faq shrink-0 border-t border-[#E9ECEF] bg-white py-20 sm:py-20"
      aria-labelledby="sleek-faq-heading"
    >
      <div className="sleek-page-container">
        <h2
          id="sleek-faq-heading"
          className="mb-8 text-center text-2xl font-extrabold tracking-tight text-[#040015] sm:mb-8 sm:text-3xl"
        >
          FAQ on Sleek&apos;s free invoicing tool
        </h2>
        <div className="flex flex-col gap-2.5">
          {faqsMain.map((item, index) => renderItem(item, index, 'main'))}

          <p className="mb-3 mt-7 text-xs font-bold uppercase tracking-[0.06em] text-[#ADB5BD]">
            More about Sleek invoicing
          </p>

          {faqsMore.map((item, index) => renderItem(item, index, 'pink'))}
        </div>
      </div>
    </section>
  )
}
