/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        citaca: {
          yellow: '#FFD600',
          'yellow-dark': '#F5C400',
          'yellow-light': '#FFF9C4',
          'yellow-soft': '#FFFDE7',
          dark: '#1A1A1A',
          gray: '#4A4A4A',
          'gray-light': '#F5F5F5',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        'citaca': '0 4px 24px rgba(255, 214, 0, 0.25)',
        'citaca-lg': '0 8px 40px rgba(255, 214, 0, 0.35)',
      }
    },
  },
  plugins: [],
}
