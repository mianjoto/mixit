/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Noto Sans"', "sans-serif"],
    },
    extend: {
      colors: {
        primary: {
          50: "#fffdeb",
          100: "#fffad6",
          200: "#fff6ad",
          300: "#fff185",
          400: "#ffed5c",
          500: "#ffe833",
          600: "#ccba29",
          700: "#998b1f",
          800: "#665d14",
          900: "#332e0a",
          DEFAULT: "#ffe833",
        },
        secondary: "#19191A",
        accent: "#B26EF7",
        background: "#050505",
        body: "#FAFAFA",
        gray: "#CACACA",
        "spotify-green": "#1DB954",
        "accent-1": "#FF9785",
        "accent-2": "#33FF82",
        "accent-3": "#A3AEFF",
        "accent-4": "#33FFE8",
        "accent-5": "#F28FFF",
      },
      spacing: {
        "3xs": "0.5rem", // 8px
        "2xs": "1rem", // 16px
        xs: "1.5rem", // 24px
        sm: "2rem", // 32px
        md: "2.5rem", // 40px
        lg: "3rem", // 48px
        xl: "3.5rem", // 56px
        "2xl": "4rem", // 64px
        "3xl": "5rem", // 80px
        "4xl": "8rem" // 128px
      },
      fontSize: {
        h1: ["5.3125rem", { lineHeight: "5.5rem", fontWeight: "bold" }],
        h2: ["3.25rem", { lineHeight: "4rem", fontWeight: "bold" }],
        h3: ["2rem", { lineHeight: "3.5rem", fontWeight: "bold" }],
        subtitle: ["1.5rem", { lineHeight: "2.25rem", fontWeight: "semibold" }],
        body: ["1.25rem", { lineHeight: "2rem", fontWeight: 500 }],
        small: ["1rem", { lineHeight: "1.5rem", fontWeight: 500 }],
        pretitle: [
          "0.875rem",
          { lineHeight: "1.5rem", letterSpacing: "0.1em", fontWeight: "bold" },
        ],
        btn: ["1.5rem", { lineHeight: "3rem", fontWeight: "extrabold" }],
        link: ["1.5rem", { lineHeight: "2.25rem", fontWeight: "bold" }],
      },
    },
  },
  plugins: [],
};
