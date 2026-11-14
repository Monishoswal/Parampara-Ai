/** @type {import('tailwindcss').Config} */
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: withOpacity('--paper-rgb'),
        surface: withOpacity('--surface-rgb'),
        ink: withOpacity('--ink-rgb'),
        muted: withOpacity('--muted-rgb'),
        border: withOpacity('--border-rgb'),
        maroon: {
          DEFAULT: withOpacity('--terracotta-rgb'),
          hover: withOpacity('--terracotta-hover-rgb'),
          light: withOpacity('--terracotta-light-rgb'),
          deep: withOpacity('--terracotta-rgb'),
        },
        brown: {
          DEFAULT: 'rgb(26 26 30)',
          dark: 'rgb(18 18 20)',
          deep: 'rgb(18 18 20)',
          border: 'rgb(44 44 52)',
          light: 'rgb(44 44 52)',
        },
        terracotta: {
          DEFAULT: withOpacity('--terracotta-rgb'),
          hover: withOpacity('--terracotta-hover-rgb'),
          light: withOpacity('--terracotta-light-rgb'),
        },
        sage: {
          DEFAULT: withOpacity('--sage-rgb'),
          hover: withOpacity('--sage-hover-rgb'),
          light: withOpacity('--sage-light-rgb'),
        },
        navy: {
          DEFAULT: withOpacity('--navy-rgb'),
          hover: withOpacity('--navy-hover-rgb'),
          light: withOpacity('--navy-light-rgb'),
        },
        amber: {
          DEFAULT: withOpacity('--amber-rgb'),
          hover: withOpacity('--amber-hover-rgb'),
          light: withOpacity('--amber-light-rgb'),
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        editorial: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.15)",
        card: "0 2px 4px -1px rgba(0, 0, 0, 0.15), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
        elevated: "0 8px 16px -4px rgba(0, 0, 0, 0.25), 0 2px 4px -2px rgba(0, 0, 0, 0.15)",
      },
      borderRadius: {
        sm: "0.25rem",  // 4px
        md: "0.5rem",   // 8px (buttons, small inputs)
        lg: "0.75rem",  // 12px (cards, popovers)
        xl: "1rem",     // 16px (containers, dialogs)
        "2xl": "1.25rem", // 20px (large featured cards)
      }
    },
  },
  plugins: [],
}
