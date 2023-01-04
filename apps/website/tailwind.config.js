const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './components/**/*.{js,tsx}',
    './nextra-theme-docs/**/*.{js,tsx}',
    './pages/**/*.{md,mdx,tsx}',
    './theme.config.js',
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
  theme: {
    animation: {
      'spin-slow': 'spin 3s linear infinite',
      'spin-xslow': 'spin 7s linear infinite',
    },
    extend: {
      rotate: {
        '-135': '-135deg',
        135: '135deg',
      },
      spacing: {
        '5vw': '5vw', // pull featured sections and navbar in the margin
        '8vw': '8vw', // positions hero img inside the margin
        '10vw': '10vw', // page margin
      },
      colors: {
        dark: '#000',
        gray: colors.neutral,
        blue: colors.blue,
        orange: colors.orange,
        green: colors.green,
        red: colors.red,
        yellow: colors.yellow,
        'pink-gradient-start': 'rgba(255, 30, 86, 1)',
        bunker: '#161b22',
        indigo: '#5c6ac4',
        slate: {
          500: '#a9adc1',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        'space-grotesk': ['Space Grotesk', 'monospace'],
        'good-brush': ['Good Brush'],
        mono: [
          'Menlo',
          'Monaco',
          'Lucida Console',
          'Liberation Mono',
          'DejaVu Sans Mono',
          'Bitstream Vera Sans Mono',
          'Courier New',
          'monospace',
        ],
        heading: ['Space Grotesk', 'monospace'],
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        betterhover: {raw: '(hover: hover)'},
      },
    },
  },
  darkMode: 'class',
};
