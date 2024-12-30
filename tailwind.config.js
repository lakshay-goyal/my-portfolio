/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          footerColor: '#101927',
        },
        animation: {
          blob: "blob 7s infinite",
        },
      },
  },
  plugins: [],
}