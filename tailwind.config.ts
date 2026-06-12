import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1c2833',
        secondary: '#609e99',
        'accent-green': '#34c759',
        'accent-gray': '#aab3b8',
        light: '#f4f6f6',
        'text-light': '#5f6368',
      },
    },
  },
  plugins: [],
} satisfies Config;
