/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Noto Sans"', "sans-serif"],
    },
    colors: {
      primary: {
        lightest: "#fff9cc",
        light: "#fff080",
        DEFAULT: "#FFE833",
        dark: "#e6cb00",
        darker: "#998700",
        darkest: "#1a1700",
      },
      secondary: "#EFF3C2",
      background: "#090D09",
      body: "#F9FAF3",
      subheading: "#BABAB5",
      "spotify-green": "#1DB954",
      "accent-1": {
        DEFAULT: "#FF9785",
        shadow: "#52362E",
      },
      "accent-2": {
        DEFAULT: "#33FF82",
        shadow: "#15552E",
      },
      "accent-3": {
        DEFAULT: "#A3AEFF",
        shadow: "#373D52",
      },
      "accent-4": {
        DEFAULT: "#33FFE8",
        shadow: "#15554C",
      },
      "accent-5": {
        DEFAULT: "#F28FFF",
        shadow: "#4F3452",
      },
    },
    fontSize: {
      sm: "1rem",
      base: "1.5rem",
      lg: "2rem",
      xl: "2.25rem",
      "2xl": "5.3125rem",
    },
    extend: {
      spacing: {
        "3xs": "0.5rem",
        "2xs": "1rem",
        xs: "1.5rem",
        sm: "2rem",
        md: "2.5rem",
        lg: "3rem",
        xl: "3.5rem",
        "2xl": "4rem",
        "3xl": "5rem",
        "4xl": "8rem",
      },
    },
  },
  plugins: [],
};
