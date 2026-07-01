/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#F7F3E9",
        parchment2: "#EFE8D8",
        ink: "#22201B",
        forest: "#1F4E3D",
        forestdark: "#153A2C",
        sage: "#E4EDE3",
        gold: "#C89B3C",
        rust: "#B3441E",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-plex)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        grain: "url('/grain.svg')",
      },
    },
  },
  plugins: [],
};
