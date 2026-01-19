/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Pretendard",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial"
        ]
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "18px",
        "2xl": "24px",
        "4xl": "36px"
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        button: "var(--radius-button)",
        card: "var(--radius-card)",
        badge: "var(--radius-badge)"
      },
      colors: {
        canvas: {
          50: "var(--canvas-50)",
          100: "var(--canvas-100)"
        },
        grey: {
          50: "var(--grey-50)",
          100: "var(--grey-100)",
          200: "var(--grey-200)",
          300: "var(--grey-300)",
          400: "var(--grey-400)",
          500: "var(--grey-500)",
          600: "var(--grey-600)",
          700: "var(--grey-700)",
          800: "var(--grey-800)",
          900: "var(--grey-900)"
        },
        primary: "var(--primary)",
        primaryForeground: "var(--primary-foreground)",
        secondary: "var(--secondary)",
        secondaryForeground: "var(--secondary-foreground)",
        zigbangOrange50: "var(--zigbang-orange-50)",
        zigbangOrange100: "var(--zigbang-orange-100)",
        zigbangOrange200: "var(--zigbang-orange-200)",
        zigbangOrange300: "var(--zigbang-orange-300)",
        zigbangOrange400: "var(--zigbang-orange-400)",
        zigbangOrange500: "var(--zigbang-orange-500)",
        zigbangOrange600: "var(--zigbang-orange-600)",
        zigbangOrange700: "var(--zigbang-orange-700)",
        zigbangOrange800: "var(--zigbang-orange-800)",
        zigbangOrange900: "var(--zigbang-orange-900)",
        destructive: "var(--destructive)",
        destructiveForeground: "var(--destructive-foreground)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        cardForeground: "var(--card-foreground)",
        popover: "var(--popover)",
        popoverForeground: "var(--popover-foreground)",
        muted: "var(--muted)",
        mutedForeground: "var(--muted-foreground)",
        accent: "var(--accent)",
        accentForeground: "var(--accent-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        inputBackground: "var(--input-background)",
        ring: "var(--ring)"
      }
    }
  }
};

