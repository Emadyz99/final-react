/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", 
  theme: {
    extend: {
      colors: {
        darkbg: {
          DEFAULT: "#1F2937",  
          light: "#374151",    
        },
        darktext: {
          DEFAULT: "#E5E7EB", 
        },
        primary: {
          light: "#3B82F6",   
          dark: "#2563EB",   
        },
      },
      transitionProperty: {
        colors: "background-color, border-color, color, fill, stroke",
      },
    },
  },
  plugins: [],
};
