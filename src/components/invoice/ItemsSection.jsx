import { Plus, X } from 'lucide-react'
import { ACCENT } from '../../invoice/constants.js'
import { formatMoney } from '../../invoice/utils.js'
import { Card, FieldLabel } from './FormPrimitives.jsx'

const rowInputClass =
  'w-full rounded-md border border-neutral-200 bg-white px-2 py-2 text-sm outline-none transition focus:border-accent focus:ring-1 focus:ring-accent'

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
    <Card>
      <FieldLabel>Items</FieldLabel>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="relative rounded-md border border-neutral-100 bg-neutral-50/50 p-4 pr-10"
          >
            <textarea
              rows={2}
              placeholder="Product or service name"
              value={item.description}
              onChange={(e) =>
                onUpdateItem(item.id, { description: e.target.value })
              }
              className="mb-3 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
            />
            <div className="flex flex-wrap items-end gap-3">
              <div className="w-24">
                <span className="mb-1 block text-xs text-neutral-500">Qty</span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={item.qty}
                  onChange={(e) =>
                    onUpdateItem(item.id, { qty: e.target.value })
                  }
                  className={rowInputClass}
                />
              </div>
              <div className="min-w-[120px] flex-1">
                <span className="mb-1 block text-xs text-neutral-500">
                  Unit price
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) =>
                    onUpdateItem(item.id, { unitPrice: e.target.value })
                  }
                  className={rowInputClass}
                />
              </div>
              <div className="min-w-[100px] text-right text-sm text-neutral-700">
                <span className="mb-1 block text-xs text-neutral-500">
                  Amount
                </span>
                <span className="font-medium tabular-nums">
                  {formatMoney(lineAmounts[index], currency)}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onRemoveItem(item.id)}
              className="absolute right-2 top-2 rounded p-1 text-red-500 transition hover:bg-red-50"
              aria-label="Remove line item"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={onAddItem}
          className="inline-flex items-center gap-1.5 rounded-md border px-4 py-2 text-sm font-medium text-accent transition hover:bg-blue-50"
          style={{ borderColor: ACCENT }}
        >
          <Plus className="size-4" />
          Add line item
        </button>
        <div className="mt-4 space-y-2 border-t border-neutral-100 pt-4 text-sm">
          <div className="flex justify-between text-neutral-600">
            <span>Subtotal</span>
            <span className="tabular-nums">
              {formatMoney(subtotal, currency)}
            </span>
          </div>
          <div className="flex justify-between font-semibold text-neutral-900">
            <span>Total</span>
            <span className="tabular-nums">
              {formatMoney(subtotal, currency)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
