/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // Lora for all UI text
        sans: ['Lora', 'Georgia', 'serif'],
        // Source Code Pro only for badge and count
        mono: ['"Source Code Pro"', 'monospace'],
      },
    },
  },
  plugins: [],
}
