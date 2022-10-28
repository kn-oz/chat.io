/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      black: '#161616',
      darkerblack: '#0d0d0d',
      gray: '#1c1c1c',
      slate: '#a2a2a2', 
      blue: '#2077fe',
      white: '#e0e0e0',
      purple: '#7c4dff',
      purpledark: '#5c3dc2',
    },
    extend: {},
  },
  plugins: [],
}