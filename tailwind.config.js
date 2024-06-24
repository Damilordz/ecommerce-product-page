/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        barlow: ["Barlow Semi Condensed", "sans-serif"],
      },
      backgroundColor: {
        "black-75": "rgba(0, 0, 0, 0.75)",
      },
    },
  },
  plugins: [],
};
