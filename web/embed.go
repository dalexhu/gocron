// Package web 通过 Go 原生 //go:embed 将前端构建产物(web/public 下的所有文件)
// 嵌入到二进制中, 替代原先的 rakyll/statik 方案。
//
// 构建流程: 前端 (web/vue) 执行 npm run build 后, 产物会被拷贝到 web/public,
// 随后普通的 go build 即可把这些静态资源一并编入可执行文件。
package web

import "embed"

// Public 嵌入 web/public 目录下的全部静态资源(含以 . 或 _ 开头的文件)。
//
//go:embed all:public
var Public embed.FS
