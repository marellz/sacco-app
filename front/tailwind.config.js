/** @type {import('tailwindcss').Config} */
export default {
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
        "color-a": "#272838ff", // raisin-black
        "color-b": "#7e7f9aff", // cool-gray
        "color-c": "#eb9486ff", // coral-pink
        "color-d": "#f3de8aff", // flax
        "color-e": "#f9f8f8ff", // seasalt
      },
    },
  },
  plugins: [],
};
