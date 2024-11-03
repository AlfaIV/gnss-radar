docker_run:
	docker build -t gnss-radar .
	docker run -p 1000:80 gnss-radar

docker_push:
	source .env.sh 
	docker login -u $DOCKER_USERNAME -p $DOCKER_TOKEN
	# docker tag gnss-radar:latest alfaiv/gnss-radar:latest
	docker build --no-cache -t gnss-radar .
	docker push alfaiv/gnss-radar


docker_pull:
	source .env.sh 
	docker login -u $DOCKER_USERNAME -p $DOCKER_TOKEN
	docker pull alfaiv/gnss-radar:latest