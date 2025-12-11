/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: "#0b0f14"
        },
        brand: {
          "bg-primary": "#0B0C10",
          "bg-secondary": "#111217",
          accent: "#C89A66",
          "accent-light": "#E4C7A3",
          "text-strong": "#ffffff",
          "text-soft": "#BFC3CC"
        },
        logoBlue: {
          DEFAULT: "#0054A6",
          dark: "#002F63"
        },
        logoRed: {
          DEFAULT: "#D62828",
          dark: "#8C1C1C"
        },
        textsoft: "#C9CDD6",
        bg: {
          primary: "#0A0B0D",
          secondary: "#0E0F12"
        }
      },
      boxShadow: {
        soft: "0 24px 60px rgba(0,0,0,0.35)",
        glow: "0 22px 70px rgba(0, 84, 166, 0.3)",
        blueGlow: "0 0 18px -6px rgba(0, 84, 166, 0.45)"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        ribbonScroll: {
          "0%": { transform: "translateX(0%)" },
          "50%": { transform: "translateX(-45%)" },
          "100%": { transform: "translateX(0%)" }
        },
        parallaxSlow: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(0, -10px, 0)" }
        },
        modal: {
          "0%": { opacity: "0", transform: "translateY(8px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" }
        }
      },
      animation: {
        "fade-up": "fadeUp 1s ease forwards",
        "fade-in": "fadeIn 1.1s ease forwards",
        "modal-in": "modal 220ms ease forwards",
        "ribbon-scroll": "ribbonScroll var(--ribbon-duration,28s) ease-in-out infinite",
        "parallax-slow": "parallaxSlow 8s ease-in-out alternate infinite"
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".underline-accent": {
          backgroundImage: "linear-gradient(90deg, #C89A66, #E4C7A3)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 2px",
          backgroundPosition: "0 100%"
        }
      });
    }
  ]
};
