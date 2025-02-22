import path from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import checker from 'vite-plugin-checker'

export default defineConfig(({}) => {

  return {
    base: '/',
    server:{
      open: true,
      host: '0.0.0.0',
      port: 8080,
      proxy: {
        //Потом айпи реального сервера тут поставим
        '/api': {target:"http://83.166.235.140:8080/",

          ws:true,
          changeOrigin: true
        },
        
      }
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      force: true,
      exclude: ['js-big-decimal'],
      esbuildOptions: {
        loader: {
          '.ts': 'tsx',
          '.js': 'jsx'
        },
      },
    },
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          dimensions: true,
        },
      }),
      checker({ typescript: true }),
      tsconfigPaths(),
    ],
    build: {
      outDir: path.resolve(__dirname, 'build'),
      rollupOptions: {
        output: {
          assetFileNames: '[name].[hash].[ext]',
          entryFileNames: '[name].[hash].min.js',
          chunkFileNames: '[name].[hash].min.js',
        },
      },
      emptyOutDir: true,
      minify: true,
      assetsDir: '.',
    },
  }
})
