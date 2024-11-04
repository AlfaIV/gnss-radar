include ./.env.sh

dev_start:
	pnpm run dev

dev_build:
	pnpm run build

docker_run: docker_build
	docker run -p 1000:80 gnss-radar

docker_push: docker_login docker_build
	docker push alfaiv/gnss-radar

docker_pull: docker_login
	docker pull alfaiv/gnss-radar:latest

docker_connect:
	docker run -it gnss-radar:latest /bin/bash

docker_login:
	docker login -u $$DOCKER_USERNAME -p $$DOCKER_TOKEN

docker_build: dev_build
	docker build -t gnss-radar .
	# docker build --no-cache -t gnss-radar .
	docker tag gnss-radar:latest alfaiv/gnss-radar:latest

help:
	@echo "make docker_run" - запускт и сборка контейнера
	@echo "make docker_push" - публикация образа
	@echo "make docker_pull" - получение образа
	@echo "make docker_connect" - подключение к собранному докер образу
	@echo "make docker_login" - подключение к докер хабу
	@echo "make docker_build" - pnpm сборка проекта
	@echo "make dev_start" - старт pnpm dev
	@echo "make dev_build" - старт pnpm build