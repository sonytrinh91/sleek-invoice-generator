import { Plus, X } from 'lucide-react'
import { formatMoney } from '../../invoice/utils.js'
import { OutlinedInput, OutlinedTextarea } from './FormPrimitives.jsx'

export function ItemsSection({
  items,
  currency,
  lineAmounts,
  subtotal,
  onUpdateItem,
  onAddItem,
  onRemoveItem,
}) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-3 text-base font-semibold text-gray-900">Items</h2>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="space-y-3">
            <OutlinedTextarea
              id={`item-desc-${item.id}`}
              label="Product or service name"
              rows={2}
              value={item.description}
              onChange={(e) =>
                onUpdateItem(item.id, { description: e.target.value })
              }
              textareaClassName="min-h-[4.5rem]"
            />
            <div className="flex flex-wrap items-end gap-4">
              <div className="w-24 shrink-0">
                <OutlinedInput
                  id={`item-qty-${item.id}`}
                  label="Qty"
                  type="number"
                  min={0}
                  step="any"
                  value={item.qty}
                  onChange={(e) =>
                    onUpdateItem(item.id, { qty: e.target.value })
                  }
                />
              </div>
              <div className="min-w-[120px] max-w-[200px] shrink-0 flex-1">
                <OutlinedInput
                  id={`item-price-${item.id}`}
                  label="Unit price"
                  type="number"
                  min={0}
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) =>
                    onUpdateItem(item.id, { unitPrice: e.target.value })
                  }
                />
              </div>
              <div className="ml-auto min-w-[100px] text-right">
                <span className="mb-1 block text-xs text-gray-500">Amount</span>
                <span className="flex h-9 items-center justify-end text-sm font-medium tabular-nums text-gray-900">
                  {formatMoney(lineAmounts[index], currency)}
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
                  onClick={() => onRemoveItem(item.id)}
                  className="flex size-9 items-center justify-center rounded text-red-500 transition hover:bg-red-50"
                  aria-label="Remove line item"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddItem}
          className="inline-flex items-center gap-1.5 rounded-md border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
        >
          <Plus className="size-4" />
          Add line item
        </button>

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
