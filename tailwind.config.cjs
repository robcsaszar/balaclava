/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-fira)"],
      },
      colors: {
        eminence: {
          DEFAULT: "#4B3177",
          50: "#F4F1F9",
          100: "#E0D7EF",
          200: "#B8A4DA",
          300: "#9072C5",
          400: "#6A46AA",
          500: "#4B3177",
          600: "#3B265E",
          700: "#2B1C45",
          800: "#1B122B",
          900: "#0B0712",
          950: "#030205",
        },
        persian: {
          50: "#FFF5F9",
          100: "#FEE6F1",
          200: "#FDC9E0",
          300: "#FCABD0",
          400: "#FA7AB4",
          500: "#F72585",
          600: "#E7096D",
          700: "#CF0861",
          800: "#A7064F",
          900: "#80053C",
          950: "#540327",
        },
        charade: {
          DEFAULT: "#2C2F39",
          50: "#C5C8D2",
          100: "#B9BDC9",
          200: "#A2A7B7",
          300: "#8B91A6",
          400: "#747C94",
          500: "#61687E",
          600: "#505567",
          700: "#3E4250",
          800: "#2C2F39",
          900: "#141519",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
