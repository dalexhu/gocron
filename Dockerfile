FROM golang:1.21-alpine as builder

RUN apk update \
    && apk add --no-cache git ca-certificates make bash npm nodejs

RUN go env -w GO111MODULE=on && \
    go env -w GOPROXY=https://goproxy.cn,direct

WORKDIR /app

# 前端构建产物通过 //go:embed 嵌入 gocron 二进制 (见 web/embed.go), 无需再执行 statik。
RUN git clone https://github.com/dalexhu/gocron.git \
    && cd gocron \
    && make install-vue \
    && make build-vue \
    && CGO_ENABLED=0 make gocron

FROM alpine:3.12

RUN apk add --no-cache ca-certificates tzdata \
    && addgroup -S app \
    && adduser -S -g app app

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

WORKDIR /app

COPY --from=builder /app/gocron/bin/gocron .

RUN chown -R app:app ./

EXPOSE 5920

USER app

ENTRYPOINT ["/app/gocron", "web"]
