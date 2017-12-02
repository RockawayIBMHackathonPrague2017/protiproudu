#!/bin/bash
cd `dirname $0`

DOCKER_COMPOSE_DIR=./docker-compose
docker-compose -f $DOCKER_COMPOSE_DIR/app.yml -p tipplugin pull

docker rm -f $(docker ps -aq)

docker-compose -f $DOCKER_COMPOSE_DIR/app.yml -p tipplugin up -d
