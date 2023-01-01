/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary': '#0000FF',
        'secondary':'#FF0000'
      }),
      textColor: {
        'primary': '#FF0000',
      }
    },
  },
  plugins: [],
}
