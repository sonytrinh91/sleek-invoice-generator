import { Star } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Sleek has been instrumental in helping us manage our finances efficiently. The invoicing and accounting tools are intuitive and save us hours every month.',
    name: 'Andrew Lai',
    role: 'Founder - Singapore',
  },
  {
    quote:
      "We switched from a traditional accounting firm to Sleek and haven't looked back. The platform is transparent, fast, and the team actually understands startups.",
    name: 'Sophie Chhuon',
    role: 'CEO - Singapore',
  },
  {
    quote:
      'The free invoice generator alone is worth it. Clean, professional invoices in minutes. And when we needed proper accounting, Sleek was already there.',
    name: 'John-Guy Park',
    role: 'Director - Hong Kong',
  },
]

function StarRow() {
  return (
    <div className="mb-3 flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-[#FBBF24] text-[#FBBF24]" />
      ))}
    </div>
  )
}

export function TrustedBySection() {
  return (
    <section
      className="sleek-trusted-by shrink-0 border-t border-[#E9ECEF] bg-[#F8F9FA] px-4 py-16 sm:py-16"
      aria-labelledby="trusted-by-heading"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="trusted-by-heading"
          className="mb-8 text-center text-xl font-extrabold tracking-tight text-[#040015] sm:mb-8 sm:text-2xl"
        >
          Trusted by businesses across Asia and beyond
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="flex flex-col rounded-2xl border border-[#E9ECEF] bg-white p-6"
            >
              <StarRow />
              <blockquote className="mb-4 flex-1 text-sm font-normal leading-[1.7] text-[#495057]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <footer>
                <div className="text-sm font-bold text-[#040015]">{t.name}</div>
                <div className="mt-1 text-xs text-[#ADB5BD]">{t.role}</div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
