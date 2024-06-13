/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      purple: {
        100: '#EFEBFF', // Light Purple
        200: '#BEADFF', // Purple (Hover Color)
        300: '#633CFF', // Purple
      },
      grey: {
        100: '#FAFAFA', // Light Grey
        200: '#D9D9D9', // Borders
        300: '#737373', // Grey
        400: '#333333', // Dark Grey
      },
      white: '#FFFFFF', // White
      red: '#FF3939', // Red
    },
    fontSize: {
      sm: '0.75rem',
    },
    extend: {
      fontFamily: {
        "instrumentSans": ['Instrument Sans'],
      },
    },
  },
  plugins: [],
}

