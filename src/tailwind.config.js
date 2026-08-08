/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jetbrains: ['"JetBrains Mono"', 'monospace'],
        instrument: ['"Instrument Serif"', 'serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-33.333333%)' }, // Shift by 1 track length (out of 3)
        },
      },
      animation: {
        marquee: 'marquee linear infinite', // Speed is controlled via arbitrary utility classes like duration-[25s]
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-33.333333%)' }, // Shifts by 1 track length (out of 3)
        },
      },
      animation: {
        marquee: 'marquee linear infinite',
      },
    },
  },
  plugins: [],
};