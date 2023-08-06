/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      xs: "400px",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-fira)"],
      },
      fontSize: {
        xs: ["0.563rem", "9px"],
        sm: ["0.75rem", "12px"],
        base: ["1rem", "16px"],
        lg: ["1.333rem", "21.33px"],
        xl: ["1.777rem", "28.43px"],
        "2xl": ["2.369rem", "37.90px"],
        "3xl": ["3.157rem", "50.52px"],
        "4xl": ["4.209rem", "67.34px"],
      },
      colors: {
        eminence: {
          DEFAULT: "hsl(262, 42%, 33%)",
          50: "hsl(263, 40%, 96%)",
          100: "hsl(263, 43%, 89%)",
          200: "hsl(262, 42%, 75%)",
          300: "hsl(262, 42%, 61%)",
          400: "hsl(262, 42%, 47%)",
          500: "hsl(262, 42%, 33%)",
          600: "hsl(263, 42%, 26%)",
          700: "hsl(262, 42%, 19%)",
          800: "hsl(262, 41%, 12%)",
          900: "hsl(262, 44%, 5%)",
          950: "hsl(260, 43%, 1%)",
        },
        persian: {
          50: "hsl(336, 100%, 98%)",
          100: "hsl(333, 92%, 95%)",
          200: "hsl(333, 93%, 89%)",
          300: "hsl(333, 93%, 83%)",
          400: "hsl(333, 93%, 73%)",
          500: "hsl(333, 93%, 56%)",
          600: "hsl(333, 93%, 47%)",
          700: "hsl(333, 93%, 42%)",
          800: "hsl(333, 93%, 34%)",
          900: "hsl(333, 92%, 26%)",
          950: "hsl(333, 93%, 17%)",
        },
        charade: {
          DEFAULT: "hsl(226, 13%, 20%)",
          50: "hsl(226, 13%, 80%)",
          100: "hsl(225, 13%, 76%)",
          200: "hsl(226, 13%, 68%)",
          300: "hsl(227, 13%, 60%)",
          400: "hsl(225, 13%, 52%)",
          500: "hsl(226, 13%, 44%)",
          600: "hsl(227, 13%, 36%)",
          700: "hsl(227, 13%, 28%)",
          800: "hsl(226, 13%, 20%)",
          900: "hsl(228, 11%, 9%)",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-animate"), ({ addVariant }) => {[
      // Positional
      ['first', ':first-child'],
      ['last', ':last-child'],
      ['only', ':only-child'],
      ['odd', ':nth-child(odd)'],
      ['even', ':nth-child(even)'],
      'first-of-type',
      'last-of-type',
      'only-of-type',

      // State
      'visited',
      'target',
      ['open', '[open]'],

      // Forms
      'default',
      'checked',
      'indeterminate',
      'placeholder-shown',
      'autofill',
      'required',
      'valid',
      'invalid',
      'in-range',
      'out-of-range',
      'read-only',

      // Content
      'empty',

      // Interactive
      'focus-within',
      'hover',
      'focus',
      'focus-visible',
      'active',
      'disabled',
    ]
      .map((variant) =>
        Array.isArray(variant) ? variant : [variant, `:${variant}`]
      )
      .forEach(([variantName, state]) => {
        addVariant(`parent-${variantName}`, `:merge(.parent)${state} > &`);
      });
  }],
};
