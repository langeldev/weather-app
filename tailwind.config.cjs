/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
      fontFamily: {
        'roboto': "'Roboto', sans-serif",
        'albert': "'Albert Sans', sans-serif"
      },

    extend: {

    },
  },
  plugins: [],
}
