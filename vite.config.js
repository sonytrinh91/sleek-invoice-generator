import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
// Relative base for subfolder deploys. viteSingleFile inlines JS/CSS so `dist/index.html` can be
// opened via file:// without ES-module CORS errors (external ./assets/*.js fails on origin null).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), viteSingleFile()],
})
