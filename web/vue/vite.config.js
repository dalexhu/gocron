import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// 生产环境前端资源由后端通过 /public/ 前缀提供 (见 internal/routers/routers.go 的 staticDir),
// 开发环境则挂在根路径并把 /api 代理到本地后端 (默认端口 5920)。
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/public/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'static',
    emptyOutDir: true
  },
  server: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:5920',
        changeOrigin: true
      }
    }
  }
}))
