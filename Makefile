docker:
	docker build -t gnss-radar .
	docker run -d -p 1000:80 gnss-radar