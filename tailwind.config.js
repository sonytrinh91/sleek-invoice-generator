/** @type {import('tailwindcss').Config} */
export default {
  // Raise specificity so theme CSS (e.g. WordPress) does not override utilities.
  important: '#sleek-invoice-app',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}