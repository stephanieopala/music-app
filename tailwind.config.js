/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'primary': '#008080',
      'primary-dark': '#006666',
      'primary-light': '#b2d8d8',
      'light-gray': '#ededed',
      'dark-gray': '#adadad',
      'table-head': '#f2f2f2',
      'white': '#fff',
      'error': '#ff3333',
      'modal-bg': 'rgba(0, 0, 0, 0.315)'
    },
    extend: {},
  },
  plugins: [],
};
