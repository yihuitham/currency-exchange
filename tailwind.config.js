module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    spacing: {
      icon: "30px",
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
