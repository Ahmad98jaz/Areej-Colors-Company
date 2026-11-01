export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { gold: { DEFAULT: '#c5a059', light: '#e0b973' }, ink: '#121212', cream: '#fdfaf5' },
    fontFamily: { sans: ['Cairo', 'system-ui', 'sans-serif'] },
    boxShadow: { lux: '0 20px 50px -20px rgba(0,0,0,.35)' } } },
  plugins: [] }
