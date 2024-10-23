docker:
	docker build -t gnss-radar .
	docker run -p 1000:80 gnss-radar