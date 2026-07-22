import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand — deep forest green (#0b4422)
        brand: {
          DEFAULT: "#0b4422",
          50: "#eef4f0",
          100: "#d6e5dc",
          200: "#aecdbb",
          300: "#7fae93",
          400: "#4f8c6b",
          500: "#2f7350",
          600: "#175d3a",
          700: "#0e5a2e",
          800: "#0b4422",
          900: "#08321a",
          950: "#041d0f",
        },
        // Fresh leaf accent for highlights, underlines, active markers
        leaf: {
          DEFAULT: "#3fa66a",
          soft: "#e7f2ec",
        },
        // Warm gold for badges and small emphasis
        gold: {
          DEFAULT: "#e0a72e",
          soft: "#fbf1d8",
        },
        cream: "#f7f5ef",
        ink: "#12211a",
        muted: "#5b6b62",
        line: "#e3e8e4",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(11, 68, 34, 0.06)",
        card: "0 12px 32px -12px rgba(11, 68, 34, 0.22)",
        float: "0 24px 60px -20px rgba(11, 68, 34, 0.35)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
        exit: "cubic-bezier(0.55, 0, 1, 0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
