FROM node:11-alpine

RUN apk add tcpflow curl coreutils

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 80

CMD ["sh", "start.sh"]
