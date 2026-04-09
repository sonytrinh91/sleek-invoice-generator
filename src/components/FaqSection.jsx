import { clsx } from 'clsx'
import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'

const faqs = [
  {
    question: 'Is this invoice generator really free?',
    answer:
      'Yes - completely free, no account required. Download as many invoices as you need. Creating a free Sleek account lets you save your invoices and track payment status.',
  },
  {
    question: 'Are these invoices IRAS-compliant (Singapore)?',
    answer:
      'Yes. When Singapore is selected, invoices include your UEN, GST registration number, and the required IRAS statement. They meet all IRAS requirements for tax invoices.',
  },
  {
    question: 'What is a UEN and where do I find it?',
    answer:
      'UEN (Unique Entity Number) is your Singapore business registration number issued by ACRA. You can find it on your ACRA BizFile+ profile or any official government correspondence.',
  },
  {
    question: 'Can I send the invoice directly to my client?',
    answer:
      'You can download the PDF and email it yourself. With a free Sleek account, you can send invoices directly from the platform and get notified when your client views it.',
  },
  {
    question: 'Does this work for businesses outside Singapore?',
    answer:
      'Yes - select your country and the tool automatically sets the right tax label (VAT, GST, etc.), currency, and registration number format. It works for 15+ countries.',
  },
  {
    question: 'What happens to my invoice data?',
    answer:
      'Without an account, nothing is saved - your data stays in your browser only. With a free account, your invoices are securely saved and accessible from any device.',
  },
]

export function FaqSection() {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section
      className="sleek-faq shrink-0 border-t border-gray-200 bg-gray-50 px-4 py-12 sm:py-16"
      aria-labelledby="sleek-faq-heading"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="sleek-faq-heading"
          className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index
            const panelId = `${baseId}-panel-${index}`
            const buttonId = `${baseId}-trigger-${index}`

            return (
              <div
                key={item.question}
                className={clsx(
                  'rounded-xl border bg-white transition-all duration-200',
                  isOpen
                    ? 'border-ds-primary shadow-md shadow-ds-primary/10 ring-1 ring-ds-primary/20'
                    : 'border-gray-200',
                )}
              >
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="sleek-faq-trigger flex min-h-16 w-full cursor-pointer flex-row flex-nowrap items-center justify-between gap-4 rounded-xl px-5 py-4 text-left sm:min-h-[4.5rem] sm:px-6 sm:py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-primary focus-visible:ring-offset-2"
                  onClick={() =>
                    setOpenIndex((prev) => (prev === index ? null : index))
                  }
                >
                  <span className="text-base font-bold leading-snug text-slate-900">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={clsx(
                      'size-5 shrink-0 text-gray-400 transition-transform duration-200',
                      isOpen && 'rotate-180 text-ds-primary',
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
                  <div
                    className="min-h-0 overflow-hidden"
                    aria-hidden={!isOpen}
                  >
                    <p className="border-t border-gray-100 px-5 pb-5 pt-4 text-sm leading-relaxed text-slate-500 sm:px-6 sm:pb-6 sm:pt-5 sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
