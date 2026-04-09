import { copyFileSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `vite build` → `dist/` (split assets, local preview).
// `vite build --mode pages` → `docs/` (single-file app + embed helper for GitHub Pages / iframes).
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
                    .replace(/<link[^>]*rel=["']preconnect["'][^>]*>\s*/gi, '')
                    .replace(
                      /<link[^>]*href=["'][^"']*fonts\.googleapis\.com[^"']*["'][^>]*>\s*/gi,
                      '',
                    )
                    .replace(
                      /<link[^>]*href=["'][^"']*fonts\.gstatic\.com[^"']*["'][^>]*>\s*/gi,
                      '',
                    )
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
            viteSingleFile(),
            {
              name: 'pages-docs-artifacts',
              closeBundle() {
                const outDir = join(process.cwd(), 'docs')
                let full
                try {
                  full = readFileSync(join(outDir, 'index.html'), 'utf8')
                } catch {
                  return
                }
                const scriptStart = full.indexOf('<script type="module"')
                if (scriptStart === -1) return
                const scriptClose = full.indexOf('</script>', scriptStart)
                if (scriptClose === -1) return
                const scriptHtml = full
                  .slice(scriptStart, scriptClose + '</script>'.length)
                  .trim()

                const styleStart = full.indexOf('<style', scriptClose)
                if (styleStart === -1) return
                const styleClose = full.indexOf('</style>', styleStart)
                if (styleClose === -1) return
                const styleHtml = full
                  .slice(styleStart, styleClose + '</style>'.length)
                  .trim()

                const buildMatch = full.match(
                  /name="sleek-invoice-build"\s+content="([^"]+)"/,
                )
                const buildId = buildMatch?.[1] ?? 'unknown'

                writeFileSync(
                  join(outDir, 'embed.html'),
                  `<!-- Sleek invoice inline fragment (optional). Build: ${buildId} -->
${styleHtml}
<div id="sleek-invoice-app" class="sleek-wp-embed"></div>
${scriptHtml}
`,
                  'utf8',
                )

                try {
                  copyFileSync(
                    join(process.cwd(), 'public', 'sleek-invoice-embed.js'),
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
