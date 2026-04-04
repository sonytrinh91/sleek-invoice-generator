import { X } from 'lucide-react'
import { ACCENT } from '../../invoice/constants.js'

export function CreateInvoiceHeader() {
  return (
    <header className="z-20 flex h-14 shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-6">
      <div className="flex items-center gap-3">
        <span
          className="text-lg font-semibold tracking-tight"
          style={{ color: '#0f2744' }}
        >
          Sleek
        </span>
        <span className="h-5 w-px bg-neutral-300" aria-hidden />
        <span className="text-sm text-neutral-500">Create Invoice</span>
      </div>
      <button
        type="button"
        className="rounded-md p-2 text-neutral-400 transition hover:bg-neutral-100"
        aria-label="Close"
      >
        <X className="size-5" style={{ color: ACCENT }} />
      </button>
    </header>
  )
}
