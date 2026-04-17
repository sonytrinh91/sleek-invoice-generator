import { copyFileSync, readFileSync, writeFileSync } from 'node:fs'
import { cwd } from 'node:process'
import { join } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// `vite build` → `dist/` (split assets, local preview).
// `vite build --mode pages` → `docs/` (split JS/CSS for cacheable loads; embed helper for GitHub Pages / iframes).
export default defineConfig(({ mode }) => {
  const pages = mode === 'pages'

  return {
    base: './',
    publicDir: pages ? false : 'public',
    plugins: [
      react(),
      tailwindcss(),
      ...(pages
        ? [
            {
              name: 'pages-strip-head',
              transformIndexHtml: {
                order: 'pre',
                handler(html) {
                  return html
                    .replace(/<link[^>]*rel=["']icon["'][^>]*>\s*/gi, '')
                    .replace(/<title>[\s\S]*?<\/title>/i, '<title>Invoice</title>')
                },
              },
            },
            {
              name: 'pages-cache-meta',
              transformIndexHtml: {
                order: 'post',
                handler(html) {
                  const buildId = new Date().toISOString()
                  const meta = `
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta name="sleek-invoice-build" content="${buildId}" />
`
                  if (/<meta\s[^>]*charset=/i.test(html)) {
                    return html.replace(
                      /(<meta\s[^>]*charset=["'][^"']*["'][^>]*\/?>)/i,
                      `$1${meta}`,
                    )
                  }
                  return html.replace(/<head>/i, `<head>${meta}`)
                },
              },
            },
            {
              name: 'pages-docs-artifacts',
              closeBundle() {
                const outDir = join(cwd(), 'docs')
                let full
                try {
                  full = readFileSync(join(outDir, 'index.html'), 'utf8')
                } catch {
                  return
                }

                const buildMatch = full.match(
                  /name="sleek-invoice-build"\s+content="([^"]+)"/,
                )
                const buildId = buildMatch?.[1] ?? 'unknown'

                const STATIC_START = '<!--sleek-app-static:start-->'
                const STATIC_END = '<!--sleek-app-static:end-->'
                let staticInner = ''
                const si = full.indexOf(STATIC_START)
                const ei = full.indexOf(STATIC_END)
                if (si !== -1 && ei !== -1 && ei > si) {
                  staticInner = full.slice(si + STATIC_START.length, ei).trim()
                }

                /** External assets from split build (parallel load + long-term cache). */
                const linkTags = []
                const linkRe =
                  /<link\b[^>]*\brel=["']stylesheet["'][^>]*>/gi
                let lm
                while ((lm = linkRe.exec(full)) !== null) linkTags.push(lm[0])

                const scriptTags = []
                const scriptRe =
                  /<script\b[^>]*\btype=["']module["'][^>]*>\s*<\/script>/gi
                let sm
                while ((sm = scriptRe.exec(full)) !== null) {
                  scriptTags.push(sm[0])
                }

                let styleHtml = ''
                let scriptHtml = ''
                if (linkTags.length > 0 || scriptTags.length > 0) {
                  styleHtml = linkTags.join('\n')
                  scriptHtml = scriptTags.join('\n')
                } else {
                  /* Fallback: legacy single-file inline style + module script */
                  const scriptStart = full.indexOf('<script type="module"')
                  if (scriptStart === -1) return
                  const scriptClose = full.indexOf('</script>', scriptStart)
                  if (scriptClose === -1) return
                  scriptHtml = full
                    .slice(scriptStart, scriptClose + '</script>'.length)
                    .trim()

                  const styleStart = full.indexOf('<style', scriptClose)
                  if (styleStart === -1) return
                  const styleClose = full.indexOf('</style>', styleStart)
                  if (styleClose === -1) return
                  styleHtml = full
                    .slice(styleStart, styleClose + '</style>'.length)
                    .trim()
                }

                writeFileSync(
                  join(outDir, 'embed.html'),
                  `<!-- Sleek invoice fragment (optional). Build: ${buildId} -->
${styleHtml}
<div id="sleek-invoice-app" class="sleek-wp-embed">${staticInner ? `\n${staticInner}\n` : ''}</div>
${scriptHtml}
`,
                  'utf8',
                )

                try {
                  copyFileSync(
                    join(cwd(), 'public', 'sleek-invoice-embed.js'),
                    join(outDir, 'sleek-invoice-embed.js'),
                  )
                } catch {
                  /* missing public/sleek-invoice-embed.js */
                }

                writeFileSync(join(outDir, '.nojekyll'), '')
              },
            },
          ]
        : []),
    ],
    build: {
      outDir: pages ? 'docs' : 'dist',
      emptyOutDir: true,
    },
  }
})
