import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
    extend: {
      fontSize: {
        sm: '0.75rem',
      },
    },
  },
  plugins: [],
};
export default config;

