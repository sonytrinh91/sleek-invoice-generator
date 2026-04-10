import { Star } from 'lucide-react'

export function HeroSection() {
  return (
    <header
      className="sleek-hero sleek-surface-light-blue shrink-0 border-b border-[#E9ECEF] bg-[linear-gradient(135deg,#EBF2FF_0%,#F8FAFF_60%,#FAFAFA_100%)] pb-11 pt-[52px] text-center sm:pb-11"
      role="banner"
    >
      <div className="sleek-page-container space-y-3 sm:space-y-4">
        <p className="inline-flex items-center rounded-full bg-[#EBF2FF] px-3.5 py-1 text-sm font-semibold tracking-wide text-[#0F6DFA]">
          100% free — no account required to download
        </p>
        <h1 className="text-balance text-[#040015] sm:max-w-none">
          Free Invoice Generator by Sleek
        </h1>
        <p className="mx-auto max-w-[540px] text-pretty text-base leading-[1.7] ">
          Create a professional Singapore invoice or bill clients worldwide in under 2
          minutes. Sleek&apos;s free invoice software auto-calculates totals, supports
          10+ countries, and downloads as PDF instantly - no signup needed.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 pt-2 text-sm font-medium  sm:gap-x-8 sm:pt-4">
          <div className="flex items-center gap-1.5">
            <span
              className="size-2 shrink-0 rounded-full bg-[#00C853]"
              aria-hidden
            />
            <span>450,000+ businesses worldwide</span>
          </div>
          <div className="flex items-center gap-1.5">
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
          <div className="flex items-center gap-1.5">
            <span
              className="size-2 shrink-0 rounded-full bg-[#0F6DFA]"
              aria-hidden
            />
            <span>Singapore, AU, UK, HK and more</span>
          </div>
        </div>
      </div>
    </header>
  )
}
