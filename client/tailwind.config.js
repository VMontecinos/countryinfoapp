/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-custom":
          "linear-gradient(0deg, rgba(42,42,42,1) 0%, rgba(27,27,27,1) 100%)",
      },
    },
  },
  plugins: [],
};
