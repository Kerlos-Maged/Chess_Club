/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0A1630',
        blue: '#0B5FA5',
        gold: '#C9A23A',
        bg: '#F6F7FB',
      },
    },
  },
  plugins: [],
};
