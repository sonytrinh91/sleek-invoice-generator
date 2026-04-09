/**
 * Sleek Invoice — iframe embed loader (HubSpot-style container + script).
 * Place a div with data-src pointing at docs/index.html (after `npm run build:wordpress`), then load this file once per page.
 *
 * Clears inline max-height on the container so the full app height is visible (resize via postMessage).
 * To keep a fixed-height scroll box instead, set data-sleek-invoice-constrain="1" on the container.
 */
;(function () {
  var SELECTOR = '[data-sleek-invoice-src], .sleek-invoice-embed-container'

  function unlockContainer(container) {
    if (container.getAttribute('data-sleek-invoice-constrain') === '1') return
    container.style.setProperty('max-height', 'none', 'important')
    container.style.setProperty('overflow', 'visible', 'important')
    container.style.setProperty('height', 'auto', 'important')
  }

  function applyResize(iframe, height) {
    if (typeof height !== 'number' || height <= 0) return
    iframe.style.height = height + 'px'
    iframe.style.minHeight = height + 'px'
    iframe.style.maxHeight = 'none'
    var container = iframe.parentElement
    if (!container) return
    unlockContainer(container)
    container.style.minHeight = height + 'px'
  }

  function mount(container) {
    if (container.getAttribute('data-sleek-invoice-mounted') === '1') return
    var src =
      container.getAttribute('data-sleek-invoice-src') ||
      container.getAttribute('data-src')
    if (!src) return

    container.setAttribute('data-sleek-invoice-mounted', '1')
    unlockContainer(container)

    var iframe = document.createElement('iframe')
    iframe.className = 'sleek-invoice-embed-iframe'
    iframe.src = src
    iframe.title =
      container.getAttribute('data-title') || 'Sleek invoice generator'
    iframe.setAttribute('loading', 'lazy')
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin')
    iframe.style.width = '100%'
    iframe.style.border = '0'
    iframe.style.display = 'block'
    var minH =
      container.getAttribute('data-min-height') ||
      container.getAttribute('data-initial-height')
    iframe.style.minHeight = minH || '720px'

    container.appendChild(iframe)
  }

  function init() {
    document.querySelectorAll(SELECTOR).forEach(mount)
  }

  window.addEventListener('message', function (e) {
    var d = e.data
    if (!d || d.source !== 'sleek-invoice-app' || d.type !== 'resize') return
    document
      .querySelectorAll('iframe.sleek-invoice-embed-iframe')
      .forEach(function (iframe) {
        try {
          if (iframe.contentWindow === e.source) applyResize(iframe, d.height)
        } catch (_) {
          /* cross-origin */
        }
      })
  })

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
