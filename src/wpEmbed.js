/**
 * Iframe / parent page: resize the host iframe when possible and postMessage height
 * so the full app is visible (GitHub Pages, WordPress, etc.).
 */
export function initWordPressEmbed(rootEl) {
  if (!rootEl) return

  const measureHeight = () => {
    const rect = rootEl.getBoundingClientRect()
    const sh = rootEl.scrollHeight
    /* Prefer full content height (nested scroll areas can under-report rect). */
    return Math.ceil(Math.max(rect.height, sh))
  }

  const sync = () => {
    const h = measureHeight()
    if (h <= 0) return

    try {
      const fe = window.frameElement
      if (fe?.style) {
        fe.style.height = `${h}px`
        fe.style.minHeight = `${h}px`
        fe.style.maxHeight = 'none'
      }
    } catch {
      /* cross-origin frameElement access */
    }

    try {
      window.parent?.postMessage(
        { source: 'sleek-invoice-app', type: 'resize', height: h },
        '*',
      )
    } catch {
      /* ignore */
    }
  }

  const ro = new ResizeObserver(() => {
    requestAnimationFrame(sync)
  })
  ro.observe(rootEl)

  window.addEventListener('load', sync)
  requestAnimationFrame(sync)
}
