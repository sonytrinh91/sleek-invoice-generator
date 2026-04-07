export function parseAmountInput(str) {
  if (str == null || str === '') return 0
  const n = parseFloat(String(str).replace(/,/g, '').trim())
  return Number.isFinite(n) ? n : 0
}

/**
 * @param {object} form — invoice form values
 * @param {number} itemsSubtotal — sum of line items
 */
export function computeInvoiceTotals(form, itemsSubtotal) {
  const S = itemsSubtotal
  const discountVal = parseAmountInput(form.discountValue)
  const discountAmount = form.discountIsPercent
    ? S * (discountVal / 100)
    : discountVal

  const afterDiscount = S - discountAmount

  let taxAmount = 0
  if (form.taxEnabled) {
    const tr = parseAmountInput(form.taxRate)
    taxAmount = form.taxIsPercent ? afterDiscount * (tr / 100) : tr
  }

  const shipVal = parseAmountInput(form.shippingValue)
  const shippingAmount = form.shippingIsPercent
    ? S * (shipVal / 100)
    : shipVal

  const grandTotal = afterDiscount + taxAmount + shippingAmount

  return {
    itemsSubtotal: S,
    discountAmount,
    afterDiscount,
    taxAmount,
    shippingAmount,
    grandTotal,
  }
}
