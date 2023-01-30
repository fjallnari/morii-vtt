#!/bin/bash

function create_volumes(){
    MY_UID=$1
    MY_GID=$2
    docker volume create node-16
    docker volume create morii-mongo
    docker volume create morii-client
    docker run --rm -it -v node-16:/node-16 busybox su -s /bin/sh -c "chown $MY_UID:$MY_GID /node-16"
    docker run --rm -it -v morii-mongo:/morii-mongo busybox su -s /bin/sh -c "chown $MY_UID:$MY_GID /morii-mongo"
    docker run --rm -it -v morii-client:/morii-client busybox su -s /bin/sh -c "chown $MY_UID:$MY_GID /morii-client"
}

function start_docker_compose(){
    DOCKER_COMPOSE_FILE=$1
    MY_UID=$2
    MY_GID=$3

    MY_UID="${MY_UID}" MY_GID="${MY_GID}" docker-compose down --remove-orphans
    echo "Starting docker-compose up"
    docker image pull node:16
    MY_UID="${MY_UID}" MY_GID="${MY_GID}" docker-compose -f $DOCKER_COMPOSE_FILE up -d --remove-orphans $SERVICES
    MY_UID="${MY_UID}" MY_GID="${MY_GID}" docker-compose -f $DOCKER_COMPOSE_FILE logs --follow
}

exitfn () {
    trap SIGINT              # Restore signal handling for SIGINT
    exit                     #   then exit script.
}

DOCKER_COMPOSE_FILE="docker-compose.dev.yml"
SERVICES="mongo client server"
MY_UID=$(id -u)
MY_GID=$(id -g)

create_volumes $MY_UID $MY_GID
start_docker_compose $DOCKER_COMPOSE_FILE $MY_UID $MY_GID

trap "exitfn" INT
source bin/stop-dev.sh
trap SIGINT