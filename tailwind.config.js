/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: '#F5F5DC',
        lightBrown: '#78350f',
        darkBrown: '#451a03',
        lightSky: '#bae6fd',
        darkSky: '#38bdf8',
        lightStone: '#f5f5f4',
      },
    },
    fontFamily: {
      Poppins: ["Poppins, serif"],
      ProtestRiot: ["Protest Riot, sans-serif"],
    },
    flex: {
      "1": "1 1 0%",
      "2": "2 2 0%",
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
  },
  plugins: [],
}

