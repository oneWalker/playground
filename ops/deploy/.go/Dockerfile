## 设置基础镜像文件，镜像地址🉑️修改
FROM golang:1.12

WORKDIR /app

COPY . .

ENV GO111MODULE on

RUN GOOS=linux CGO_ENABLED=0 \
  go build -mod=vendor -ldflags="-s -w" -installsuffix cgo -o server1 main.go


## stage2
FROM golang:1.12-alpine

WORKDIR /app

COPY --from=0 /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
COPY --from=0 /app/server1 .
COPY --from=0 /app/vendor/github.com/hw676018683/china_division/data/data.json ./vendor/github.com/hw676018683/china_division/data/

CMD ["./server1"]
