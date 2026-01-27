/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#121318",
        surface: "#1C1E26",
        primary: "#ECECF1",
        secondary: "#9A9CAA",
        accent: "#6C7BFF",
        divider: "#2A2D38",
      },
    },
  },
  plugins: [],
};