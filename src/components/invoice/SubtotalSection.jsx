import { clsx } from 'clsx'
import { useMemo } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { computeInvoiceTotals } from '../../invoice/invoiceTotals.js'
import { formatMoney, lineAmount } from '../../invoice/utils.js'
import { Card, FieldLabel } from './FormPrimitives.jsx'

function ToggleSwitch({ checked, onChange, disabled, id }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={clsx(
        'sleek-switch relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        checked ? 'bg-accent' : 'bg-gray-200',
        disabled && 'cursor-not-allowed opacity-50',
      )}
    >
      <span
        className="sleek-switch-thumb pointer-events-none absolute top-0.5 rounded-full bg-white shadow"
        aria-hidden
      />
    </button>
  )
}

function PercentDollarToggle({ isPercent, onChange, disabled }) {
  return (
    <div className="sleek-segment-toggle flex shrink-0 overflow-hidden rounded-md border border-gray-200">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(true)}
        className={clsx(
          'px-2 py-1 text-xs font-semibold transition-colors',
          isPercent
            ? 'bg-accent text-white'
            : 'bg-white text-gray-600 hover:bg-gray-50',
          disabled && 'cursor-not-allowed opacity-50',
        )}
      >
        %
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(false)}
        className={clsx(
          'border-l border-gray-200 px-2 py-1 text-xs font-semibold transition-colors',
          !isPercent
            ? 'bg-accent text-white'
            : 'bg-white text-gray-600 hover:bg-gray-50',
          disabled && 'cursor-not-allowed opacity-50',
        )}
      >
        $
      </button>
    </div>
  )
}

const compactInput =
  'sleek-compact-input rounded border border-gray-200 px-2 py-1 text-sm font-medium text-input-value outline-none transition focus:border-accent focus:ring-1 focus:ring-accent/25'

export function SubtotalSection() {
  const { register, control, setValue } = useFormContext()
  const form = useWatch()

  const lineAmounts = useMemo(
    () => (form.items ?? []).map((it) => lineAmount(it.qty, it.unitPrice)),
    [form.items],
  )
  const itemsSubtotal = useMemo(
    () => lineAmounts.reduce((a, b) => a + b, 0),
    [lineAmounts],
  )

  const totals = useMemo(
    () => computeInvoiceTotals(form, itemsSubtotal),
    [form, itemsSubtotal],
  )

  const currency = form.currency ?? 'SGD'
  const discountExpanded = form.discountExpanded
  const shippingExpanded = form.shippingExpanded
  const taxEnabled = form.taxEnabled

  return (
    <Card>
      <FieldLabel>Subtotal</FieldLabel>
      <div className="space-y-4 text-sm">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Subtotal
          </span>
          <span className="tabular-nums text-base font-medium text-input-value">
            {formatMoney(itemsSubtotal, currency)}
          </span>
        </div>

        <div
          className={clsx(
            'flex flex-wrap items-center gap-3 border-t border-gray-100 pt-4',
            !taxEnabled && 'opacity-60',
          )}
        >
          <Controller
            control={control}
            name="taxEnabled"
            render={({ field }) => (
              <ToggleSwitch
                id="tax-enabled"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <span
            className={clsx(
              'min-w-[2.5rem] text-xs font-medium uppercase tracking-wide text-gray-500',
              !taxEnabled && 'opacity-70',
            )}
          >
            GST
          </span>
          <input
            type="text"
            inputMode="decimal"
            aria-label="Tax rate or amount"
            disabled={!taxEnabled}
            className={clsx(compactInput, 'w-14')}
            {...register('taxRate')}
          />
          <Controller
            control={control}
            name="taxIsPercent"
            render={({ field }) => (
              <PercentDollarToggle
                isPercent={field.value}
                onChange={field.onChange}
                disabled={!taxEnabled}
              />
            )}
          />
          <span className="ml-auto min-w-[5rem] text-right tabular-nums font-medium text-input-value">
            {formatMoney(totals.taxAmount, currency)}
          </span>
        </div>

        <div className="flex flex-wrap gap-6 border-t border-gray-100 pt-3">
          <button
            type="button"
            className="sleek-ds-btn-text"
            onClick={() =>
              setValue('discountExpanded', !discountExpanded, {
                shouldDirty: true,
              })
            }
          >
            {discountExpanded ? '− Discount' : '+ Discount'}
          </button>
          <button
            type="button"
            className="sleek-ds-btn-text"
            onClick={() =>
              setValue('shippingExpanded', !shippingExpanded, {
                shouldDirty: true,
              })
            }
          >
            {shippingExpanded ? '− Shipping' : '+ Shipping'}
          </button>
        </div>

        {discountExpanded ? (
          <div className="flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
            <span className="min-w-[4.5rem] text-xs font-medium uppercase tracking-wide text-gray-500">
              Discount
            </span>
            <input
              type="text"
              inputMode="decimal"
              aria-label="Discount amount or percent"
              className={clsx(compactInput, 'w-20')}
              {...register('discountValue')}
            />
            <Controller
              control={control}
              name="discountIsPercent"
              render={({ field }) => (
                <PercentDollarToggle
                  isPercent={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <span className="ml-auto min-w-[5rem] text-right tabular-nums font-medium text-input-value">
              {formatMoney(-totals.discountAmount, currency)}
            </span>
          </div>
        ) : null}

        {shippingExpanded ? (
          <div className="flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
            <span className="min-w-[4.5rem] text-xs font-medium uppercase tracking-wide text-gray-500">
              Shipping
            </span>
            <input
              type="text"
              inputMode="decimal"
              aria-label="Shipping amount or percent"
              className={clsx(compactInput, 'w-24')}
              {...register('shippingValue')}
            />
            <Controller
              control={control}
              name="shippingIsPercent"
              render={({ field }) => (
                <PercentDollarToggle
                  isPercent={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <span className="ml-auto min-w-[5rem] text-right tabular-nums font-medium text-input-value">
              {formatMoney(totals.shippingAmount, currency)}
            </span>
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-3 border-t border-gray-200 pt-4">
          <span className="text-xs font-bold uppercase tracking-wide text-gray-600">
            Balance Due
          </span>
          <span className="text-base font-bold tabular-nums text-accent">
            {formatMoney(totals.grandTotal, currency)}
          </span>
        </div>
      </div>
    </Card>
  )
}
