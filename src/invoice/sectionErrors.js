/**
 * Collect validation messages from react-hook-form `errors` for a fixed set of paths.
 * @param {import('react-hook-form').FieldErrors} errors
 * @param {string[]} paths Dot paths, e.g. `invoiceNumber`, `items.0.qty`
 * @returns {string[]}
 */
export function collectErrorMessages(errors, paths) {
  if (!errors || !paths?.length) return []
  const out = []
  for (const path of paths) {
    const parts = path.split('.').filter(Boolean)
    let cur = errors
    for (const p of parts) {
      const key = /^\d+$/.test(p) ? Number(p) : p
      cur = cur?.[key]
    }
    const msg = cur?.message
    if (typeof msg === 'string' && msg.trim()) out.push(msg.trim())
  }
  return out
}

/** Prefix each message with a leading dash (list-style lines). */
function errorLinesWithDash(messages) {
  if (!messages.length) return null
  return messages.map((m) => `- ${m}`).join('\n')
}

/**
 * Section footer text (messages joined with line breaks).
 * @param {import('react-hook-form').FieldErrors} errors
 * @param {string[]} paths
 */
export function sectionErrorLine(errors, paths) {
  return errorLinesWithDash(collectErrorMessages(errors, paths))
}

/**
 * Line items: root `items` message plus per-row field messages.
 * @param {import('react-hook-form').FieldErrors} errors
 */
export function itemsSectionErrorLine(errors) {
  const items = errors?.items
  if (!items) return null
  const msgs = []
  if (typeof items.message === 'string' && items.message.trim()) {
    msgs.push(items.message.trim())
  }
  if (Array.isArray(items)) {
    items.forEach((row) => {
      if (!row || typeof row !== 'object') return
      for (const key of ['description', 'qty', 'unitPrice']) {
        const m = row[key]?.message
        if (typeof m === 'string' && m.trim()) msgs.push(m.trim())
      }
    })
  }
  if (!msgs.length) return null
  const seen = new Set()
  const ordered = []
  for (const m of msgs) {
    if (seen.has(m)) continue
    seen.add(m)
    ordered.push(m)
  }
  return errorLinesWithDash(ordered)
}
