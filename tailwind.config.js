/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FFFFFF',
        panel: '#F6F8FA',
        border: '#D8DEE4',
        ink: '#14171A',
        muted: '#59636E',
        link: '#0B6FDA',
        diffgreen: '#1A7F37',
        diffgreenbg: '#DAFBE1',
        tagrobotics: '#BC4C00',
        tagcad: '#8250DF',
        tagembedded: '#0B6E58',
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
