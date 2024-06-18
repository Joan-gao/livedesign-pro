/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      width: {
        '375': '375px',
      },
      height: {
        '667': '667px',
      },
      zIndex: {
        101: '101',
      },
      borderRadius: {
        '25': '25px',
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 0 2px rgba(0, 0, 0, 0.5)',
        },
        // Add more custom utilities if needed
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ]
}
