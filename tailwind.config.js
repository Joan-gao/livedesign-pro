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
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        slideUp: 'slideUp 0.5s ease-out',
      },
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
