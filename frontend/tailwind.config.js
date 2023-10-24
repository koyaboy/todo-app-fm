/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {

    backgroundImage: {
      'light-mode-mobile': "url('./images/bg-mobile-light.jpg')",
      'dark-mode-mobile': "url('./images/bg-mobile-dark.jpg')",
    },

    colors: {
      'red': '#FF0000',
      'white': 'white',
      'transparent': 'transparent',

      primary: {
        'bright-blue': 'hsl(220, 98%, 61%)',
        'check-background': 'linear-gradient(90deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%))',

      },

      lightMode: {
        'very-light-gray': 'hsl(0, 0%, 98%)',
        'very-light-grayish-blue': 'hsl(236, 33%, 92%)',
        'light-grayish-blue': 'hsl(233, 11%, 84%)',
        'dark-grayish-blue': 'hsl(236, 9%, 61%)',
        'very-dark-grayish-blue': 'hsl(235, 19%, 35%)',
      },

      darkMode: {
        'very-dark-blue': 'hsl(235, 21%, 11%)',
        'very-dark-desaturated-blue': 'hsl(235, 24%, 19%)',
        'light-grayish-blue': 'hsl(234, 39%, 85%)',
        'dark-grayish-blue': 'hsl(234, 11%, 52%)',
        'very-dark-grayish-blue': 'hsl(233, 14%, 35%)',
        'very-dark-grayish-blue': 'hsl(237, 14%, 26%)',
      }
    }
  },
  plugins: [],
}