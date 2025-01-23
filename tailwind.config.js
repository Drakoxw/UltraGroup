/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'golden': '0 4px 6px -1px rgba(255, 215, 0, 0.5), 0 2px 4px -1px rgba(255, 215, 0, 0.25)',
      },
      colors: {
        gold: '#FFD700',
      },
    }
  },
  plugins: [],
}

