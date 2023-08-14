/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
        "3xs": "clamp(0.19rem, calc(0.08rem + 0.54vw), 0.50rem)", // max 8px
        "2xs": "clamp(0.38rem, calc(0.16rem + 1.09vw), 1.00rem)", // max 16px
        xs: "clamp(0.63rem, calc(0.32rem + 1.52vw), 1.50rem)", // max 24px
        sm: "clamp(0.81rem, calc(0.40rem + 2.07vw), 2.00rem)", // max 32px
        md: "clamp(1.00rem, calc(0.48rem + 2.61vw), 2.50rem)", // max 40px
        lg: "clamp(1.19rem, calc(0.56rem + 3.15vw), 3.00rem)", // max 48px
        xl: "clamp(1.38rem, calc(0.64rem + 3.70vw), 3.50rem)", // max 56px
        "2xl": "clamp(1.63rem, calc(0.80rem + 4.13vw), 4.00rem)", // max 64px
        "3xl": "clamp(2.00rem, calc(0.96rem + 5.22vw), 5.00rem)", // max 80px
        "4xl": "clamp(3.19rem, calc(1.51rem + 8.37vw), 8.00rem)", // max 128px
      },
      fontSize: {
        xs: "clamp(0.75rem, 0.23vw + 0.69rem, 0.88rem)", // Pretitle
        sm: "clamp(12px, 0.23vw + 11.09px, 14px)", // Small
        base: "clamp(1rem, 0.23vw + 0.94rem, 1.13rem)", // Body / H4/H5/H6
        lg: "clamp(1.5rem, 0.58vw + 1.35rem, 1.82rem)", // Item heading - H3
        xl: "clamp(2.25rem, 1.26vw + 1.93rem, 2.95rem)", // Section heading - H2
        "2xl": "clamp(3.38rem, 2.53vw + 2.74rem, 4.77rem)", // Title - H1
      },
    },
  },
  plugins: [],
};
