/**
 * Iframe / parent page: resize the host iframe when possible and postMessage height
 * so the full app is visible (GitHub Pages, WordPress, etc.).
 */
export function initWordPressEmbed(rootEl) {
  if (!rootEl) return

  const measureHeight = () => {
    const docEl = document.documentElement
    const body = document.body
    /* Full document height (parent iframe + host scroll). Inner .sleek-app-scroll is not used on pages build. */
    const fromDoc = Math.max(
      docEl.scrollHeight,
      docEl.offsetHeight,
      body?.scrollHeight ?? 0,
      body?.offsetHeight ?? 0,
    )
    const rect = rootEl.getBoundingClientRect()
    const fromRoot = Math.max(rect.height, rootEl.scrollHeight, rootEl.offsetHeight)
    return Math.ceil(Math.max(fromDoc, fromRoot))
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
  window.addEventListener('resize', sync)
  window.visualViewport?.addEventListener('resize', sync)
  requestAnimationFrame(sync)
}
