/** @type {import('tailwindcss').Config} */
export default {
  // Raise specificity so theme CSS (e.g. WordPress) does not override utilities.
  important: '#sleek-invoice-app',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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