const colors = require("tailwindcss/colors");

module.exports = {
  content: [`src/**/*.{js,ts,jsx,tsx,vue}`],
  theme: {
    extend: {
      colors: {
        brandblue: colors.blue[500],
        brandred: colors.red[500],
        primary: "#9200ff",
        "primary-transparent": "rgba(146, 0, 255, 0.5)",
        secondary: "#007aff",
        "secondary-transparent": "rgba(0, 122, 255, 0.5)",
        success: "#4caf50",
        info: "#2196f3",
        warning: "#ff9800",
        danger: "#f44336",
        light: "#fafafa",
        dark: "#212121",
        white: "#ffffff",
        black: "#000000",
        code: "#24292e",
      },
      screens: {
        desktop: "1700px",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
  darkMode: "class",
};
