/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
  
      fontFamily: {
        playwrite: ['"Playwrite NL Guides"', 'serif'], // আপনার ফন্টের নাম
      },
      boxShadow: {
        'custom': '0 4px 6px -1px #03AFE6, 0 2px 4px -1px #03AFE6',
      },

      
      
    },
  },
  plugins: [
    require('daisyui'),
  
  ],
}

