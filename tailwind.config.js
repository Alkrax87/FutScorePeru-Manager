/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        night: "#161513",
        nightfall: "#232323",
        light: "#F7F7F7",
        brightnight: "#393939",
        crimson: "#dc143c",
        "crimson-hover": "#eb1a44",
        gold: "#d8b145",
      }
    },
  },
  plugins: [],
}

