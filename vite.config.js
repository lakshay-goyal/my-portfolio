import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  optimizeDeps: {
    include: ['framer-motion', '@tabler/icons-react'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
})
