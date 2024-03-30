/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  important:"#root",
  theme: {
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '1000px',
      'xl': '1200px',
      '2xl': '1536px',
    },
    extend: {
      boxShadow: {
        '3xl': '5px 5px 10px -5px rgb(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
};
