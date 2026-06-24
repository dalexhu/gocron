GO111MODULE=on

.PHONY: build
build: gocron node cli

.PHONY: build-race
build-race: enable-race build

.PHONY: run
run: build kill
	./bin/gocron-node &
	./bin/gocron web -e dev

.PHONY: run-race
run-race: enable-race run

.PHONY: kill
kill:
	-killall gocron-node

.PHONY: gocron
gocron:
	go build $(RACE) -o bin/gocron ./cmd/gocron

.PHONY: node
node:
	go build $(RACE) -o bin/gocron-node ./cmd/node

.PHONY: cli
cli:
	go build $(RACE) -o bin/gocron-cli ./cmd/gocron-cli

.PHONY: test
test:
	go test $(RACE) ./...

.PHONY: test-race
test-race: enable-race test

.PHONY: enable-race
enable-race:
	$(eval RACE = -race)

.PHONY: package
package: build-vue
	bash ./package.sh

.PHONY: package-all
package-all: build-vue
	bash ./package.sh -p 'linux darwin windows'

# 前端构建产物通过 //go:embed 嵌入二进制 (见 web/embed.go), 无需再生成 statik。
.PHONY: build-vue
build-vue:
	cd web/vue && npm run build
	rm -rf web/public/static web/public/index.html
	cp -r web/vue/dist/* web/public/

.PHONY: install-vue
install-vue:
	cd web/vue && npm install

.PHONY: run-vue
run-vue:
	cd web/vue && npm run dev

.PHONY: lint
	golangci-lint run

.PHONY: clean
clean:
	rm bin/gocron
	rm bin/gocron-node
