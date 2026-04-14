import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { X } from 'lucide-react'
import { formatMoney, lineAmount, newLineItem } from '../../invoice/utils.js'
import { AddOutlineButton } from './AddOutlineButton.jsx'
import { fieldInlineErrorClass, OutlinedInput } from './FormPrimitives.jsx'

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
    <section className="min-w-0 border border-gray-100 bg-white p-6">
      <h2 className="mb-3 text-lg font-semibold text-[#040015]">Items</h2>

      <div className="sleek-items-stack flex min-w-0 flex-col gap-4">
        {fields.map((field, index) => (
          <div
            key={field._key}
            className="sleek-items-line grid min-w-0 grid-cols-2 gap-x-2 gap-y-3 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0 sm:flex sm:flex-nowrap sm:items-end sm:gap-x-3 sm:border-0 sm:pb-0"
          >
            <div className="col-span-2 min-w-0 sm:min-w-40 sm:flex-1 sm:basis-0">
              <OutlinedInput
                id={`item-desc-${field.id}`}
                label="Service name"
                className="w-full min-w-0"
                error={itemErrors(index)?.description?.message}
                {...register(`items.${index}.description`)}
              />
            </div>
            <div className="min-w-0 sm:w-16 sm:shrink-0">
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
            <div className="min-w-0 sm:w-28 sm:shrink-0">
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
            <div className="min-w-0 sm:min-w-18 sm:shrink-0 sm:text-right">
              <span className="mb-1 block text-xs text-gray-500">Amount</span>
              <span className="flex min-h-9 items-center text-sm font-medium tabular-nums text-gray-900 sm:justify-end">
                {formatMoney(lineAmounts[index] ?? 0, currency)}
              </span>
            </div>
            <div className="flex flex-col items-end justify-end self-end sm:self-end">
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
        ))}

        <AddOutlineButton
          type="button"
          onClick={() => append(newLineItem(), { shouldFocus: false })}
        >
          Add line item
        </AddOutlineButton>

        {typeof errors.items?.message === 'string' ? (
          <p className={fieldInlineErrorClass} role="alert">
            {errors.items.message}
          </p>
        ) : null}

        <div className="sleek-items-subtotal border-t border-gray-200 pt-4 text-sm">
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
