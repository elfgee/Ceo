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
        slate: {
          50: "var(--slate-50)",
          100: "var(--slate-100)",
          200: "var(--slate-200)",
          300: "var(--slate-300)",
          400: "var(--slate-400)",
          500: "var(--slate-500)",
          600: "var(--slate-600)",
          700: "var(--slate-700)",
          800: "var(--slate-800)",
          900: "var(--slate-900)"
        },
        neutral: {
          50: "var(--neutral-50)",
          100: "var(--neutral-100)",
          200: "var(--neutral-200)",
          300: "var(--neutral-300)",
          400: "var(--neutral-400)",
          500: "var(--neutral-500)",
          600: "var(--neutral-600)",
          700: "var(--neutral-700)",
          800: "var(--neutral-800)",
          900: "var(--neutral-900)"
        },
        red: {
          50: "var(--red-50)",
          100: "var(--red-100)",
          200: "var(--red-200)",
          300: "var(--red-300)",
          400: "var(--red-400)",
          500: "var(--red-500)",
          600: "var(--red-600)",
          700: "var(--red-700)",
          800: "var(--red-800)",
          900: "var(--red-900)"
        },
        blue: {
          50: "var(--blue-50)",
          100: "var(--blue-100)",
          200: "var(--blue-200)",
          300: "var(--blue-300)",
          400: "var(--blue-400)",
          500: "var(--blue-500)",
          600: "var(--blue-600)",
          700: "var(--blue-700)",
          800: "var(--blue-800)",
          900: "var(--blue-900)"
        },
        primary: "var(--primary)",
        primaryHover: "var(--primary-hover)",
        primaryForeground: "var(--primary-foreground)",
        secondary: "var(--secondary)",
        secondaryHover: "var(--secondary-hover)",
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
        zigbangNavy50: "var(--zigbang-navy-50)",
        zigbangNavy100: "var(--zigbang-navy-100)",
        zigbangNavy200: "var(--zigbang-navy-200)",
        zigbangNavy300: "var(--zigbang-navy-300)",
        zigbangNavy400: "var(--zigbang-navy-400)",
        zigbangNavy500: "var(--zigbang-navy-500)",
        zigbangNavy600: "var(--zigbang-navy-600)",
        zigbangAptPro: "var(--zigbang-apt-pro)",
        zigbangZikim: "var(--zigbang-zikim)",
        destructive: "var(--destructive)",
        destructiveHover: "var(--destructive-hover)",
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
        inputBorder: "var(--input-border)",
        inputBackground: "var(--input-background)",
        ring: "var(--ring)"
      }
    }
  }
};

