/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFBF7",
          100: "#F8F5EE",
          200: "#F4F0EA",
          300: "#E8E2D7",
          400: "#D3C9B8",
          500: "#BBB09C",
        },
        obsidian: {
          50: "#2B2B2B",
          100: "#222222",
          200: "#1A1A1A",
          300: "#161616",
          400: "#121212",
          500: "#0D0D0D",
        },
        stone: {
          50: "#FAF8F5",
          100: "#F2EEE9",
          200: "#E4DED5",
          300: "#C9BFB2",
          400: "#A39787",
          500: "#7A6F60",
          600: "#574E43",
          700: "#3D362E",
          800: "#26221D",
          900: "#14110E",
        },
        accent: {
          gold: "#C69C6D",
          amber: "#D97706",
          terracotta: "#B45309",
          forest: "#1E3A8A",
          emerald: "#059669",
        }
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        editorial: "0.15em",
        superwide: "0.25em",
      },
      borderRadius: {
        'card': '16px',
        'card-lg': '20px',
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(0, 0, 0, 0.05)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.03)",
        elevated: "0 20px 40px -15px rgba(0, 0, 0, 0.08)",
        'card-hover': "0 20px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(198, 156, 109, 0.12)",
        'glow-gold': "0 0 30px -5px rgba(198, 156, 109, 0.2)",
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
