/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        "primary-forest": "#2C5F2D",
        "primary-earth": "#8B5E3C",
        "secondary-yellow": "#F4A261",
        "secondary-blue": "#2A9D8F",
        "soft-beige": "#E9C46A",
        "deep-orange": "#E76F51",
        "charcoal-black": "#264653",
        "off-white": "#F1FAEE",
      },
    },
  },
  plugins: [],
};
