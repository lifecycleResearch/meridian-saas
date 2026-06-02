/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{ts,tsx,js,jsx}', './components/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Dancing Script"', '"Allura"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      colors: {
        // Meridian brand — cream + gold + ink (body)
        cream: {
          DEFAULT: '#f4ede0',
          50: '#fbf7ee',
          100: '#f4ede0',
          200: '#e8dec7',
          300: '#d8c9a3',
        },
        gold: {
          DEFAULT: '#a08144',
          50: '#f6efde',
          100: '#e9d9b3',
          200: '#d4b97a',
          300: '#b89656',
          400: '#a08144',
          500: '#876a35',
          600: '#6c5327',
          700: '#4f3c1c',
        },
        ink: {
          DEFAULT: '#1c1c1c',
          900: '#0d0d0d',
          800: '#1c1c1c',
          700: '#2d2d2d',
          500: '#5a5a5a',
          300: '#9a9a9a',
        },
        // Slide-module wireframe colors (hero)
        navy: { DEFAULT: '#0f1729', 50: '#f4f6fa', 100: '#e4e7ed', 200: '#c8cfd9', 300: '#aab2c0', 500: '#7a8599', 700: '#3a4253', 900: '#1a2233', 950: '#0f1729' },
        brand: { DEFAULT: '#1e6fb8', 50: '#eef6fc', 100: '#d8eaf6', 200: '#b3d4ed', 300: '#87c0e8', 400: '#5a9fd4', 500: '#2a7fc4', 600: '#1e6fb8', 700: '#175a99', 800: '#144a7d', 900: '#0f1729' },
      },
      borderRadius: { card: '4px', pill: '999px' },
      boxShadow: {
        card: '0 1px 2px rgba(28, 28, 28, 0.04), 0 8px 24px rgba(28, 28, 28, 0.06)',
        gold: '0 0 0 1px #a08144, 0 8px 24px rgba(160, 129, 68, 0.15)',
        soft: '0 1px 2px rgba(28, 28, 28, 0.04)',
        phone: '0 30px 80px rgba(28, 28, 28, 0.35)',
      },
      letterSpacing: { wider: '0.18em', widest: '0.32em' },
    },
  },
  plugins: [],
};
