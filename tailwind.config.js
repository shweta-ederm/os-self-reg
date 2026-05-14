/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0f7f6',
          100: '#daecea',
          200: '#b5d8d5',
          300: '#7bbdb8',
          400: '#7ba8a0',
          500: '#5d8f87',
          600: '#4b7470',
          700: '#3f5f5c',
          800: '#364e4d',
          900: '#2f4241',
          DEFAULT: '#7ba8a0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
