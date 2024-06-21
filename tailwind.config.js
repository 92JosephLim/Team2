module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        customColor: '#180A0A',
        gold: '#ffd700', // 금색 추가
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
        'scroll-up': 'scrollUp 30s linear infinite',  // 애니메이션 속도를 빠르게
        'scroll-down': 'scrollDown 30s linear infinite',  // 애니메이션 속도를 빠르게
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
