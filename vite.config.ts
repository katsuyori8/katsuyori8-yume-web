import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/katsuyori8-yume-web/',
  plugins: [react()],
})
