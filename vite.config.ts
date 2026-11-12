import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // giustomanetti.uz hostingi uchun sayt ildizda ('/').
  // GitHub Pages preview esa `npm run deploy` bilan /giustomanetti/ ostida yig'iladi.
  base: '/',
  server: { port: 4180 },
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 700,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'three', test: /node_modules[\\/]three/ },
            { name: 'motion', test: /node_modules[\\/](gsap|@gsap|lenis)/ },
            { name: 'react', test: /node_modules[\\/](react|react-dom|react-router|scheduler)[\\/]/ },
          ],
        },
      },
    },
  },
})
