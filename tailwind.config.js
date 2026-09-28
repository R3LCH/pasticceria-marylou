/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FBF6EF',
        espresso: '#3C2415',
        terracotta: '#C46A4A',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', '"Open Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
