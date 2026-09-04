import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gb-black': '#0a0908',
        'gb-charcoal': '#111110',
        'gb-charcoal-2': '#1a1918',
        'gb-charcoal-3': '#252422',
        'gb-copper': '#C97B3A',
        'gb-copper-light': '#E8893A',
        'gb-copper-dark': '#A65E26',
        'gb-offwhite': '#F5F0E8',
        'gb-offwhite-muted': '#B8B0A4',
        'gb-teal': '#2DD4BF',
        'gb-teal-dark': '#0D9488',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'pulse-copper': 'pulseCopperGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        pulseCopperGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 123, 58, 0)' },
          '50%': { boxShadow: '0 0 40px 10px rgba(201, 123, 58, 0.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'cinematic': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'elastic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
};

export default config;
