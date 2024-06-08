import { fileURLToPath, URL } from 'node:url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


import mockDevServerPlugin from 'vite-plugin-mock-dev-server'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vueJsx(),
    vue()
    // mockDevServerPlugin()  // 如果要使用 mock，取消该注释；否则直接向后端发送请求
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '^/api': 'http://81.70.241.166/',
      '/socket': {
        target: 'ws://81.70.241.166/', // 'ws://localhost:5174',
        ws: true
      }
    }
  },
  optimizeDeps: {
    exclude: ['vue-demi']
  }
})
