import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { X } from "lucide-react";
import { itemsSectionErrorLine } from "../../invoice/sectionErrors.js";
import { formatMoney, lineAmount, newLineItem } from "../../invoice/utils.js";
import { AddOutlineButton } from "./AddOutlineButton.jsx";
import { OutlinedInput, sectionFooterErrorClass, FieldLabel } from "./FormPrimitives.jsx";

export function ItemsSection() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
    keyName: "_key",
  });

  const currency = useWatch({ control, name: "currency" });
  const items = useWatch({ control, name: "items" });

  const lineAmounts = (items ?? []).map((it) =>
    lineAmount(it.qty, it.unitPrice),
  );
  const subtotal = lineAmounts.reduce((a, b) => a + b, 0);

  const itemErrors = (i) => errors.items?.[i];

  const itemsErrorLine = itemsSectionErrorLine(errors);

  return (
    <section className="min-w-0 border border-gray-100 bg-white p-6">
      <FieldLabel>Items</FieldLabel>

      <div className="sleek-items-stack flex min-w-0 flex-col gap-4">
        {fields.map((field, index) => (
          <div
            key={field._key}
            className="sleek-items-line flex min-w-0 flex-col gap-3 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
          >
            <div className="min-w-0 w-full">
              <OutlinedInput
                id={`item-desc-${field.id}`}
                label="Product or service name"
                className="w-full min-w-0"
                error={itemErrors(index)?.description?.message}
                {...register(`items.${index}.description`)}
              />
            </div>
            <div className="flex min-w-0 flex-wrap items-end gap-x-2 gap-y-2 sm:flex-nowrap sm:gap-x-3 sm:items-end">
              <div className="w-21 shrink-0 sm:w-24">
                <OutlinedInput
                  id={`item-qty-${field.id}`}
                  label="Quantity"
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
              <div className="min-w-0 flex-1 basis-24">
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
              <div className="ml-auto flex min-w-0 shrink-0 items-end gap-1 sm:gap-2">
                <div className="min-w-22 text-right sm:min-w-26">
                  <span className="mb-0.5 block text-xs text-gray-500">
                    Amount
                  </span>
                  <span className="block text-base font-semibold tabular-nums text-gray-900">
                    {formatMoney(lineAmounts[index] ?? 0, currency)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (fields.length <= 1) return;
                    remove(index);
                  }}
                  className="mb-0.5 flex size-9 shrink-0 cursor-pointer items-center justify-center rounded text-red-500 transition hover:bg-red-50"
                  aria-label="Remove line item"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {itemsErrorLine ? (
          <p className={sectionFooterErrorClass} role="alert">
            {itemsErrorLine}
          </p>
        ) : null}
        <AddOutlineButton
          type="button"
          onClick={() => append(newLineItem(), { shouldFocus: false })}
        >
          Add line item
        </AddOutlineButton>

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
  );
}
