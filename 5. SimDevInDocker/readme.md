
# Inspiration: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

docker build -t <imagename> .
docker images
docker run --env-file env.list <imagename>

# check docker container and app running succesfully
docker ps
docker logs <container id>

docker stop <NAMES>

# Private Repo
https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-docker-cli
