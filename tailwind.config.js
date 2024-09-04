import { presetVarlet } from '@varlet/preset-tailwindcss'
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      
    },
  },
  plugins: [],
  presets: [presetVarlet()]
}

