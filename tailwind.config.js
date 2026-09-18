/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm green — brand utama. Hangat, terpercaya, bukan "aplikasi perbankan".
        moss: {
          50: '#f2f7f0',
          100: '#e0ecda',
          200: '#c2d9b8',
          300: '#9bc08c',
          400: '#72a35f',
          500: '#54873f',
          600: '#406c2d',
          700: '#355626',
          800: '#2c4521',
          900: '#25391d',
          950: '#12210d',
        },
        // Netral hangat
        sand: {
          50: '#faf8f4',
          100: '#f3efe6',
          200: '#e6dfd0',
          300: '#d3c7ae',
          400: '#bcab8a',
          500: '#a9926c',
          600: '#8f7550',
          700: '#715a41',
          800: '#574535',
          900: '#46392e',
          950: '#261e18',
        },
        // Aksen CTA — terracotta hangat
        ember: {
          50: '#fdf5f2',
          100: '#fbe8e0',
          200: '#f6cfc0',
          300: '#eeab92',
          400: '#e48160',
          500: '#d95f38',
          600: '#c54b24',
          700: '#a43c1e',
          800: '#83331f',
          900: '#6b2c1f',
          950: '#3a140d',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(38, 30, 24, 0.05), 0 4px 16px -4px rgba(38, 30, 24, 0.08)',
        lift: '0 2px 4px rgba(38, 30, 24, 0.06), 0 12px 32px -8px rgba(38, 30, 24, 0.16)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        shimmer: 'shimmer 2.4s linear infinite',
      },
    },
  },
  plugins: [],
}
