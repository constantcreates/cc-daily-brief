import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cc: {
          dark: '#1a2428',
          forest: '#263633',
          green: '#4a6650',
          sage: '#c8d9a0',
          cream: '#f0edd8',
          light: '#F7F6F1',
          muted: '#8a9a7e',
          white: '#ffffff',
          warn: '#f59e0b',
          danger: '#ef4444',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
