/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,astro}",
    "./src/**/*.astro",
    "./src/**/*.css"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        display: ['Oswald', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#1E40AF',
          dark: '#1E3A8A',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
    },
  },
  plugins: [],
}
