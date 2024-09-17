import primeui from 'tailwindcss-primeui'
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '90rem'
      }
    },
  },
  plugins: [primeui]
}

