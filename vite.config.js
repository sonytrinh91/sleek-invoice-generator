import { copyFileSync, writeFileSync } from 'node:fs'
import { cwd } from 'node:process'
import { join } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `vite build` → `dist/` (split assets, local preview).
// `vite build --mode pages` → `docs/` (split JS/CSS; GitHub Pages / iframe embeds).
// `vite build --mode single` → `dist-single/index.html` (vite-plugin-singlefile: one inlined HTML file).
export default defineConfig(({ mode }) => {
  const pages = mode === 'pages'
  const single = mode === 'single'
  const pagesLike = pages || single

  return {
    base: './',
    publicDir: pagesLike ? false : 'public',
    plugins: [
      react(),
      tailwindcss(),
      ...(pagesLike
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
          ]
        : []),
      ...(single
        ? [
            viteSingleFile({
              removeViteModuleLoader: true,
            }),
          ]
        : []),
      ...(pages
        ? [
            /** `publicDir` is off in pages mode — copy WordPress / iframe helper into `docs/`. */
            {
              name: 'pages-copy-embed-helper',
              closeBundle() {
                const outDir = join(cwd(), 'docs')
                try {
                  copyFileSync(
                    join(cwd(), 'public', 'sleek-invoice-embed.js'),
                    join(outDir, 'sleek-invoice-embed.js'),
                  )
                } catch {
                  /* missing public/sleek-invoice-embed.js */
                }
                try {
                  writeFileSync(join(outDir, '.nojekyll'), '')
                } catch {
                  /* ignore */
                }
              },
            },
          ]
        : []),
    ],
    build: {
      outDir: single ? 'dist-single' : pages ? 'docs' : 'dist',
      emptyOutDir: true,
    },
  }
})
