import { Shield, Star, Users } from 'lucide-react'

export function HeroSection() {
  return (
    <header
      className="sleek-hero sleek-surface-light-blue shrink-0 border-b border-gray-200/80 bg-ds-highlight px-4 pb-10 pt-10 text-center sm:pb-12 sm:pt-12"
      role="banner"
    >
      <div className="mx-auto max-w-3xl">
        <p className="mb-5 inline-flex items-center rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-medium text-[#166534]">
          100% free — no account required
        </p>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Free Invoice Generator by Sleek
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
          Create professional invoices in under two minutes. Download a clean PDF
          instantly — no signup needed.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Users
              className="size-4 shrink-0 text-emerald-700"
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
                  className="size-3.5 fill-amber-400 text-amber-400"
                  aria-hidden
                />
              ))}
            </span>
            <span>4.5/5 on Trustpilot</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield
              className="size-4 shrink-0 text-ds-primary"
              strokeWidth={1.75}
              aria-hidden
            />
            <span>B Corp certified</span>
          </div>
        </div>
      </div>
    </header>
  )
}
