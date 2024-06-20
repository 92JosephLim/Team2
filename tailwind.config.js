module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        customColor: '#180A0A',
      },
      height: {
        '3': '0.75rem',    // 12px
        '4': '1rem',       // 16px
        '120vh': '120vh',
      },
      keyframes: {
        scrollUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        scrollDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        'scroll-up': 'scrollUp 20s linear infinite',
        'scroll-down': 'scrollDown 20s linear infinite',
      },
      fontSize: {
        'xxxs': '0.5rem',  // 8px
        'xxs': '0.625rem', // 10px
        'xs': '0.75rem',   // 12px
        'sm': '0.875rem',  // 14px
        'base': '1rem',    // 16px
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
