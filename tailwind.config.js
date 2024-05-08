/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1128px",
      },
      height: {
        "screen-90": "90vh",
        "screen-95": "95vh",
        "screen-85": "85vh",
        "screen-100": "100vh",
        "screen-50": "50vh",
        "1/20": "5%",
        "1": "100%",
      },
      margin: {
        "1/10": "10%",
      },
      flex: {
        "2/5": "2 2 40%",
        "3/5": "3 3 60%",
        "1/4": "1 1 25%",
        "3/4": "1 1 25%",
        "4/5": "4 4 80%",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};