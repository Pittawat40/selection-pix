import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          black: '#111111',
          mid:   '#999999',
          faint: '#E6E6E4',
          bg:    '#F8F8F6',
        },
      },
      aspectRatio: {
        'card': '4 / 3',
      },
    },
  },
  plugins: [],
} satisfies Config
