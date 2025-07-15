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
        brightnight: "#393939",
        crimson: "#dc143c",
        gold: "#d8b145",
      }
    },
  },
  plugins: [],
}

