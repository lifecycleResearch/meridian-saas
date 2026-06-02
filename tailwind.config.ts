/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{ts,tsx,js,jsx}', './components/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        navy: { DEFAULT: '#0f1729', 50: '#f4f6fa', 100: '#e4e7ed', 200: '#c8cfd9', 300: '#aab2c0', 500: '#7a8599', 700: '#3a4253', 900: '#1a2233', 950: '#0f1729' },
        brand: { DEFAULT: '#1e6fb8', 50: '#eef6fc', 100: '#d8eaf6', 200: '#b3d4ed', 300: '#87c0e8', 400: '#5a9fd4', 500: '#2a7fc4', 600: '#1e6fb8', 700: '#175a99', 800: '#144a7d', 900: '#0f1729' },
        accent: { DEFAULT: '#ff4d6d', 50: '#fff1f4', 100: '#ffe0e7', 500: '#ff4d6d', 600: '#e63e5c' },
      },
      borderRadius: { card: '18px', pill: '999px' },
      boxShadow: {
        card: '0 8px 24px rgba(15, 23, 41, 0.08)',
        strong: '0 18px 60px rgba(15, 23, 41, 0.18)',
      },
    },
  },
  plugins: [],
};
