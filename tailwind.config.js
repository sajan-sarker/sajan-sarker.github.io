/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#020617',
        'bg-mid': '#0b1227',
        surface: '#111a31',
        'surface-alt': '#0f172a',
        border: '#27344d',
        'text-main': '#f8fafc',
        'text-soft': '#cbd5e1',
        accent: '#60a5fa',
        'accent-strong': '#3b82f6',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
