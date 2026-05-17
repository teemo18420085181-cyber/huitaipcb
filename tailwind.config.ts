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
        brand: {
          primary: '#27215B',
          'primary-dark': '#1A1640',
          'primary-light': '#3A3270',
          yellow: '#FCEA0B',
          'yellow-soft': '#FFF4A8',
          green: '#93C249',
          'green-dark': '#5E8C1F',
        },
        bg: {
          DEFAULT: '#FAFAF8',
          muted: '#F2F0EA',
        },
        ink: {
          DEFAULT: '#1A1640',
          muted: '#6B6783',
        },
        line: '#E8E6F0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
