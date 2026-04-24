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
        primary: {
          DEFAULT: '#1B4332',
          50: '#E8F5EE',
          100: '#D1EBDD',
          200: '#A3D7BB',
          300: '#74C399',
          400: '#46AF77',
          500: '#2D6A4F',
          600: '#1B4332',
          700: '#153628',
          800: '#0F291E',
          900: '#0A1C14',
        },
        secondary: {
          DEFAULT: '#FF6B35',
          50: '#FFF3ED',
          100: '#FFE4D6',
          200: '#FFC9AD',
          300: '#FFAE84',
          400: '#FF8C5A',
          500: '#FF6B35',
          600: '#E55A20',
          700: '#CC4A10',
          800: '#993A0C',
          900: '#662808',
        },
        background: '#FAFAF9',
        foreground: '#1C1917',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
        card: '12px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
        'card-hover': '0 10px 25px rgba(0,0,0,0.1), 0 4px 10px rgba(0,0,0,0.05)',
        nav: '0 2px 8px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
