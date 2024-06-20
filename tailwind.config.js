/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"]
    },
    extend: {
    },
  },
  plugins: [flowbite.plugin()],
};
