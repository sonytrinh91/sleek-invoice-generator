/**
 * Invoke host `fireEvent` when the app runs in an iframe (e.g. WordPress embed).
 * Analytics is usually defined on the parent page; the iframe has its own `window`
 * without that function.
 */
export function fireHostEvent(eventName) {
  const tryWin = (w) => {
    if (!w) return false
    const fn = w.fireEvent
    if (typeof fn !== 'function') return false
    fn.call(w, eventName)
    return true
  }

  if (tryWin(window)) return true

  try {
    if (window.parent && window.parent !== window && tryWin(window.parent)) return true
  } catch {
    /* cross-origin parent */
  }

  try {
    if (window.top && window.top !== window && tryWin(window.top)) return true
  } catch {
    /* cross-origin top */
  }

  return false
}
