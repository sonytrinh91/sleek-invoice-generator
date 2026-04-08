import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `vite build` — normal `dist/` with separate JS/CSS (hosting, preview).
// `vite build --mode wordpress` — single `dist-wordpress/index.html`, minimal head, no public assets.
export default defineConfig(({ mode }) => {
  const wordpress = mode === 'wordpress'

  return {
    base: './',
    publicDir: wordpress ? false : 'public',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'wordpress-strip-head',
        transformIndexHtml: {
          order: 'pre',
          handler(html) {
            if (!wordpress) return html
            return (
              html
                // Favicon breaks when the HTML is pasted or uploaded without sibling files
                .replace(/<link[^>]*rel=["']icon["'][^>]*>\s*/gi, '')
                // Avoid extra DNS / CORS noise inside WP; app uses system fonts (see index.css)
                .replace(/<link[^>]*rel=["']preconnect["'][^>]*>\s*/gi, '')
                .replace(
                  /<link[^>]*href=["'][^"']*fonts\.googleapis\.com[^"']*["'][^>]*>\s*/gi,
                  '',
                )
                .replace(
                  /<link[^>]*href=["'][^"']*fonts\.gstatic\.com[^"']*["'][^>]*>\s*/gi,
                  '',
                )
                // Short neutral title; WP page title can override in admin
                .replace(/<title>[\s\S]*?<\/title>/i, '<title>Invoice</title>')
            )
          },
        },
      },
      ...(wordpress ? [viteSingleFile()] : []),
    ],
    build: {
      outDir: wordpress ? 'dist-wordpress' : 'dist',
      emptyOutDir: true,
    },
  }
})
