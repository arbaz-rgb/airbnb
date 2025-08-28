/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,ejs}"],
  safelist: [
    // Background colors
    { pattern: /bg-red-(100|200|300|400|500|600|700)/ },
    // Text colors
    { pattern: /text-red-(600|700|800)/ },
    "text-white",

    // Borders
    { pattern: /border-red-(400|500|600|700)/ },

    // Utilities
    "rounded",
    "rounded-lg",
    "shadow",
    "shadow-md",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-black",
  ],
  theme: { extend: {} },
  plugins: [],
};
