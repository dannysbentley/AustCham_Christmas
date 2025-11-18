/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0d9488',
        festiveRed: '#d11f3a',
        festiveGold: '#f2c744'
      },
      fontFamily: {
        display: ['\"Playfair Display\"', 'serif'],
        body: ['\"Inter\"', 'system-ui']
      }
    }
  },
  plugins: []
};
