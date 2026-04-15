/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#121212',
        secondary: '#F5F5F5',
        accent: '#8A2BE2',
        accentAlt: '#00FFFF',
        gray: {
          800: '#1F1F1F',
          700: '#2A2A2A',
          600: '#404040',
        }
      },
      fontFamily: {
        'heading': ['Inter', 'Poppins', 'sans-serif'],
        'body': ['Roboto', 'Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 