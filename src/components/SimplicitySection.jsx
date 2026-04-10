import { clsx } from 'clsx'
import { Check } from 'lucide-react'
import { useState } from 'react'

const items = [
  {
    key: 'effortless',
    title: 'Invoicing made effortless',
    body: 'Create professional invoices in under 2 minutes. Auto-calculated totals, tax, discounts, and shipping - no manual maths, no formatting headaches.',
    stripe: false,
  },
  {
    key: 'visibility',
    title: 'Real-time visibility',
    body: 'With Sleek Accounting, know exactly when your client opens your invoice. Track every invoice - Sent, Viewed, Paid, Overdue - from a single dashboard.',
    stripe: false,
  },
  {
    key: 'worldwide',
    title: 'Built for businesses worldwide',
    body: 'Supports Singapore invoice requirements (UEN, GST), Australia (ABN, GST), UK (VAT), US, Hong Kong, and more. Tax fields auto-adjust based on your country - so every invoice is locally compliant without any manual setup.',
    stripe: false,
  },
  {
    key: 'upgrade',
    title: "Upgrades to full accounting when you're ready",
    body: 'Subscribe to Sleek Accounting to unlock invoice history, email sending, read tracking, and a dedicated accountant for tax filing and compliance.',
    stripe: true,
  },
]

export function SimplicitySection() {
  const [openIndex, setOpenIndex] = useState(0)
  const [stripeOpen, setStripeOpen] = useState(false)

  return (
    <section
      className="sleek-simplicity shrink-0 border-t border-[#E9ECEF] bg-[#F0F5FF] py-20 sm:py-20"
      aria-labelledby="simplicity-heading"
    >
      <div className="sleek-page-container grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-[60px]">
        <div>
          <h2
            id="simplicity-heading"
            className="text-balance text-2xl font-extrabold tracking-tight sm:text-3xl"
          >
            Simplify Invoicing. Strengthen Accuracy.
          </h2>
          <ul className="space-y-2.5">
            {items.map((item, i) => {
              const isStripe = item.stripe
              const isOpen = isStripe ? stripeOpen : openIndex === i

              return (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => {
                      if (isStripe) {
                        setStripeOpen((v) => !v)
                        return
                      }
                      setOpenIndex(i)
                    }}
                    className={clsx(
                      'w-full overflow-hidden rounded-xl border text-left transition',
                      isStripe
                        ? 'border-[#0F6DFA] bg-[#0F6DFA] text-white'
                        : isOpen
                          ? 'border-[#0F6DFA] bg-white'
                          : 'border-[#E9ECEF] bg-white',
                    )}
                  >
                    <span className="flex items-center gap-3.5 px-5 py-4">
                      <span
                        className={clsx(
                          'flex size-7 shrink-0 items-center justify-center rounded-lg text-sm font-bold',
                          isStripe
                            ? 'bg-white/20 text-white'
                            : 'bg-[#EBF2FF] text-[#0F6DFA]',
                        )}
                      >
                        <Check className="size-4" strokeWidth={2.5} aria-hidden />
                      </span>
                      <span
                        className={clsx(
                          'text-[0.9375rem] font-semibold leading-snug',
                          isStripe ? 'text-white' : 'text-[#040015]',
                        )}
                      >
                        {item.title}
                      </span>
                    </span>
                    {isOpen ? (
                      <p
                        className={clsx(
                          'px-5 pb-4 pl-[62px] text-sm leading-relaxed',
                          isStripe ? 'text-white/85' : '',
                        )}
                      >
                        {item.body}
                      </p>
                    ) : null}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div
          className="relative mx-auto hidden w-full max-w-md rounded-[20px] bg-[linear-gradient(135deg,#EBF2FF_0%,#F0F8FF_100%)] p-10 lg:block lg:max-w-none"
          aria-hidden
        >
          <div className="mx-auto max-w-[280px] text-center">
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_32px_rgba(26,46,90,0.12)]">
              <div className="bg-[#1A2E5A] px-4 py-4 text-left text-lg font-extrabold tracking-[0.05em] text-white">
                INVOICE
              </div>
              <div className="border border-t-0 border-[#E9ECEF] px-4 pb-4 pt-4">
                <div className="mb-2.5 flex justify-between text-xs ">
                  <span>Consulting Services</span>
                  <span className="font-bold text-[#040015]">$1,000</span>
                </div>
                <div className="mb-2.5 flex justify-between text-xs ">
                  <span>Design Work</span>
                  <span className="font-bold text-[#040015]">$500</span>
                </div>
                <div className="mb-2.5 flex justify-between border-t border-[#F1F3F5] pt-2 text-xs ">
                  <span>Tax</span>
                  <span className="font-bold text-[#040015]">$135</span>
                </div>
                <div className="flex justify-between border-t border-[#E9ECEF] pt-2.5 text-sm font-extrabold text-[#1A2E5A]">
                  <span>Total</span>
                  <span>$1,635</span>
                </div>
                <div className="mt-3 rounded-lg border border-[#E9ECEF] bg-[#F8F9FA] px-2 py-2 text-center text-xs font-semibold ">
                  Bank transfer details included
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
