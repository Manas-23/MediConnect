/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a0f',
          800: '#0f0f1a',
          700: '#141428',
          600: '#1a1a35',
          500: '#1e1e40',
        },
        brand: {
          blue: '#3b82f6',
          purple: '#6366f1',
          cyan: '#06b6d4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 50%, #141428 100%)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      boxShadow: {
        'blue-glow': '0 0 40px rgba(59, 130, 246, 0.3)',
        'card-hover': '0 20px 60px rgba(59, 130, 246, 0.15)',
      }
    },
  },
  plugins: [],
}


