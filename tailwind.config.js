/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        slideInOut: {
          "0%": { transform: "translateX(100%)" }, //currently outside
          "10%": { transform: "translateX(0)" }, // come in
          "90%": { transform: "translateX(0)" }, // stay in
          "100%": { transform: "translateX(100%)" }, // go out
        },
      },

      animation: {
        slideInOut: "slideInOut 3s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
