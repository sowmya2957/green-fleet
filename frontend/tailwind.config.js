/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        auraCream: '#FAF7F2',
        auraIvory: '#FFFFFF',
        auraBorder: '#E6E0D5',
        auraText: '#1D3F1B',
        auraDarkGreen: {
          900: '#142E12',
          800: '#1D3F1B',
          700: '#2A4E26',
          600: '#386333',
        },
        auraGreen: {
          50: '#F2F8EF',
          100: '#E2F0DC',
          500: '#4E8B37',
          600: '#3D732B',
          700: '#2D5A27',
          800: '#234A1F',
        },
        auraPink: {
          50: '#FDF2F4',
          100: '#FBE4E7',
          500: '#EE7480',
          600: '#E85D75',
          700: '#D9445D',
        },
        auraCoral: {
          50: '#FDF3F1',
          500: '#F08272',
          600: '#ED6B5A',
          700: '#D95240',
        },
        auraPeach: {
          50: '#FEF8F2',
          500: '#F5B875',
          600: '#F4A261',
          700: '#E78B43',
        },
        auraYellow: {
          50: '#FEFDF4',
          400: '#F5D565',
          500: '#E9C46A',
          600: '#D6AE47',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
