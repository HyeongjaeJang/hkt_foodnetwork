/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#7A886D",
          secondary: "#ffffff",
          white: "#ffffff",
          black: "#000000",
          background: "#ffffff",
        },
      },
      "dark",
      "luxury",
    ],
  },
};
