/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inherit: ['inherit']
      },
      colors: {
        gf: {
          dark: {
            primary: '#8ab4f8',
            secondary: '#d2e3fc'
          },
          light: {
            primary: '#1a73e8',
            secondary: '#174ea6'
          }
        },
        greyscale: {
          100: '#fbfbfe',
          200: '#dadde6',
          300: '#c2c8d5',
          400: '#b1b9ca',
          500: '#a7b2c6',
          600: '#8a94a9',
          700: '#666f84',
          800: '#3a425a',
          900: '#060e28',
        },
        green: {
          100: '#d3eadc',
          200: '#abdaba',
          300: '#84c997',
          400: '#5cb975',
          500: '#34a853',
          600: '#2b894a',
          700: '#226a42',
          800: '#184c39',
          900: '#0f2d31',
        },
        red: {
          100: '#f8d6d6',
          200: '#f4b1ad',
          300: '#f18d85',
          400: '#ed685d',
          500: '#ea4335',
          600: '#bc3832',
          700: '#8f2e30',
          800: '#61232d',
          900: '#34192b',
        },
        yellow: {
          100: '#fbeecc',
          200: '#fbe29a',
          300: '#fbd568',
          400: '#fbc936',
          500: '#fbbc04',
          600: '#ca990b',
          700: '#997612',
          800: '#68541a',
          900: '#373121',
        },
        blue: {
          100: '#cee0fa',
          200: '#a1c5f5',
          300: '#74a9f1',
          400: '#478eec',
          500: '#1a73e8',
          600: '#165fc2',
          700: '#124b9b',
          800: '#0e3675',
          900: '#0a224e',
        }
      },
      dropShadow: {
        logo: '0 0 2rem rgba(26, 115, 232, 0.5)'
      },
      backgroundImage: ({theme}) => ({
        header: `linear-gradient(90deg, ${theme('colors.blue.900')} 0%, ${theme('colors.greyscale.900')} 100%)`
      })
    },
  },
  plugins: [],
}
