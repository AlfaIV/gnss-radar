import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, './src/components'),
        "@assets": resolve(__dirname, './src/assets'),
        "@views": resolve(__dirname, './src/views'),
        "@icons": resolve(__dirname, 'src/assets/icons'),
        "@scss": resolve(__dirname, 'src/scss'),
    },
  },
  build: {
    // chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
})
