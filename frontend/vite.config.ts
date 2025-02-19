import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      // When the frontend calls `/api`, it will be forwarded to your backend server.
      '/api': {
        target: 'http://192.168.178.99:3000', // replace with your backend IP and port
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/socket.io': {
        target: 'ws://192.168.178.99:3000/',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  }
})
