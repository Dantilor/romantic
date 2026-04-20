import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FBF7F2",
          50: "#FDFBF8",
          100: "#FBF7F2",
          200: "#F6EFE5",
        },
        blush: {
          DEFAULT: "#F1D7CF",
          50: "#FBEDE9",
          100: "#F6E1DA",
          200: "#F1D7CF",
          300: "#E6BFB4",
          400: "#D6A296",
        },
        beige: {
          DEFAULT: "#E8D9C4",
          100: "#F1E7D7",
          200: "#E8D9C4",
          300: "#D9C5A8",
        },
        gold: {
          DEFAULT: "#BE9A5A",
          400: "#CDAE77",
          500: "#BE9A5A",
          600: "#A4823F",
          700: "#846531",
        },
        ink: {
          DEFAULT: "#3A2E2B",
          soft: "#57453F",
          muted: "#8A7268",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 32px -12px rgba(58, 46, 43, 0.18)",
        card: "0 4px 24px -8px rgba(58, 46, 43, 0.12)",
      },
      backgroundImage: {
        "grain":
          "radial-gradient(rgba(58,46,43,0.035) 1px, transparent 1px)",
      },
      letterSpacing: {
        wider2: "0.18em",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out both",
        "rise": "rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
