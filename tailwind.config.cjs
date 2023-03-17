/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        eminence: {
          DEFAULT: "#573280",
          50: "#FAF7FC",
          100: "#E7DEF2",
          200: "#C3AADE",
          300: "#9E77CA",
          400: "#7A46B3",
          500: "#573280",
          600: "#432763",
          700: "#2F1B45",
          800: "#251537",
          900: "#1B1028",
        },
        persian: {
          DEFAULT: "#F72585",
          50: "#FDD6E8",
          100: "#FDC2DD",
          200: "#FB9BC7",
          300: "#FA74B1",
          400: "#F84C9B",
          500: "#F72585",
          600: "#DC0869",
          700: "#A6064F",
          800: "#700435",
          900: "#39021B",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
