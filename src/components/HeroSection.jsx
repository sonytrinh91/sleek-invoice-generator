import { Shield, Star, Users } from 'lucide-react'

export function HeroSection() {
  return (
    <header
      className="sleek-hero shrink-0 border-b border-gray-100/80 bg-linear-to-b from-sky-50/90 via-violet-50/35 to-white px-4 py-10 text-center sm:py-12"
      role="banner"
    >
      <div className="mx-auto max-w-3xl">
        <p className="mb-5 inline-flex items-center rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-medium text-[#166534]">
          100% Free – No account required
        </p>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Free Invoice Generator
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-gray-500 sm:text-lg">
          Create professional invoices in under 2 minutes. Download as PDF
          instantly — no signup needed.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Users
              className="size-4 shrink-0 text-green-700"
              strokeWidth={1.75}
              aria-hidden
            />
            <span>450,000+ businesses trust Sleek</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-3.5 fill-[#FBBF24] text-[#FBBF24]"
                  aria-hidden
                />
              ))}
            </span>
            <span>4.5/5 on Google</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield
              className="size-4 shrink-0 text-[#2563EB]"
              strokeWidth={1.75}
              aria-hidden
            />
            <span>B Corp Certified</span>
          </div>
        </div>
      </div>
    </header>
  )
}
