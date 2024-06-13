/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      flexGrow: {
        '2': 2,
        '8': 8,
      }
    },
  },
  plugins: [],
}
