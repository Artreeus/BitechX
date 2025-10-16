import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'rich-black': '#0D1821',
        'anti-flash-white': '#EFF1F3',
        'hooker-green': '#4E6E5D',
        'lion': '#AD8A64',
        'chestnut': '#A44A3F',
      },
    },
  },
  plugins: [],
};
export default config;

