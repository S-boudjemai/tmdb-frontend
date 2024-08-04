// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-purple": "#7E1F86",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
