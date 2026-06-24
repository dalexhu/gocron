# gocron

> 定时任务管理系统 — 前端 (Vue 3 + Vite + Element Plus)

## Build Setup

``` bash
# 安装依赖
npm install

# 本地开发, 热更新于 localhost:8080, /api 代理到本地 gocron (默认 5920)
npm run dev

# 生产构建 (产物输出到 dist/, 由 make build-vue 拷贝到 ../public/, 经 //go:embed 嵌入 gocron 二进制)
npm run build

# 预览生产构建
npm run preview
```

构建流程详见仓库根目录 `makefile` 的 `build-vue` 目标,以及 `web/embed.go`。
