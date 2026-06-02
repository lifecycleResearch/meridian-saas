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
        // Brand palette derived from the Meridian mockup
        cream: {
          DEFAULT: '#f4ede0',     // page background
          50: '#fbf7ee',
          100: '#f4ede0',
          200: '#e8dec7',
          300: '#d8c9a3',
        },
        gold: {
          DEFAULT: '#a08144',     // primary brand gold
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
          DEFAULT: '#1c1c1c',     // primary text
          900: '#0d0d0d',
          800: '#1c1c1c',
          700: '#2d2d2d',
          500: '#5a5a5a',
          300: '#9a9a9a',
        },
      },
      borderRadius: { card: '4px', pill: '999px' },
      boxShadow: {
        card: '0 1px 2px rgba(28, 28, 28, 0.04), 0 8px 24px rgba(28, 28, 28, 0.06)',
        gold: '0 0 0 1px #a08144, 0 8px 24px rgba(160, 129, 68, 0.15)',
        soft: '0 1px 2px rgba(28, 28, 28, 0.04)',
      },
      letterSpacing: {
        wider: '0.18em',
        widest: '0.32em',
      },
    },
  },
  plugins: [],
};
