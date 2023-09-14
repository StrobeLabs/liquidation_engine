import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      process: 'process/browser',
      util: 'util',
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, './index.html'),
        dashboard: path.resolve(__dirname, './dashboard/index.html'),
      },
    },
  },
  plugins: [react()],
})
