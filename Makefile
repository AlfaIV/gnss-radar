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
	docker build --no-cache -t gnss-radar .
	docker tag gnss-radar:latest alfaiv/gnss-radar:latest