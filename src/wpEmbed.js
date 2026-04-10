/**
 * Iframe / parent page: set the host iframe height to the embed viewport (postMessage + frameElement).
 * Scrolling stays inside `.sleek-app-scroll` so `position:sticky` on the invoice preview works.
 * (Sizing the iframe to full document height moves scroll to the parent and breaks sticky.)
 */
export function initWordPressEmbed(rootEl) {
  if (!rootEl) return

  const measureFrameHeight = () => {
    const vv = window.visualViewport
    const h = vv?.height ?? window.innerHeight
    return Math.ceil(Math.max(1, h))
  }

  const sync = () => {
    const h = measureFrameHeight()
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
