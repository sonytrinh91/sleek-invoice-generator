/** @type {import('tailwindcss').Config} */
export default {
  // Match app root and print clone root (react-to-print has no #sleek-invoice-app in the iframe).
  important: ':is(#sleek-invoice-app, .sleek-invoice-print-root)',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Montserrat',
          'sans-serif',
        ],
      },
      /* Keep in sync with src/design-system.css (--ds-primary, --ds-highlight, …). */
      colors: {
        ds: {
          primary: {
            DEFAULT: '#0F6DFA',
            hover: '#0959D3',
            active: '#0242A2',
          },
          highlight: '#F0F6FE',
          highlightActive: '#E2EDFE',
        },
      },
    },
  },
  plugins: [],
}