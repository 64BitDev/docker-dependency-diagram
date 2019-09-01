#!/bin/sh

python2 http-x.py &
dockerize -wait tcp://zookeeper:2181 -wait tcp://kafka:9092 npm start
