/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5D8DCD',
        accent: '#D43F29',
        olive: '#3F493D',
        lightBlue: '#CDD6FF',
        cream: '#E6CFB8',
        blue: '#3E87B0',
        grey: '#EFEBEB',
        green: '#B9E185',
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