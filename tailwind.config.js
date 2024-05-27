/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    fontFamily: {
      primary: ["Pretendard", "serif"],
    },
    container: {
      center: true,
      padding: "15px",
      // screens: {
      //   "lg": "1830px",
      //   "xl": "1830px",
      //   "2xl": "1830px",
      // },
    },
    extend: {
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "line": "#E5E7EB",
        "white": "#FFFFFF",
        "bg": "#0A0E14",
        "green/green": "#60AA63",
        "green/green-hover": "#4DC252",
        "green/green-50": "#AFD5B1",
        "green/green-30": "#CFE5D0",
        "green/green-20": "#DFEEE0",
        "green/green-10": "#EFF6EF",
        "blue/blue": "#08838A",
        "blue/blue-50": "#83C1C5",
        "blue/blue-30": "#B5DADC",
        "blue/blue-20": "#CEE6E8",
        "blue/blue-10": "#E6F3F3",
        "neutral/50": "#F9FAFB",
        "neutral/100": "#F3F4F6",
        "neutral/200": "#E5E7EB",
        "neutral/300": "#D1D5DB",
        "neutral/400": "#9CA3AF",
        "neutral/500": "#6B7280",
        "neutral/600": "#4B5563",
        "neutral/700": "#374151",
        "neutral/800": "#1F2937",
        "neutral/900": "#111827",
        "neutral/1000": "#49525E",
        "color/sign/blue": "#4878D4",
        "color/sign/red": "#A53F2D",
        "color/sign/green": "#61C37A",
        "color/sign/yellow": "#D4C648",
        "bg2": "#2C2C2C"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        folder: "url('../public/folder.svg')",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
};
