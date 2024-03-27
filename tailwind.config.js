/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: 'class',
  theme: {
    fontFamily: {
      playfair: ['Playfair Display'],
      primary: ['Inter', 'sans-serif'],
    },
    screens: {
      xxlA: { min: '1440px' },
      xl: { max: '1279px' },
      lg: { max: '1028px' },
      minlg: { max: '1024px' },
      mdxl: { max: '950px' },
      md: { max: '834px' },
      sixm: { max: '768px' },
      xlsm: { max: '550px' },
      sm: { max: '375px' },
    },
    container: {
      screens: {
        sm: '100%',
        md: '100%',
      },
    },
    extend: {
      maxWidth: {
        '8xl': '1980px',
      },
    },
  },

  plugins: [
    require('autoprefixer'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
 