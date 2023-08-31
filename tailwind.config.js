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
        tertiary: "#141415",
        background: "#050505",
        accent: "#B26EF7",
        body: "#FAFAFA",
        gray: "#CACACA",
        success: "#a6e707",
        caution: "#dbc217",
        danger: "#e43446",
        info: "#08a2f3",
        "spotify-green": "#1DB954",
        "accent-1": "#FF9785",
        "accent-2": "#33FF82",
        "accent-3": "#A3AEFF",
        "accent-4": "#33FFE8",
        "accent-5": "#F28FFF",
      },
      spacing: {
        4: "4px",
        8: "8px",
        12: "12px",
        16: "16px",
        20: "20px",
        24: "24px",
        32: "32px",
        40: "40px",
        48: "48px",
        56: "56px",
        64: "64px",
        80: "80px",
        128: "128px",
        160: "160px",
      },
      fontSize: {
        xs: "clamp(0.75rem, 0.23vw + 0.69rem, 0.88rem)", // Pretitle
        sm: "clamp(12px, 0.23vw + 11.09px, 14px)", // Small
        base: "clamp(1rem, 0.23vw + 0.94rem, 1.13rem)", // Body / H4/H5/H6
        lg: "clamp(1.5rem, 0.58vw + 1.35rem, 1.82rem)", // Item heading - H3
        xl: "clamp(2.25rem, 1.26vw + 1.93rem, 2.95rem)", // Section heading - H2
        "2xl": "clamp(3.38rem, 2.53vw + 2.74rem, 4.77rem)", // Title - H1
      },
      keyframes: {
        slideDown: {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        slideDown: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        "disc-spin-cw": "spin 45s linear infinite",
        "disc-spin-ccw": "spin 45s linear infinite reverse",
      },
      minHeight: {
        screen: ["100vh /* fallback for Opera, IE and etc. */", "100svh"],
      },
      transitionProperty: {
        height: "height, min-height",
      },
      height: {
        screen: ["100vh /* fallback for Opera, IE and etc. */", "100svh"],
      },
      backgroundColor: {
        "accent-gradient": "rgb(255, 232, 51)",
      },
      backgroundImage: {
        "accent-gradient":
          "linear-gradient(45deg, rgba(255, 232, 51, 1) 0%, rgba(51, 255, 130, 1) 100%)",
      },
    },
  },
  plugins: [require("@shrutibalasa/tailwind-grid-auto-fit")],
};
