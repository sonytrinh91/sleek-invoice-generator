import { ChevronDown } from 'lucide-react'

export const inputClass =
  'w-full rounded-md border border-neutral-200 px-3 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-1 focus:ring-accent'

export const selectClass =
  'w-full appearance-none rounded-md border border-neutral-200 bg-white py-2.5 pl-3 pr-10 text-sm outline-none transition focus:border-accent focus:ring-1 focus:ring-accent'

export function FieldLabel({ children }) {
  return (
    <label className="mb-2 block text-sm font-medium text-neutral-600">
      {children}
    </label>
  )
}

export function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-lg border border-neutral-200 bg-white p-5 shadow-sm ${className}`}
    >
      {children}
    </div>
  )
}

export function SelectChevron() {
  return (
    <ChevronDown
      className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
      aria-hidden
    />
  )
}
