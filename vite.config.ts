import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/React-search-photos/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000, // must be a port other than 5173
    host: true, 
    watch: {
      usePolling: true,
    },
  },
})

// Vite HoteReload trouble https://github.com/vitejs/vite/discussions/16102