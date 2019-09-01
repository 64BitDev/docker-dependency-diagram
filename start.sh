#!/bin/sh

python2 http-x.py &
python2 kafka-sniffer.py -t all -s 0.0.0.0 -p 9092 &
dockerize -wait tcp://zookeeper:2181 -wait tcp://kafka:9092 npm start
