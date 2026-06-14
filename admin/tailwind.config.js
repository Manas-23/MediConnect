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
      boxShadow: {
        'blue-glow': '0 0 40px rgba(59, 130, 246, 0.3)',
        'card-hover': '0 20px 60px rgba(59, 130, 246, 0.15)',
      }
    },
  },
  plugins: [],
}


