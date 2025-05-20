/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
         SemiHeadLine: ['Tanker', 'sans-serif'],
        LineParagraph: ['Bespoke Serif', 'serif'],
        Brand : ['Rudra', 'sans-serif'],
        SemiBrand : ['Istok Web' , 'sans-serif' ],
        SemiSemiBrand : ['Spinnaker' , 'sans-serif']
      }
    },
  },
  plugins: [],
}