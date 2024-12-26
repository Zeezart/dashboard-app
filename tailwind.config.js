/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Sesuaikan dengan struktur folder proyekmu
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-animate'), // Plugin tambahan yang sudah ada di dependensi
  ],
};
