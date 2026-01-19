import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],

  /* 🔥 THIS IS THE FIX */
  safelist: [
    'bg-gradient-to-br',

    'from-purple-500', 'to-indigo-600',
    'from-blue-500', 'to-cyan-500',
    'from-indigo-500', 'to-violet-600',
    'from-pink-500', 'to-rose-500',
    'from-emerald-500', 'to-green-600',
    'from-yellow-400', 'to-amber-500',
    'from-red-500', 'to-orange-500',
    'from-orange-500', 'to-yellow-500',

    // fallback solid colors (just in case)
    'bg-purple-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-pink-500',
    'bg-emerald-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-orange-500'
  ],

  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["SF Pro Display", "Inter", "system-ui", "sans-serif"],
        serif: ["SF Pro Text", "Georgia", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
