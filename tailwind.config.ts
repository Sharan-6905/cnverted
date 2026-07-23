import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Clay surfaces — light neutral, just a hint of warmth
        canvas: "#FFFFFF",
        "surface-soft": "#F7F6F3",
        "surface-card": "#F1F0EA",
        "surface-strong": "#E8E6DD",
        "surface-dark": "#0A1A1A",

        ink: "#0A0A0A",
        "body-strong": "#1A1A1A",
        body: "#3A3A3A",
        muted: "#6A6A6A",
        "muted-soft": "#9A9A9A",
        hairline: "#E7E5DD",
        "on-dark": "#FFFFFF",

        // Saturated Clay feature-card palette
        brand: {
          pink: "#FF4D8B",
          teal: "#1A3A3A",
          lavender: "#B8A4ED",
          peach: "#FFB084",
          ochre: "#E8B94A",
          mint: "#A4D4C5",
          coral: "#FF6B5A",
        },

        // Intent / status (retained for signal scoring)
        intent: {
          high: "#1E9E5A",
          "high-bg": "#E4F4EA",
          medium: "#C98A1E",
          "medium-bg": "#F8EDD6",
          low: "#8A8A8A",
          "low-bg": "#EFEADD",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Bricolage Grotesque", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-md": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(20,16,8,0.04), 0 2px 8px rgba(20,16,8,0.05)",
        float: "0 16px 40px -12px rgba(20,16,8,0.16), 0 4px 12px -4px rgba(20,16,8,0.06)",
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
        "4xl": "32px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
