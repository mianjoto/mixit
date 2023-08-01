/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Noto Sans"', "sans-serif"],
    },
    colors: {
      primary: "#FFE833",
      secondary: "#19191A",
      accent: "#B26EF7",
      background: "#050505",
      body: "#FAFAFA",
      "spotify-green": "#1DB954",
      "accent-1": "#FF9785",
      "accent-2": "#33FF82",
      "accent-3": "#A3AEFF",
      "accent-4": "#33FFE8",
      "accent-5": "#F28FFF",
    },
    fontColors: {
      subtitle: "#CACACA",
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
