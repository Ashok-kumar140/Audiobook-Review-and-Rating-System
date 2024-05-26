/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      screens:{
        'xl':'1100px',
        '2xl':'550px'
      },
    },
    
  },
  plugins: [],
}

