/** @type {(tailwindConfig: object) => object} */


module.exports = {
  content: [
    './index.html',
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors : {
        "goldenSandstone": "#ebbe98",
        "copperCanyon": "#5d360f",
        "apricotBlush" : "#e49750",
        "warmSand" : "#ffebe9",
         "pink" :"#f6d1cb"
      },
      fontFamily: {
        roboto: ["Roboto", 'sans-serif']
      }
    },
  },
  plugins: [],
}