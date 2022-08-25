/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts}"],
  theme: {
    extend: {},
  },
  daisyui: {
    logs: false,
    themes: ["corporate"],
  },
  plugins: [require("daisyui")],
};
