/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,ejs}"],
  safelist: [
    "bg-red-600",
    "hover:bg-red-700",
    "text-white",
    "rounded",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-black",
  ],
  theme: { extend: {} },
  plugins: [],
};
