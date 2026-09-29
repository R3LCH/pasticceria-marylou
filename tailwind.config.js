/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: 'rgb(var(--rgb-cream-50) / <alpha-value>)',
          50: 'rgb(var(--rgb-cream-50) / <alpha-value>)',
          100: 'rgb(var(--rgb-cream-100) / <alpha-value>)',
        },
        espresso: 'rgb(var(--rgb-espresso) / <alpha-value>)',
        terracotta: 'rgb(var(--rgb-terracotta) / <alpha-value>)',
        ink: 'rgb(var(--rgb-text-dark) / <alpha-value>)',
        muted: 'rgb(var(--rgb-text-muted) / <alpha-value>)',
        night: 'rgb(var(--rgb-night) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        14: ['14px', { lineHeight: '1.6' }],
        16: ['16px', { lineHeight: '1.6' }],
        18: ['18px', { lineHeight: '1.5' }],
        24: ['24px', { lineHeight: '1.2' }],
        32: ['32px', { lineHeight: '1.15' }],
        48: ['48px', { lineHeight: '1.1' }],
        64: ['64px', { lineHeight: '1.05' }],
      },
      spacing: {
        18: '72px',
        22: '88px',
        30: '120px',
      },
      borderRadius: {
        8: '8px',
        12: '12px',
      },
      boxShadow: {
        subtle: 'var(--shadow-subtle)',
      },
    },
  },
  plugins: [],
}
