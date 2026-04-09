import { Star } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Sleek has been instrumental in helping us manage our finances efficiently. The invoicing and accounting tools are intuitive and save us hours every month.',
    name: 'Marcus T.',
    role: 'Founder, Tech Startup - Singapore',
  },
  {
    quote:
      "We switched from a traditional accounting firm to Sleek and haven't looked back. The platform is transparent, fast, and the team actually understands startups.",
    name: 'Priya S.',
    role: 'CEO, E-commerce Brand - Singapore',
  },
  {
    quote:
      'The free invoice generator alone is worth it. Clean, professional invoices in minutes. And when we needed proper accounting, Sleek was already there.',
    name: 'James L.',
    role: 'Director, Consulting Firm - Hong Kong',
  },
]

function StarRow() {
  return (
    <div className="mb-3 flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="size-4 fill-[#FBBF24] text-[#FBBF24]"
        />
      ))}
    </div>
  )
}

export function TrustedBySection() {
  return (
    <section
      className="sleek-trusted-by shrink-0 border-t border-gray-200/80 bg-[#F8F9FA] px-4 py-12 sm:py-14"
      aria-labelledby="trusted-by-heading"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="trusted-by-heading"
          className="text-center text-xl font-bold tracking-tight text-slate-900 sm:text-2xl"
        >
          Trusted by businesses across Asia
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="flex flex-col rounded-xl border border-gray-200/90 bg-white p-6 shadow-sm"
            >
              <StarRow />
              <blockquote className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">
                <span className="text-slate-400">&ldquo;</span>
                {t.quote}
                <span className="text-slate-400">&rdquo;</span>
              </blockquote>
              <footer>
                <div className="font-semibold text-slate-900">{t.name}</div>
                <div className="mt-1 text-xs text-slate-500">{t.role}</div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
