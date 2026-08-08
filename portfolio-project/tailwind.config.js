/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blueprint: '#0B1B2B',
        paper: '#F4F1E8',
        trace: '#4FD1C5',
        copper: '#C97C4A',
        slate: '#8B98A5',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        grid: `linear-gradient(rgba(79, 209, 197, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 209, 197, 0.06) 1px, transparent 1px)`,
      },
      backgroundSize: {
        grid: '32px 32px',
      },
    },
  },
  plugins: [],
};
