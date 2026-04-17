/**
 * Iframe / parent page: set the host iframe height to match app content (postMessage + frameElement).
 */
export function initWordPressEmbed(rootEl) {
  if (!rootEl) return

  const measureContentHeight = () => {
    const scroll = rootEl.querySelector('.sleek-app-scroll')
    const el = scroll ?? rootEl
    return Math.ceil(Math.max(1, el.scrollHeight))
  }

  const sync = () => {
    const h = measureContentHeight()
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
