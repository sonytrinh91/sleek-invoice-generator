import { useFormContext } from 'react-hook-form'
import { Bot } from 'lucide-react'
import { Card } from './FormPrimitives.jsx'

export function NotesSection() {
  const { register } = useFormContext()

  return (
    <Card>
      <h2 className="mb-3 text-base font-semibold text-gray-900">Notes</h2>
      <div className="sleek-field-shell relative rounded border border-gray-200 bg-white transition-colors focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/25">
        <label
          htmlFor="invoice-notes"
          className="pointer-events-none absolute left-3 top-3 z-[1] text-xs font-normal text-gray-500"
        >
          Note to customer
        </label>
        <textarea
          id="invoice-notes"
          rows={3}
          placeholder="Enter a note for the customer"
          className="min-h-[118px] w-full resize-y rounded border-0 bg-transparent px-3 pb-8 pr-10 pt-8 text-base leading-relaxed text-input-value outline-none ring-0 placeholder:text-gray-400 focus:ring-0"
          {...register('notes')}
        />
        <button
          type="button"
          title="AI writing assistant"
          aria-label="AI writing assistant"
          className="absolute bottom-4 right-10 flex size-9 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm transition hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          <Bot className="size-[18px]" strokeWidth={2} aria-hidden />
        </button>
      </div>
    </Card>
  )
}
