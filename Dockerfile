FROM node:11-alpine

# Installing dockerize which can test and wait on the availability of a TCP host and port.
ENV DOCKERIZE_VERSION v0.6.1
RUN apk add --no-cache openssl \
    && wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN apk add tcpflow curl coreutils python2 tcpdump make g++

RUN wget https://bootstrap.pypa.io/get-pip.py

RUN python2.7 get-pip.py

RUN pip2.7 install scapy && \
    pip2.7 install scapy-http && \
    pip2.7 install requests

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

EXPOSE 80

CMD ["sh", "start.sh"]
