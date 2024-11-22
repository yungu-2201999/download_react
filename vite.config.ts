import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import removeConsole from 'vite-plugin-remove-console';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    removeConsole()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('tac')) {
            return 'tac'
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
})