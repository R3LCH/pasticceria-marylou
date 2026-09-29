/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: 'var(--color-cream-50)',
          50: 'var(--color-cream-50)',
          100: 'var(--color-cream-100)',
        },
        espresso: 'var(--color-espresso)',
        terracotta: 'var(--color-terracotta)',
        ink: 'var(--color-text-dark)',
        muted: 'var(--color-text-muted)',
        night: 'var(--color-night)',
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
