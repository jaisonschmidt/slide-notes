import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/slide-notes/', // necessário para GitHub Pages
  plugins: [react()],
})
