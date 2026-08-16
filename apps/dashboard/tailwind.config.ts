import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#08080A",
        navy: {
          950: "#0A0A0C",
          900: "#131315",
          800: "#1C1C1F",
          700: "#28282C",
        },
        pulse: {
          violet: "#D4AF37",
          purple: "#B8901F",
          magenta: "#8C6D1F",
          deep: "#2A2210",
        },
        chrome: {
          100: "#E8E9EB",
          300: "#B8BABF",
          500: "#7A7C82",
        },
        ember: "#E8B84B",
        mint: "#34D399",
        blush: "#E5484D",
        ink: {
          100: "#F5F1E6",
          300: "#C9C2B4",
          500: "#8A8377",
          700: "#5B564C",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "pulse-radial": "radial-gradient(circle at 30% 20%, rgba(212,175,55,0.16), transparent 55%), radial-gradient(circle at 80% 0%, rgba(184,144,31,0.12), transparent 50%), radial-gradient(circle at 50% 100%, rgba(42,34,16,0.5), transparent 60%)",
        "pulse-line": "linear-gradient(135deg, #D4AF37 0%, #B8901F 50%, #2A2210 100%)",
        "chrome-sweep": "linear-gradient(115deg, transparent 40%, rgba(232,233,235,0.5) 48%, rgba(232,233,235,0.9) 50%, rgba(232,233,235,0.5) 52%, transparent 60%)",
        grain: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.05)" },
        },
        drift: {
          "0%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(-2%, 3%)" },
          "100%": { transform: "translate(0,0)" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        sweep: {
          "0%": { backgroundPosition: "-150% 0" },
          "60%, 100%": { backgroundPosition: "250% 0" },
        },
        headlight: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        pulseGlow: "pulseGlow 5s ease-in-out infinite",
        drift: "drift 14s ease-in-out infinite",
        rise: "rise 0.6s cubic-bezier(0.16,1,0.3,1) both",
        sweep: "sweep 5s ease-in-out infinite",
        headlight: "headlight 3.5s ease-in-out infinite",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
