import { FileText, TrendingUp, Zap } from 'lucide-react'

const ACCOUNTING_HREF = 'https://sleek.com/sg/accounting-services-singapore/'

const cards = [
  {
    key: 'create-download',
    badge: 'Free',
    badgeClass: 'bg-[#E8F5E9] text-[#00C853]',
    title: 'Create and Download Invoices',
    description:
      "Sleek's free invoice generator creates professional invoices in minutes. Download as PDF instantly. No account, no credit card, no catch.",
    icon: FileText,
    iconWrapClass: 'bg-[#EBF2FF] text-gray-500',
  },
  {
    key: 'send-track',
    badge: 'Sleek Accounting',
    badgeClass: 'bg-[#EBF2FF] text-[#0F6DFA]',
    title: 'Send, Track and Get Paid',
    description:
      'Send invoices by email, get notified when clients open them, and track every invoice - Sent, Viewed, Paid, Overdue - from one dashboard.',
    icon: Zap,
    iconWrapClass: 'bg-[#E8F5E9] text-yellow-500',
  },
  {
    key: 'full-accounting',
    badge: 'Sleek Accounting',
    badgeClass: 'bg-[#FFF8E1] text-[#F59E0B]',
    title: 'Full Accounting, Done for You',
    description:
      'A dedicated Sleek accountant handles tax filing, compliance, and annual returns - all connected to your invoicing history automatically.',
    icon: TrendingUp,
    iconWrapClass: 'bg-[#FFF8E1] text-red-600',
  },
]

export function WhySleekSection() {
  return (
    <section
      className="sleek-why-sleek shrink-0 border-t border-[#E9ECEF] bg-[#F8F9FA] py-20 sm:py-20"
      aria-labelledby="why-sleek-heading"
    >
      <div className="sleek-page-container text-center">
        <p className="mb-4 inline-flex items-center rounded-full bg-[#EBF2FF] px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.04em] text-[#0F6DFA]">
          Why sleek
        </p>
        <h2
          id="why-sleek-heading"
          className="text-balance text-2xl font-extrabold tracking-tight text-[#040015] sm:text-3xl"
        >
          Why thousands of businesses use Sleek&apos;s free invoice generator
        </h2>

        <div className="mt-10 grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <article
                key={card.key}
                className="flex flex-col items-center rounded-2xl border border-[#E9ECEF] bg-white p-7 text-center shadow-[0_2px_12px_rgba(4,0,21,0.04)]"
              >
                <div
                  className={`mb-5 flex size-14 items-center justify-center rounded-2xl ${card.iconWrapClass}`}
                >
                  <Icon className="size-7 shrink-0" strokeWidth={1.75} aria-hidden />
                </div>
                <p
                  className={`mb-3 inline-flex rounded-full px-3 py-0.5 text-[0.6875rem] font-bold ${card.badgeClass}`}
                >
                  {card.badge}
                </p>
                <h3 className="mb-2">{card.title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-[#6C757D]">
                  {card.description}
                </p>
              </article>
            )
          })}
        </div>

        <div className="mt-10">
          <a
            href={ACCOUNTING_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="sleek-ds-btn sleek-ds-btn--primary sleek-ds-btn--comfortable-lg inline-flex w-full max-w-md text-center shadow-sm sm:w-auto sm:min-w-[20rem]"
          >
            View Sleek&apos;s Pricing Plans
          </a>
        </div>
      </div>
    </section>
  )
}
