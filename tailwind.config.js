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
      "accent-1": "#FF9785",
      "accent-2": "#33FF82",
      "accent-3": "#A3AEFF",
      "accent-4": "#33FFE8",
      "accent-5": "#F28FFF",
    },
    fontSize: {
      sm: "1rem",
      base: "1.5rem",
      lg: "2rem",
      xl: "2.25rem",
      "2xl": "5.3125rem",
    },
    extend: {},
  },
  plugins: [],
};
