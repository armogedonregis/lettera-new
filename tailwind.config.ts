import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-work-sans)', 'sans-serif'],
      },
      colors: {
        gray_primary: "#9898AB",
        blue_primary: "#2290FF"
      },
      container: {
        center: true,
        padding: '',
        screens: {
          sm: '772px',
        },
      },
    },
  },
  plugins: [],
};
export default config;
