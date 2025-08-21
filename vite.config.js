import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // ajustado para rodar na raiz do projeto localmente
  plugins: [react()],
})
