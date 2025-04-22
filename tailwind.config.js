/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'moroccan-green': {
          light: '#6b7f3e',
          DEFAULT: '#4a5a2b',
          dark: '#3a4821',
        },
        'moroccan-sand': {
          light: '#f8f5ec',
          DEFAULT: '#d3c8ab',
          dark: '#8e846b',
        },
        'moroccan-gold': {
          light: '#e6a93d',
          DEFAULT: '#c17f24',
          dark: '#95611c',
        },
        'moroccan-terra': {
          light: '#d47a54',
          DEFAULT: '#b54e32',
          dark: '#8a3a25',
        },
      },
      backgroundImage: {
        'moroccan-pattern': "url('/images/moroccan-pattern.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        scaleIn: 'scaleIn 0.3s ease-out',
        slideInRight: 'slideInRight 0.4s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      fontFamily: {
        morocco: ['var(--font-morocco)', 'serif'],
      },
    },
  },
  plugins: [],
} 