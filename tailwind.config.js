/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            'brand-pink': '#F472B6',
            'brand-cyan': '#22D3EE',
        }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}