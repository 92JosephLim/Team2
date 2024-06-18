// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        customColor: '#180A0A',
      },
      height: {
        '120vh': '120vh',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
