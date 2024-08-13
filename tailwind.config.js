// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        "custom-purple": "#7E1F86",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
