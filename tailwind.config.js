/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        panel: '#101010',
        'text-primary': '#ffffff',
        'text-secondary': '#a1a1a1',
        'chart-line': '#f1f1f1',
        'chart-price': '#a1a1a1',
        nav: '#0a0a0a',
        primary: '#4FD1C5',
        secondary: '#9F7AEA',
        border: '#2D3748',
        accent: '#4FD1C5',
        'accent-dark': '#319795',
        error: '#F56565',
        success: '#48BB78',
      },
    },
  },
  plugins: [],
};