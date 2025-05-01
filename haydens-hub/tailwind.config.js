/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5D8DCD', //blue shade dark 
        accent: '#D43F29', //red shade 
        olive: '#3F493D', //grey-green for footer
        green: '#B9E185',  

        lightBlue: '#CDD6FF', 
        lightPurple: '#EFEBEB', 
        
        // soft colors - used for tag backgrounds
        softPink: '#FFD6D6',
        softPurple: '#E0D6FF',
        softYellow: '#FFF3D6',
        softGreen: '#D6FFE0'
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['ui-sans-serif', 'system-ui', 'sans-serif'],
        subtitle: ['ui-serif', 'Georgia', 'serif']
      }
    }
  },
  plugins: []
}