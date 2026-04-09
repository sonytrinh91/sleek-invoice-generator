import { FileText, TrendingUp, Zap } from 'lucide-react'

const SIGNUP_HREF = 'https://sleek.com'

const cards = [
  {
    badge: 'Free',
    title: 'Save & Track Invoices',
    description:
      'Create a free account to save all your invoices, track which ones are paid, and access your full invoice history from any device.',
    icon: FileText,
    iconWrap: 'bg-blue-100 text-blue-600',
  },
  {
    badge: 'Invoicing',
    title: 'Get Paid Faster',
    description:
      'Send invoices directly to clients. Get notified when they view it. Add a payment link so clients can pay instantly online.',
    icon: Zap,
    iconWrap: 'bg-green-100 text-green-600',
  },
  {
    badge: 'Accounting',
    title: 'Full Accounting, Done for You',
    description:
      'A dedicated Sleek accountant handles GST filing, corporate tax, and annual returns — all connected to your invoices.',
    icon: TrendingUp,
    iconWrap: 'bg-amber-100 text-amber-700',
  },
]

export function WhySleekSection() {
  return (
    <section
      className="sleek-why-sleek shrink-0 border-t border-gray-100 bg-white px-4 py-14 sm:py-16"
      aria-labelledby="why-sleek-heading"
    >
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-4 inline-flex items-center rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-medium text-[#166534]">
          Why Sleek
        </p>
        <h2
          id="why-sleek-heading"
          className="text-balance text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
        >
          Why thousands of businesses use Sleek
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-base text-gray-500 sm:text-lg">
          The free invoice tool is just the beginning.
        </p>

        <div className="mt-10 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <article
                key={card.badge}
                className="flex flex-col rounded-xl border border-gray-200/90 bg-white p-6 shadow-sm"
              >
                <div
                  className={`mb-4 flex size-11 items-center justify-center rounded-lg ${card.iconWrap}`}
                >
                  <Icon className="size-5 shrink-0" strokeWidth={1.75} aria-hidden />
                </div>
                <p className="mb-2 inline-flex w-fit rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                  {card.badge}
                </p>
                <h3 className="text-lg font-bold text-gray-900">{card.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
                  {card.description}
                </p>
              </article>
            )
          })}
        </div>

        <div className="mt-10 sm:mt-12">
          <a
            href={SIGNUP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="sleek-ds-btn sleek-ds-btn--primary sleek-ds-btn--comfortable-lg inline-flex w-full max-w-md text-center shadow-sm sm:w-auto sm:min-w-[20rem]"
          >
            Create free account — takes 30 seconds
          </a>
        </div>
      </div>
    </section>
  )
}
