import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Relative base so `dist/index.html` works when opened via file:// or from a subfolder (e.g. WordPress).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
