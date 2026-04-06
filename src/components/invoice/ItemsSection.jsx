import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { X } from 'lucide-react'
import { formatMoney, lineAmount, newLineItem } from '../../invoice/utils.js'
import { AddOutlineButton } from './AddOutlineButton.jsx'
import { OutlinedInput, OutlinedTextarea } from './FormPrimitives.jsx'

export function ItemsSection() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
    keyName: '_key',
  })

  const currency = useWatch({ control, name: 'currency' })
  const items = useWatch({ control, name: 'items' })

  const lineAmounts = (items ?? []).map((it) =>
    lineAmount(it.qty, it.unitPrice),
  )
  const subtotal = lineAmounts.reduce((a, b) => a + b, 0)

  const itemErrors = (i) => errors.items?.[i]

  return (
    <section className="border border-gray-100 bg-white p-6">
      <h2 className="mb-3 text-base font-semibold text-gray-900">Items</h2>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field._key} className="space-y-3">
            <OutlinedInput
              id={`item-desc-${field.id}`}
              label="Product or service name"
              error={itemErrors(index)?.description?.message}
              {...register(`items.${index}.description`)}
            />
            <div className="flex flex-wrap items-end gap-4">
              <div className="w-24 shrink-0">
                <OutlinedInput
                  id={`item-qty-${field.id}`}
                  label="Qty"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="any"
                  required
                  aria-required="true"
                  className="input-number-no-spin"
                  error={itemErrors(index)?.qty?.message}
                  {...register(`items.${index}.qty`)}
                />
              </div>
              <div className="min-w-[120px] max-w-[200px] shrink-0 flex-1">
                <OutlinedInput
                  id={`item-price-${field.id}`}
                  label="Unit price"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="0.01"
                  required
                  aria-required="true"
                  className="input-number-no-spin"
                  error={itemErrors(index)?.unitPrice?.message}
                  {...register(`items.${index}.unitPrice`)}
                />
              </div>
              <div className="ml-auto min-w-[100px] text-right">
                <span className="mb-1 block text-xs text-gray-500">Amount</span>
                <span className="flex h-9 items-center justify-end text-sm font-medium tabular-nums text-gray-900">
                  {formatMoney(lineAmounts[index] ?? 0, currency)}
                </span>
              </div>
              <div className="flex shrink-0 flex-col">
                <span
                  className="mb-1 block h-4 text-xs text-transparent select-none"
                  aria-hidden
                >
                  .
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (fields.length <= 1) return
                    remove(index)
                  }}
                  className="flex size-9 cursor-pointer items-center justify-center rounded text-red-500 transition hover:bg-red-50"
                  aria-label="Remove line item"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        <AddOutlineButton
          type="button"
          onClick={() => append(newLineItem(), { shouldFocus: false })}
        >
          Add line item
        </AddOutlineButton>

        {typeof errors.items?.message === 'string' ? (
          <p className="text-xs text-red-800" role="alert">
            {errors.items.message}
          </p>
        ) : null}

        <div className="border-t border-gray-200 pt-4 text-sm">
          <div className="flex items-center justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="tabular-nums">
              {formatMoney(subtotal, currency)}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between font-semibold text-gray-900">
            <span>Total</span>
            <span className="tabular-nums">
              {formatMoney(subtotal, currency)}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
