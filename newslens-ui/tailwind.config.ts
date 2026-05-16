import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: 'rgba(28, 28, 30, 0.5)', 
        'surface-highlight': 'rgba(44, 44, 46, 0.8)',
        primary: '#0A84FF', 
        'primary-glow': 'rgba(10, 132, 255, 0.5)',
        secondary: '#5E5CE6', 
        tertiary: '#BF5AF2', 
        'on-surface': '#FFFFFF',
        'on-surface-variant': '#EBEBF5',
        error: '#FF453A', 
        success: '#32D74B', 
        warning: '#FF9F0A', 
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-dark': 'radial-gradient(at 40% 20%, rgba(10, 132, 255, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(94, 92, 230, 0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(191, 90, 242, 0.15) 0px, transparent 50%)',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['SF Pro Display', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5', transform: 'scale(1.05)' },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-inset': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
        'glow': '0 0 20px rgba(10, 132, 255, 0.5)',
      }
    },
  },
  plugins: [],
};
export default config;
