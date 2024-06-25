/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {},
    screens: {
      xs: "480px",
      //  sm: "640px",
      sm: { raw: "(max-width: 375px) and (max-height: 667px)" },
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
};
