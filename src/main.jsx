import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initWordPressEmbed } from './wpEmbed.js'

const rootEl = document.getElementById('sleek-invoice-app')

/** Full single-file shell (`docs/` from `npm run build:pages`): only child of body. Inline embeds share body with the host page — do not touch documentElement/body classes. */
function isEmbeddedFullDocumentShell() {
  if (!rootEl || !document.body) return false
  const kids = [...document.body.children]
  return kids.length === 1 && kids[0] === rootEl
}

if (import.meta.env.MODE === 'pages') {
  rootEl?.classList.add('sleek-wp-embed')
  if (isEmbeddedFullDocumentShell()) {
    document.documentElement.classList.add('sleek-wp-embed-root')
    document.body.classList.add('sleek-wp-embed-body')
  }
}

createRoot(rootEl).render(
  <StrictMode>
    {/*
      Scroll on .sleek-app-scroll (not on #sleek-invoice-app) so position:sticky works in WebKit and WP iframe embeds.
      wpEmbed sizes the iframe to the viewport; this layer is the scrollport inside it.
    */}
    <div className="sleek-app-scroll min-h-0 w-full min-w-0 flex-1 overflow-x-clip overflow-y-auto overscroll-contain">
      <App />
    </div>
  </StrictMode>,
)

if (import.meta.env.MODE === 'pages' && rootEl) {
  queueMicrotask(() => initWordPressEmbed(rootEl))
}
