/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand utama — biru dari logo "ambilbagian" (#3d7be9). Dominan.
        brand: {
          50: '#eef4fe',
          100: '#d9e5fd',
          200: '#b3cbfb',
          300: '#84aaf8',
          400: '#5b8df2',
          500: '#3d7be9',
          600: '#2f66d4',
          700: '#2854af',
          800: '#24478c',
          900: '#203a6e',
          950: '#16243d',
        },
        // Sekunder — hijau segar dari logo (#16a34a) untuk progress, status, positif.
        moss: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        // Aksen — merah-oranye dari logo (#e8480f), dipakai hemat untuk CTA & highlight.
        ember: {
          50: '#fef3ee',
          100: '#fee3d4',
          200: '#fec4a8',
          300: '#fd9d71',
          400: '#fb7238',
          500: '#e8480f',
          600: '#d13c08',
          700: '#ae3108',
          800: '#8b2a0d',
          900: '#71260e',
          950: '#3e1105',
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
