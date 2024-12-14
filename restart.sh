rm -r gnss-radar
docker pull alfaiv/gnss-radar:latest
git clone https://github.com/Gokert/gnss-radar.git

cd ./gnss-radar
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
docker volume rm $(docker volume ls -q)
docker images --format '{{.Repository}}:{{.Tag}} {{.ID}}' | grep -v -e 'nginx' -e 'postgres' -e 'redis' -e 'cepf' | awk '{print $2}' | xargs -r docker rmi

docker-compose up --build

